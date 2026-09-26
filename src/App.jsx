import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import Reviews from './components/Reviews/Reviews'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Lotus from './components/Lotus/Lotus'
import appStyles from './App.module.css'

export default function App() {
  return (
    <>
      <Hero />
      <About />
      <Lotus size={36} className={appStyles.dividerLotus} />
      <Services />
      <Lotus size={36} className={appStyles.dividerLotus} />
      <Reviews />
      <Lotus size={36} className={appStyles.dividerLotus} />
      <Contact />
      <Footer />
    </>
  )
}
