#!/usr/bin/env python3
"""Refresh the local Business AI Starter Kit source cache."""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from datetime import datetime
from pathlib import Path


DEFAULT_REPO = "https://github.com/scalebound/business-ai-starter-kit.git"


def run(cmd: list[str], cwd: Path | None = None) -> int:
    print("+ " + " ".join(cmd))
    return subprocess.run(cmd, cwd=cwd, check=False).returncode


def main() -> int:
    parser = argparse.ArgumentParser(description="Refresh .business-ai-kit/source.")
    parser.add_argument("--workspace", default=".", help="Workspace root. Defaults to current directory.")
    parser.add_argument("--repo", default=DEFAULT_REPO, help="Public kit repository URL.")
    args = parser.parse_args()

    workspace = Path(args.workspace).resolve()
    kit_dir = workspace / ".business-ai-kit"
    source_dir = kit_dir / "source"
    backup_dir = kit_dir / "backups"
    kit_dir.mkdir(parents=True, exist_ok=True)

    if not source_dir.exists():
        return run(["git", "clone", args.repo, str(source_dir)])

    if (source_dir / ".git").exists():
        code = run(["git", "pull", "--ff-only"], cwd=source_dir)
        if code == 0:
            return 0

    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    backup_dir.mkdir(parents=True, exist_ok=True)
    backup_path = backup_dir / f"source-backup-{timestamp}"
    shutil.move(str(source_dir), str(backup_path))
    print(f"Moved broken source cache to {backup_path}")
    return run(["git", "clone", args.repo, str(source_dir)])


if __name__ == "__main__":
    sys.exit(main())
