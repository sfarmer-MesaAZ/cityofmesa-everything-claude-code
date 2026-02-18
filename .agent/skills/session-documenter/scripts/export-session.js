#!/usr/bin/env node

/**
 * Session Documenter - Export Session Script
 *
 * This script handles the exportation of Claude Code session transcripts
 * into structured markdown documentation for the repository.
 *
 * Usage:
 *   node export-session.js [options]
 *
 * Options:
 *   --adr           Create an Architecture Decision Record (ADR)
 *   --instincts     Extract patterns for continuous-learning-v2
 *   --format=html   Export in HTML format with collapsible thinking blocks
 *   --help          Show this help message
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const REPO_ROOT = path.resolve(__dirname, '../../../../');
const SESSIONS_DIR = path.join(REPO_ROOT, 'docs/ai-sessions');
const DECISIONS_DIR = path.join(REPO_ROOT, 'docs/decisions');

function showHelp() {
    console.log(`
Session Documenter - Export Session Script

This script facilitates the exportation of Claude Code session transcripts
into structured markdown documentation.

Usage:
  node export-session.js [options]

Options:
  --adr           Create an Architecture Decision Record (ADR)
  --instincts     Extract patterns for continuous-learning-v2
  --format=html   Export in HTML format
  --help          Show this help message

Note: This script acts as a CLI bridge for the session-documenter skill.
The actual extraction of thinking blocks is handled by Claude during the 
/session-export command invocation.
  `);
}

function ensureDirectories() {
    [SESSIONS_DIR, DECISIONS_DIR].forEach(dir => {
        if (!fs.existsSync(dir)) {
            console.log(`Creating directory: ${dir}`);
            fs.mkdirSync(dir, { recursive: true });
        }
    });
}

function main() {
    const args = process.argv.slice(2);

    if (args.includes('--help')) {
        showHelp();
        return;
    }

    ensureDirectories();

    console.log('Session Documenter initialized.');
    console.log(`Repository root: ${REPO_ROOT}`);
    console.log(`Sessions will be saved to: ${SESSIONS_DIR}`);

    if (args.includes('--adr')) {
        console.log('ADR export mode enabled.');
    }

    if (args.includes('--instincts')) {
        console.log('Continuous learning (instincts) extraction enabled.');
    }

    console.log('\n[Claude Code Note]: Please use the "/session-export" command within ');
    console.log('your terminal to initiate the actual documentation extraction process.');
    console.log('This script provides the underlying infrastructure and directory management.');
}

if (require.main === module) {
    main();
}
