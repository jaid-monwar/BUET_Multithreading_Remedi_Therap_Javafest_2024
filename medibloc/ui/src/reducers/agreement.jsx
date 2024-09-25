import { combineReducers } from 'redux';

import * as AgreementActions from '../actions/agreement'

const initialAgreementsState = []
const initialPersonalInfoState = []
const initialDiagnosisState = []
const initialMedicationState = []
const initialMedcountState = []



function getIsLoading(state = false, action) {
  switch (action.type) {
    case AgreementActions.START_LOADING:
      return true;
    case AgreementActions.END_LOADING:
      return false;
    default:
      return state;
  }
}


// function getAgreements(state = initialAgreementsState, action) {
//   switch (action.type) {
//     case AgreementActions.END_GET_AGREEMENTS:
//       console.log("===============reducer",action)
//       return (action.payload && action.payload) || state;
//     default:
//       return state;
//   }
// }

// function getApprovals(state = initialApprovalState, action){
//   switch (action.type) {
//     case AgreementActions.END_GET_APPROVALS:
//       return action?.payload || state
  
//     default:
//       return state
//   }
// }




//---------------------------------------------------------





function getPrescriptions(state = initialAgreementsState, action) {
  switch (action.type) {
    case AgreementActions.END_GET_PRESCRIPTIONS:
      console.log("===============reducer",action)
      return (action.payload && action.payload) || state;
    default:
      return state;
  }
}

function getPersonalInfo(state = initialPersonalInfoState, action){
  switch (action.type) {
    case AgreementActions.END_GET_PERSONAL_INFO:
      return action?.payload || state
  
    default:
      return state
  }
}

function getDiagnosis(state = initialDiagnosisState, action){
  switch (action.type) {
    case AgreementActions.END_GET_DIAGNOSIS:
      return action?.payload || state
  
    default:
      return state
  }
}

function getMedication(state = initialMedicationState, action){
  switch (action.type) {
    case AgreementActions.END_GET_MEDICATION:
      return action?.payload || state
  
    default:
      return state
  }
}

function getMedcount(state = initialMedcountState, action){
  switch (action.type) {
    case AgreementActions.END_GET_MEDCOUNT:
      return action?.payload || state
  
    default:
      return state
  }
}









const Agreements = combineReducers({

  isLoading: getIsLoading,

  prescriptions:getPrescriptions,
  personalInfos: getPersonalInfo,
  diagnosis: getDiagnosis,
  medication: getMedication,
  medcount:getMedcount,
})

export default Agreements