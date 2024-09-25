import ExploreIcon from "@mui/icons-material/Explore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupIcon from "@mui/icons-material/Group";
import VerifiedIcon from "@mui/icons-material/Verified";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PendingIcon from "@mui/icons-material/Pending";

export const navigationMenu = [
  {
    title: "home",
    icon: <HomeIcon />,
    path: "/home",
  },
  {
    title: "explore",
    icon: <ExploreIcon />,
    path: "/explore",
  },
  {
    title: "notifications",
    icon: <NotificationsIcon />,
    path: "/notification",
  },
  {
    title: "messages",
    icon: <MessageIcon />,
    path: "/message",
  },
  {
    title: "lists",
    icon: <ListAltIcon />,
    path: "/list",
  },
  {
    title: "communities",
    icon: <GroupIcon />,
    path: "/communities",
  },
  {
    title: "verified",
    icon: <VerifiedIcon />,
    path: "/verified",
  },
  {
    title: "profile",
    icon: <AccountCircleIcon />,
    path: "/profile",
  },
  {
    title: "more",
    icon: <PendingIcon />,
    path: "/more",
  },
];
