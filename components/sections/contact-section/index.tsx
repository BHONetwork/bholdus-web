import ContactFrom from "./get-in-touch-form";
// import TelegramIcon from "./telegram.svg";
// import InstagramIcon from "./instagram.svg";

import React from "react";
import OptimizedImage from "../../common/optimized-image";

// import FacebookIcon from "./facebook.svg";
const ContactSection = ({ data }) => {
  return (
    <section id="contact-us">
      <div className="container">
        <div className="contact-us">
          <div className="contact-left">
            <div className="title-section">
              {data?.smallTitle && data.smallTitle !== " " ? (
                <p className="title-top-section">{data.smallTitle}</p>
              ) : null}
              <p className="title-bot-section">{data.title}</p>
            </div>
            <p className="desc-contact">{data.description}</p>
            <div className="contact-right pc-hidden-mobile-show">
              <div className="wrap-content">
                <div className="dot-azalea">
                  <img src="images/img-dot-contact.webp" alt="dot-azalea" />
                </div>
                <div className="elip-big rotate"></div>
                <div className="elaip-small rotate45"></div>
                <div className="our-community">
                  <p className="title-community title-small">BHOLDUS</p>
                  <div className="wrap-social">
                    <a href="#" className="social-item">
                      <OptimizedImage
                        img={{
                          url: "/images/f-facebook.svg",
                          alternativeText: "facebook",
                        }}
                        lazy={false}
                      />
                    </a>
                    <a href="#" className="social-item">
                      <OptimizedImage
                        img={{
                          url: "/images/f-instagram.svg",
                          alternativeText: "facebook",
                        }}
                        lazy={false}
                      />
                    </a>
                    <a href="#" className="social-item">
                      <OptimizedImage
                        img={{
                          url: "/images/f-telegram.svg",
                          alternativeText: "facebook",
                        }}
                        lazy={false}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <ContactFrom className="wrap-form-contact" />
          </div>
          <div className="contact-right pc-show-mobile-hideen">
            <div className="wrap-content">
              <div className="dot-azalea">
                <OptimizedImage
                  img={{
                    url: "images/img-dot-contact.webp",
                    alternativeText: "facebook",
                  }}
                  lazy={false}
                />
              </div>
              <div className="elip-big rotate"></div>
              <div className="elaip-small rotate45"></div>
              <div className="our-community">
                <p className="title-community title-small">BHOLDUS</p>
                <div className="wrap-social">
                  <a href="#" className="social-item">
                    <OptimizedImage
                      img={{
                        url: "/images/f-facebook.svg",
                        alternativeText: "facebook",
                      }}
                      lazy={false}
                    />
                  </a>
                  <a href="#" className="social-item">
                    <OptimizedImage
                      img={{
                        url: "/images/f-instagram.svg",
                        alternativeText: "facebook",
                      }}
                      lazy={false}
                    />
                  </a>
                  <a href="#" className="social-item">
                    <OptimizedImage
                      img={{
                        url: "/images/f-telegram.svg",
                        alternativeText: "facebook",
                      }}
                      lazy={false}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
