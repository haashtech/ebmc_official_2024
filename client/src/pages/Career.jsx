import React,{useEffect} from 'react'
import Header from '../components/Home/Header'
import Footer from '../components/Home/Footer'
import Main from '../components/Career/Main'

function Career() {
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

export default Career