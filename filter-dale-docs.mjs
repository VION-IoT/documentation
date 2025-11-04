#!/usr/bin/env node
// Clean up unwanted namespace documentation

import { readdir, readFile, unlink, writeFile } from 'fs/promises';
import { join } from 'path';

// Color helpers for terminal output
const colors = {
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`
};

const outputDirs = [
  { path: 'docs/api/dale/sdk', namespace: 'Dale.Sdk.Core' },
  { path: 'docs/api/dale/testkit', namespace: 'Dale.Sdk.TestKit' }
];

async function cleanupDirectory(outputDir, namespaceToKeep) {
  console.log(colors.cyan(`\nCleaning up ${outputDir} - keeping only namespace: ${namespaceToKeep}`));

  try {
    const files = await readdir(outputDir);
    const mdFilesToCheck = files.filter(f => f.endsWith('.md') && f !== 'index.md');
    
    let filesRemoved = 0;
    
    for (const mdFile of mdFilesToCheck) {
      const filePath = join(outputDir, mdFile);
      const content = await readFile(filePath, 'utf-8');
      
      // Check if content includes the namespace to keep
      const shouldKeep = content.includes(`### [${namespaceToKeep}`);
      
      if (!shouldKeep) {
        await unlink(filePath);
        filesRemoved++;
        console.log(colors.gray(`  Removed: ${mdFile}`));
      } else {
        // Fix angle brackets in headings for VitePress build compatibility
        let fixedContent = content;
        
        // First, escape angle brackets in markdown headings (but not in code blocks)
        fixedContent = fixedContent.replace(
          /^(#{1,6}\s+)([^\n`]+)$/gm,
          (match, prefix, headingText) => {
            // Only process if the heading contains angle brackets and no backticks
            if ((headingText.includes('<') || headingText.includes('>')) && !headingText.includes('`')) {
              // First, remove any existing escape backslashes to avoid double-escaping
              let unescaped = headingText.replace(/\\</g, '<').replace(/\\>/g, '>');
              // Then escape all angle brackets in the heading
              const escaped = unescaped.replace(/</g, '\\<').replace(/>/g, '\\>');
              return prefix + escaped;
            }
            return match;
          }
        );
        
        // Second, fix angle brackets in "Inheritance" lines (not in code blocks or links)
        fixedContent = fixedContent.replace(
          /^(Inheritance .*)$/gm,
          (match) => {
            // Split by backticks to preserve inline code
            const parts = match.split('`');
            return parts.map((part, index) => {
              // Only escape in non-code parts (even indices)
              if (index % 2 === 0) {
                return part.replace(/\\</g, '<').replace(/\\>/g, '>').replace(/</g, '\\<').replace(/>/g, '\\>');
              }
              return part;
            }).join('`');
          }
        );
        
        if (fixedContent !== content) {
          await writeFile(filePath, fixedContent, 'utf-8');
          console.log(colors.green(`  Fixed:   ${mdFile} (escaped angle brackets)`));
        } else {
          console.log(colors.gray(`  Kept:    ${mdFile}`));
        }
      }
    }

    // Clean up index.md
    console.log(colors.yellow('Cleaning up index.md...'));
    const indexPath = join(outputDir, 'index.md');
    let indexContent = await readFile(indexPath, 'utf-8');
    const originalLength = indexContent.length;
    
    // Get list of remaining files (files that were kept)
    const remainingFiles = await readdir(outputDir);
    const remainingMdFiles = new Set(remainingFiles.filter(f => f.endsWith('.md')));
    
    // Remove links to deleted files
    const lines = indexContent.split('\n');
    const filteredLines = lines.filter(line => {
      // Check if line contains a markdown link to a file
      const linkMatch = line.match(/\[.*?\]\(([^)]+\.md)/);
      if (linkMatch) {
        const linkedFile = linkMatch[1];
        // Keep the line only if the file exists
        return remainingMdFiles.has(linkedFile);
      }
      return true; // Keep non-link lines
    });
    
    indexContent = filteredLines.join('\n');
    
    // Remove empty namespace sections
    indexContent = indexContent.replace(
      /<a name='[^']+'>.*?<\/a>\s*\n+## [^\n]+ Namespace\s*\n+(?:\| [^\n]+ \|\s*\n\| :--- \| :--- \|\s*\n+)+(?=<a name='|## |$)/g,
      ''
    );
    
    // Clean up multiple consecutive blank lines
    indexContent = indexContent.replace(/\n{3,}/g, '\n\n');
    
    await writeFile(indexPath, indexContent, 'utf-8');
    
    const cleanedBytes = originalLength - indexContent.length;
    console.log(colors.green(`Cleaned up index.md (removed ${cleanedBytes} bytes)`));
    console.log(colors.green(`Removed ${filesRemoved} files from ${outputDir}`));
  } catch (error) {
    console.error(colors.red(`Error during cleanup of ${outputDir}: ${error.message}`));
    throw error;
  }
}

try {
  for (const { path, namespace } of outputDirs) {
    await cleanupDirectory(path, namespace);
  }
  console.log(colors.green('\n✓ All cleanup complete!'));
} catch (error) {
  process.exit(1);
}
