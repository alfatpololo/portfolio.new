// Script to move project images from public folder to backup
// Run this after all images are uploaded to Firebase Storage

const fs = require('fs');
const path = require('path');

const filesToMove = [
  'fiverr.mp4',
  'Nexisphere.mp4',
  'Kanakadashboard.png',
  'Dashboard_.png',
  'Jaket Boat.png',
  'Eldoria.gif',
  'iforte.gif',
  'Crypnative.png',
  'Glyph AI.png',
  'Bitreon.png',
  'Denode.png',
  'Injection Protocol.png',
  'Mingle.png',
  'Podsphere.png',
  'PowerLink.gif'
];

const publicDir = path.join(__dirname, '..', 'public');
const backupDir = path.join(publicDir, 'projects_backup');

// Create backup directory if it doesn't exist
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

let moved = 0;
let notFound = 0;

filesToMove.forEach(fileName => {
  const sourcePath = path.join(publicDir, fileName);
  const destPath = path.join(backupDir, fileName);
  
  if (fs.existsSync(sourcePath)) {
    try {
      fs.renameSync(sourcePath, destPath);
      console.log(`✅ Moved: ${fileName}`);
      moved++;
    } catch (error) {
      console.error(`❌ Error moving ${fileName}:`, error.message);
    }
  } else {
    console.log(`⚠️  Not found: ${fileName}`);
    notFound++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Moved: ${moved}`);
console.log(`   Not found: ${notFound}`);
console.log(`\n✅ Files moved to: ${backupDir}`);
console.log(`🗑️  You can delete the backup folder later if everything works.`);

