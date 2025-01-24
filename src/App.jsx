import React from "react"
import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import "./App.css"
import Navbar from "./Components/Navbar/Navbar.jsx"
import { CategoryScreen, CreateScreen, DetailScreen, Home, AllProductsScreen } from "./Screens/index.js"
import Footer from "./Components/Footer/Footer.jsx"

const App = () => {

  const [ forceUpdate, setForceUpdate ] = useState(false)

  return (
    <>
      <Navbar setForceUpdate={setForceUpdate} forceUpdate={forceUpdate}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProductsScreen />}/>
				<Route path="/product/:product_id" element={<DetailScreen/>}/>
        <Route path="/category/:category" element={<CategoryScreen/>}/>
        <Route path="*" element={<Home />} />
        <Route path="/create" element={<CreateScreen setForceUpdate={setForceUpdate}/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App