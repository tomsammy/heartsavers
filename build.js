const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // Clean dist directory
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  fs.mkdirSync('dist');

  // Copy root index.html
  fs.copyFileSync('index.html', 'dist/index.html');

  // Copy assets folder recursively
  if (fs.existsSync('assets')) {
    copyDir('assets', 'dist/assets');
  }

  console.log('Static build completed successfully!');
} catch (err) {
  console.error('Build failed:', err);
  process.exit(1);
}
