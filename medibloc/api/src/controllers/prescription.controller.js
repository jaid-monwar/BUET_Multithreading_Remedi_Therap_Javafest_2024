const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, prescriptionService } = require('../services');
const { getPagination } = require('../utils/pagination');
const { getSuccessResponse } = require('../utils/Response');

const createPrescription = catchAsync(async (req, res) => {
  let { user } = req.loggerInfo;
  let fileMetadata = req.body.fileMetadata;
  console.log('============user========', user);
  if (user.department !== 'patient') {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized to submit diagnosis form');
  }
  const result = await prescriptionService.createPrescription(req.body, fileMetadata, user);
  res.status(httpStatus.CREATED).send(getSuccessResponse(httpStatus.CREATED, 'Prescription created successfully', result));
});

const approveAgreement = catchAsync(async (req, res) => {
  let { user } = req.loggerInfo;
  let approvalData = req.body;
  let agreementId = req.params.id;
  const result = await agreementService.approveAgreement(approvalData, agreementId, user);
  res.status(httpStatus.CREATED).send(getSuccessResponse(httpStatus.CREATED, 'approval submitted successfully', result));
});

const createPersonalInfo = catchAsync(async (req, res) => {
  let { user } = req.loggerInfo;
  let personalinfoData = req.body;
  let prescriptionId = req.params.id;
  if (user.department !== 'patient') {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized to submit personal info form');
  }
  const result = await prescriptionService.createPersonalInfo(personalinfoData, prescriptionId, user);
  res
    .status(httpStatus.CREATED)
    .send(getSuccessResponse(httpStatus.CREATED, 'Personal Info form submitted successfully', result));
});

// const createDiagnosis = catchAsync(async (req, res) => {
//   let { user } = req.loggerInfo;
//   let diagnosisData = req.body;
//   let prescriptionId = req.params.id;
//   if (user.department !== 'doctor') {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized to submit diagnosis form');
//   }
//   const result = await prescriptionService.createDiagnosis(diagnosisData, prescriptionId, user);
//   res.status(httpStatus.CREATED).send(getSuccessResponse(httpStatus.CREATED, 'Diagnosis submitted successfully', result));
// });

const createDiagnosis = catchAsync(async (req, res) => {
  let { user } = req.loggerInfo;
  let diagnosisData = req.body;
  let prescriptionId = req.params.id;
  if (user.department !== 'doctor') {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized to submit diagnosis form');
  }
  const result = await prescriptionService.createDiagnosis(diagnosisData, prescriptionId, user);
  res
    .status(httpStatus.CREATED)
    .send(getSuccessResponse(httpStatus.CREATED, 'Medication form submitted successfully', result));
});

const createMedication = catchAsync(async (req, res) => {
  let { user } = req.loggerInfo;
  let medicationData = req.body;
  let prescriptionId = req.params.id;
  if (user.department !== 'doctor') {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized to submit medication form');
  }
  const result = await prescriptionService.createMedication(medicationData, prescriptionId, user);
  res
    .status(httpStatus.CREATED)
    .send(getSuccessResponse(httpStatus.CREATED, 'Medication form submitted successfully', result));
});

const createMedCount = catchAsync(async (req, res) => {
  let { user } = req.loggerInfo;
  let medcountData = req.body;
  let prescriptionId = req.params.id;
  if (user.department !== 'pharmacist') {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized to submit medcount form');
  }
  const result = await prescriptionService.createMedCount(medcountData, prescriptionId, user);
  res
    .status(httpStatus.CREATED)
    .send(getSuccessResponse(httpStatus.CREATED, 'Medcount form submitted successfully', result));
});

const getSignedURL = catchAsync(async (req, res) => {
  let { user } = req.loggerInfo;
  let docId = req.params.id;
  let url = await prescriptionService.getDocSignedURL(docId, user);
  res
    .status(httpStatus.OK)
    .send(getSuccessResponse(httpStatus.OK, 'Signed URL fetched successfully', { signedURL: url, docId }));
});

const getPrescriptions = catchAsync(async (req, res) => {
  const { pageSize, bookmark, filterType } = req.query;

  let { orgId, email } = req.loggerInfo.user;
  let orgName = `org${orgId}`;

  let filter = {
    orgId: parseInt(req.loggerInfo.user.orgId),
    pageSize: pageSize || 10,
    bookmark: bookmark || '',
    orgName,
    email,
    filterType,
  };

  console.log(filter);

  let data = await prescriptionService.queryPrescriptions(filter);
  if (data?.data) {
    data.data = data.data.map((elm) => elm.Record);
  }

  res.status(httpStatus.OK).send(getSuccessResponse(httpStatus.OK, 'Users fetched successfully', data));
});

const getHistoryById = catchAsync(async (req, res) => {
  const { id } = req.params;

  let { user } = req.loggerInfo;
  let data = await agreementService.queryHistoryById(id, user);

  res.status(httpStatus.OK).send(getSuccessResponse(httpStatus.OK, 'Agreement fetched successfully', data));
});

