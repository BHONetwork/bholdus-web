import { useState } from "react";
import classNames from "classnames";
import useTranslation from "next-translate/useTranslation";

import Navbar from "./elements/navbar";
import Footer from "./elements/footer";
import NotificationBanner from "./elements/notification-banner";
import GetInTouchForm from "./sections/get-in-touch-form";
import Section from "./sections/sections";

const Layout = ({
  Hero,
  children,
  global,
  className = "",
  transparentNavbar = false,
  displayPageBackground = false,
  displayFooterBackground = true,
}) => {
  const { navbar, footer, notificationBanner, supportedLocales } = global;

  const [bannerIsShown, setBannerIsShown] = useState(true);

  const { t } = useTranslation();

  return (
    <div
      className={classNames(
        "flex flex-col justify-between min-h-screen overflow-hidden",
        {
          "bg-default md:bg-cover bg-contain": displayPageBackground,
        }
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
            supportedLocales={supportedLocales}
            transparent={transparentNavbar}
          />
        </div>
      </header>

      <main className="page-min-h">
        <Hero />

        <div className={classNames("container", className)}>{children}</div>
      </main>

      <Footer displayBackground={displayFooterBackground} footer={footer}>
        {/* ***********
        ****************
        ****************
        ****************
        ****************
          Get in touch
        ****************
        ****************
        ****************
        ****************
        */}
        <Section
          id="contact"
          smallTitle={t("common:contactUs")}
          title={t("common:getInTouch")}
        >
          <GetInTouchForm />
        </Section>
      </Footer>
    </div>
  );
};

export default Layout;
