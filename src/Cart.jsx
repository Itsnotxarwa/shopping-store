import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";


const Cart = ({cartItems, onRemoveItem}) => {
  const backToHome = useNavigate();
  const handleBackToHome = (e) => {
    e.preventDefault();
    backToHome("/");
  }
  const goOrder = useNavigate();
  const handleGoOrder = (e) => {
    e.preventDefault();
    goOrder("/Order", {
      state: {
        cartItems,
        quantities
      }
    })
  }

  const [quantities, setquantity] = useState({});
  const increaseQuantity = (index) => {
    setquantity(prevQuantities => ({
      ...prevQuantities,
      [index]: (prevQuantities[index] || 0) + 1
    }));
  };
  
  const decreaseQuantity = (index) => {
    setquantity(prevQuantities => ({
      ...prevQuantities,
      [index]: prevQuantities[index] > 1 ? prevQuantities[index] - 1 : 1
    }));
  }

  const getTotal = () => {
    return cartItems.reduce((sum, item, index) => {
      const quantity = quantities[index] || 1;
      return sum + item.price * quantity;
    }, 0);
  };

  return (
    <div className="cart-container">
      { cartItems.length === 0 ? (
        <div className="cart-empty">
        <p>Your cart is empty.</p>
        <button className='cart-back-btn' onClick={handleBackToHome}> &#8592; Return to the shop</button>
        </div>
      ) : (
        <>
        <form action="">
          <div className="cart-product-wrapper">
            <table className='cart-table'>
              <thead>
                <tr>
                <th></th>
                <th className='product-name'>
                  Product
                </th>
                <th className="product-price">
                  Price
                </th>
                <th className="product-quantity">
                  Quantity
                </th>
                <th className="product-total">
                  Total
                </th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item, index) => (
              
                  <tr key={index}>
                  <td className='productremove-btn'><button className='product-remove' 
                  onClick={(e) => {
                    e.preventDefault();
                    onRemoveItem(item);
                    }}>x</button></td>
                  <td className="product-img-cart">
                    <img src={item.url} alt={item.name} />
                    <p>{item.name}</p>
                  </td>
                  <td className="product-price">{item.price.toFixed(2)}DA </td>
                  <td className="product-quantity">
                  <div className="quantity-container">
                    <input className='btn-minus' type='button' value='-' onClick={() => decreaseQuantity(index)} />
                    <input className='quantity-input' type="number" value={quantities[index] || 1} readOnly />
                    <input className='btn-add' type='button' value='+' onClick={() => increaseQuantity(index)} />
                  </div>
                  </td>
                  <td className='product-total'>{(item.price * (quantities[item.index] || 1)).toFixed(2)} DA</td>
                </tr>
                  
                ))}
              </tbody>
            </table>

            <div className="divider"></div>
            
            <div className="cart-total">
              <table>
                <thead>
                  <tr>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {getTotal().toFixed(2)} DA
                    </td>
                  </tr>
                </tbody>
              </table>

              <button className="valider-commande cart-confirm-btn" onClick={handleGoOrder}>Confirm the order</button>

              <button className='cart-backBtn-ss' onClick={handleBackToHome}> &#8592; Return to the shop</button>

              
            </div>

          </div>
            <button className='cart-back-btn cart-backBtn-none' onClick={handleBackToHome}> &#8592; Return to the shop</button>
          </form>
          </>
  )}
  
  </div>
  )}

export default Cart
