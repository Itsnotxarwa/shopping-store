import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons' 
const SecNav = ({ cartItems, onRemoveItem, activeLink, setActiveLink, handleCategoryClick }) => {

    const handleClick = (link) => {
      setActiveLink(link);
    };
    
    const [showTooltip, setShowTooltip] = useState(false);
    const location = useLocation();

    const shouldShowTooltip = location.pathname === "/";

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    const navigate = useNavigate();
    const handleNavigateToCart = () => {
        setShowTooltip(false);
        navigate("/Cart")
    }

    const navigateHome = useNavigate();
    const handleNavigateHome = () => {
        navigateHome("/")
    }
  
  return (
<nav className="navbar">

        <div className="nav-links">
            <button 
            className={activeLink === "Home" ? "active" : ""}
             onClick={() => {handleClick("Home")
                handleNavigateHome()
                handleCategoryClick('all')
             }} >
                Home
             </button>
            <button
            className={activeLink === "Bookmarks" ? "active" : ""}
            onClick={() => {handleClick("Bookmarks")
                handleCategoryClick('Bookmarks')
            }}>
                Bookmarks
            </button>
            <button 
             className={activeLink === "Bags" ? "active" : ""}
             onClick={() => {handleClick("Bags")
                handleCategoryClick('Bags')
             }}>
                Bags
                </button>
            <button 
             className={activeLink === "Keychain" ? "active" : ""}
             onClick={() => {handleClick("keychain")
                handleCategoryClick('Keychain')
             }}>
                keychain
            </button>
            <button 
             className={activeLink === "Croptop" ? "active" : ""}
             onClick={() => {handleClick("Croptop")
                handleCategoryClick('Croptop')
             }}>
                Croptop
            </button>
        </div>
        
        <div className="cart-btn">
            <button 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
                CART/{cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)} DA
                <FontAwesomeIcon icon={faCartShopping} />
                {/* Cart Badge */}
            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
            </button>
        </div>
        {/* Tooltip */}
        {shouldShowTooltip && showTooltip && (
            <div className='btn-tooltip'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
                {cartItems.length === 0 ? (
                    <div className='empty-cart-tooltip'>
                    <FontAwesomeIcon icon={faBagShopping} className='shopping-bag' />
                    <p>Your cart is empty.</p>
                    </div>
                    ) : (
                    <>
                    <ul onClick={(e) => e.stopPropagation()}>
                        {cartItems.map((item, index) => (
                            <li key={index} className='added-to-cart'>
                                <div className="tooltip-product-details">
                                    <img className='tooltip-img' src={item.url} alt={item.name} />
                                    <div className="tooltip-img-details">
                                        <div>
                                        {item.name} - {item.price.toFixed(2)} DA
                                        </div>
                                    <div>
                                    <button className="remove-item" onClick={() => onRemoveItem(item)}>x</button>
                                    </div>
                                    </div>
                                </div>
                            </li>
                            ))}
                    </ul>
                    <div className="ordering-details">
                        <div className="price-details">
                        <p style={{color: "black "}}>Total: {cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)} DA</p>
                        </div>
                        
                        <button className="view-cart" onClick={handleNavigateToCart}>View Cart</button>
                    </div>
                    </>
            )}
        </div>)}
</nav>    
)
}

export default SecNav
