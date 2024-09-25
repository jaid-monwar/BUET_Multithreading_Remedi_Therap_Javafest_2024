import React, { useEffect, useState } from "react";
import {
  Button,
  TabContent,
  TabPane,
  Card,
  CardHeader,
  FormGroup,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  CardText,
  Table,
  Container,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

// import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { useHistory } from "react-router-dom";
import classnames from "classnames";

import Header from "../components/Headers/Header.js";
import AddPrescription from "./medibloc/AddPrescription.js";
import AllContracts from "./medibloc/AllContracts.js";

import { useDispatch, useSelector } from "react-redux";
import * as UserAction from "../actions/user.jsx";
const axios = require("axios");
const config = require("../helper/config.js");

export default function Index() {
  let history = useHistory();

  const userData = useSelector((state) => state?.User?.login?.decodedData);

  const [activeTab, setActiveTab] = useState("4");

  const selectActiveTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    if (!userData) {
      history.push("auth/login");
    }
  }, []);

  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <FormGroup row>
                  <Col sm={9}>
                    <h3 className="mb-0">Prescription List</h3>
                  </Col>
                  <Col sm={3}>
                    <Button
                      className="my-1"
                      color="primary"
                      onClick={toggleModal}
                      type="button"
                    >
                      {"New Prescription"}
                    </Button>
                  </Col>
                </FormGroup>

                <AddPrescription toggle={toggleModal} modal={modal} />
              </CardHeader>
              <div>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "4" })}
                      onClick={() => {
                        selectActiveTab("4");
                      }}
                    >
                      All
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activeTab}>
                  {activeTab == "4" ? (
                    <TabPane tabId="4">
                      <Row>
                        <Col sm="12" style={{ paddingTop: 100 }}>
                          <Card body>
                            <AllContracts type={userData.department} />
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                  ) : (
                    <></>
                  )}
                </TabContent>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
