import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const TopBar = () => {
    const [toolTip, setToolTip] = useState("");
    const [hoveredIcon, setHoveredIcon] = useState(null);
  return (
    <div>
       <div className="header-wrapper">
        <div className="icons">
        <a href="https://www.facebook.com/mervescrochet/" 
        onMouseOver = {() => {
          setToolTip("Follow us on Facebook");
          setHoveredIcon("facebook");
        }}
        onMouseOut = {() => {
          setToolTip(""); 
          setHoveredIcon(null);
        }}
        >
        <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="https://instagram.com"
        onMouseOver = {() => {
          setToolTip("Follow us on Instagram")
          setHoveredIcon("instagram")
        }}
        onMouseOut = {() => {
          setToolTip("")
          setHoveredIcon(null)
        }}
        >
        <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="mailto:someone@example.com"
        onMouseOver = {() => {
          setToolTip("Send us an email");
          setHoveredIcon("email");
        }}
        onMouseOut = {() => {
          setToolTip("")
          setHoveredIcon(null)
        }}
        >
        <FontAwesomeIcon icon={faEnvelope} />
        </a>
        </div>
         {/* Tooltip */}
         { toolTip && (
          hoveredIcon === "facebook" ? (
          <div className="toolTip facebook">{toolTip}</div>
        ) : hoveredIcon === "instagram" ? (
        <div className="toolTip instagram">{toolTip}</div>
      ) : hoveredIcon === "email" ? (
        <div className="toolTip email">{toolTip}</div> ) : null
      ) }
      </div>
    </div>
  )
}

export default TopBar

