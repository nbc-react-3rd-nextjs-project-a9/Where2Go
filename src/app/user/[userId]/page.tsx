import Section from "@/components/layout/Section";
import UserReview from "./UserReview";
import UserProfile from "./UserProfile";

const UserPage = () => {
  return (
    <>
      <Section title="프로필">
        <UserProfile />
      </Section>
      <Section title="작성한 리뷰">
        <UserReview />
      </Section>
    </>
  );
};

export default UserPage;
