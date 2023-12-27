import Carousel from "@/components/Carousel";
import Section from "@/components/layout/Section";

export default function Home() {
  return (
    <div className="">
      <Carousel></Carousel>
      <Section title="Editor's Pick">{<></>}</Section>
      <Section title="내 근처 핫플">{<></>}</Section>
    </div>
  );
}
