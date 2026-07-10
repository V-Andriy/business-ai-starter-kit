#!/usr/bin/env node
import path from 'node:path';
import {
  approvalToken,
  disable,
  inspect,
  install,
  packageCowork,
  preview,
  previewCowork,
  uninstall,
} from './lib/knowledge_bridge_core.mjs';

function help() {
  console.log(`Usage: node Scripts/knowledge_bridge.mjs <command> [options]

Commands:
  preview          Validate and print the exact approved snapshot
  preview-cowork   Validate and print the exact detached Cowork snapshot
  install          Install or update managed user-level consumer skills
  refresh          Same safety flow as install for an existing snapshot
  status           Show freshness, workspace alias, and installed targets
  disable          Stop exposing this workspace from managed consumer skills
  uninstall        Remove this workspace and kit-owned skills when no entries remain
  package-cowork   Build a self-contained Cowork skill upload

Options:
  --workspace <path>       Source workspace (default: current directory)
  --targets <list>         codex,claude (default: both)
  --target-dir <path>      Additional compatible user skill directory
  --confirm                Required for every mutating command
  --approval <token>       Binds install/package to the exact preview`);
}

function parse(argv) {
  const options = { workspace: process.cwd(), targetDirs: [] };
  const command = argv.shift();
  while (argv.length) {
    const arg = argv.shift();
    if (arg === '--confirm') options.confirm = true;
    else if (arg === '--workspace') options.workspace = path.resolve(argv.shift() || '');
    else if (arg === '--targets') options.targets = (argv.shift() || '').split(',').filter(Boolean);
    else if (arg === '--target-dir') options.targetDirs.push(path.resolve(argv.shift() || ''));
    else if (arg === '--approval') options.approval = argv.shift();
    else if (arg === '--help' || arg === '-h') options.help = true;
    else throw new Error(`Unknown option: ${arg}`);
  }
  return { command, options };
}

function requireConfirmation(command, options) {
  const previewCommand = command === 'package-cowork' ? 'bridge:preview:cowork' : 'bridge:preview';
  if (!options.confirm) throw new Error(`${command} changes user-level files. Review ${previewCommand}, get user approval, then rerun with --confirm and its approval token.`);
}

function printPreview(result) {
  console.log('Portable context preview');
  console.log(`Alias: ${result.context.alias}`);
  console.log(`Label: ${result.context.label}`);
  console.log(`SHA-256: ${result.context.sha256}`);
  console.log(`Approval token: ${approvalToken(result)}`);
  console.log('Targets:');
  for (const target of result.targets) console.log(`- ${target.kind}: ${target.path}`);
  if (result.targets.some((target) => target.kind === 'cowork')) {
    console.log('Warning: uploading this package sends the snapshot to the user\'s Claude account. Local storage does not mean local inference.');
  }
  console.log('\nExact exported content\n---');
  process.stdout.write(result.context.content.endsWith('\n') ? result.context.content : `${result.context.content}\n`);
  console.log('---');
}

function main() {
  const { command, options } = parse(process.argv.slice(2));
  if (!command || options.help) return help();
  if (command === 'preview') return printPreview(preview(options.workspace, options));
  if (command === 'preview-cowork') return printPreview(previewCowork(options.workspace, options));
  if (command === 'status') return console.log(JSON.stringify(inspect(options.workspace, options), null, 2));
  requireConfirmation(command, options);
  if (command === 'install' || command === 'refresh') {
    const result = install(options.workspace, options);
    console.log(`Portable context ${command === 'install' ? 'installed' : 'refreshed'} for "${result.entry.alias}".`);
    for (const target of result.targets) console.log(`- ${target.kind}: ${target.path}`);
    return;
  }
  if (command === 'disable') {
    const entry = disable(options.workspace, options);
    return console.log(`Portable context disabled for "${entry.alias}".`);
  }
  if (command === 'uninstall') {
    const result = uninstall(options.workspace, options);
    return console.log(`Portable context removed. Remaining workspaces: ${result.remaining}.`);
  }
  if (command === 'package-cowork') {
    const result = packageCowork(options.workspace, options);
    console.log(result.zipPath ? `Cowork upload ready: ${result.zipPath}` : `Cowork skill folder ready: ${result.skillDir}\nZIP was unavailable; compress this folder manually.`);
    return;
  }
  throw new Error(`Unknown command: ${command}`);
}

try {
  main();
} catch (error) {
  console.error(`Knowledge bridge error: ${error.message}`);
  process.exit(1);
}
