#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

// Link the canonical skills folder into the paths each supported AI harness
// scans for repo skills, so the same skills work in Codex and Claude Code at
// the same time. The single source of truth is Agent-Instructions/Skills.
const harnessLinks = [
  { name: 'Codex', dir: '.agents', link: ['.agents', 'skills'] },
  { name: 'Claude Code', dir: '.claude', link: ['.claude', 'skills'] },
];

function parseWorkspace() {
  const idx = process.argv.indexOf('--workspace');
  if (idx !== -1 && process.argv[idx + 1]) {
    return path.resolve(process.argv[idx + 1]);
  }
  return process.cwd();
}

function sameTarget(actual, expected) {
  return path.resolve(path.dirname(actual), fs.readlinkSync(actual)) === expected;
}

function linkSkills(workspace, skillsTarget, harness) {
  const harnessDir = path.join(workspace, harness.dir);
  const linkPath = path.join(workspace, ...harness.link);

  fs.mkdirSync(harnessDir, { recursive: true });

  let existingLinkStat = null;
  try {
    existingLinkStat = fs.lstatSync(linkPath);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  if (existingLinkStat) {
    if (existingLinkStat.isSymbolicLink() && sameTarget(linkPath, skillsTarget)) {
      console.log(`${harness.name} skills link already exists: ${path.relative(workspace, linkPath)} -> ${path.relative(workspace, skillsTarget)}`);
      return true;
    }
    console.error(`Cannot create ${harness.name} skills link because this path already exists: ${linkPath}`);
    console.error('Move or remove that path manually, then run this script again.');
    return false;
  }

  const linkTarget = process.platform === 'win32'
    ? skillsTarget
    : path.relative(harnessDir, skillsTarget);

  try {
    fs.symlinkSync(linkTarget, linkPath, process.platform === 'win32' ? 'junction' : 'dir');
    console.log(`Created ${harness.name} skills link: ${path.relative(workspace, linkPath)} -> ${path.relative(workspace, skillsTarget)}`);
    return true;
  } catch (error) {
    console.error(`Could not create ${harness.name} skills link: ${error.message}`);
    return false;
  }
}

const workspace = parseWorkspace();
const skillsTarget = path.join(workspace, 'Agent-Instructions', 'Skills');

if (!fs.existsSync(skillsTarget)) {
  console.error(`Skills target is missing: ${skillsTarget}`);
  process.exit(1);
}

let ok = true;
for (const harness of harnessLinks) {
  if (!linkSkills(workspace, skillsTarget, harness)) ok = false;
}

process.exit(ok ? 0 : 1);
