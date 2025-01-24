import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UseCategories from '../../Hooks/UseCategories';
import CartComponent from '../Carrito/CartComponent';
import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import './Navbar.css';

const Navbar = ({ forceUpdate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const { categories, loading, error, reloadCategories } = UseCategories()

  useEffect(() => {
    reloadCategories()
  }, [forceUpdate])

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu))
  }

  if (error) return <div>{error}</div>

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <Link to="/" className="logo">
          <h1>Mi tienda</h1>
        </Link>
        <button className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
        <li><Link to="/products" onClick={() => setIsMenuOpen(false)}>Productos</Link></li>
        <li className="dropdown">
          <h4 onClick={() => toggleDropdown('categorias')}>Categorías</h4>
          <ul className={`dropdown-menu ${openDropdown === 'categorias' ? 'open' : ''}`}>
            {loading 
            ? <li>Cargando categorías...</li>
            : categories.length === 0 ? <li>No hay categorías</li> 
            : (
              categories.map((category) => (
                <li key={category}>
                  <Link to={`/category/${category}`} onClick={() => setIsMenuOpen(false)}>
                    {category}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </li>
        <li className="dropdown">
          <CartComponent openDropdown={openDropdown} toggleDropdown={toggleDropdown} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
