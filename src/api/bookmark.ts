const addBookmark = async (userId: string, placeId: string) => {
  const submitData = { userId, placeId };
  try {
    const res = await fetch(`/api/bookmark/${userId}/${placeId}`, {
      method: "POST",
      body: JSON.stringify(submitData),
      headers: {
        "content-type": "application/json"
      }
    });

    if (res.ok) {
    } else {
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteBookmark = async (userId: string, placeId: string) => {
  const submitData = { userId, placeId };
  try {
    const res = await fetch(`/api/bookmark/${userId}/${placeId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    });
    if (res.ok) return true;
  } catch (error) {
    console.error(error);
  }
};

const getBookmarkList = async (userId: string) => {
  const res = await fetch(`/api/bookmark/${userId}`);
  const data = await res.json();
  return data;
};

const checkBookmark = async (userId: string, placeId: string) => {
  try {
    const res = await fetch(`/api/bookmark/${userId}/${placeId}`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const bookmarkAPI = {
  addBookmark,
  deleteBookmark,
  checkBookmark,
  getBookmarkList
};
