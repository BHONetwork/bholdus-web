import { useState } from "react";
import classNames from "classnames";

import Navbar from "./elements/navbar";
import Footer from "./elements/footer";
import Announcement from "./elements/announcement";

import NotificationBanner from "./elements/notification-banner";

const Layout = ({
  Hero,
  children,
  global,
  containerClass = "page-home",
  mainClass = "",
  topicInfos = null,
  sectionClass = "",
  transparentNavbar = false,
}) => {
  const { subnav, navbar, footer, notificationBanner, announcement } = global;

  const [bannerIsShown, setBannerIsShown] = useState(true);
  const [announcementIsShown, setAnnouncementIsShown] = useState(true);
  return (
    <div id={`${containerClass}`} className={classNames(containerClass)}>
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
