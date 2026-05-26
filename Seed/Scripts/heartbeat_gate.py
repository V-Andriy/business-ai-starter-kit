#!/usr/bin/env python3
"""Lightweight activity gate for the workspace heartbeat.

This script does not decide what to change. It gives the heartbeat a cheap,
structured snapshot so the agent can avoid deep review when nothing happened.
"""

from __future__ import annotations

import argparse
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except FileNotFoundError:
        return ""


def has_pending_markdown_items(path: Path) -> bool:
    text = read_text(path)
    if not text.strip():
        return False
    for line in text.splitlines():
        stripped = line.strip()
        if stripped.startswith("- ") and not stripped.lower().startswith("- no "):
            return True
    return False


def status_path_mtime(workspace: Path, status_line: str) -> float:
    raw_path = status_line[3:].strip()
    if " -> " in raw_path:
        raw_path = raw_path.split(" -> ", 1)[1].strip()
    raw_path = raw_path.strip('"')
    path = workspace / raw_path
    try:
        return path.stat().st_mtime
    except OSError:
        # Deleted, renamed, or shell-escaped paths still represent activity.
        # Keep them visible instead of filtering them out as stale.
        return float("inf")


def git_status(workspace: Path, since: float) -> list[str]:
    try:
        result = subprocess.run(
            ["git", "status", "--short"],
            cwd=workspace,
            check=False,
            text=True,
            capture_output=True,
        )
    except FileNotFoundError:
        return ["git-unavailable"]
    if result.returncode != 0:
        return [f"git-status-failed: {result.stderr.strip()}"]
    ignored_prefixes = (
        "?? .business-ai-kit/source/",
        "!! .business-ai-kit/source/",
    )
    lines = []
    for line in result.stdout.splitlines():
        if not line.strip() or line.startswith(ignored_prefixes):
            continue
        if since and status_path_mtime(workspace, line) <= since:
            continue
        lines.append(line)
    return lines


def newest_mtime(paths: list[Path]) -> float:
    mtimes = []
    for path in paths:
        if path.exists():
            mtimes.append(path.stat().st_mtime)
    return max(mtimes) if mtimes else 0.0


def recent_session_candidates(workspace: Path, since: float) -> list[str]:
    sessions_root = Path.home() / ".codex" / "sessions"
    if not sessions_root.exists():
        return []

    candidates: list[str] = []
    workspace_name = workspace.name
    workspace_text = str(workspace)
    for path in sessions_root.rglob("*"):
        if not path.is_file():
            continue
        try:
            if path.stat().st_mtime <= since:
                continue
            sample = path.read_text(encoding="utf-8", errors="ignore")[:200_000]
        except OSError:
            continue
        if workspace_text in sample or workspace_name in sample:
            candidates.append(str(path))
        if len(candidates) >= 20:
            break
    return candidates


def iso(ts: float) -> str | None:
    if not ts:
        return None
    return datetime.fromtimestamp(ts, tz=timezone.utc).isoformat()


def main() -> int:
    parser = argparse.ArgumentParser(description="Check whether heartbeat work is likely needed.")
    parser.add_argument("--workspace", default=".", help="Workspace path. Defaults to current directory.")
    args = parser.parse_args()

    workspace = Path(args.workspace).resolve()
    instructions = workspace / "Agent-Instructions"
    automation_log = instructions / "Automation-Log.md"
    outbox = instructions / "Outbox.md"
    last_state_time = newest_mtime([automation_log, outbox])

    inbox_pending = has_pending_markdown_items(instructions / "Inbox.md")
    incoming_signal = has_pending_markdown_items(instructions / "Signals" / "Incoming.md")
    outgoing_signal = has_pending_markdown_items(instructions / "Signals" / "Outgoing.md")
    status_lines = git_status(workspace, last_state_time)
    session_candidates = recent_session_candidates(workspace, last_state_time)

    reasons = []
    if inbox_pending:
        reasons.append("pending inbox items")
    if incoming_signal or outgoing_signal:
        reasons.append("pending signals")
    if status_lines:
        reasons.append("workspace git changes")
    if session_candidates:
        reasons.append("recent Codex session evidence")

    result = {
        "workspace": str(workspace),
        "checked_at": datetime.now(tz=timezone.utc).isoformat(),
        "last_state_time": iso(last_state_time),
        "needs_deep_review": bool(reasons),
        "reasons": reasons,
        "signals": {
            "inbox_pending": inbox_pending,
            "incoming_signal": incoming_signal,
            "outgoing_signal": outgoing_signal,
            "git_status_count": len(status_lines),
            "recent_session_candidate_count": len(session_candidates),
        },
        "git_status": status_lines[:50],
        "recent_session_candidates": session_candidates,
    }
    print(json.dumps(result, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
