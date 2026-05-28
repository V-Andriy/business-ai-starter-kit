#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

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

const workspace = parseWorkspace();
const skillsTarget = path.join(workspace, 'Agent-Instructions', 'Skills');
const agentsDir = path.join(workspace, '.agents');
const linkPath = path.join(agentsDir, 'skills');

if (!fs.existsSync(skillsTarget)) {
  console.error(`Codex skills target is missing: ${skillsTarget}`);
  process.exit(1);
}

fs.mkdirSync(agentsDir, { recursive: true });

let existingLinkStat = null;
try {
  existingLinkStat = fs.lstatSync(linkPath);
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error;
  }
}

if (existingLinkStat) {
  if (existingLinkStat.isSymbolicLink() && sameTarget(linkPath, skillsTarget)) {
    console.log(`Codex skills link already exists: ${path.relative(workspace, linkPath)} -> ${path.relative(workspace, skillsTarget)}`);
    process.exit(0);
  }

  console.error(`Cannot create Codex skills link because this path already exists: ${linkPath}`);
  console.error('Move or remove that path manually, then run this script again.');
  process.exit(1);
}

const linkTarget = process.platform === 'win32'
  ? skillsTarget
  : path.relative(agentsDir, skillsTarget);

try {
  fs.symlinkSync(linkTarget, linkPath, process.platform === 'win32' ? 'junction' : 'dir');
  console.log(`Created Codex skills link: ${path.relative(workspace, linkPath)} -> ${path.relative(workspace, skillsTarget)}`);
} catch (error) {
  console.error(`Could not create Codex skills link: ${error.message}`);
  process.exit(1);
}
