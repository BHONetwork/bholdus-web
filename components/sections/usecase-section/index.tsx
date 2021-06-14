import Section from "../sections";
import UsecaseCard from "./usecase-card";
import OptimizedImage from "../../common/optimized-image";
import Image from "../../common/image";

const UsecaseSection = ({ data }) => {
  return (
    <Section id="usecases" smallTitle={data.smallTitle} title={data.title}>
      <div className="container usecases-container">
        {data.useCases.map((usecase: any, index: number) => (
          <UsecaseCard key={usecase.id} data={usecase} index={index} />
        ))}
      </div>
      {data.imageBackground ? (
        <Image img={data.imageBackground} className="usecases-bg" />
      ) : null}
      <OptimizedImage
        img={{ url: "/images/cases-imgs-min.png" }}
        className="usecases-element"
      />
    </Section>
  );
};

export default UsecaseSection;
