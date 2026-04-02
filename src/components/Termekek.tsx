import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Flower2, TreePine, Shovel, Leaf, Sprout, Package } from 'lucide-react'

const termekek = [
  {
    ikon: Flower2,
    nev: 'Egynyári virágok',
    leiras: 'Színpompás egynyári növények, amelyek egész nyáron díszítik kertjét.',
  },
  {
    ikon: TreePine,
    nev: 'Cserjék & Fák',
    leiras: 'Díszcserjék, gyümölcsfák és örökzöldek széles választéka.',
  },
  {
    ikon: Shovel,
    nev: 'Kertészeti eszközök',
    leiras: 'Minőségi kerti szerszámok, kaspók és kiegészítők a kertészkedéshez.',
  },
  {
    ikon: Sprout,
    nev: 'Évelők & Hagymások',
    leiras: 'Évelő dísznövények és virághagymák, amelyek évről évre visszatérnek kertjébe.',
  },
  {
    ikon: Leaf,
    nev: 'Fűszernövények',
    leiras: 'Friss, illatosan nevelt fűszernövények a konyhakertbe és az erkélyre egyaránt.',
  },
  {
    ikon: Package,
    nev: 'Föld & Mulcs',
    leiras: 'Prémium virágföldek, komposzt és dekoratív mulcs anyagok.',
  },
]

export default function Termekek() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="termekek" className="py-24 px-6 bg-sage/5">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-sage mb-3">Kínálatunk</p>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-4">
            Termékek & Szolgáltatások
          </h2>
          <div className="w-16 h-0.5 bg-sage mx-auto" />
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {termekek.map((termek, index) => (
            <motion.div
              key={termek.nev}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
              className="group vintage-frame rounded-sm bg-cream/60 p-8 hover:bg-cream hover:shadow-md transition-all duration-500 cursor-pointer paper-texture"
            >
              <div className="relative z-10">
                <termek.ikon
                  className="w-10 h-10 text-sage/70 mb-5 group-hover:text-sage transition-colors duration-500"
                  strokeWidth={1}
                />
                <h3 className="font-serif text-lg text-stone-800 mb-2 group-hover:text-sage transition-colors duration-500">
                  {termek.nev}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">{termek.leiras}</p>

                <div className="mt-5 flex items-center gap-2 text-xs text-sage/60 group-hover:text-sage transition-colors duration-500">
                  <span>Részletek</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
