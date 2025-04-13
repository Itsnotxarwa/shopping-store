import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import wilayas from './WilayasDropdown';
import communes from './Commune';

const Order = () => {
  const location = useLocation();
  const {cartItems, quantities} = location.state || {
    cartItems: [], quantities: {}
  }

  const getTotal = () => {
    return cartItems.reduce((sum, item, index) => {
      const quantity = quantities[index] || 1;
      return sum + item.price * quantity;
    }, 0);
  };

  console.log(getTotal())

  const [selectedWilaya, setSelectedWilaya] = useState("");

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }


  return (
    <form className='order-form' action="">
        <div className="order-container">
                
                <div className="customer-details">
                <h3>billing details</h3>
                <label for="name">Nom et prénom - الاسم واللقب </label>
                <input type="text" id="name" name="name" required />

                <label for="country">Pays - البلد </label>
                <strong>Algeria</strong>
                <input type="text" hidden />

                <label for="city">Wilaya - ولاية</label>
                <select 
                name="Wilayas" 
                id="Wilayas" 
                required
                onChange={(e) => {
                  const selected = e.target.value;
                  console.log("selected Wilaya", selected);
                  setSelectedWilaya(selected)
                }}
                >
                    {wilayas.map((wilaya, index) =>
                    <option key={index} value={wilaya}>
                        {index + 1} - {wilaya}
                    </option>
                    )}
                </select>

                <label for="Town">Commune - بلدية</label>
                <select name="Town" id="Town" required>
                  {console.log(communes[selectedWilaya])}
                  {communes[selectedWilaya]?.map((commune, index) => (
                    <option key={index} value={commune}>
                      {commune}
                    </option>
                  ))}

                </select>

                <label for="address">Adresse complète - العنوان الكامل </label>
                <input type="text" id="address" name="address" required />

                <label for="mobile">Téléphone 1 - 1 رقم الهاتف </label>
                <input type="text" id="mobile" name="mobile" required />

                <label for="email">E-mail - البريد الالكتروني </label>
                <input type="text" id="email" name="email" required />

                <label for="mobile">Téléphone 2 - 2 رقم الهاتف </label>
                <input type="text" id="mobile" name="mobile" required />

                <input type="text" placeholder='instagram - الانستقرام' />
                </div>

                <div className="checkout-container">
                  <div className="checkout-form">
                    <h3>Your Order</h3>
                    <div className="checkout-review">
                      <table>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item, index) => 
                          <tr key={index}>
                          <td>{item.name} × {quantities[index] || 1} </td>
                          <td>{(item.price * (quantities[index] || 1)).toFixed(2)} DA</td>
                        </tr>
                          )}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td>Total</td>
                            <td>{getTotal().toFixed(2)} DA</td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <ul>
                                <li>
                                  <input type="radio" name="delivery" id="homeDelivery" />
                                  <label htmlFor="">Livraison à domicile ZR Express - توصيل الى باب المنزل </label>
                                </li>
                                <li>
                                  <input type="radio" name="delivery" id="stopDesk" />
                                  <label htmlFor="">Stop desk ZR Express - مكتب </label>
                                </li>
                              </ul>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  <div className="btn-final-confirm">
                  <button className="valider-commande final-confirm">Confirm the order</button>

                  <button className='order-backBtn-ss' onClick={goBack}> &#8592; Return to the shop</button>
                  </div>
                  
                </div>
    
        </div>
        <button className='cart-back-btn cart-backBtn-none' onClick={goBack}> &#8592; Return to the shop</button>

    </form>
  )
}

export default Order
