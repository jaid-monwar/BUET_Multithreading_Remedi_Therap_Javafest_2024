import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import AuthModal from "./AuthModal";

const Authentication = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const handleOpenAuthModal = () => setOpenAuthModal(true);
  const handleCloseAuthModal = () => setOpenAuthModal(false);

  return (
    <div>
      <Grid className="overflow-y-hidden" container>
        <Grid className="hidden lg:block" item lg={7}>
          <img
            className="w-full h-screen"
            src="https://cdn.pixabay.com/photo/2020/05/24/23/44/hands-5216585_960_720.jpg"
            alt="auth-img"
          />
          <div className="absolute top-[30%] left-[19%]">
            <img
              className="h-[300px] w-[300px]"
              src="./images/logo.png"
              alt="circle-logo"
            />
          </div>
        </Grid>

        <Grid className="px-10 " lg={5} xs={12}>
          <h1 className="mt-10 font-bold text-7xl">Happening Now</h1>
          <h1 className="font-bold text-3xl py-16">Join Circle Today</h1>

          <div className="w-[60%]">
            <div className="w-full">
              <GoogleLogin width={500} />
              <p className="py-5 text-center">OR</p>
              <Button
                onClick={handleOpenAuthModal}
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "29px",
                  py: "7px",
                  bgcolor: "#FFB562",
                  color: "black",
                  ":hover": {
                    bgcolor: "#ffa845",
                  },
                }}
              >
                Create Account
              </Button>
              <p className="text-sm mt-2">
                By signing up, you agree to the Terms of Service and Policy,
                including Cookie use
              </p>

              <div className="mt-10">
                <h1 className="font-bold text-xl mb-5">
                  Already Have Account?
                </h1>
                <Button
                  onClick={handleOpenAuthModal}
                  fullWidth
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: "29px",
                    py: "7px",
                    // bgcolor: "#FFB562",
                    color: "black",
                    // ":hover": {
                    //   bgcolor: "#ffa845",
                    // },
                  }}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal} />
    </div>
  );
};

export default Authentication;
