import { useState } from 'react'
import Navigacio from './components/Navigacio'
import HosCsuszka from './components/HosCsuszka'
import Rolunk from './components/Rolunk'
import Termekek from './components/Termekek'
import KertiNaplo from './components/KertiNaplo'
import Nyitvatartas from './components/Nyitvatartas'
import Kapcsolat from './components/Kapcsolat'
import Lablec from './components/Lablec'
import SutiSzalag from './components/SutiSzalag'
import Elvalaszto from './components/Elvalaszto'
import RolunkOldal from './components/RolunkOldal'
import TermekekOldal from './components/TermekekOldal'
import FelGomb from './components/FelGomb'

type Oldal = 'fooldal' | 'rolunk' | 'termekek'

function App() {
  const [oldal, setOldal] = useState<Oldal>('fooldal')
  const [aktívKategoria, setAktívKategoria] = useState<string | undefined>()

  if (oldal === 'rolunk') {
    return (
      <>
        <RolunkOldal onVissza={() => setOldal('fooldal')} />
        <SutiSzalag />
        <FelGomb />
      </>
    )
  }

  if (oldal === 'termekek') {
    return (
      <>
        <TermekekOldal onVissza={() => setOldal('fooldal')} aktívKategoria={aktívKategoria} />
        <SutiSzalag />
        <FelGomb />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navigacio />
      <main>
        <HosCsuszka />
        <Elvalaszto />
        <Rolunk onRolunkMegnyit={() => setOldal('rolunk')} />
        <Elvalaszto />
        <Termekek onTermekMegnyit={(id) => { setAktívKategoria(id); setOldal('termekek') }} />
        <Nyitvatartas />
        <Elvalaszto />
        <KertiNaplo />
        <Kapcsolat />
      </main>
      <Lablec />
      <SutiSzalag />
      <FelGomb />
    </div>
  )
}

export default App
