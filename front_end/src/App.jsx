

import Header from "./components/layout/Header/Header"
import Footer from "./components/layout/Footer/Footer"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./components/Home/Home"
// import Product from "./components/Product/Product"
import About from "./components/About Us/About"
import Contact from "./components/Contact/Contact"

function App() {

  return (
    <Router>
    <Header/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route path="/product" element={<Product/>}/> */}
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/> 
        <Route path="" element={<Home/>}/>

    </Routes>
    <Footer/>
    </Router>
    
    
    
  )
}

export default App
