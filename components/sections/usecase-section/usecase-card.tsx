import OptimizedImage from "../../common/optimized-image";

const UsecaseCard = ({ data, index }) => {
  const data_aos = index % 2 === 0 ? "fade-right" : "fade-left";
  return (
    <div
      key={data.id}
      className="usecases-card"
      data-aos={data_aos}
      data-aos-delay={200}
      data-aos-easing="ease-in-sine"
    >
      <OptimizedImage
        img={data.image}
        className="usecases-icon"
        width={150}
        height={150}
      />
      <div className="usecases-content">
        <h4 className="usecases-title">{data.title}</h4>
        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default UsecaseCard;
