import OptimizedImage from "../../common/optimized-image";
const PartnerItem = ({ data, index }) => {
    return (
        <div
            className="partner-item"
            data-aos="fade-up"
            data-aos-delay={index * 200}
        >
            <a
                style={{ textDecoration: "none" }}
                href={data.url}
                target={data.newTab ? "_blank" : "_self"}
                rel={data.newTab ? "noopener noreferrer" : ""}
                title={data.title}
            >
                <OptimizedImage
                    img={data.image}
                    layout="intrinsic"
                />
            </a>

        </div>

    );
};

export default PartnerItem;
