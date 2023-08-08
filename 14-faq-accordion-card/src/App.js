import { useState } from "react";
import { ReactComponent as IconArrow } from "./icon-arrow-down.svg";

console.log(IconArrow);
const faqs = [
  {
    question: "How many team members can I invite?",
    answer:
      "You can invite up to 2 additional users on the Free plan. There is no limit on team members for the Premium plan.",
  },
  {
    question: "What is the maximum file upload size?",
    answer:
      "No more than 2GB. All files in your account must fit your allotted storage space.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click “Forgot password” from the login page or “Change password” from your profile page. A reset link will be emailed to you.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes! Send us a message and we’ll process your request no questions asked.",
  },
  {
    question: "Do you provide additional support?",
    answer:
      " Chat and email support is available 24/7. Phone lines are open during normal business hours.",
  },
];

export default function App() {
  return (
    <div className="container">
      <div className="bg-img"></div>
      <div className="box-img"></div>
      <Accordion faqs={faqs} />
    </div>
  );
}

function Accordion({ faqs }) {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className="container-right">
      <h1>FAQ</h1>
      <div className="accordion">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.question}
            question={faq.question}
            curOpen={curOpen}
            onCurOpen={setCurOpen}
          >
            {faq.answer}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
}

function AccordionItem({ question, curOpen, onCurOpen, children }) {
  const isOpen = question === curOpen;

  function handleToggle() {
    // setIsOpen((isOpen) => !isOpen);
    onCurOpen(isOpen ? null : question);
  }

  return (
    <div
      className={`accordion-item ${isOpen ? "open" : ""}`}
      onClick={handleToggle}
    >
      <div>
        <p className={`question ${isOpen ? "open" : ""}`}>{question} </p>
        <IconArrow style={isOpen ? { transform: "rotate(180deg)" } : null} />
      </div>
      {isOpen && <p className="answer">{children}</p>}
    </div>
  );
}
