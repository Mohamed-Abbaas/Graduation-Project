import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import AwesomeIcon from "./AwesomeIcon";
import "./footer.css";
import {
  faChevronRight,
  faClock,
  faHeart,
  faMapMarkedAlt,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="box">
          <h3>ACME</h3>
          <ul className="social">
            <AwesomeIcon icon={faFacebook} color="#1877f2" />
            <AwesomeIcon icon={faTwitter} color="#1da1f2" />
            <AwesomeIcon icon={faLinkedin} color="#0077b5" />
          </ul>
          <p>
            Our website will help you to get specified roadmap that will get you
            right to the point without any distraction or being overwhelmed
          </p>
        </div>
        <div className="box">
          <ul className="links">
            <li>
              <Link>
                <div className="arrows">
                  <FontAwesomeIcon icon={faChevronRight} className="arrow" />
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="chevron arrow"
                  />
                </div>
                Home
              </Link>
            </li>
            <li>
              <Link>
                <div className="arrows">
                  <FontAwesomeIcon icon={faChevronRight} className="arrow" />
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="chevron arrow"
                  />
                </div>
                New Letters
              </Link>
            </li>
            <li>
              <Link>
                <div className="arrows">
                  <FontAwesomeIcon icon={faChevronRight} className="arrow" />
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="chevron arrow"
                  />
                </div>
                Articles
              </Link>
            </li>
            <li>
              <Link>
                <div className="arrows">
                  <FontAwesomeIcon icon={faChevronRight} className="arrow" />
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="chevron arrow"
                  />
                </div>
                About
              </Link>
            </li>
            <li>
              <Link>
                <div className="arrows">
                  <FontAwesomeIcon icon={faChevronRight} className="arrow" />
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="chevron arrow"
                  />
                </div>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="box">
          <div className="line">
            <FontAwesomeIcon className="our-icon" icon={faMapMarkedAlt} />
            <div className="info">
              Egypt, Alexandria, you can reach us online from anywhere
            </div>
          </div>
          <div className="line">
            <FontAwesomeIcon className="our-icon" icon={faClock} />
            <div className="info">Available 24/7 will always be there</div>
          </div>
          <div className="line">
            <FontAwesomeIcon className="our-icon" icon={faPhoneVolume} />
            <div className="info">
              <span>+20123456789</span>
              <span>+20198765432</span>
            </div>
          </div>
        </div>
        <div className="box footer-gallery">
          <img src="../../public/cyber-security.jpg" />
          <img src="../../public/computer-fundamentals.jpg" />
          <img src="../../public/back-end.png" />
          <img src="../../public/front-end.jpg" />
          <img src="../../public/embedded-systems.jpg" />
          <img src="../../public/mobile.jpg" />
          <img src="../../public/fundamentals-of-programming.jpg" />
          <img src="../../public/AI.jpg" />
        </div>
      </div>
      <p className="copyright">
        Made With <FontAwesomeIcon icon={faHeart} /> By Our Team
      </p>
    </div>
  );
}

export default Footer;
