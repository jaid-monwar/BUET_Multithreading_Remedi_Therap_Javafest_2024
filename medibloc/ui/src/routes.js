/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "./views/Index.js";
import Profile from "./views/medibloc/Profile.js";
// import Maps from "./views/examples/Maps.js";
import Register from "./views/medibloc/Register.js";
import Login from "./views/medibloc/Login.js";
// import Tables from "./views/examples/Tables.js";
// import Icons from "./views/examples/Icons.js";
import Icons from "./views/medibloc/Icons.js";
import Dashboard from "./views/Dashboard/Dashboard.js";
import ContractHistory from "./views/medibloc/ContractHistory.js";
import Admin from "./views/medibloc/admin.js";
import DoctorList from "./views/medibloc/doctorlist.js";
import PharmacistList from "./views/medibloc/pharmacistlist.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/admin",
    name: "Admin",
    icon: "ni ni-tv-2 text-primary",
    component: Admin,
    layout: "/admin",
  },
  {
    path: "/doctors",
    name: "DoctorList",
    icon: "ni ni-tv-2 text-primary",
    component: DoctorList,
    layout: "/admin",
  },
  {
    path: "/pharmacists",
    name: "PharmacistList",
    icon: "ni ni-tv-2 text-primary",
    component: PharmacistList,
    layout: "/admin",
  },
  {
    path: "/contract-history",
    name: "Contract History",
    icon: "ni ni-single-02 text-yellow",
    component: ContractHistory,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
