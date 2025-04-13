import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faClock } from '@fortawesome/free-regular-svg-icons'
import { faPhone, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const NavBar = () => {
      const [time, setTime] = useState("");
     
      useEffect(() => {
        const updateTime = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
      }, []);

  return (
    <div className='navbar-container'>
        <Link to='/'>
        <img  src="%PUBLIC_URL%/logo.png" alt="Merve's Crochet" style={{width: "94px"}} />
        </Link>

    <form className="search-container" role="search">
      <input type="search" placeholder="Search for a product" aria-label="Search" />
      <button type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: "18px" }}  />
      </button>
    </form>

    <div className="info-container">
        <ul>
            <li className="contact">
                <a href="mailto:someone@example.com">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>CONTACT</span>
                </a>
            </li>
            <li className="clock">
                <a href="#">
                    <FontAwesomeIcon icon={faClock} />
                    <span>{time}</span>
                </a>
            </li>
            <li className="phone">
                <a href="#" onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={faPhone} />
                    <span>123-456-789</span>
                </a>
            </li>
        </ul>
    </div>
    </div>
  )
}

export default NavBar
