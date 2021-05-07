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
    setImage(data);
    setUploading(false);
  } catch (error) {
    console.error(error);
    setUploading(false);
  }
};
