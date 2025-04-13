import React, {useState} from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import NavBar from './NavBar';
import SecNav from './SecNav';
import TopBar from './TopBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Header = ({setMenuOpen, cartItems, onRemoveItem, activeLink, setActiveLink, handleCategoryClick}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltipSs, setShowTooltipSs] = useState(false);

  const navigate = useNavigate();

  const handleViewCart = () => {
    setShowTooltipSs(false); 
    navigate("/cart"); 
  };

  const location = useLocation();

    const shouldShowTooltip = location.pathname === "/";

  return (
      <header>
      <TopBar />
      <div className="small-screen-navbar">

      <button className="menu-btn" onClick={() => {
        setIsOpen(!isOpen);
        setMenuOpen(!isOpen);
        }}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      <Link to='/'>
      <img  src="images/logo.jpg" alt="Merve's Crochet" className='logo-ss' style={{ width: "94px" }} />
      </Link>

        <button className='cart-shopping-s' onClick={() => setShowTooltipSs(true)}>
        <FontAwesomeIcon icon={faCartShopping} />
        {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
        </button>

        {shouldShowTooltip && showTooltipSs && (
          <div className='added-to-cart-small-screen' onClick={() => setShowTooltipSs(false)}>
            <div className="close-cart">X</div>
            <div className="tooltip-heading">
            <h3>CART</h3>
            <div className="divider"></div>
            </div>
          <ul onClick={(e) => e.stopPropagation()}>
          {cartItems.map((item, index) => (
              <li key={index} className='added-items'>
                  <div className="tooltip-product-details">
                      <img className='tooltip-img' src={item.url} alt={item.name} />
                      <div className="tooltip-img-details">
                        <div>
                        {item.name} - {item.price.toFixed(2)} DA
                        </div>
                        <div>
                        <button className="remove-item-s" onClick={() => onRemoveItem(item)}>x</button>
                        </div>
                      </div>
                  </div>
              </li>
              ))}
      </ul>
      <div className="cart-details">
        <div className="price-details-s">
        <p style={{color: "black "}}>
        Total: <span> {cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)} DA </span> 
      </p>
        </div>
      
      <button className="order-btn-s">Order</button>
      <button className="view-cart-s" onClick={handleViewCart} >View Cart</button>
      </div>
      </div>
      )}
      
      </div>
      
      <div className={`navbar-container-s ${isOpen ? "open" : ""}`}>
      <button className="close-btn-s" onClick={() => {
        setIsOpen(false)
        setMenuOpen(false)
        }}>✖</button>
      <NavBar />
      <SecNav  
      cartItems={cartItems} 
      onRemoveItem={onRemoveItem} 
      activeLink={activeLink} 
      setActiveLink={setActiveLink}
      handleCategoryClick={handleCategoryClick} />
      </div>
    </header>
  )
}

export default Header
