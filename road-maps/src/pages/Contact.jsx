import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import "./contact.css";
import {
  faChevronRight,
  faClock,
  faGlobe,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import AwesomeIcon from "../components/AwesomeIcon";
function Contact() {
  return (
    <div className="contact">
      <div className="first-half">
        <Header active="contact" />
      </div>
      <div className="second-half">
        <div className="container">
          <div className="text">
            <h2>Get In Touch</h2>
            <div className="world-wise left-side">
              <FontAwesomeIcon className="left-icon" icon={faGlobe} />
              <p>
                Get in touch with us from anywhere online and we will always be
                there
              </p>
            </div>
            <div className="soon left-side">
              <FontAwesomeIcon icon={faClock} className="left-icon" />
              <p>
                we are available 24/7 and our customer service will reply to you
                as soon as Possible
              </p>
            </div>
          </div>
          <div className="boxes">
            <div className="contact-box">
              <FontAwesomeIcon className="left-icon" icon={faPhoneVolume} />
              <p>Contact With Us Through our phone numbers</p>
              <div className="bottom">
                <div className="info">
                  <span className="num-cont">
                    <div className="arrows">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="arrow"
                      />
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="chevron arrow"
                      />
                    </div>
                    <span className="number">+20123456789</span>
                  </span>
                  <span className="num-cont">
                    <div className="arrows">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="arrow"
                      />
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="chevron arrow"
                      />
                    </div>
                    <span className="number">+20198765432</span>
                  </span>
                </div>
                <img className="launch-icon" src="../../public/rocket.png" />
              </div>
            </div>
            <div className="contact-box">
              <FontAwesomeIcon className="left-icon" icon={faFacebook} />
              <p>Contact with us through social media</p>
              <ul className="social">
                <AwesomeIcon icon={faFacebook} color="#1877f2" />
                <AwesomeIcon icon={faTwitter} color="#1da1f2" />
                <AwesomeIcon icon={faLinkedin} color="#0077b5" />
                <AwesomeIcon icon={faWhatsapp} color=" #25D366" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
