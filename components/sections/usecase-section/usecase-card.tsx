import OptimizedImage from "../../common/optimized-image";

const UsecaseCard = ({ data, index }) => {
  return (
    <div key={data.id} className="usecases-card">
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
