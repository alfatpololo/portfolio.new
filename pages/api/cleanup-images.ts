import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const publicDir = path.join(process.cwd(), 'public');
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
          moved++;
        } catch (error: any) {
          console.error(`Error moving ${fileName}:`, error.message);
        }
      } else {
        notFound++;
      }
    });

    return res.status(200).json({
      success: true,
      moved,
      notFound,
      message: `${moved} files moved to backup folder`
    });
  } catch (error: any) {
    console.error('Error in cleanup:', error);
    return res.status(500).json({ error: error.message });
  }
}

