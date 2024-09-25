export const uploadToCloudinary = async (pics) => {
  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "therap_circle");
    data.append("cloud_name", "dyktljlnj");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dyktljlnj/image/upload",
      {
        method: "post",
        body: data,
      }
    );

    const fileData = await res.json();
    return fileData.url.toString();
  } else {
    console.log("error from cloudinary upload function");
  }
};
