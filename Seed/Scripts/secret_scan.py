#!/usr/bin/env python3
"""Small local secret scanner for Business AI Starter Kit workspaces."""

from __future__ import annotations

import argparse
import os
import re
import subprocess
import sys
from pathlib import Path


PATTERNS = [
    ("OpenAI API key", re.compile(r"\bsk-[A-Za-z0-9_\-]{20,}\b")),
    ("GitHub token", re.compile(r"\bgh[pousr]_[A-Za-z0-9_]{20,}\b")),
    ("Slack token", re.compile(r"\bxox[baprs]-[A-Za-z0-9\-]{20,}\b")),
    ("Stripe secret key", re.compile(r"\bsk_(live|test)_[A-Za-z0-9]{20,}\b")),
    ("AWS access key", re.compile(r"\bAKIA[0-9A-Z]{16}\b")),
    ("Private key block", re.compile(r"-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----")),
    ("Generic secret assignment", re.compile(r"(?i)\b(api[_-]?key|secret|token|password)\b\s*[:=]\s*['\"]?([A-Za-z0-9_./+=\-]{24,})")),
]

SAFE_PLACEHOLDER = re.compile(r"<SECRET:[A-Z0-9_]+>")
SKIP_DIRS = {
    ".git",
    ".business-ai-kit/source",
    "node_modules",
    "__pycache__",
    ".venv",
    "venv",
    ".next",
    "dist",
    "build",
}
SKIP_SUFFIXES = {
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".pdf",
    ".zip",
    ".tar",
    ".gz",
    ".sqlite",
    ".db",
}
SAFE_FILENAMES = {".env.example"}


def run_git(args: list[str]) -> list[str]:
    result = subprocess.run(["git", *args], check=False, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode != 0:
        return []
    return [line.strip() for line in result.stdout.splitlines() if line.strip()]


def staged_files() -> list[Path]:
    files = run_git(["diff", "--cached", "--name-only", "--diff-filter=ACMR"])
    return [Path(path) for path in files]


def should_skip(path: Path) -> bool:
    path_text = path.as_posix()
    if path.name in SAFE_FILENAMES:
        return True
    if path.suffix.lower() in SKIP_SUFFIXES:
        return True
    return any(path_text == item or path_text.startswith(f"{item}/") for item in SKIP_DIRS)


def candidate_files(paths: list[str], staged: bool) -> list[Path]:
    if staged:
        return [path for path in staged_files() if path.exists() and not should_skip(path)]

    candidates: list[Path] = []
    roots = [Path(path) for path in paths] if paths else [Path(".")]
    for root in roots:
        if root.is_file() and not should_skip(root):
            candidates.append(root)
        elif root.is_dir():
            for dirpath, dirnames, filenames in os.walk(root):
                dirnames[:] = [name for name in dirnames if not should_skip(Path(dirpath, name))]
                for filename in filenames:
                    path = Path(dirpath, filename)
                    if not should_skip(path):
                        candidates.append(path)
    return candidates


def scan_file(path: Path) -> list[tuple[int, str]]:
    try:
        text = path.read_text(encoding="utf-8", errors="ignore")
    except OSError:
        return []

    findings: list[tuple[int, str]] = []
    for line_no, line in enumerate(text.splitlines(), start=1):
        if SAFE_PLACEHOLDER.search(line):
            continue
        for label, pattern in PATTERNS:
            if pattern.search(line):
                findings.append((line_no, label))
                break
    return findings


def main() -> int:
    parser = argparse.ArgumentParser(description="Scan files for likely secrets.")
    parser.add_argument("paths", nargs="*", help="Files or directories to scan. Defaults to current directory.")
    parser.add_argument("--staged", action="store_true", help="Scan staged Git files only.")
    args = parser.parse_args()

    files = candidate_files(args.paths, args.staged)
    all_findings: list[tuple[Path, int, str]] = []
    for path in files:
        for line_no, label in scan_file(path):
            all_findings.append((path, line_no, label))

    if all_findings:
        print("Secret scan failed. Review these files before committing:")
        for path, line_no, label in all_findings:
            print(f"- {path}:{line_no} ({label})")
        print("Replace raw values with <SECRET:NAME> and store values in .env or Doppler.")
        return 1

    print(f"Secret scan passed ({len(files)} file(s) checked).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
