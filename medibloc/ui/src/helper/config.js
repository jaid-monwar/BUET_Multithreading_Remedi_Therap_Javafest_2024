// exports.const= {
//     API_BASE_URL='localhost:3001/api/v2'
// }

let BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000/v1";

export const routes = {
  register: `${BASE_URL}/users`,

  login: `${BASE_URL}/auth/login`,
  registerUser: `${BASE_URL}/auth/register`,
  logout: `${BASE_URL}/auth/logout`,

  updateUserStatus: `${BASE_URL}/users/`,
  getUsers: `${BASE_URL}/users`,
  createUser: `${BASE_URL}/users`,
  getDoctors: `${BASE_URL}/users/doctors`,
  getPharmacists: `${BASE_URL}/users/pharmacists`,
  updateUserAccess: `${BASE_URL}/users/access/`,

  getPrescriptionById: `${BASE_URL}/prescriptions/`,
  createPrescription: `${BASE_URL}/prescriptions`,
  getPrescriptions: `${BASE_URL}/prescriptions`,

  createPersonalInfo: `${BASE_URL}/prescriptions/personalinfo/`,
  createDiagnosis: `${BASE_URL}/prescriptions/diagnosis/`,
  createMedcount: `${BASE_URL}/prescriptions/medcount/`,
  createMedication: `${BASE_URL}/prescriptions/medication/`,

  getPersonalInfo: `${BASE_URL}/prescriptions/personalinfo/`,
  getDiagnosis: `${BASE_URL}/prescriptions/diagnosis/`,
  getMedcount: `${BASE_URL}/prescriptions/medcount/`,
  getMedication: `${BASE_URL}/prescriptions/medication/`,

  getAgreements: `${BASE_URL}/agreements`,
  createAgreement: `${BASE_URL}/agreements`,
  getApprovals: `${BASE_URL}/agreements/approvals/`,
  approveAgreement: `${BASE_URL}/agreements/approvals/`,
  getAgreementHistory: `${BASE_URL}/agreements/history`,

  activateUser: `${BASE_URL}/users/activate`,
  deActivateUser: `${BASE_URL}/users/deactivate`,
  // getAllContracts: `${BASE_URL}/fabric/channels/mychannel/chaincodes/contract_cc?args=['1']&fcn=GetContractsForQuery`,
  // getExpiringContracts: `${BASE_URL}/fabric/channels/mychannel/chaincodes/contract_cc?args=['1']&fcn=GetInProgressContract`,
  // addContract:`${BASE_URL}/fabric/channels/mychannel/chaincodes/contract_cc`,
  // getContractHistory: `${BASE_URL}/fabric/channels/mychannel/chaincodes/contract_cc?fcn=GetHistoryForAsset&`
};

export const headers = () => {
  let headers = { "Content-Type": "application/json" };
  let token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return { headers };
};
