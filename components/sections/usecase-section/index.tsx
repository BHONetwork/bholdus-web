import Section from "../sections";
import UsecaseCard from "./usecase-card";

const UsecaseSection = ({ data }) => {
  return (
    <Section
      id="usecases"
      className="mt-20 lg:mt-40 scroll-margin-top"
      smallTitle={data.smallTitle}
      title={data.title}
    >
      <div className="md:grid md:grid-cols-2 md:gap-6 flex flex-col md:space-y-0 space-y-10">
        {data.useCases.map((usecase: any, index: number) => (
          <UsecaseCard key={usecase.id} data={usecase} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default UsecaseSection;
