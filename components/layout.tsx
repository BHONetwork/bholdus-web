import { useState } from "react";
import classNames from "classnames";

import Navbar from "./elements/navbar";
import Footer from "./elements/footer";
import Announcement from "./elements/announcement";

import NotificationBanner from "./elements/notification-banner";
import { data } from "autoprefixer";

const Layout = ({
  Hero,
  children,
  global,
  containerClass = "page-home",
  mainClass = "",
  topicInfos = null,
  sectionClass = "",
  transparentNavbar = false,
  videobg = false,
}) => {
  const { subnav, navbar, footer, notificationBanner, announcement } = global;

  const [bannerIsShown, setBannerIsShown] = useState(true);
  const [announcementIsShown, setAnnouncementIsShown] = useState(true);
  return (
    <div id={`${containerClass}`} className={classNames(containerClass)}>
      {videobg && (
        <>
          <section id="main-background">
            <div className="video">
              <video
                width="1920"
                height="900"
                className="lazy"
                preload={"yes"}
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
              >
                <source
                  src="https://cdn.bholdus.com/bholdus-web/bg2_618268dd31.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <div className="video-mobi">
              <video
                width="100%"
                height="500"
                className="lazy"
                preload={"yes"}
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
              >
                <source
                  src="https://cdn.bholdus.com/bholdus-web/bgmobi2_2f635bc1e5.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <div className="gradient-bot"></div>
          </section>
          <section id="background-2">
            <div className="gradient"></div>
            <div className="img-bg"></div>
            <div className="gradient-top"></div>
            <div className="gradient-bot"></div>
          </section>
          <section id="background-3">
            <div className="gradient"></div>
            <div className="img-bg"></div>
            <div className="gradient-top"></div>
            <div className="gradient-bot"></div>
          </section>
          <section id="background-4">
            <div className="gradient"></div>
            <div className="img-bg"></div>
            <div className="gradient-top"></div>
          </section>
        </>
      )}
      <div className={classNames("wrapper", mainClass)}>
        <header className="header">
          {notificationBanner?.enable && bannerIsShown && (
            <NotificationBanner
              data={notificationBanner}
              closeSelf={() => setBannerIsShown(false)}
            />
          )}
          <Navbar
            navbar={navbar}
            transparent={transparentNavbar}
            topicInfos={topicInfos}
            showAnnouncement={(show) => setAnnouncementIsShown(show)}
          />
        </header>
        <Hero />
        {children}
        <Footer footer={footer} />
      </div>

      <Announcement data={announcement} show={announcementIsShown} />
    </div>
  );
};

export default Layout;
