import React, {useState} from "react";
import { Routes, Route } from "react-router-dom"; 
import Header from "./Header";
import Footer from "./Footer";
import ProductItem from "./ProductItem";
import products from "./product";
import PopupWindow from "./PopupWindow";
import Cart from "./Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Order from "./Order";

function App() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const handlePreviewClick = (productItem) => {
    setSelectedProduct(productItem);
    setPopupVisible(true);
  };

  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false)
  const [chosenProduct, setChosenProduct] = useState(null)
  const [cartPlusNone, setCartPlusNone] = useState({})

  const handleAddToCart = (productItem) => {
    const productKey = productItem.key
    setCartItems((prevCart) => [...prevCart, productItem]); // Add product to cart
    setAddedToCart(true); //show success message
    setPopupVisible(false); //hide the popup if it was opened
    setChosenProduct(productItem.name)
    setCartPlusNone((prevState) => ({
      ...prevState, 
      [productKey]: true
    }))
    
    console.log(productItem)
    console.log(productItem.key)

     // Hide success message after 3 seconds
     setTimeout(() => {
      setAddedToCart(false);
    }, 3000);

  };

  const removeItem = (productItem) => {
    const productKey = productItem.key

    setCartItems((prevCart) => prevCart.filter((item) => item !== productItem));
    setCartPlusNone((prevState) => ({
      ...prevState, 
      [productKey]: false
    }))
};

const [activeLink, setActiveLink] = useState('Home');

const [selectedCategory, setSelectedCategory] = useState('all');

const handleCategoryClick = (category) => {
  setSelectedCategory(category);
};

const filteredProducts = selectedCategory === 'all'
  ? products
  : products.filter(product => product.category === selectedCategory);


  return (
    <div className="box">

      <Header 
      setMenuOpen={setMenuOpen} 
      cartItems={cartItems} 
      onRemoveItem={removeItem} 
      activeLink={activeLink} 
      setActiveLink={setActiveLink}
      handleCategoryClick={handleCategoryClick} />
      
      {addedToCart && (
        <div className="cart-success-message">
          <div className="check-icon">
          <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className="check-msg">
          {chosenProduct} added successfully! 
          </div>
          </div>
        )}
       
        
        

      <main className={`main-container ${menuOpen ? "blurred" : ""}`}>

        <Routes>

        <Route path="/" element= 
        { <>
          {filteredProducts.map(productItem => (
          <ProductItem 
          key={productItem.key} 
          productKey={productItem.key}
          name={productItem.name} 
          price={productItem.price} 
          img={productItem.url} 
          onPreview={() => handlePreviewClick(productItem)}
          onAddToCart={() => handleAddToCart(productItem)}
          cartPlusNone={cartPlusNone}
          />
        )
        )} 
        {popupVisible && (
        <PopupWindow
          productItem={selectedProduct}
          onClose={() => setPopupVisible(false)}
          onAddToCart={handleAddToCart}
        />
      )}
      </> } />
                  
      <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveItem={removeItem} />} /> 

      <Route path="/Order" element={<Order />} />

      </Routes>

      </main>
      
      <Footer />
    </div>
  );
}

export default App;
