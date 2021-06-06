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
      <div className="flex flex-col">
        {notificationBanner && notificationBanner.enable && bannerIsShown && (
          <NotificationBanner
            data={notificationBanner}
            closeSelf={() => setBannerIsShown(false)}
          />
        )}
        <div className="relative">
          <Navbar navbar={navbar} supportedLocales={supportedLocales} />
        </div>
      </div>

      <div className="relative z-2 pt-40 bg-hero bg-cover xl:bg-contain xl:bg-repeat-round min-h-screen">
        <Hero />
      </div>

      <div className={classNames("container", className)}>{children}</div>

      <Footer footer={footer} displayBackground={displayFooterBackground}>
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
          className="mt-20 lg:mt-80 items-center"
          smallTitle={t("common:contactUs")}
          title={t("common:getInTouch")}
        >
          <div
            className="w-full"
            style={{ maxWidth: 540 }}
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
          >
            <GetInTouchForm />
          </div>
        </Section>
      </Footer>
    </div>
  );
};

export default Layout;
