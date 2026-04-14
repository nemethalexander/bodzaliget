import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import kep1 from '../assets/img/1.jpg'
import kep2 from '../assets/img/2.jpg'
import kep3 from '../assets/img/3.jpg'

interface Hir {
  cim: string
  leiras: string
  kep: string
}

const hirek: Hir[] = [
  {
    cim: 'Friss palánták és virágok várnak',
    leiras: 'Tavasszal újra tele van a kertészet! Paradicsom, paprika, fűszernövények és színes egynyáriak — gyere és válogass kedvedre.',
    kep: kep1,
  },
  {
    cim: 'Cserepes dísznövények nagy választékban',
    leiras: 'Szobanövényektől a terasz- és erkélynövényekig mindenből tartunk. Nálunk biztosan megtalálod, amit keresel.',
    kep: kep2,
  },
  {
    cim: 'Nyitva vagyunk, várunk szeretettel',
    leiras: 'Akár tanácsra, akár növényre van szükséged — a Bodzaliget Kertészetben mindig segítünk. Nézelődni is érdemes betérni.',
    kep: kep3,
  },
]

export default function HosCsuszka() {
  const [aktualis, setAktualis] = useState(0)

  const kovetkezo = useCallback(() => {
    setAktualis((prev) => (prev + 1) % hirek.length)
  }, [])

  const elozo = useCallback(() => {
    setAktualis((prev) => (prev - 1 + hirek.length) % hirek.length)
  }, [])

  useEffect(() => {
    const idozito = setInterval(kovetkezo, 10000)
    return () => clearInterval(idozito)
  }, [kovetkezo])

  return (
    <section id="kezdolap" className="relative h-screen min-h-[600px] overflow-hidden pt-16">
      {/* Background images with cross-fade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={aktualis}
          initial={{ opacity: 0, scale: 1.05, zIndex: 1 }}
          animate={{ opacity: 1, scale: 1, zIndex: 1 }}
          exit={{ opacity: 0, zIndex: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hirek[aktualis].kep})` }}
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/20 via-stone-900/10 to-stone-900/80" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-6">
        <div className="max-w-6xl mx-auto w-full">

          {/* Szöveg — egységes animáció */}
          <AnimatePresence mode="wait">
            <motion.div
              key={aktualis}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="mb-6"
            >
              <p
                className="text-xs tracking-[0.3em] uppercase text-cream/70 mb-3"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
              >
                Aktualitások
              </p>
              <h2
                className="font-serif text-3xl md:text-4xl text-cream leading-tight mb-3"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
              >
                {hirek[aktualis].cim}
              </h2>
              <p
                className="text-cream/90 text-sm md:text-base leading-relaxed max-w-lg"
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
              >
                {hirek[aktualis].leiras}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-6 mt-6">
            <button
              onClick={elozo}
              className="w-10 h-10 rounded-full border border-cream/30 flex items-center justify-center text-cream/70 hover:bg-cream/10 transition-all duration-300 cursor-pointer"
              aria-label="Előző"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>

            {/* Dots */}
            <div className="flex gap-3">
              {hirek.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setAktualis(i)}
                  className={`h-px transition-all duration-700 cursor-pointer ${
                    i === aktualis ? 'w-10 bg-cream' : 'w-6 bg-cream/30'
                  }`}
                  aria-label={`Dia ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={kovetkezo}
              className="w-10 h-10 rounded-full border border-cream/30 flex items-center justify-center text-cream/70 hover:bg-cream/10 transition-all duration-300 cursor-pointer"
              aria-label="Következő"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
