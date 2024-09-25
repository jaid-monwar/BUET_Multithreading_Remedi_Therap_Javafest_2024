import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      sx={{
        gap: {
          sm: "122px",
          xs: "40px",
        },
        mt: { sm: "32px", xs: "20px" },
        mb: { sm: "32px", xs: "20px" },
        justifyContent: "none",
      }}
      px="20px"
    >
      {/* <Link to="/">
        <img
          src={Logo}
          alt="Logo"
          style={{ width: "64px", height: "64px", margin: "0 20px" }}
        />
      </Link> */}
      <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-end">
        <Link
          to="/"
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bolder",
            textDecoration: "none",
            color: "#F05454",
          }}
        >
          sweat.
        </Link>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#3A1212",
            // borderBottom: "3px solid #F05454",
          }}
        >
          Home
        </Link>
        {/* <Link
          to="/#exercises"
          style={{
            textDecoration: "none",
            color: "#3A1212",
            // borderBottom: "3px solid #F05454",
          }}
        >
          Exercises
        </Link> */}
        <a
          href="#exercises"
          style={{
            textDecoration: "none",
            color: "#3A1212",
            // borderBottom: "3px solid #F05454",
          }}
        >
          Exercises
        </a>

        <Link
          to="/workout"
          style={{
            textDecoration: "none",
            color: "#3A1212",
            // borderBottom: "3px solid #F05454",
          }}
        >
          Workout
        </Link>
        <Link
          to="/recipe"
          style={{
            textDecoration: "none",
            color: "#3A1212",
            // borderBottom: "3px solid #F05454",
          }}
        >
          Recipes
        </Link>
      </Stack>
    </Stack>
  );
};

export default Navbar;
