import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  FormGroup,
  Card,
  ModalBody,
  Label,
  CardHeader,
  Col,
  Input,
  ModalFooter,
  FormFeedback,
} from "reactstrap";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import WorkIcon from "./Icon";
import SchoolIcon from "./Icon";
import StarIcon from "./Icon";
import { GetFormattedDate } from "../../helper/utils";
import { routes, headers } from "../../helper/config";
import axios from "axios";
import ProgressBar from "./ProgressBar";

import dateFormat from "dateformat";

import { useDispatch, useSelector } from "react-redux";
import * as AgreementAction from "../../actions/agreement";
import { useToasts } from "react-toast-notifications";

const AddPersonalInfo = (props) => {
  // const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.Agreement.isLoading);
  const personalInfo = useSelector((state) => state.Agreement.personalInfos);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [isValidating, setIsValidating] = useState(false);

  const {
    buttonLabel,
    className,
    PrescriptionDetails,
    modal,
    toggle,
    refreshData,
  } = props;

  //id is the prescription id.......................................
  const [id, setId] = useState(PrescriptionDetails?.id);

  console.log(
    "========================================",
    props.PrescriptionDetails
  );

  const getPersonalInfo = () => {
    if (PrescriptionDetails?.id) {
      dispatch(AgreementAction.getPersonalInfo(PrescriptionDetails?.id))
        .then(() => {
          addToast(`presonal info fetched-------------- successfully`, {
            appearance: "success",
            autoDismiss: true,
          });
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  };

  useEffect(() => {
    console.log(
      "----------------personal Info changes -----------333333--------",
      personalInfo
    );
    getPersonalInfo();
  }, [PrescriptionDetails?.id]);

  const inputChangeHandler = (value, fieldName) => {
    switch (fieldName) {
      case "name":
        setName(value);
        break;
      case "age":
        setAge(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        break;
    }

    console.log(fieldName);

    console.log(`input changing`);
  };

  const resetInput = () => {
    setName("");
    setAge("");
    setGender("");
    setAddress("");
    setPhone("");
  };

  const validatePersonalInfo = () => {
    let isInvalid = false;

    setIsValidating(true);

    if (name == "") {
      addToast(`Please add your name`, {
        appearance: "error",
        autoDismiss: true,
      });
      isInvalid = true;
    }
    if (age == "") {
      addToast(`Please add your age `, {
        appearance: "error",
        autoDismiss: true,
      });
      isInvalid = true;
    }
    if (gender == "") {
      addToast(`Please add your gender`, {
        appearance: "error",
        autoDismiss: true,
      });
      isInvalid = true;
    }
    if (address == "") {
      addToast(`Please update your address`, {
        appearance: "error",
        autoDismiss: true,
      });
      isInvalid = true;
    }
    if (phone == "") {
      addToast(`Please give your phone number`, {
        appearance: "error",
        autoDismiss: true,
      });
      isInvalid = true;
    }

    if (!isInvalid) {
      requestTheAdd();
    }
  };

  const requestTheAdd = () => {
    let personalInfo = {
      name,
      age,
      address,
      gender,
      phone,
    };

    dispatch(
      AgreementAction.createPersonalInfo({
        id: PrescriptionDetails?.id,
        body: personalInfo,
      })
    )
      .then(() => {
        addToast(`PersonalInfo added successfully`, {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        addToast(`Error occurred: ${err}`, {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .finally(() => {
        toggle();
        resetInput();
        getPersonalInfo();
      });

    // let owner;
    // let department;
    // let status;

    // if (localStorage.getItem('org') == 'Org1') {
    //   status = 'InProgress';
    //   if (localStorage.getItem('department') == 'Legal') {
    //     owner = 'Org1';
    //     department = 'Financial';
    //   } else {
    //     owner = 'Org2';
    //     department = 'Legal';
    //   }
    // } else if (localStorage.getItem('org') == 'Org2') {
    //   if (localStorage.getItem('department') == 'Legal') {
    //     owner = 'Org2';
    //     department = 'Financial';
    //     status = 'InProgress';
    //   } else {
    //     owner = 'Org2';
    //     department = 'Financial';
    //     status = 'Completed';
    //   }
    // }

    // let args = [
    //   contractDetails.id,
    //   status,
    //   owner,
    //   department,
    //   `${JSON.stringify(approval)}`,
    // ];

    // let data = {
    //   fcn: 'UpdateContract',
    //   chaincodeName: 'contract_cc',
    //   channelName: 'mychannel',
    //   args: args,
    // };

    // console.log(contract)

    // setIsLoading(true)
    // axios.post(routes.addContract, data, headers())
    //   .then(response => {
    //     console.log(`response id ----------- ${response}`)
    //     // getVisitorList()
    //     setIsLoading(false)
    //     toggle()
    //     refreshData()
    //   }).catch(err => {
    //     toggle()
    //     setIsLoading(false)
    //   })
  };

  return (
    <div style={{ background: "rgb(33, 150, 243)", color: "#fff" }}>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      {PrescriptionDetails ? (
        <Modal isOpen={modal} toggle={toggle} className={className} size="lg">
          <ModalHeader toggle={toggle} bsSize="lg">
            Prescription Details{" "}
          </ModalHeader>

          {isLoading ? (
            <ProgressBar />
          ) : (
            <>
              <Card className="bg-secondary px-md-2">
                <ModalBody>
                  {/* {JSON.stringify(contractDetails)} */}
                  <Card className="py-4 px-md-4">
                    <Card className="py-4 px-md-4">
                      <FormGroup row>
                        <Label sm={3}>Name</Label>
                        <Col sm={9}>
                          <Input
                            invalid={isValidating && name == ""}
                            onChange={(e) => {
                              inputChangeHandler(e.target.value, "name");
                            }}
                            placeholder="Enter name "
                          />
                          <FormFeedback>*Required</FormFeedback>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label sm={3}>Age</Label>
                        <Col sm={9}>
                          <Input
                            invalid={isValidating && age == ""}
                            onChange={(e) => {
                              inputChangeHandler(e.target.value, "age");
                            }}
                            placeholder="Enter age  "
                          />
                          <FormFeedback>*Required</FormFeedback>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label sm={3}>Gender</Label>
                        <Col sm={9}>
                          <Input
                            invalid={isValidating && gender == ""}
                            onChange={(e) => {
                              inputChangeHandler(e.target.value, "gender");
                            }}
                            placeholder="Enter gender  "
                          />
                          <FormFeedback>*Required</FormFeedback>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label sm={3}>Address</Label>
                        <Col sm={9}>
                          <Input
                            invalid={isValidating && address == ""}
                            onChange={(e) => {
                              inputChangeHandler(e.target.value, "address");
                            }}
                            placeholder="Enter your address  "
                          />
                          <FormFeedback>*Required</FormFeedback>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label sm={3}>Phone number</Label>
                        <Col sm={9}>
                          <Input
                            invalid={isValidating && phone == ""}
                            onChange={(e) => {
                              inputChangeHandler(e.target.value, "phone");
                            }}
                            placeholder="Enter your phone number  "
                          />
                          <FormFeedback>*Required</FormFeedback>
                        </Col>
                      </FormGroup>
                    </Card>
                    <Card className="py-4 px-md-4">
                      <FormGroup row>
                        <Col sm={3}>
                          <Label>Status</Label>
                        </Col>
                        <Col sm={1}>
                          <Label>:</Label>
                        </Col>
                        <Col sm={8}>
                          <Label for="exampleEmail">
                            {PrescriptionDetails.status}
                          </Label>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col sm={3}>
                          <Label>First Party</Label>
                        </Col>
                        <Col sm={1}>
                          <Label>:</Label>
                        </Col>
                        <Col sm={8}>
                          <Label for="exampleEmail">
                            {PrescriptionDetails.firstParty}
                          </Label>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col sm={3}>
                          <Label>Current Owner</Label>
                        </Col>
                        <Col sm={1}>
                          <Label>:</Label>
                        </Col>
                        <Col sm={8}>
                          <Label for="exampleEmail">
                            {PrescriptionDetails.owner}
                          </Label>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col sm={3}>
                          <Label>Second Party</Label>
                        </Col>
                        <Col sm={1}>
                          <Label>:</Label>
                        </Col>
                        <Col sm={8}>
                          <Label for="exampleEmail">
                            {PrescriptionDetails.secondParty}
                          </Label>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col sm={3}>
                          <Label>Invoice File Name</Label>
                        </Col>
                        <Col sm={1}>
                          <Label>:</Label>
                        </Col>
                        <Col sm={8}>
                          <Label src={PrescriptionDetails.document.name}>
                            {"Open File"}
                          </Label>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col sm={3}>
                          <Label>Invoice File</Label>
                        </Col>
                        <Col sm={1}>
                          <Label>:</Label>
                        </Col>
                        <Col sm={8}>
                          {/* <Label href={contractDetails.document.url} >{"Open File"}</Label> */}
                          <a
                            href={PrescriptionDetails.document.url}
                            target="_blank"
                          >
                            Show File
                          </a>
                        </Col>
                      </FormGroup>
                    </Card>
                  </Card>
                  <div>
                    {/* <Label >Agrement Journey :</Label> */}
                    <Card
                      className="bg-secondary shadow"
                      title="Agrement Journey"
                      style={{ background: "rgb(230, 230, 230)" }}
                    >
                      {console.log(
                        "Prescription details are",
                        PrescriptionDetails
                      )}
                      {/* <CardTitle>Agrement Journey</CardTitle> */}
                      <CardHeader className="border-0">
                        <h3 className="mb-0">Journey</h3>
                      </CardHeader>
                      <VerticalTimeline>
                        {personalInfo?.map((step) => (
                          <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            // contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            contentArrowStyle={{
                              borderRight: "7px solid  rgb(33, 150, 243)",
                            }}
                            date={dateFormat(step.addedAt, "yyyy-mm-dd")}
                            iconStyle={{
                              background: "rgb(33, 150, 243)",
                              color: "#fff",
                            }}
                            // icon={<WorkIcon />}
                          >
                            {/* <h3 className="vertical-timeline-element-title">Number: {step.number}</h3> */}
                            <h4 className="vertical-timeline-element-subtitle">
                              Name : {step.name}
                            </h4>
                            <h3 className="vertical-timeline-element-title">
                              Age: {step.age}
                            </h3>
                            <h4 className="vertical-timeline-element-subtitle">
                              User : {step.createBy}
                            </h4>
                            <h4 className="vertical-timeline-element-subtitle">
                              Gender : {step.gender}
                            </h4>
                            <h4 className="vertical-timeline-element-subtitle">
                              Address : {step.address}
                            </h4>
                            <h4 className="vertical-timeline-element-subtitle">
                              Phone : {step.phone}
                            </h4>

                            <h4 className="vertical-timeline-element-subtitle">
                              Department : {step.department}
                            </h4>
                            <h4 className="vertical-timeline-element-subtitle">
                              OrgId : {step.orgId}
                            </h4>
                            {/* <p>
                    Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                  </p> */}
                          </VerticalTimelineElement>
                        ))}
                      </VerticalTimeline>

                      {/* <VerticalTimeline>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    // contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date="2011 - present"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                  // icon={<WorkIcon />}
                  >
                    <h3 className="vertical-timeline-element-title">Creative Director</h3>
                    <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                    <p>
                      Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                  </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2010 - 2011"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    // icon={<WorkIcon />}
                    dateClassName={{ color: 'white' }}
                  >
                    <h3 className="vertical-timeline-element-title">Art Director</h3>
                    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                    <p>
                      Creative Direction, User Experience, Visual Design, SEO, Online Marketing
            </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2008 - 2010"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<WorkIcon />}
                  >
                    <h3 className="vertical-timeline-element-title">Web Designer</h3>
                    <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
                    <p>
                      User Experience, Visual Design
            </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2006 - 2008"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<WorkIcon />}
                  >
                    <h3 className="vertical-timeline-element-title">Web Designer</h3>
                    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                    <p>
                      User Experience, Visual Design
            </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="April 2013"
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                  // icon={<SchoolIcon />}
                  >
                    <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
                    <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
                    <p>
                      Strategy, Social Media
              </p>
                  </VerticalTimelineElement> */}
                      {/* <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="November 2012"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<SchoolIcon />}
            >
              <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
              <h4 className="vertical-timeline-element-subtitle">Certification</h4>
              <p>
                Creative Direction, User Experience, Visual Design
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="2002 - 2006"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }} rgb(22, 74, 74)
              icon={<SchoolIcon />}
            >
              <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
              <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
              <p>
                Creative Direction, Visual Design
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
              icon={<StarIcon />}
            /> */}
                      {/* </VerticalTimeline> */}
                    </Card>
                  </div>
                </ModalBody>
              </Card>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    validatePersonalInfo();
                  }}
                >
                  Submit
                </Button>{" "}
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </Modal>
      ) : null}
    </div>
  );
};

export default AddPersonalInfo;
