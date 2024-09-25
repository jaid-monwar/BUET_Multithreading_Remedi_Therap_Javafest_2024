import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const RightPart = () => {
  const handleChangeTheme = () => {
    console.log("change theme");
  };

  return (
    <div className="py-5 sticky top-0">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="py-3 rounded-full text-gray-500 w-full pl-12 bg-transparent border border-gray-300"
        />
        <div className="absolute top-0 left-0 pl-3 pt-3">
          <SearchIcon className="text-gray-500 " />
        </div>
        <Brightness4Icon
          className="ml-3 cursor-pointer"
          onClick={handleChangeTheme}
        />
      </div>
      <section className="my-5">
        <h1 className="text-xl font-bold">Get Verified</h1>
        <h1 className="font-bold my-2">Subscribe to unlock new features</h1>
        <Button
          variant="contained"
          sx={{
            padding: "10px",
            paddingX: "20px",
            borderRadius: "25px",
            bgcolor: "#FFB562",
            color: "black",
            ":hover": {
              bgcolor: "#ffa845",
            },
          }}
        >
          Get Verified
        </Button>
      </section>
      <section className="mt-7 space-y-5">
        <h1 className="font-bold text-xl py-1">Whats happening</h1>
        <div>
          <p className="text-sm ">Trending Topic Healthcare</p>
          <p className="font-bold">Emergency</p>
        </div>
        {[1, 2, 3].map((items) => (
          <div className="flex justify-between w-full">
            <div>
              <p>Diabetes</p>
              <p className="font-bold">#TheSOS</p>
              <p>34k Reposts</p>
            </div>
            <MoreHorizIcon />
          </div>
        ))}
      </section>
    </div>
  );
};

export default RightPart;
