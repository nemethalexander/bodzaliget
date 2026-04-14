import sharp from 'sharp'
import { readdirSync, renameSync, unlinkSync } from 'fs'
import { join, extname } from 'path'

const inputDir = './src/assets/img'
const files = readdirSync(inputDir)

for (const file of files) {
  const ext = extname(file).toLowerCase()
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue

  const inputPath = join(inputDir, file)
  const tempPath = join(inputDir, '_tmp_' + file)

  const meta = await sharp(inputPath).metadata()
  console.log(`${file}: ${meta.width}x${meta.height} -> optimalizálás...`)

  await sharp(inputPath)
    .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true })
    .toFile(tempPath)

  unlinkSync(inputPath)
  renameSync(tempPath, inputPath)

  console.log(`  -> kész`)
}

console.log('\nMinden kép optimalizálva!')
