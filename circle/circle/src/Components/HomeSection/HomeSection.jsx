import { Avatar, Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getAllPosts } from "../../Store/Post/Action";
import { uploadToCloudinary } from "../../Utils/uploadToCloudinary";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Text is required"),
});

const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const { post } = useSelector((store) => store);
  console.log("post", post);

  const handleSubmit = (values, actions) => {
    dispatch(createPost(values));
    actions.resetForm();
    console.log("values", values);
    setSelectedImage(null);
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, [post.like, post.repost]);

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      isPost: true,
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    const imgUrl = await uploadToCloudinary(event.target.files[0]);
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  return (
    <div className="space-y-5">
      {/* Header section */}
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>
      {/* Posting section */}
      <section className={`pb-10`}>
        <div className="flex space-x-5">
          <Avatar alt="username" src="./images/avatar.png" />
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="content"
                  placeholder="What is happening"
                  className={`border-none outline-none text-xl bg-transparent`}
                  {...formik.getFieldProps("content")}
                />
                {formik.errors.content && formik.touched.content && (
                  <span className="text-red-500">{formik.errors.content}</span>
                )}
              </div>
              {/* <div>
              <img src="" alt=""/>
              </div> */}
              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <ImageIcon className="text-[#3AB0FF]" />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleSelectImage}
                    />
                  </label>
                  <FmdGoodIcon className="text-[#3AB0FF]" />
                  <TagFacesIcon className="text-[#3AB0FF]" />
                </div>

                <div>
                  <Button
                    sx={{
                      width: "100%",
                      borderRadius: "20px",
                      paddingY: "8px",
                      paddingX: "20px",
                      bgcolor: "#FFB562",
                      color: "black",
                      ":hover": {
                        bgcolor: "#ffa845",
                      },
                    }}
                    variant="contained"
                    type="submit"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </form>
            <div>{selectedImage && <img src={selectedImage} alt="" />}</div>
          </div>
        </div>
      </section>
      {/* Post card */}
      <section>
        {post.posts.map((item) => (
          <PostCard item={item} />
        ))}
      </section>
    </div>
  );
};

export default HomeSection;
