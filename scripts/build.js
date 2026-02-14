import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync } from 'fs';

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

// Copy PWA assets
copyFileSync('src/manifest.json', 'dist/manifest.json');
copyFileSync('src/sw.js', 'dist/sw.js');

// Copy icons
mkdirSync('dist/icons', { recursive: true });
for (const file of readdirSync('src/icons')) {
    copyFileSync(`src/icons/${file}`, `dist/icons/${file}`);
}

console.log('Build complete! Open dist/index.html in your browser.');
