import dynamic from "next/dynamic";

const ShareSocials = dynamic(() => import("./no-ssr-share-socials"), {
  ssr: false,
});

export default ShareSocials;
