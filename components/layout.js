import { useState } from "react";

import Navbar from "./elements/navbar";
import Footer from "./elements/footer";
import NotificationBanner from "./elements/notification-banner";

const Layout = ({ children, global }) => {
  const { navbar, footer, notificationBanner } = global;

  const [bannerIsShown, setBannerIsShown] = useState(true);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex-1">
        {notificationBanner && notificationBanner.enable && bannerIsShown && (
          <NotificationBanner
            data={notificationBanner}
            closeSelf={() => setBannerIsShown(false)}
          />
        )}
        <Navbar navbar={navbar} />
        <div>{children}</div>
      </div>
      <Footer footer={footer} />
    </div>
  );
};

export default Layout;
