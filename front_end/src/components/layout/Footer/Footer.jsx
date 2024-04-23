import React from 'react'
import "./footer.css"
function Footer() {
    const playStoreIcons="https://freeiconshop.com/wp-content/uploads/edd/google-play-badge.png"
    const appStoreIcons="https://freeiconshop.com/wp-content/uploads/edd/app-store-badge.png"
  return (
    <footer id="footer">
       <div className="leftFooter">
        <h4 className="">Download Our App</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStoreIcons} alt='playStore'/>
        <img src={appStoreIcons} alt='AppStore'/>
       </div>
       <div className='midFooter'>
         <h1>Ecommerce</h1>
         <p>High Quality is our first priority</p>
         <p>Copyright 2024 &copy;  Me<span className="me"> MahtabHusain</span></p>
       </div>
       <div className='rightFooter'>
           <h4>Follow Us</h4>
           <a href='#'>GitHub</a>
           <a href='#'>Instagram</a>
           <a href='#'>Facebook</a>
       </div>
    </footer>
  )
}

export default Footer
