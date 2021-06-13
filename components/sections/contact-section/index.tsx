import ContactFrom from "./get-in-touch-form";
import Section from "../sections";
import Image from "../../common/image";

const ContactSection = ({ data }) => {
  return (
    <Section id="contact" smallTitle={data.smallTitle} title={data.title}>
      <ContactFrom className="container" />
      {data.imageBackground ? (
        <Image img={data.imageBackground} className="contact-bg" />
      ) : null}
    </Section>
  );
};

export default ContactSection;
