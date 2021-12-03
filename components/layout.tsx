import React, { useEffect, useState } from "react";
import classNames from "classnames";

import Navbar from "./elements/navbar";
import Footer from "./elements/footer";
import Announcement from "./elements/announcement";

import NotificationBanner from "./elements/notification-banner";
import { setOpacityElement } from "../utils/hooks";
import OptimizedImage from "./common/optimized-image";
import LogoLoading from "./logo_loading.svg";
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
  const { navbar, footer, notificationBanner, announcement } = global;

  const [bannerIsShown, setBannerIsShown] = useState(true);
  const [announcementIsShown, setAnnouncementIsShown] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const body = document.querySelector("body");
      if (body) body.style.overflow = "inherit";
      setOpacityElement(".wrapper", 1);
      setOpacityElement(".logo-bholdus-loading", 0);
      setOpacityElement("#main-background .video", 1);
      setOpacityElement("#main-background .video-mobi", 1);
      // page-blog
      setOpacityElement(".page-blog .bg-blog", 1);
      setOpacityElement(".page-blog header", 1);
      setOpacityElement(".page-blog section", 1);
      setOpacityElement(".page-blog footer", 1);
      // // page-help-center
      setOpacityElement(".page-help-center .bg-help-center", 1);
      setOpacityElement(".page-help-center header", 1);
      setOpacityElement(".page-help-center section", 1);
      setOpacityElement(".page-help-center footer", 1);
    }, 1000);
    setTimeout(() => {}, 2000);
  }, []);

  return (
    <div id={`${containerClass}`} className={classNames(containerClass)}>
      <div className="logo-bholdus-loading">
        <LogoLoading />
      </div>
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
            {/* <div className="img-square"></div> */}
            <div className="gradient-bot"></div>
            {/* <div className="img-rotate">
              <div className="logo-bholdus">
                <LogoLoading />
              </div>
            </div> */}
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
