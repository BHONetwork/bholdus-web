import { useState } from "react";
import { AiOutlinePlus, AiOutlineLine } from "react-icons/ai";
import classNames from "classnames";

import Section from "../sections";
import Text from "../../common/text";

const FAQItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { questionInfo, index } = props;
  const { id, question, answers } = questionInfo;

  return (
    <div
      className="faq-item"
      data-aos="fade-up"
      data-aos-delay={(index + 1) * 400}
    >
      <div
        className="faq-header"
        role="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="faq-question">
          <Text type="p" weight="bold" size="medium">
            {question}
          </Text>
        </div>
        <div
          className="accordion-icon"
          role="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <AiOutlineLine /> : <AiOutlinePlus />}
        </div>
      </div>
      <div className={classNames(["faq-answer-content", isOpen ? "open" : ""])}>
        <div className="faq-answer-list">
          {answers.map((answer, index) => (
            <Text key={`answer-of-question-${id}-${index}`} type="p">
              {answer}
            </Text>
          ))}
        </div>
      </div>
    </div>
  );
};

const FAQSection = ({ data }) => {
  return (
    <Section
      id="faq-section"
      smallTitle={data.smallTitle}
      title={data.title}
      style={{ marginTop: "120px" }}
    >
      <div className="faq-container container">
        {data.questions.map((questionInfo, index) => (
          <FAQItem
            key={`faq-item-${questionInfo.id}`}
            index={index}
            questionInfo={questionInfo}
          />
        ))}
      </div>
    </Section>
  );
};

export default FAQSection;
