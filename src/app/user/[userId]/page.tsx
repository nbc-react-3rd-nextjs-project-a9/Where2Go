import Section from "@/components/layout/Section";
import UserReview from "./UserReview";
import UserProfile from "./UserProfile";
import UserBookmarkList from "./UserBookmarkList";

const UserPage = ({ params }: { params: { userId: string } }) => {
  return (
    <>
      <Section title="프로필">
        <UserProfile />
      </Section>
      <Section title="북마크">
        <UserBookmarkList userId={params.userId} />
      </Section>
      <Section title="작성한 리뷰">
        <UserReview />
      </Section>
    </>
  );
};

export default UserPage;
