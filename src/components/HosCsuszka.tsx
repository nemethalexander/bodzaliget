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
    cim: 'Tavaszi vásár — Kedvezményes palánták',
    leiras: 'Látogasson el hozzánk és válasszon friss, egészséges palántáink közül! Széles választék paradicsomból, paprikából és fűszernövényekből.',
    kep: kep1,
  },
  {
    cim: 'Új rózsakollekció érkezett',
    leiras: 'Angol és történelmi rózsafajták egyenesen a legjobb európai kertészetekből. Illatos, bőségesen virágzó fajták.',
    kep: kep2,
  },
  {
    cim: 'Kertészeti tanfolyam indul',
    leiras: 'Tartson velünk szombati kertészeti workshopunkon! Megtanuljuk a metszés, oltás és a természetes növényvédelem alapjait.',
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
    const idozito = setInterval(kovetkezo, 6000)
    return () => clearInterval(idozito)
  }, [kovetkezo])

  return (
    <section id="kezdolap" className="relative h-screen min-h-[600px] overflow-hidden pt-16">
      {/* Background images with cross-fade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={aktualis}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hirek[aktualis].kep})` }}
          />
          {/* Subtle overlay — only bottom edge for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 via-transparent to-stone-900/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-6">
        <div className="max-w-6xl mx-auto w-full">
          {/* Top label */}
          <motion.p
            key={`label-${aktualis}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xs tracking-[0.3em] uppercase text-cream/70 mb-4"
          >
            Aktualitások
          </motion.p>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={`title-${aktualis}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl md:text-5xl text-cream leading-tight max-w-2xl mb-4"
            >
              {hirek[aktualis].cim}
            </motion.h2>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${aktualis}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-cream/80 max-w-lg text-sm md:text-base leading-relaxed mb-8"
            >
              {hirek[aktualis].leiras}
            </motion.p>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-6">
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
