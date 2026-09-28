const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processImages() {
    const publicDir = path.join(__dirname, 'public');
    const files = ['heronaxiii.png', 'heroimage.png', 'hero.png', 'heronax.png', 'myimage.png', 'image.png', 'melcadi-icon.png'];

    for (const file of files) {
        const inputPath = path.join(publicDir, file);
        if (fs.existsSync(inputPath)) {
            const ext = path.extname(file);
            const baseName = path.basename(file, ext);
            const outputPath = path.join(publicDir, `${baseName}.webp`);
            
            console.log(`Processing ${file}...`);
            await sharp(inputPath)
                .webp({ quality: 80, effort: 6 })
                .toFile(outputPath);
            console.log(`Saved ${outputPath}`);
        }
    }
}

processImages().catch(console.error);
