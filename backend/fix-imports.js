const fs = require('fs');
const path = require('path');

function fixImports(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Get the depth of the file relative to src
    const relativePath = path.relative('src', filePath);
    const depth = relativePath.split(path.sep).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : './';
    
    // Replace @/ imports with relative paths
    content = content.replace(/@\//g, prefix);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
}

// Find all TypeScript files
function walkSync(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkSync(filePath);
        } else if (filePath.endsWith('.ts')) {
            fixImports(filePath);
        }
    });
}

walkSync('src');
console.log('All imports fixed!');