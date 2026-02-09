import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'fs';

// Ensure dist directory exists
mkdirSync('dist', { recursive: true });

// Bundle JavaScript
await esbuild.build({
    entryPoints: ['src/game.js'],
    bundle: true,
    outfile: 'dist/game.bundle.js',
    format: 'iife',
    minify: false, // Keep readable for learning purposes
});

// Copy and update HTML
let html = readFileSync('src/index.html', 'utf-8');
html = html.replace(
    '<script type="module" src="game.js"></script>',
    '<script src="game.bundle.js"></script>'
);
writeFileSync('dist/index.html', html);

// Copy CSS
copyFileSync('src/style.css', 'dist/style.css');

// Copy background SVGs
copyFileSync('src/bg-light.svg', 'dist/bg-light.svg');
copyFileSync('src/bg-dark.svg', 'dist/bg-dark.svg');

console.log('Build complete! Open dist/index.html in your browser.');
