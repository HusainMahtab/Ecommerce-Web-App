import axios from "axios"

import { 
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    CLEAR_ERRORS 
} from "../constants/productConstant"

export const getProduct=()=>async(dispatch)=>{
    try {
        dispatch({
            type:ALL_PRODUCTS_REQUEST
        })
        const {data} =await axios.get(`/api/v1/products`)
        console.log("data",data)

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}

export const clearErrors=()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}