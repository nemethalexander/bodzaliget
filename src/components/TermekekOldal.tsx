import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Flower2, TreePine, Shovel, Leaf, Sprout, Package, Phone } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Lablec from './Lablec'
import kep1 from '../assets/img/1.webp'
import kep2 from '../assets/img/2.webp'
import kep3 from '../assets/img/3.webp'
import kep4 from '../assets/img/4.webp'
import kep5 from '../assets/img/5.webp'
import kep6 from '../assets/img/6.webp'
import kep7 from '../assets/img/7.webp'

interface Props {
  onVissza: () => void
  aktívKategoria?: string
}

interface Kategoria {
  id: string
  ikon: React.ElementType
  nev: string
  alcim: string
  leiras1: string
  leiras2: string
  sezon: string
  sezonSzin: string
  kep: string
  kepAlt: string
  kepPozicio?: string
}

const kategoriak: Kategoria[] = [
  {
    id: 'egynyari',
    ikon: Flower2,
    nev: 'Egynyári virágok',
    alcim: 'Szín és élet egész nyáron',
    leiras1: 'Az egynyári virágok a kert leghálásabb növényei — gyorsan fejlődnek, bőségesen virágoznak és egészen az első fagyig pompáznak. Petúniától a begónián át a százszorszépig rengeteg fajtával várjuk vásárlóinkat.',
    leiras2: 'Balkonládákba, teraszra, kertágyásba és cserépbe egyaránt alkalmasak. Ha nem tudod melyik illik hozzád, jöjj be és segítünk kiválasztani — figyelembe vesszük a fény- és vízigényt, a helyszínt és az ízlést is.',
    sezon: 'Március — Október',
    sezonSzin: 'bg-sage/10 text-sage-dark',
    kep: kep1,
    kepAlt: 'Egynyári virágok',
  },
  {
    id: 'cserjek',
    ikon: TreePine,
    nev: 'Cserjék & Fák',
    alcim: 'Hosszú távú befektetés a kertbe',
    leiras1: 'Díszcserjék, gyümölcsfák, sövénynövények és örökzöldek széles választéka. Ezek a növények évtizedekig hűséges társaid maradnak — érdemes alaposan körülnézni és jól megválasztani.',
    leiras2: 'Kínálatunkban megtalálod a klasszikus gyümölcsfákat (alma, körte, szilva, meggy), de díszfákat, tujákat, tiszafákat és különféle lombhullató cserjéket is tartunk. Ültetési tanácsadást is szívesen nyújtunk.',
    sezon: 'Egész évben',
    sezonSzin: 'bg-earth/10 text-earth',
    kep: kep3,
    kepAlt: 'Cserjék és fák',
  },
  {
    id: 'eszkozok',
    ikon: Shovel,
    nev: 'Kertészeti eszközök',
    alcim: 'Amit egy igazi kertésznek tudni kell',
    leiras1: 'Jó eszköz nélkül nincs jó kertészkedés. Nálunk minőségi kerti szerszámokat, locsolóberendezéseket, kaspókat és ültetési kellékeket találsz — olyasmit, ami nem hagy cserben a legelső kapáláskor.',
    leiras2: 'Kínálatunkban szerepelnek ergonomikus kéziszerszámok, tartós kerti kesztyűk, különféle méretű és stílusú cserepek, kaspók és tálcák. Időszakosan dekoratív kiegészítőket és ajándékötleteket is tartunk.',
    sezon: 'Egész évben',
    sezonSzin: 'bg-earth/10 text-earth',
    kep: kep6,
    kepAlt: 'Kertészeti eszközök',
    kepPozicio: 'center 30%',
  },
  {
    id: 'evelok',
    ikon: Sprout,
    nev: 'Évelők & Hagymások',
    alcim: 'Évről évre visszatérnek',
    leiras1: 'Az évelők a kertész legjobb barátai — egyszer ültetjük, és éveken át hálásak. Liliomok, dáliák, íriszek, pünkösdi rózsák és sok más klasszikus dísznövény vár a kertészetben.',
    leiras2: 'Tavaszi és őszi virághagymákat egyaránt tartunk. Tulipántól a nárciszon át a jácintokig — ha nem tudod mikor és hogyan kell ültetni, szívesen segítünk a legjobb időzítésben és elrendezésben.',
    sezon: 'Tavasz & Ősz',
    sezonSzin: 'bg-sage/10 text-sage-dark',
    kep: kep5,
    kepAlt: 'Évelők és hagymások',
    kepPozicio: 'center 70%',
  },
  {
    id: 'fuszernov',
    ikon: Leaf,
    nev: 'Fűszernövények',
    alcim: 'A konyha és az erkély kedvencei',
    leiras1: 'Frissen nevelt fűszernövényeink egyenesen a saját üvegházunkból kerülnek a polcra. Bazsalikom, petrezselyem, kakukkfű, rozmaring, menta, levendula — és még sok más, amit a konyha és a terasz egyaránt megköszön.',
    leiras2: 'Törekszünk arra, hogy mindig legyen nálunk a legkeresettebb fajták mellett valami különleges is. Ha valami speciálisat keresel — érdeklődjél, sokszor tudunk rendelni is.',
    sezon: 'Március — Október',
    sezonSzin: 'bg-sage/10 text-sage-dark',
    kep: kep7,
    kepAlt: 'Fűszernövények',
  },
  {
    id: 'fold',
    ikon: Package,
    nev: 'Föld & Mulcs',
    alcim: 'A jó termesztés alapja',
    leiras1: 'Minden növény csak annyira jó, amilyen a közeg amiben él. Prémium virágföldeket, speciális ültetőközegeket (kaktusz, orchidea, palánta), komposztot és különféle mulcs anyagokat tartunk.',
    leiras2: 'Dekoratív kavics, fakéreg mulcs, agyagkavics és perlit is elérhető nálunk. Ha nem tudod melyik föld kell az adott növényedhez, kérdezd meg munkatársainkat — szívesen segítünk.',
    sezon: 'Egész évben',
    sezonSzin: 'bg-earth/10 text-earth',
    kep: kep4,
    kepAlt: 'Föld és mulcs',
  },
]

