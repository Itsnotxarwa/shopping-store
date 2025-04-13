import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartPlus } from '@fortawesome/free-solid-svg-icons';

const ProductItem = (props) => {
    const navigateToCart = useNavigate();

    const handleGoToCart = () => {
      navigateToCart("/cart")
    }

    const [hovered, setHovered] = useState(false);
    const [btnHovered, setBtnHovered] = useState(false);

    const [loveToolTip, setLoveToolTip] = useState(false);

    const [cartToolTip, setCartToolTip] = useState(false);

  return (
    <div className='product-item' 
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
        <div className="image-wrapper">
        <img className={`blur-image ${hovered ? 'show' : ''}`} height={269} src={props.img} alt="" />
        <img className={`main-image ${hovered ? 'scale' : ''}`} height={269}  src={props.img} alt="" />

        <div className="image-tools">

            
            <button className={`love-btn ${hovered ? 'appear' : ""} ${btnHovered ? 'btn-hovered' : ''}`}
            onMouseEnter={() => {
                setBtnHovered(true); 
                setLoveToolTip(true);
            }}
            onMouseLeave={() => {
                setBtnHovered(false)
                setLoveToolTip(false)
            }}
            >
                <FontAwesomeIcon icon={faHeart} className='love-icon' />
            </button>
            {/* Tooltip */}
            {loveToolTip && (
                <div className="love-tooltip">
                <p>Add to wishlist</p>
                </div>
        )}
        <FontAwesomeIcon 
        icon={faCartPlus} 
        className={`see-options ${hovered ? 'show' : ''} ${props.cartPlusNone[props.productKey] ? 'cartPlus-none' : ''}`}
        onMouseEnter={() => setCartToolTip(true)} 
        onMouseLeave={() => setCartToolTip(false)}
        onClick={props.onAddToCart}
        />
        {/*cart tooltip*/}
        {cartToolTip && (<div className="cart-tooltip">
          Add to Cart
        </div>)}
        </div>
        
        <div
        className={`preview-view-cart 
          ${props.cartPlusNone[props.productKey] ? (hovered ? 'preview-view-cart-hovered' : '') : ''
        }`}>
          <button className="cartplus-view-cart" onClick={handleGoToCart}>View Cart &#8594;</button>
          <button className="cartplus-preview"  onClick={props.onPreview}>Preview</button>
          
          </div>

        <button className={`explore-btn ${hovered ? 'explore-btn-hovered' : ''} ${props.cartPlusNone[props.productKey] ? 'explore-btn-none' : ''}`}
        onClick={props.onPreview}>
        Preview
        </button>
        
        
        </div>
      <div className={`details ${hovered ? 'move' : ''}`}>
        <h3>{props.name}</h3>
        <p>{props.price.toFixed(2)} DA</p>
      </div>
    </div>
  )
}


export default ProductItem
