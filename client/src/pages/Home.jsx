import { useEffect } from 'react'
import About from '../components/Home/About'
import Header from '../components/Home/Header'
import Welcome from '../components/Home/Welcome'
import Service from '../components/Home/Service'
import Testimonials from '../components/Home/Testimonials'
import Footer from '../components/Home/Footer'

function Home() {
  useEffect(() => {
  
    window.scrollTo(0, 0);

  
  }, [])
  return (
    <>
    <Header isButton={1}/>
    <Welcome/>
    <About/>
    <Service/>
    <Testimonials/>
    <Footer/>
    </>
  )
}

export default Home