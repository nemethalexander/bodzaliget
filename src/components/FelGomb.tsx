import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function FelGomb() {
  const [lathato, setLathato] = useState(false)

  useEffect(() => {
    const onScroll = () => setLathato(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const felGordules = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {lathato && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={felGordules}
          className="fixed bottom-5 right-16 z-40 w-10 h-10 rounded-full bg-sage text-cream shadow-md flex items-center justify-center hover:bg-sage-dark transition-colors duration-300 cursor-pointer"
          aria-label="Ugrás az oldal tetejére"
          title="Oldal tetejére"
        >
          <ArrowUp className="w-4 h-4" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
