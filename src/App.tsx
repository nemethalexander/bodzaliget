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

function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigacio />
      <main>
        <HosCsuszka />
        <Elvalaszto />
        <Rolunk />
        <Elvalaszto />
        <Termekek />
        <Nyitvatartas />
        <Elvalaszto />
        <KertiNaplo />
        <Kapcsolat />
      </main>
      <Lablec />
      <SutiSzalag />
    </div>
  )
}

export default App
