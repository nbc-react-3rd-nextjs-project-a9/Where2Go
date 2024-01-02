import Section from "@/components/layout/Section";
import UserReview from "./UserReview";
import UserProfile from "./UserProfile";
import UserBookmarkList from "./UserBookmarkList";
import Button from "@/components/Button";

const UserPage = () => {
  return (
    <>
      <Section title="프로필">
        <UserProfile />
      </Section>
      <Section title="북마크">
        <UserBookmarkList />
      </Section>
      {/* <Section title="작성한 리뷰">
        <UserReview />
      </Section> */}
    </>
  );
};

export default UserPage;
