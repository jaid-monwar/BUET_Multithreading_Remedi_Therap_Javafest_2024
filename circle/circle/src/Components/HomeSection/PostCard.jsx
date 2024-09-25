import React from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyModal from "./ReplyModal";
import { useDispatch } from "react-redux";
import { createRePost, likePost } from "../../Store/Post/Action";

const PostCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openReplyModal, setOpenReplyModal] = React.useState(false);
  const handleOpenReplyModal = () => setOpenReplyModal(true);
  const handleCloseReplyModal = () => setOpenReplyModal(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeletePost = () => {
    console.log("post deleted");
    handleClose();
  };

  const handleCreateRePost = () => {
    dispatch(createRePost(item?.id));
    console.log("repost created");
  };

  const handleLikePost = () => {
    dispatch(likePost(item?.id));
    console.log("post liked");
  };

  return (
    <React.Fragment>
      {/* <div className="flex items-center font-semibold text-gray-700 py-2">
        <RepeatIcon />
        <p>Reshare</p>
      </div> */}

      <div className="flex space-x-5">
        <Avatar
          alt="username"
          src="./images/avatar.png"
          className="cursor-pointer"
          onClick={() => navigate(`/profile/${item?.user.id}`)}
        />
        <div className="w-full ">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span
                onClick={() => navigate(`/profile/${item?.user.id}`)}
                className="font-semibold"
              >
                {item?.user?.fullName}
              </span>
              <span className="text-gray-600">
                @{item?.user?.fullName.split(" ").join("_").toLowerCase()} .
                2min
              </span>
              <img
                className="ml-2 w-5 h-5"
                src="./images/verified.png"
                alt=""
              />
            </div>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                <MenuItem onClick={handleDeletePost}>Edit</MenuItem>
              </Menu>
            </div>
          </div>
          <div className="mt-2">
            <div
              onClick={() => navigate(`/post/${item?.id}`)}
              className="cursor-pointer"
            >
              <p className="mb-2 p-0">{item?.content}</p>
              <div className="flex items-center justify-center">
                <img
                  className="w-[28rem] border border-gray-400 p-5 rounded-md"
                  src={item?.image}
                  alt="postimage"
                />
              </div>
            </div>
            <div className="py-5 flex flex-wrap justify-between items-center px-20">
              <div className="space-x-3 flex items-center text-gray-600 ">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModal}
                />
                <p>{item?.totalReplies}</p>
              </div>
              <div
                className={`${
                  item?.repost ? "text-[#3AB0FF]" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                <RepeatIcon
                  className="cursor-pointer"
                  onClick={handleCreateRePost}
                />
                <p>{item?.totalReposts}</p>
              </div>
              <div
                className={`${
                  item?.liked ? "text-[#F87474]" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                {item?.liked ? (
                  <FavoriteIcon
                    className="cursor-pointer"
                    onClick={handleLikePost}
                  />
                ) : (
                  <FavoriteBorderIcon
                    className="cursor-pointer"
                    onClick={handleLikePost}
                  />
                )}
                <p>{item?.totalLikes}</p>
              </div>
              <div className="space-x-3 flex items-center text-gray-600">
                <BarChartIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModal}
                />
                <p>430</p>
              </div>
              <div className="space-x-3 flex items-center text-gray-600">
                <FileUploadIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <ReplyModal
          item={item}
          open={openReplyModal}
          handleClose={handleCloseReplyModal}
        />
      </section>
    </React.Fragment>
  );
};

export default PostCard;
