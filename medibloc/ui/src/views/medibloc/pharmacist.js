import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { useHistory } from "react-router-dom";
import { routes, headers } from "../../helper/config";
import NoDataCard from "./NoDataCard";
import ReactPaginate from "react-paginate";
import "./admin.css";

import ProgressBar from "./ProgressBar";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Spinner,
  Row,
  UncontrolledTooltip,
  Button,
  Col,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import * as UserAction from "../../actions/user";
import Axios from "axios";

export default function Pharmacist() {
  let history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.User.isLoading);
  const pharmacistList = useSelector((state) => state.User.pharmacistList);
  const userProfileData = useSelector(
    (state) => state?.User?.login?.decodedData
  );

  const [paginationData, setPaginationData] = useState({ selectedPage: 0 });
  // const [isLoading, setIsLoading] = useState(false)

  // const [userList, setUserList] = useState([])

  const [pageCount, setPageCount] = useState([]);

  useEffect(() => {
    setPageCount(pharmacistList.totalPages);
  }, [pharmacistList]);

  // const fetchData = () => {
  //   Axios.get("http://localhost:3000/users")
  //     .then((response) => {
  //       const tableList = setData(response.data);
  //       console.log("printing axios data", tableList);
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching data:", error);
  //     });
  // };

  // const handlePageClick = (data) => {
  //   const { selected } = data; // The selected page index

  //   // Update the current page based on the selected page index
  //   setCurrentPage(selected);
  // };

  const handlePageClick = (page) => {
    console.log("selected page is@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", page);
    setPaginationData({
      ...paginationData,
      selectedPage: page.selected,
    });
  };

  useEffect(() => {
    console.log("pagination data changed", paginationData);
    getPharmacistList();
  }, [paginationData]);

  useEffect(() => {
    console.log(`-------------------------------`);
    let token = localStorage.getItem("token");
    console.log(`token is -------------: ${token}`);
    if (!userProfileData || !localStorage.getItem('token')) {
      console.log(`Triggered`);
      history.push("auth/login");
    }

    getPharmacistList();
  }, []);

  useEffect(() => {
    console.log("===================", "received user", pharmacistList);
  }, [pharmacistList]);

  const getPharmacistList = () => {
    UserAction.startLoading();
    dispatch(
      UserAction.getPharmacists({
        pagination: { selectedPage: paginationData.selectedPage },
        take: 5,
      })
    )
      .then(() => {
        UserAction.endLoading();
      })
      .catch((err) => {
        UserAction.endLoading();
      });
  };

  const updateUser = (index, status) => {
    // setIsLoading(true)
    console.log(`email id is : ${pharmacistList?.docs[index]?.email}`);
    // let userMail = { email: userList?.docs[index]?.email };
    let updatedStatus = status === "grant" ? "revoke" : "grant";
    dispatch(
      UserAction.updateUserAccess({
        id: pharmacistList?.docs[index]?.id,
        body: { status: updatedStatus },
      })
    ).then(() => {
      console.log(`User status changed successfully`);
      getPharmacistList();
    });
  };


  let view = pharmacistList?.docs?.map((user, i) => (
    <tr>
      <td> {user.id}</td>
      <td> {user.email}</td>
      <td> {user.status}</td>
      <td>{user.department}</td>
      <td>
        <Button
          className="my-1"
          color="primary"
          onClick={() => {
            updateUser(i, user.status);
          }}
          type="button"
        >
          {user.status == "grant" ? "revoke" : "grant"}
        </Button>
      </td>
    </tr>
  ));

  let progress = (
    <div>
      <Spinner type="grow" color="primary" />
      <Spinner type="grow" color="secondary" />
      <Spinner type="grow" color="success" />
      <Spinner type="grow" color="danger" />
      <Spinner type="grow" color="warning" />
      <Spinner type="grow" color="info" />
      <Spinner type="grow" color="light" />
      <Spinner type="grow" color="dark" />
    </div>
  );

  return (
    <div>
      <Header />
      {/* <ProgressBar/> */}
      {/* <span className="h1">This is Admin Component</span> */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Pharmacist List</h3>
              </CardHeader>
              <Card body>
                {isLoading ? (
                  <div className="row justify-content-center">
                    <ProgressBar />{" "}
                  </div>
                ) : (
                  <>
                    {pharmacistList?.docs?.length ? (
                      <>
                        <Table
                          className="align-items-center table-flush"
                          responsive
                        >
                          <thead className="thead-light">
                            <tr>
                              <th>Username</th>
                              <th>Email</th>
                              <th scope="col">Status</th>
                              <th scope="col">Department</th>
                              <th scope="col">Action</th>

                              <th scope="col" />
                            </tr>
                          </thead>
                          <tbody>
                            {view}
                          </tbody>
                        </Table>
                        <Container>
                          <Row>
                            <Col>
                              <hr />
                            </Col>
                          </Row>
                        </Container>

                        <ReactPaginate
                          previousLabel={"Previous"}
                          nextLabel={"Next"}
                          breakLabel={"..."}
                          breakClassName={"break-me"}
                          pageCount={pageCount}
                          marginPagesDisplayed={3}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageClick}
                          containerClassName={"pagination"}
                          subContainerClassName={"pages pagination"}
                          activeClassName={"active"}
                        />
                        {/* <div className="pagination">
                          <button
                            onClick={() => handlePageClick(currentPage - 1)}
                            disabled={currentPage === 0}
                          >
                            Previous
                          </button>
                          <span>Page {currentPage + 1}</span>
                          <button
                            onClick={() => handlePageClick(currentPage + 1)}
                            disabled={currentPage === pageCount - 1}
                          >
                            Next
                          </button>
                        </div> */}

                        {/* <Items currentItems={1} /> */}
                      </>
                    ) : (
                      <NoDataCard status={"Users"} />
                    )}
                  </>
                )}
              </Card>
            </Card>
          </div>
        </Row>
      </Container>
      {/* <Paginate /> */}
    </div>
  );
}
