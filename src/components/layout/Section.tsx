import React from "react";

interface Props {
  children: React.ReactElement;
  title?: string;
}

const Section = ({ title, children }: Props) => {
  return (
    <section>
      <h2 className="mt-8 mb-4 font-bold text-xl">{title}</h2>
      <div>{children}</div>
    </section>
  );
};

export default Section;
