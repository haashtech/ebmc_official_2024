import React,{useEffect} from 'react'
import Header from '../components/Home/Header'
import Main from '../components/ContactUs/Main'
import Footer from '../components/Home/Footer'


function ContactUs() {
  useEffect(() => {
  
    window.scrollTo(0, 0);

  
  }, [])
  return (
<>
<Header isButton={1}/>
<Main/>
<Footer/>

</>
  )
}

export default ContactUs