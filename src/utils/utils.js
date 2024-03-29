import { request } from "./request";
const url = "http://127.0.0.1:5000";

export const uploadImage = async (e, setUploading, setImage, afterUpload) => {
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
    setTimeout(() => console.log("After Uploading excuted"), 5000);

    if (afterUpload) {
      afterUpload(data);
    } else {
      setImage(data.replace(/\\/g, "/"));
    }
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

export const loadImageUrl = (imageUrl) => {
  return `${url}${imageUrl}`;
};

const fixDate = (date) => {
  const offset = 2;
  return new Date(date.getTime() + offset * 3600 * 1000);
};
export const formatDate = (date) => {
  const dateObject = new Date(date);
  console.log(fixDate(dateObject));
  return fixDate(dateObject).toISOString().replace("T", "  ").substring(0, 17);
};

export const addDate = (value, target) => {
  const date = new Date();
  console.log(date);
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  switch (target) {
    case "day":
      day += value;
      break;
    case "month":
      month += value;
      break;
    case "year":
      year += value;
      break;
    case "hours":
      hours += value;
      break;
    case "minutes":
      minutes += value;
      break;
    case "second":
      seconds += value;
      break;
    default:
      break;
  }
  const newDate = new Date(year, month, day, hours, minutes, seconds);
  console.log(newDate);
  return newDate;
};
