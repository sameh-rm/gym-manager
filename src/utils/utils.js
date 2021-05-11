import { request } from "./request";

export const uploadImage = async (e, setUploading, setImage) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("image", file);
  setUploading(true);
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await request.post("/api/upload", formData, config);
    setImage(data.replace(/\\/g, "/"));
    setUploading(false);
  } catch (error) {
    console.error(error);
    setUploading(false);
  }
};
const pageLimit = 10;
export const paginate = (data, pageNum, limitNum) => {
  const page = parseInt(pageNum);
  const limit = parseInt(limitNum || pageLimit);
  const startIndex = (page - 1) * limit;
  const endIndex = page + limit;
  const result = {
    results: data.slice(startIndex, startIndex + limit),
    endIndex,
    startIndex,
  };
  if (endIndex < data.length) {
    result.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    result.prev = {
      page: page - 1,
      limit: limit,
    };
  }
  return result;
};
