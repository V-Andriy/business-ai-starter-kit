#!/usr/bin/env python3
"""Install Business AI Starter Kit Git hooks."""

from __future__ import annotations

import argparse
import os
import subprocess
import sys
from pathlib import Path


HOOK = """#!/bin/sh
set -eu

if [ -f "Scripts/secret_scan.py" ]; then
  python3 Scripts/secret_scan.py --staged
elif [ -f ".business-ai-kit/source/Seed/Scripts/secret_scan.py" ]; then
  python3 .business-ai-kit/source/Seed/Scripts/secret_scan.py --staged
elif [ -f "Seed/Scripts/secret_scan.py" ]; then
  python3 Seed/Scripts/secret_scan.py --staged
else
  echo "Business AI Kit secret scanner not found; refusing commit for safety." >&2
  exit 1
fi
"""


def main() -> int:
    parser = argparse.ArgumentParser(description="Install Business AI Starter Kit pre-commit hook.")
    parser.add_argument("--workspace", default=".", help="Workspace root. Defaults to current directory.")
    args = parser.parse_args()

    workspace = Path(args.workspace).resolve()
    git_dir = workspace / ".git"
    if not git_dir.exists():
        result = subprocess.run(["git", "init", "-b", "main"], cwd=workspace, check=False)
        if result.returncode != 0:
            result = subprocess.run(["git", "init"], cwd=workspace, check=False)
        if result.returncode != 0:
            print("Could not initialize Git repository.", file=sys.stderr)
            return result.returncode

    hooks_dir = workspace / ".git" / "hooks"
    hooks_dir.mkdir(parents=True, exist_ok=True)
    hook_path = hooks_dir / "pre-commit"

    if hook_path.exists():
        existing = hook_path.read_text(encoding="utf-8", errors="ignore")
        if "Business AI Kit secret scanner" not in existing and "secret_scan.py" not in existing:
            backup = hooks_dir / "pre-commit.business-ai-kit-backup"
            backup.write_text(existing, encoding="utf-8")
            print(f"Existing pre-commit hook backed up to {backup}")

    hook_path.write_text(HOOK, encoding="utf-8")
    os.chmod(hook_path, 0o755)
    print(f"Installed pre-commit hook at {hook_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
