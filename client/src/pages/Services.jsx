import React,{useEffect} from 'react'
import Header from '../components/Home/Header'
import Service from '../components/Home/Service'
import Footer from '../components/Home/Footer'

function Services() {
  useEffect(() => {
  
    window.scrollTo(0, 0);

  
  }, [])
  return (
    <>
     <Header isButton={1}/>
    <Service/>
    <Footer/>
    
    </>
  )
}

export default Services