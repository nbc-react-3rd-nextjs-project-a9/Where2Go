export const addBookmark = async (userId: string, placeId: string) => {
  const submitData = { userId, placeId };
  try {
    const res = await fetch(`http://localhost:3000/api/bookmark/${userId}/${placeId}`, {
      method: "POST",
      body: JSON.stringify(submitData),
      headers: {
        "content-type": "application/json"
      }
    });

    if (res.ok) {
      console.log("업로드");
    } else {
      console.log("업로드 실패");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getBookmarkPlaceIdList = async (userId: string) => {
  const res = await fetch(`http://localhost:3000/api/bookmark/${userId}`);
  const data = await res.json();
  console.log(data);
  return data;
};
