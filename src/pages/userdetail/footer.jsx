import React from 'react'
import "./index.scss"
export default function Footer() {
  return (
    <footer>
        <div className="footer-content">
          <div className="subscribe">
            <h3>Subscribe</h3>
            <p>Get 10% off your first order</p>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="support">
            <h3>Support</h3>
            <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh</p>
            <p>Email: exclusive@gmail.com</p>
            <p>Phone: +88015-88888-9999</p>
          </div>
          <div className="account">
            <h3>Account</h3>
            <ul>
              <li>
                <a href="#">My Account</a>
              </li>
              <li>
                <a href="#">Login / Register</a>
              </li>
              <li>
                <a href="#">Cart</a>
              </li>
              <li>
                <a href="#">Wishlist</a>
              </li>
            </ul>
          </div>
          <div className="quick-links">
            <h3>Quick Link</h3>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms Of Use</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="download-app">
            <h3>Download App</h3>
            <p>Save $3 with App New User Only</p>
            <div className="app-links">
              <a href="https://play.google.com/store/apps">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                />
              </a>
              <a href="https://www.apple.com/app-store/">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                />
              </a>
            </div>
            <div className="social-links">
              <a href="https://www.facebook.com">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  width={30}
                />
              </a>
              <a href="https://www.twitter.com">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg"
                  alt="Twitter"
                  width={30}
                />
              </a>
              <a href="https://www.instagram.com">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                  alt="Instagram"
                  width={30}
                />
              </a>
              <a href="https://www.linkedin.com">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg"
                  alt="LinkedIn"
                  width={30}
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
  )
}
