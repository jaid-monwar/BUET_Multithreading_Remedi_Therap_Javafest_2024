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

import Header from "../../components/Headers/Header.js";
import ContractView from "./ContractView.js";
import { routes, headers } from "../../helper/config.js";
import NoDataCard from "./NoDataCard.js";
import AddPersonalInfo from "./AddPersonalInfo.js";
import AddDiagnosis from "./AddDiagnosis.js";
import AddMedcount from "./AddMedcount.js";
import AddMedication from "./AddMedication.js";
import AddPrescription from "./AddPrescription.js";
import ProgressBar from "./ProgressBar.js";

import { useDispatch, useSelector } from "react-redux";
import * as AgreementAction from "../../actions/agreement.jsx";
import dateFormat from "dateformat";
import { useToasts } from "react-toast-notifications";

function ContractListView(props) {
  const { addToast } = useToasts();
  let history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.Agreement.isLoading);

  const contractList = useSelector((state) => state.Agreement.prescriptions);

  const { status, title, type } = props;

  console.log(`Status is =====> ${status}=====`);

  // const [isLoading, setIsLoading] = useState(false)

  const [modal, setModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  // prescription modal means personal info modal
  const [prescriptionModal, setPrescriptionModal] = useState(false);
  const [diagnosisModal, setDiagnosisModal] = useState(false);
  const [medicationModal, setMedicationModal] = useState(false);
  const [medcountModal, setMedcountModal] = useState(false);

  const toggleModal = () => setModal(!modal);
  const togglePrescription = () => setPrescriptionModal(!prescriptionModal);
  const toggleDiagnosis = () => setDiagnosisModal(!diagnosisModal);
  const toggleMedication = () => setMedicationModal(!medicationModal);
  const toggleMedcount = () => setMedcountModal(!medcountModal);

  const viewContract = (index) => {
    setModal(!modal);
    setSelectedContract(contractList?.data[index]);
  };

  const viewPrescription = (index) => {
    setPrescriptionModal(!prescriptionModal);
    setSelectedContract(contractList?.data[index]);
    // getContract()

    // dispatch(AgreementAction.approveAgreement({id:contractList?.data[index]?.id, body:{
    //     "description":"user7@gmail.com",
    //     "action":"No Action needed",
    //     "comment":"Agreement approved",
    //     "status": "approved"
    // }})).then(()=> {
    //     addToast(`Agreement approved successfully`, {
    //         appearance: 'success',
    //         autoDismiss: true,
    //       })
    // })
  };

  const viewDiagnosis = (index) => {
    setDiagnosisModal(!diagnosisModal);
    setSelectedContract(contractList?.data[index]);
    // getContract()

    // dispatch(AgreementAction.approveAgreement({id:contractList?.data[index]?.id, body:{
    //     "description":"user7@gmail.com",
    //     "action":"No Action needed",
    //     "comment":"Agreement approved",
    //     "status": "approved"
    // }})).then(()=> {
    //     addToast(`Agreement approved successfully`, {
    //         appearance: 'success',
    //         autoDismiss: true,
    //       })
    // })
  };
  const viewMedication = (index) => {
    setMedicationModal(!medicationModal);
    setSelectedContract(contractList?.data[index]);
    // getContract()

    // dispatch(AgreementAction.approveAgreement({id:contractList?.data[index]?.id, body:{
    //     "description":"user7@gmail.com",
    //     "action":"No Action needed",
    //     "comment":"Agreement approved",
    //     "status": "approved"
    // }})).then(()=> {
    //     addToast(`Agreement approved successfully`, {
    //         appearance: 'success',
    //         autoDismiss: true,
    //       })
    // })
  };
  const viewMedcount = (index) => {
    setMedcountModal(!medcountModal);
    setSelectedContract(contractList?.data[index]);
    // getContract()

    // dispatch(AgreementAction.approveAgreement({id:contractList?.data[index]?.id, body:{
    //     "description":"user7@gmail.com",
    //     "action":"No Action needed",
    //     "comment":"Agreement approved",
    //     "status": "approved"
    // }})).then(()=> {
    //     addToast(`Agreement approved successfully`, {
    //         appearance: 'success',
    //         autoDismiss: true,
    //       })
    // })
  };

  const refreshData = () => {
    getContract();
  };

  // const [contractList, setContractList] = useState([])

  useEffect(() => {
    console.log(`-------------------------------`);
    let token = localStorage.getItem("token");
    console.log(`token is -------------: ${token}`);
    if (!token) {
      console.log(`Triggered`);
      history.push("auth/login");
    }
    getContract();
  }, []);

  const getContract = () => {
    dispatch(AgreementAction.getPrescriptions({ filterType: props.status }));

    // dispatch(AgreementAction.getAgreementApprovals('c784b95d-1d86-4bcc-b930-7ea74f9fb765'))
  };

  return (
    <Container className="mt--7" fluid>
      <Row>
        <div className="col">
          <ContractView
            modal={modal}
            toggle={toggleModal}
            contractDetails={selectedContract}
          />
          <AddPersonalInfo
            modal={prescriptionModal}
            toggle={togglePrescription}
            refreshData={refreshData}
            PrescriptionDetails={selectedContract}
          />
          <AddDiagnosis
            modal={diagnosisModal}
            toggle={toggleDiagnosis}
            refreshData={refreshData}
            PrescriptionDetails={selectedContract}
          />
          <AddMedication
            modal={medicationModal}
            toggle={toggleMedication}
            refreshData={refreshData}
            PrescriptionDetails={selectedContract}
          />
          <AddMedcount
            modal={medcountModal}
            toggle={toggleMedcount}
            refreshData={refreshData}
            PrescriptionDetails={selectedContract}
          />
          <Card className="shadow" style={{ padding: 40 }}>
            <CardHeader className="border-0">
              {/* <h3 className="mb-0">{title}</h3> */}

              <FormGroup row>
                <Col sm={9}>
                  <h3 className="mb-0">{title}</h3>
                </Col>
                <Col sm={3}>
                  <Button
                    className="my-1"
                    color="primary"
                    onClick={() => refreshData()}
                    type="button"
                  >
                    {"Refresh"}
                  </Button>
                </Col>
              </FormGroup>
            </CardHeader>

            {isLoading ? (
              <ProgressBar />
            ) : (
              <>
                {contractList?.data?.length > 0 ? (
                  <Table
                    className="align-items-center table-flush"
                    striped
                    bordered
                    hover
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>ID</th>
                        <th scope="col">Status</th>
                        <th scope="col">Current User</th>
                        <th scope="col">View</th>
                        {type === "patient" ? (
                          <th scope="col">Personal Info</th>
                        ) : (
                          <th></th>
                        )}
                        {type === "patient" || type === "doctor" ? (
                          <th scope="col">Diagnoses</th>
                        ) : (
                          <th></th>
                        )}
                        <th scope="col">Medications</th>
                        {type === "patient" || type === "pharmacist" ? (
                          <th scope="col">Medcounts</th>
                        ) : (
                          <th></th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {contractList?.data.map((contract, i) => (
                        <tr>
                          <td
                            onClick={() =>
                              navigator.clipboard.writeText(contract.id)
                            }
                          >
                            {contract.id.substring(0, 7)}
                          </td>
                          <td> {contract.status}</td>
                          <td> {contract.owner}</td>
                          <td>
                            <Button
                              className="my-1"
                              color="primary"
                              onClick={() => viewContract(i)}
                              type="button"
                            >
                              {"View"}
                            </Button>
                          </td>
                          {type === "patient" ? (
                            <td>
                              <Button
                                className="my-1"
                                color="primary"
                                onClick={() => viewPrescription(i)}
                                type="button"
                              >
                                {"View"}
                              </Button>
                            </td>
                          ) : (
                            <td></td>
                          )}
                          {type === "patient" || type === "doctor" ? (
                            <td>
                              <Button
                                className="my-1"
                                color="primary"
                                onClick={() => viewDiagnosis(i)}
                                type="button"
                              >
                                {"View"}
                              </Button>
                            </td>
                          ) : (
                            <td></td>
                          )}

                          <td>
                            <Button
                              className="my-1"
                              color="primary"
                              onClick={() => viewMedication(i)}
                              type="button"
                            >
                              {"View"}
                            </Button>
                          </td>

                          {type === "patient" || type === "pharmacist" ? (
                            <td>
                              <Button
                                className="my-1"
                                color="primary"
                                onClick={() => viewMedcount(i)}
                                type="button"
                              >
                                {"View"}
                              </Button>
                            </td>
                          ) : (
                            <td></td>
                          )}
                          {/* <td><Button className="my-1" color="primary" onClick={() => viewMedcount(i)} type="button">{"View"}</Button></td> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <NoDataCard status={status} />
                )}
              </>
            )}
            {/* <NoDataCard />  */}
          </Card>
        </div>
      </Row>
    </Container>
  );
}

export default ContractListView;
