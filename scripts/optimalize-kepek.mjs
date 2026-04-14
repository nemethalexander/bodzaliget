import sharp from 'sharp'
import { readdir } from 'fs/promises'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const forras = join(__dirname, '../src/assets/img')
const cel = join(__dirname, '../src/assets/img')

const fajlok = await readdir(forras)
const kepek = fajlok.filter(f => ['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase()))

for (const fajl of kepek) {
  const forrasUtvonal = join(forras, fajl)
  const nev = basename(fajl, extname(fajl))
  const celUtvonal = join(cel, `${nev}.webp`)

  const meta = await sharp(forrasUtvonal).metadata()
  const szelesseg = Math.min(meta.width ?? 1920, 1920)

  await sharp(forrasUtvonal)
    .resize(szelesseg)
    .webp({ quality: 80 })
    .toFile(celUtvonal)

  console.log(`✓ ${fajl} → ${nev}.webp`)
}

console.log('\nKész! Minden kép optimalizálva.')
