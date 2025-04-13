import React, {useState} from 'react'

const PopupWindow = ({ productItem, onClose, onAddToCart }) => {
  const SizeOne = [36, 38, 30, 40, 41, 42];
  const [showSizeOne, setShowSizeOne] = useState(false);

  const SizeTwo = ['xs','s', 'm', 'l', 'xl', 'xxl']
  const [showSizeTwo, setShowSizeTwo] = useState(false);

  const [selectedSize, setSelectedSize] = useState(null)

  const [selectedColor, setSelectedColor] = useState('')
  
    if (!productItem) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
         {/* Close Button */}
         <button className="close-btn" onClick={onClose}>X</button>
      <div className="popup-window" onClick={(e) => e.stopPropagation()}>
        {/* Product Image */}
        <div className="popup-image">
          <img src={productItem.url} alt={productItem.name} />
        </div>
        {/* Product Details */}
        <div className="popup-content">
          <div className="light-box">
            <h2>{productItem.name}</h2>
            <div className="popup-price">{productItem.price.toFixed(2)} DA</div>

            <div className="popup-details">
              <p>Available Sizes:</p>
              <p>Size 1 ({SizeOne.join(" - ")})</p>
              <p>Size 2 ({SizeTwo.join(" - ")})</p>
              <p>
                يرجى التأكد من قياساتكم بدقة قبل تأكيد الطلبية، الاستبدال والاسترجاع
                متاحان فقط في حال كان الخطأ من طرفنا
                <br />
                شكرا لتفهمكم ❤️🫶🏻
              </p>
            </div>

            {/* Color & Size Selection Form */}
            <form>
              <p>Colors: {selectedColor}</p>
              <div className="colors-container">
              <span 
              className={`color-option ${selectedColor === 'pink' ? 'selected' : ''}`} 
              style={{ backgroundColor: "pink" }}
              onClick={() => setSelectedColor('pink')}
              ></span>
              <span 
              className={`color-option ${selectedColor === 'purple' ? 'selected' : ''}`} 
              style={{ backgroundColor: "purple" }}
              onClick={() => setSelectedColor('purple')}
              ></span>
              </div>
              <p>Size: {selectedSize}</p>

              <div className="size-container">
              <span className="size-option" onClick={() => setShowSizeOne(!showSizeOne)}>Size 1</span>
              {showSizeOne && (
                <div className="size-dropdown">
                  {SizeOne.map((size, index) => (
                    <button 
                    key={index}
                    type='button'
                    className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSize(size)
                    }}
                    >
                      {size}
                      </button>
                    ))}
                    </div>
                  )}
              </div>

              <div className="size-container">
              <span className="size-option" onClick={() => setShowSizeTwo(!showSizeTwo)}>Size 2</span>
              {showSizeTwo && (
                <div className="size-dropdown">
                  {SizeTwo.map((size, index) => (
                    <button 
                    key={index}
                    type='button'
                    className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSize(size);
                    }}
                    >
                      {size}
                      </button>
                    ))}
                    </div>
                  )}
              </div>

            </form>
            <button className='add-to-cart' onClick={() => onAddToCart(productItem)}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupWindow

