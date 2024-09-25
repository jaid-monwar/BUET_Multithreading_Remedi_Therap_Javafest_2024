import { headers, routes } from '../helper/config';
import { createAction } from '../helper/utils';
import { DEFAULT_PAGE_NUMBER, RECORDS_PER_PAGE } from '../utils/Constants';


const axios = require('axios')






export const START_GET_ALL_PRODUCTS = `START_GET_ALL_PRODUCTS`;
export const END_GET_ALL_PRODUCTS = `END_GET_ALL_PRODUCTS`;


export const START_GET_AGREEMENTS = `START_GET_AGREEMENTS`;
export const END_GET_AGREEMENTS = `END_GET_AGREEMENTS`;





















export const START_GET_PRESCRIPTIONS = `START_GET_PRESCRIPTIONS`;
export const END_GET_PRESCRIPTIONS = `END_GET_PRESCRIPTIONS`;


export const START_CREATE_PRESCRIPTION = `START_CREATE_PRESCRIPTION`
export const END_CREATE_PRESCRIPTION = `END_CREATE_PRESCRIPTION`


//-------------------------------------------------------


export const START_CREATE_PERSONAL_INFO = `START_CREATE_PERSONAL_INFO`
export const END_CREATE_PERSONAL_INFO = `END_CREATE_PERSONAL_INFO`

export const START_CREATE_MEDICATION = `START_CREATE_MEDICATION`
export const END_CREATE_MEDICATION = `END_CREATE_MEDICATION`

export const START_CREATE_DIAGNOSIS = `START_CREATE_DIAGNOSIS`
export const END_CREATE_DIAGNOSIS = `END_CREATE_DIAGNOSIS`

export const START_CREATE_MEDCOUNT = `START_CREATE_MEDCOUNT`
export const END_CREATE_MEDCOUNT = `END_CREATE_MEDCOUNT`


//-------------------------------------------------------


export const START_GET_PERSONAL_INFO = `START_GET_PERSONAL_INFO`
export const END_GET_PERSONAL_INFO = `END_GET_PERSONAL_INFO`

export const START_GET_MEDICATION = `START_GET_MEDICATION`
export const END_GET_MEDICATION = `END_GET_MEDICATION`

export const START_GET_DIAGNOSIS = `START_GET_DIAGNOSIS`
export const END_GET_DIAGNOSIS = `END_GET_DIAGNOSIS`

export const START_GET_MEDCOUNT = `START_GET_MEDCOUNT`
export const END_GET_MEDCOUNT = `END_GET_MEDCOUNT`


//-------------------------------------------------------
















export const START_GET_AGREEMENTS_HISTORY = `START_GET_AGREEMENTS_HISTORY`;
export const END_GET_AGREEMENTS_HISTORY = `END_GET_AGREEMENTS_HISTORY`;


export const START_CREATE_AGREEMENTS = `START_CREATE_AGREEMENTS`;
export const END_CREATE_AGREEMENTS = `END_CREATE_AGREEMENTS`;


export const START_GET_APPROVALS = `START_GET_APPROVALS`;
export const END_GET_APPROVALS = `END_GET_APPROVALS`;


export const START_APPROVE_AGREEMENT = `START_APPROVE_AGREEMENT`;
export const END_APPROVE_AGREEMENT = `END_APPROVE_AGREEMENT`;


export const START_LOADING = `START_LOADING`;
export const END_LOADING = `END_LOADING`;


export const startLoading = () => createAction(START_LOADING)


export const endLoading = () => createAction(END_LOADING)




export function getAgreements(data) {
    let queryParams = '';
    console.log("==========paginatiion------------===========", data)
    if (data) {
        data.pageSize = data?.pageSize || RECORDS_PER_PAGE
        if (data?.bookmark) {
            queryParams = `bookmark=${data.bookmark}`
        }
        if (data.pageSize) {
            if (queryParams) {
                queryParams = `${queryParams}&pageSize=${data.pageSize}`
            } else {
                queryParams = `pageSize=${data.pageSize}`
            }
        }
        if (data.filterType) {
            queryParams = `${queryParams}&filterType=${data.filterType}`
        } else {
            queryParams = `${queryParams}&filterType=inprogress`
        }
    } else {
        queryParams = `pageSize=${RECORDS_PER_PAGE}&filterType=inprogress`
    }


    console.log("==========queryParams2222222222222222222222222------------===========", queryParams)


    return dispatch => {
        dispatch(createAction(START_GET_AGREEMENTS));
        dispatch(createAction(START_LOADING))
        return axios.get(`${routes.getAgreements}?${queryParams}`, headers())
            .then(response => {
                console.log(`Contract fetched successfully`)
                console.log(response.data)
                dispatch(createAction(END_GET_AGREEMENTS, response.data.payload));
                console.log("Response from api==========", response.data)
                console.log(response.data.data)
                return response.data.payload
            }).catch(err => {
                dispatch(createAction(END_GET_AGREEMENTS));
                console.log("Error occurred", err)
                console.log(`Error Occurred while getting contract : ${err}`)
                return null
            }).finally(() => {
                dispatch(createAction(END_LOADING))
            })
    }
}


export function getAgreementApprovals(id) {


    return dispatch => {
        dispatch(createAction(START_GET_APPROVALS));
        dispatch(createAction(START_LOADING))
        return axios.get(`${routes.getApprovals}${id}`, headers())
            .then(response => {
                console.log(`Contract fetched successfully`)
                console.log("============response.data=============", response.data)
                dispatch(createAction(END_GET_APPROVALS, response?.data?.payload?.approvals));
                console.log("Response from api==========", response.data)
                console.log(response.data.data)
                return response?.data?.payload?.approvals
            }).catch(err => {
                if (err.response) {
                    console.log("action ======================error-------------------------------------==================", JSON.stringify(err.response))
                    dispatch(createAction(END_GET_APPROVALS, null, err.response.data))
                    throw err.response.data.message.toString()


                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
            }).finally(() => {
                dispatch(createAction(END_LOADING))
            })
    }
}


export function getAgreementHistory(id) {


    return dispatch => {
        dispatch(createAction(START_GET_AGREEMENTS_HISTORY));
        dispatch(createAction(START_LOADING))
        return axios.get(`${routes.getAgreementHistory}/${id}`, headers())
            .then(response => {
                console.log(`Contract fetched successfully`)
                console.log("============response.data=============", response.data)
                dispatch(createAction(END_GET_AGREEMENTS_HISTORY, response?.data?.payload));
                console.log("Response from api==========", response.data)
                console.log(response.data.data)
                return response?.data?.payload
            }).catch(err => {
                if (err.response) {
                    console.log("action ======================error-------------------------------------==================", JSON.stringify(err.response))
                    dispatch(createAction(END_GET_AGREEMENTS_HISTORY, null, err.response.data))
                    throw err.response.data.message.toString()


                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
            }).finally(() => {
                dispatch(createAction(END_LOADING))
            })
    }
}


export function approveAgreement(data) {
    return dispatch => {
        dispatch(createAction(START_APPROVE_AGREEMENT));
        dispatch(createAction(START_LOADING))
        return axios.post(`${routes.approveAgreement}${data.id}`, data.body, headers())
            .then(resp => {
                console.log("action : getting response ======================resp==================", resp)
                if (resp && resp.data) {
                    // dispatch(createAction(END_ADD_USERS, resp.data))
                    return resp?.data?.message
                }
            }).catch(err => {
                if (err.response) {
                    console.log("action ======================error-------------------------------------==================", JSON.stringify(err.response))
                    // dispatch(createAction(END_ADD_USERS, null, err.response.data))
                    throw err?.response?.data?.message?.toString()


                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
            }).finally(() => {
                dispatch(createAction(END_LOADING))
                dispatch(createAction(END_APPROVE_AGREEMENT));
            })
    }
}


export function createAgreement(data) {
    return dispatch => {
        dispatch(createAction(START_CREATE_AGREEMENTS));
        dispatch(createAction(START_LOADING))
        return axios.post(routes.createAgreement, data, headers())
            .then(resp => {
                console.log("action : getting response ======================resp==================", resp)
                if (resp && resp.data) {
                    // dispatch(createAction(END_ADD_USERS, resp.data))
                    return resp?.data?.message
                }
            }).catch(err => {
                if (err.response) {
                    console.log("action ======================error-------------------------------------==================", JSON.stringify(err.response))
                    // dispatch(createAction(END_ADD_USERS, null, err.response.data))
                    throw err?.response?.data?.message?.toString()


                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
            }).finally(() => {
                dispatch(createAction(END_LOADING))
                dispatch(createAction(END_CREATE_AGREEMENTS));
            })
    }
}






//-------------------------------------------------------


export function createPrescripton(data) {
    return dispatch => {
        dispatch(createAction(START_CREATE_PRESCRIPTION));
        dispatch(createAction(START_LOADING))
        return axios.post(routes.createPrescription, data, headers())
            .then(resp => {
                console.log("action : getting response ======================resp==================", resp)
                if (resp && resp.data) {
                    // dispatch(createAction(END_ADD_USERS, resp.data))
                    return resp?.data?.message
                }
            }).catch(err => {
                if (err.response) {
                    console.log("action ======================error-------------------------------------==================", JSON.stringify(err.response))
                    // dispatch(createAction(END_ADD_USERS, null, err.response.data))
                    throw err?.response?.data?.message?.toString()


                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
            }).finally(() => {
                dispatch(createAction(END_LOADING))
                dispatch(createAction(END_CREATE_PRESCRIPTION));
            })
    }
}
export function getPrescriptions(data) {
    let queryParams = '';
    console.log("==========paginatiion------------===========", data)
    if (data) {
        data.pageSize = data?.pageSize || RECORDS_PER_PAGE
        if (data?.bookmark) {
            queryParams = `bookmark=${data.bookmark}`
        }
        if (data.pageSize) {
            if (queryParams) {
                queryParams = `${queryParams}&pageSize=${data.pageSize}`
            } else {
                queryParams = `pageSize=${data.pageSize}`
            }
        }
        if (data.filterType) {
            queryParams = `${queryParams}&filterType=${data.filterType}`
        } 
    } else {
        queryParams = `pageSize=${RECORDS_PER_PAGE}&filterType=all`
    }


    console.log("==========queryParams2222222222222222222222222------------===========", queryParams)


    return dispatch => {
        dispatch(createAction(START_GET_PRESCRIPTIONS));
        dispatch(createAction(START_LOADING))
        return axios.get(`${routes.getPrescriptions}?${queryParams}`, headers())
            .then(response => {
                console.log(`Contract fetched successfully`)
                console.log(response.data)
                dispatch(createAction(END_GET_PRESCRIPTIONS, response.data.payload));
                console.log("Response from api==========", response.data)
                console.log(response.data.data)
                return response.data.payload
            }).catch(err => {
                dispatch(createAction(END_GET_PRESCRIPTIONS));
                console.log("Error occurred", err)
                console.log(`Error Occurred while getting contract : ${err}`)
                return null
            }).finally(() => {
                dispatch(createAction(END_LOADING))
            })
    }
}



export function createPersonalInfo(data) {
    return dispatch => {
        dispatch(createAction(START_CREATE_PERSONAL_INFO));
        dispatch(createAction(START_LOADING))
        return axios.post(`${routes.createPersonalInfo}${data.id}`, data.body, headers())
            .then(resp => {
                console.log("action : getting response ======================resp==================", resp)
                if (resp && resp.data) {
                    // dispatch(createAction(END_ADD_USERS, resp.data))
                    return resp?.data?.message
                }
            }).catch(err => {
                if (err.response) {
                    console.log("action ======================error-------------------------------------==================", JSON.stringify(err.response))
                    // dispatch(createAction(END_ADD_USERS, null, err.response.data))
                    throw err?.response?.data?.message?.toString()


                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
            }).finally(() => {
                dispatch(createAction(END_LOADING))
                dispatch(createAction(END_CREATE_PERSONAL_INFO));
            })
    }
}
export function createDiagnosis(data) {
    return dispatch => {
        dispatch(createAction(START_CREATE_DIAGNOSIS));
        dispatch(createAction(START_LOADING))
        return axios.post(`${routes.createDiagnosis}${data.id}`, data.body, headers())
            .then(resp => {
                console.log("action : getting response ======================resp==================", resp)
                if (resp && resp.data) {
                    // dispatch(createAction(END_ADD_USERS, resp.data))
                    return resp?.data?.message
                }
            }).catch(err => {
                if (err.response) {
                    console.log("action ======================error-------------------------------------==================", JSON.stringify(err.response))
                    // dispatch(createAction(END_ADD_USERS, null, err.response.data))
                    throw err?.response?.data?.message?.toString()


                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
            }).finally(() => {
                dispatch(createAction(END_LOADING))
                dispatch(createAction(END_CREATE_DIAGNOSIS));
            })
    }
}
export function createMedication(data) {
    return dispatch => {
        dispatch(createAction(START_CREATE_MEDICATION));
        dispatch(createAction(START_LOADING))
        return axios.post(`${routes.createMedication}${data.id}`, data.body, headers())
            .then(resp => {
                console.log("action : getting response ======================resp==================", resp)
                if (resp && resp.data) {
                    // dispatch(createAction(END_ADD_USERS, resp.data))
                    return resp?.data?.message
                }
            }).catch(err => {
                if (err.response) {
                    console.log("action ======================error-------------------------------------==================", JSON.stringify(err.response))
                    // dispatch(createAction(END_ADD_USERS, null, err.response.data))
                    throw err?.response?.data?.message?.toString()


                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
            }).finally(() => {
                dispatch(createAction(END_LOADING))
                dispatch(createAction(END_CREATE_MEDICATION));
            })
    }
}
export function createMedcount(data) {
    return dispatch => {
        dispatch(createAction(START_CREATE_MEDCOUNT));
        dispatch(createAction(START_LOADING))
        return axios.post(`${routes.createMedcount}${data.id}`, data.body, headers())
            .then(resp => {
                console.log("action : getting response ======================resp==================", resp)
                if (resp && resp.data) {
                    // dispatch(createAction(END_ADD_USERS, resp.data))
                    return resp?.data?.message
                }
            }).catch(err => {
                if (err.response) {
                    console.log("action ======================error-------------------------------------==================", JSON.stringify(err.response))
                    // dispatch(createAction(END_ADD_USERS, null, err.response.data))
                    throw err?.response?.data?.message?.toString()


                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
            }).finally(() => {
                dispatch(createAction(END_LOADING))
                dispatch(createAction(END_CREATE_MEDCOUNT));
            })
    }
}



export function getPersonalInfo(id) {


    return dispatch => {
        dispatch(createAction(START_GET_PERSONAL_INFO));
        dispatch(createAction(START_LOADING))
        return axios.get(`${routes.getPersonalInfo}${id}`, headers())
            .then(response => {
                console.log(`Contract fetched successfully`)
                console.log("============response.data=============", response.data)
                dispatch(createAction(END_GET_PERSONAL_INFO, response?.data?.payload?.personalinfos));
                console.log("Response from api==========", response.data)
                console.log(response.data.data)
                return response?.data?.payload?.personalinfos
            }).catch(err => {
                if (err.response) {
                    console.log("action ======================error-------------------------------------==================", JSON.stringify(err.response))
                    dispatch(createAction(END_GET_PERSONAL_INFO, null, err.response.data))
                    throw err.response.data.message.toString()


                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
            }).finally(() => {
                dispatch(createAction(END_LOADING))
            })
    }
}
export function getDiagnosis(id) {


    return dispatch => {
        dispatch(createAction(START_GET_DIAGNOSIS));
        dispatch(createAction(START_LOADING))
        return axios.get(`${routes.getDiagnosis}${id}`, headers())
            .then(response => {
                console.log(`Contract fetched successfully`)
                console.log("============response.data=============", response.data)
                dispatch(createAction(END_GET_DIAGNOSIS, response?.data?.payload?.diagnoses));
                console.log("Response from api==========", response.data)
                console.log(response.data.data)
                return response?.data?.payload?.diagnoses
            }).catch(err => {
                if (err.response) {
                    console.log("action ======================error-------------------------------------==================", JSON.stringify(err.response))
                    dispatch(createAction(END_GET_DIAGNOSIS, null, err.response.data))
                    throw err.response.data.message.toString()


                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
            }).finally(() => {
                dispatch(createAction(END_LOADING))
            })
    }
}
export function getMedication(id) {

    return dispatch => {
        dispatch(createAction(START_GET_MEDICATION));
        dispatch(createAction(START_LOADING))
        console.log("inside get medication")
        return axios.get(`${routes.getMedication}${id}`, headers())
            .then(response => {
                console.log(`Contract fetched successfully`)
                console.log("============response.data=============", response.data)
                dispatch(createAction(END_GET_MEDICATION, response?.data?.payload?.medications));
                console.log("Response from api==========", response.data)
                console.log(response.data.data)
                return response?.data?.payload?.medications
            }).catch(err => {
                if (err.response) {
                    console.log("action ======================error-------------------------------------==================", JSON.stringify(err.response))
                    dispatch(createAction(END_GET_MEDICATION, null, err.response.data))
                    throw err.response.data.message.toString()


                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
            }).finally(() => {
                dispatch(createAction(END_LOADING))
            })
    }
}
export function getMedcount(id) {


    return dispatch => {
        dispatch(createAction(START_GET_MEDCOUNT));
        dispatch(createAction(START_LOADING))
        return axios.get(`${routes.getMedcount}${id}`, headers())
            .then(response => {
                console.log(`Contract fetched successfully`)
                console.log("============response.data=============", response.data)
                dispatch(createAction(END_GET_MEDCOUNT, response?.data?.payload?.medcounts));
                console.log("Response from api==========", response.data)
                console.log(response.data.data)
                return response?.data?.payload?.medcounts
            }).catch(err => {
                if (err.response) {
                    console.log("action ======================error-------------------------------------==================", JSON.stringify(err.response))
                    dispatch(createAction(END_GET_MEDCOUNT, null, err.response.data))
                    throw err.response.data.message.toString()


                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', err.message);
                }
            }).finally(() => {
                dispatch(createAction(END_LOADING))
            })
    }
}






export function getAllProducts() {
    return dispatch => {
        dispatch(createAction(START_GET_ALL_PRODUCTS));
        return axios.get("url", headers())
            .then(response => {
                console.log(`Contract fetched successfully`)
                console.log(response.data)
                dispatch(createAction(END_GET_ALL_PRODUCTS, response.data.data));
                console.log("Response from api==========", response.data)
                console.log(response.data.data)
                return response.data.data
            }).catch(err => {
                dispatch(createAction(END_GET_ALL_PRODUCTS));
                console.log("Error occured", err)
                console.log(`Error Occured while getting contract : ${err}`)
                return null
            })


    }
}
