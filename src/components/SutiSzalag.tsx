import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

export default function SutiSzalag() {
  const [lathato, setLathato] = useState(false)
  const [valasztott, setValasztott] = useState(false)

  useEffect(() => {
    const ertek = localStorage.getItem('bodzaliget-sutik')
    if (ertek) {
      setValasztott(true)
    } else {
      const timer = setTimeout(() => setLathato(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const elfogadas = () => {
    localStorage.setItem('bodzaliget-sutik', 'elfogadva')
    setLathato(false)
    setValasztott(true)
  }

  const elutasitas = () => {
    localStorage.setItem('bodzaliget-sutik', 'elutasitva')
    setLathato(false)
    setValasztott(true)
  }

  const ujraNyitas = () => {
    setLathato(true)
  }

  return (
    <>
      {/* Cookie banner */}
      <AnimatePresence>
        {lathato && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50"
          >
            <div className="vintage-frame rounded-sm bg-cream/95 backdrop-blur-md p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <Cookie className="w-5 h-5 text-clay flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="flex-1">
                  <h4 className="font-serif text-sm text-stone-800 mb-1.5">Sütiket használunk</h4>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    Weboldalunk sütiket (cookie-kat) használ a jobb felhasználói élmény érdekében.
                    A böngészés folytatásával Ön elfogadja a sütik használatát.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={elfogadas}
                      className="px-4 py-2 bg-sage text-cream text-xs tracking-wide rounded-sm hover:bg-sage-dark transition-colors duration-300 cursor-pointer"
                    >
                      Elfogadom
                    </button>
                    <button
                      onClick={elutasitas}
                      className="px-4 py-2 text-xs text-stone-600 hover:text-stone-800 transition-colors duration-300 cursor-pointer"
                    >
                      Elutasítom
                    </button>
                  </div>
                </div>
                <button
                  onClick={elutasitas}
                  className="text-sepia-400 hover:text-stone-600 transition-colors duration-300 cursor-pointer"
                  aria-label="Bezárás"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Small floating icon to reopen settings */}
      <AnimatePresence>
        {valasztott && !lathato && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            onClick={ujraNyitas}
            className="fixed bottom-5 right-5 z-40 w-10 h-10 rounded-full bg-cream/90 backdrop-blur-sm border border-sepia-200/50 shadow-md flex items-center justify-center text-earth/60 hover:text-sage hover:border-sage/30 transition-colors duration-300 cursor-pointer"
            aria-label="Süti beállítások"
            title="Süti beállítások"
          >
            <Cookie className="w-4 h-4" strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
