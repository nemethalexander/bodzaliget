import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, X } from 'lucide-react'
import logo from '../assets/logoc.png'

const menuPontok = [
  { cimke: 'Kezdőlap', href: '#kezdolap' },
  { cimke: 'Rólunk', href: '#rolunk' },
  { cimke: 'Termékek', href: '#termekek' },
  { cimke: 'Kerti Napló', href: '#blog' },
  { cimke: 'Nyitvatartás', href: '#nyitvatartas' },
  { cimke: 'Kapcsolat', href: '#kapcsolat' },
]

export default function Navigacio() {
  const [nyitva, setNyitva] = useState(false)

  return (
    <>
      {/* Fixed right-side trigger */}
      <button
        onClick={() => setNyitva(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 group cursor-pointer"
        aria-label="Menü megnyitása"
      >
        <div className="flex flex-col items-center gap-3 px-3 py-6 bg-cream/80 backdrop-blur-sm border border-r-0 border-sepia-200/50 rounded-l-lg shadow-sm">
          <div className="w-px h-8 bg-sepia-300/60" />
          <Leaf className="w-4 h-4 text-sage opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-px h-8 bg-sepia-300/60" />
        </div>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {nyitva && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-50"
              onClick={() => setNyitva(false)}
            />

            {/* Right-side menu panel */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed right-0 top-0 h-full w-80 bg-cream/95 backdrop-blur-md border-l border-sepia-200/50 z-50 shadow-xl"
            >
              <div className="flex flex-col h-full px-10 py-12">
                {/* Close button */}
                <button
                  onClick={() => setNyitva(false)}
                  className="self-end mb-12 text-earth/60 hover:text-sage transition-colors duration-300 cursor-pointer"
                  aria-label="Menü bezárása"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>

                {/* Menu items styled like botanical journal index */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="border-t border-sepia-200/40 pt-6">
                    {menuPontok.map((pont) => (
                      <a
                        key={pont.href}
                        href={pont.href}
                        onClick={() => setNyitva(false)}
                        className="group flex items-baseline gap-4 py-4 border-b border-sepia-200/30 hover:border-sage/30 transition-colors duration-500"
                      >
                        <span className="font-serif text-xl text-earth group-hover:text-sage transition-colors duration-500">
                          {pont.cimke}
                        </span>
                        <span className="flex-1 border-b border-dotted border-sepia-300/40 mb-1" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center">
                  <p className="text-xs text-sepia-400 tracking-widest uppercase">
                    Bodzaliget Kertészet
                  </p>
                  <div className="w-8 h-px bg-sage/30 mx-auto mt-3" />
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40">
        {/* Thin green accent line */}
        <div className="h-1 bg-sage" />
        <div className="bg-cream/90 backdrop-blur-md border-b border-sepia-200/40 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="#kezdolap" className="flex items-center gap-3 group">
              <div className="w-48 h-14 flex-shrink-0 flex items-center overflow-hidden">
                <img src={logo} alt="Bodzaliget Kertészet logó" className="h-12 w-12 object-contain scale-[4] origin-left" />
              </div>
            </a>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-8">
              {menuPontok.slice(0, 5).map((pont) => (
                <a
                  key={pont.href}
                  href={pont.href}
                  className="text-sm text-stone-700 hover:text-sage transition-colors duration-300 tracking-wide"
                >
                  {pont.cimke}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