function KategoriaBlokk({ kat, index }: { kat: Kategoria; index: number }) {
  const { ref, isVisible } = useScrollReveal()
  const balraKep = index % 2 !== 0

  return (
    <div id={kat.id} ref={ref} className="scroll-mt-20 py-20 px-6 border-b border-sepia-200/50 last:border-0">
      <div className="max-w-6xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${balraKep ? 'lg:flex-row-reverse' : ''}`}>

          {/* Szöveg */}
          <motion.div
            initial={{ opacity: 0, x: balraKep ? 24 : -24 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={balraKep ? 'lg:order-2' : ''}
          >
            <div className="flex items-center gap-3 mb-4">
              <kat.ikon className="w-6 h-6 text-sage" strokeWidth={1.5} />
              <span className={`text-xs tracking-[0.25em] uppercase px-3 py-1 rounded-full font-medium ${kat.sezonSzin}`}>
                {kat.sezon}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-2 leading-tight">{kat.nev}</h2>
            <p className="text-sm tracking-wide text-sage mb-5">{kat.alcim}</p>
            <div className="w-10 h-0.5 bg-sage mb-7" />
            <p className="text-stone-600 leading-relaxed mb-4">{kat.leiras1}</p>
            <p className="text-stone-600 leading-relaxed">{kat.leiras2}</p>
          </motion.div>

          {/* Kép */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className={`overflow-hidden rounded-sm ${balraKep ? 'lg:order-1 photo-shadow-alt' : 'photo-shadow'}`}
          >
            <img
              src={kat.kep}
              alt={kat.kepAlt}
              loading="lazy"
              className="w-full h-72 md:h-96 object-cover"
              style={kat.kepPozicio ? { objectPosition: kat.kepPozicio } : undefined}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function TermekekOldal({ onVissza, aktívKategoria }: Props) {
  useEffect(() => {
    if (aktívKategoria) {
      setTimeout(() => {
        document.getElementById(aktívKategoria)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [aktívKategoria])

  return (
    <div className="min-h-screen bg-cream">

      {/* Sticky visszagomb */}
      <div className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-sepia-200/60">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={onVissza}
            className="group flex items-center gap-2 text-sage hover:text-sage-dark transition-colors duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
            <span className="text-sm tracking-wide">Vissza a főoldalra</span>
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <img src={kep2} alt="Kínálatunk" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/20 via-stone-900/20 to-stone-900/75" />
        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-16 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-sage-light mb-4" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
              Bodzaliget Kertészet
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-cream leading-tight mb-5" style={{ textShadow: '0 2px 14px rgba(0,0,0,0.55)' }}>
              Termékek & Szolgáltatások
            </h1>
            <div className="w-16 h-0.5 bg-sage-light mx-auto" />
          </motion.div>
        </div>
      </div>

      {/* Gyors navigáció */}
      <div className="bg-sepia-100 border-b border-sepia-200/60 px-6 py-4 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex items-center gap-6 min-w-max md:min-w-0 md:flex-wrap">
          {kategoriak.map((kat) => (
            <button
              key={kat.id}
              onClick={() => document.getElementById(kat.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="flex items-center gap-2 text-xs tracking-wide text-stone-500 hover:text-sage transition-colors duration-300 cursor-pointer whitespace-nowrap"
            >
              <kat.ikon className="w-3.5 h-3.5" strokeWidth={1.5} />
              {kat.nev}
            </button>
          ))}
        </div>
      </div>

      {/* Kategória blokkok */}
      <div className="bg-cream">
        {kategoriak.map((kat, i) => (
          <KategoriaBlokk key={kat.id} kat={kat} index={i} />
        ))}
      </div>

      {/* CTA */}
      <section className="py-20 px-6 bg-sage-dark text-cream">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-sage-light mb-4">Kérdése van?</p>
          <h2 className="font-serif text-3xl text-cream mb-4">Érdeklődjön bátran</h2>
          <div className="w-12 h-0.5 bg-sage-light mx-auto mb-8" />
          <p className="text-cream/70 text-sm leading-relaxed mb-8">
            Ha valami konkrét növényt keres, nem biztos benne van-e nálunk, vagy tanácsra van szüksége — hívjon minket vagy látogasson be személyesen. Szívesen segítünk.
          </p>
          <a
            href="tel:+36308760332"
            className="inline-flex items-center gap-3 px-8 py-3 border border-sage-light/50 text-sage-light text-sm tracking-wide hover:bg-sage-light hover:text-sage-dark hover:border-sage-light transition-all duration-300 rounded-sm"
          >
            <Phone className="w-4 h-4" strokeWidth={1.5} />
            +36 30 876 0332
          </a>
        </div>
      </section>

      <Lablec compact />
    </div>
  )
}