const getApprovalsByAgreementId = catchAsync(async (req, res) => {
  const { pageSize, bookmark } = req.query;
  const agreementId = req.params.id;
  let { orgId, email } = req.loggerInfo.user;
  let orgName = `org${orgId}`;

  let filter = {
    orgId: parseInt(req.loggerInfo.user.orgId),
    pageSize: pageSize || '10',
    bookmark: bookmark || '',
    orgName,
    email,
    agreementId,
  };

  let data = await agreementService.queryApprovalsByAgreementId(filter);
  data = data.data.map((elm) => elm.Record);
  res.status(httpStatus.OK).send(getSuccessResponse(httpStatus.OK, 'Users fetched successfully', { approvals: data }));
});

const getPersonalInfosByPrescriptionId = catchAsync(async (req, res) => {
  const { pageSize, bookmark } = req.query;
  const prescriptionId = req.params.id;
  let { orgId, email } = req.loggerInfo.user;
  let orgName = `org${orgId}`;

  let filter = {
    orgId: parseInt(req.loggerInfo.user.orgId),
    pageSize: pageSize || '10',
    bookmark: bookmark || '',
    orgName,
    email,
    prescriptionId,
  };

  let data = await prescriptionService.queryPersonalInfosByPrescriptionId(filter);
  data = data.data.map((elm) => elm.Record);
  res
    .status(httpStatus.OK)
    .send(getSuccessResponse(httpStatus.OK, 'Personal Info fetched successfully', { personalinfos: data }));
});

const getDiagnosesByPrescriptionId = catchAsync(async (req, res) => {
  const { pageSize, bookmark } = req.query;
  const prescriptionId = req.params.id;
  let { orgId, email, department } = req.loggerInfo.user;
  let orgName = `org${orgId}`;

  let filter = {
    orgId: parseInt(req.loggerInfo.user.orgId),
    pageSize: pageSize || '10',
    bookmark: bookmark || '',
    orgName,
    email,
    prescriptionId,
  };
  // if (department !== 'doctor' || department !== 'patient') {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized to access this form');
  // }

  let data = await prescriptionService.queryDiagnosesByPrescriptionId(filter);
  data = data.data.map((elm) => elm.Record);
  res.status(httpStatus.OK).send(getSuccessResponse(httpStatus.OK, 'Diagnosis fetched successfully', { diagnoses: data }));
});

const getMedicationsByPrescriptionId = catchAsync(async (req, res) => {
  const { pageSize, bookmark } = req.query;
  const prescriptionId = req.params.id;
  let { orgId, email, department } = req.loggerInfo.user;
  let orgName = `org${orgId}`;

  let filter = {
    orgId: parseInt(req.loggerInfo.user.orgId),
    pageSize: pageSize || '10',
    bookmark: bookmark || '',
    orgName,
    email,
    prescriptionId,
  };
  // if (department !== 'doctor') {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized to access this form');
  // }

  let data = await prescriptionService.queryMedicationsByPrescriptionId(filter);
  data = data.data.map((elm) => elm.Record);
  res
    .status(httpStatus.OK)
    .send(getSuccessResponse(httpStatus.OK, 'Medications fetched successfully', { medications: data }));
});

const getMedCountsByPrescriptionId = catchAsync(async (req, res) => {
  const { pageSize, bookmark } = req.query;
  const prescriptionId = req.params.id;
  let { orgId, email, department } = req.loggerInfo.user;
  let orgName = `org${orgId}`;

  let filter = {
    orgId: parseInt(req.loggerInfo.user.orgId),
    pageSize: pageSize || '10',
    bookmark: bookmark || '',
    orgName,
    email,
    prescriptionId,
  };
  // if (department !== 'pharmacist') {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized to access this form');
  // }

  let data = await prescriptionService.queryMedCountsByPrescriptionId(filter);
  data = data.data.map((elm) => elm.Record);
  res
    .status(httpStatus.OK)
    .send(getSuccessResponse(httpStatus.OK, 'Medication Counts fetched successfully', { medcounts: data }));
});

const getPrescriptionById = catchAsync(async (req, res) => {
  const { id } = req.params;

  let { user } = req.loggerInfo;
  let data = await prescriptionService.queryPrescriptionById(id, user);

  res.status(httpStatus.OK).send(getSuccessResponse(httpStatus.OK, 'Prescription fetched successfully', data));
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.status(httpStatus.OK).send(getSuccessResponse(httpStatus.OK, 'User fetched successfully', user));
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPrescription,
  createPersonalInfo,
  createDiagnosis,
  createMedication,
  createMedCount,
  getPrescriptions,
  getUser,
  updateUser,
  deleteUser,
  getPrescriptionById,
  approveAgreement,
  getPersonalInfosByPrescriptionId,
  getDiagnosesByPrescriptionId,
  getMedicationsByPrescriptionId,
  getMedCountsByPrescriptionId,
  getSignedURL,
  getHistoryById,
};
