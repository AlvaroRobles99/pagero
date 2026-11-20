import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Reviews from './components/Reviews/Reviews'
import Services from './components/Services/Services'
import Bio from './components/Bio/Bio'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import WhatsAppFab from './components/WhatsAppFab/WhatsAppFab'
import Lotus from './components/Lotus/Lotus'
import appStyles from './App.module.css'

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <About />
        <Lotus size={36} className={appStyles.dividerLotus} />
        <Reviews />
        <Lotus size={36} className={appStyles.dividerLotus} />
        <Services />
        <Lotus size={36} className={appStyles.dividerLotus} />
        <Bio />
        <Lotus size={36} className={appStyles.dividerLotus} />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
