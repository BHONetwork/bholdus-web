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
  containerClass = "bg-default",
  mainClass = "",
  sectionClass = "",
  transparentNavbar = false,
}) => {
  const { subnav, navbar, footer, notificationBanner, announcement } = global;

  const [bannerIsShown, setBannerIsShown] = useState(true);
  const [announcementIsShown, setAnnouncementIsShown] = useState(true);
  return (
    <div
      className={classNames(
        "flex flex-col justify-between min-h-screen overflow-hidden position-relative",
        containerClass
      )}
    >
      <header className="flex flex-col">
        {notificationBanner?.enable && bannerIsShown && (
          <NotificationBanner
            data={notificationBanner}
            closeSelf={() => setBannerIsShown(false)}
          />
        )}
        <div className="relative">
          <Navbar
            navbar={navbar}
            subnav={subnav}
            transparent={transparentNavbar}
            showAnnouncement={(show) => setAnnouncementIsShown(show)}
          />
        </div>
      </header>

      <main className={classNames("page-min-h", mainClass)}>
        <Hero />

        <div className={classNames("main-container", sectionClass)}>
          {children}
        </div>
      </main>

      <Footer footer={footer} />
      <Announcement data={announcement} show={announcementIsShown} />
    </div>
  );
};

export default Layout;
