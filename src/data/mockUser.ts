export const mockUserData: User[] = [];

const createMockUserData = (count: number) => {
  for (let i = 0; i < count; i++) {
    const data: User = {
      email: "1231@123.com",
      imageUrl: { path: "", url: `https://dummyimage.com/200x200/00${i}/fff` },
      nickname: `유저${i}`
    };
    mockUserData.push(data);
  }
};
createMockUserData(20);
