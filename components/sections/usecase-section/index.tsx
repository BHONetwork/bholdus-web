import Section from "../sections";
import UsecaseCard from "./usecase-card";

const UsecaseSection = ({ data }) => {
  return (
    <Section
      className="mt-20 lg:mt-80"
      smallTitle={data.smallTitle}
      title={data.title}
    >
      <div className="lg:grid lg:grid-cols-2 lg:gap-6 flex flex-col lg:space-y-0 space-y-10">
        {data.useCases.map((usecase: any) => (
          <UsecaseCard key={usecase.id} data={usecase} />
        ))}
      </div>
    </Section>
  );
};

export default UsecaseSection;
