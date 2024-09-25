import { Grid } from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import RightPart from "../RightPart/RightPart";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import PostDetails from "../PostDetail/PostDetails";
import Authentication from "../Authentication/Authentication";

const Homepage = () => {
  return (
    <Grid container xs={12} className="px-5 lg:px-36 justify-between">
      <Grid
        item
        xs={0}
        lg={2.5}
        className="pl-20 hidden lg:block w-full relative"
      >
        <Navigation />
      </Grid>
      <Grid
        item
        xs={12}
        lg={5}
        className="px-5 lg:px-9 hidden lg:block w-full relative border border-gray-300"
      >
        <Routes>
          <Route path="/" element={<HomeSection />}></Route>
          {/* <Route path="/" element={<Authentication />}></Route> */}
          <Route path="/home" element={<HomeSection />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/post/:id" element={<PostDetails />}></Route>
        </Routes>
      </Grid>
      <Grid
        item
        xs={0}
        lg={3}
        className="pr-20 hidden lg:block w-full relative"
      >
        <RightPart />
      </Grid>
    </Grid>
  );
};

export default Homepage;
