import Text from "../common/text";

const Section = ({ id = "", smallTitle, title, children, style = {} }) => {
  return (
    <section id={id} style={{ ...style }}>
      <Text
        type="h3"
        css={{
          color: "$lightGrey",
          fontWeight: "$bold",
          fontSize: "$small",
        }}
        uppercase
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="500"
      >
        {smallTitle}
      </Text>
      <Text
        className="mb-8 lg:mb-16"
        type="h2"
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="500"
      >
        {title}
      </Text>
      {children}
    </section>
  );
};

export default Section;
