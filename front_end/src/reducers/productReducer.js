import { 
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    CLEAR_ERRORS 
} from "../constants/productConstant"

export const productReducer=(state={products:[]},action)=>{
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            
            return {
                loading:true,
                product:[]
            }

            case ALL_PRODUCT_SUCCESS:
            
            return {
                loading:false,
                product:action.payload.products,
                productCount:action.payload.productCount
            }

            case ALL_PRODUCT_FAIL :
            
            return {
                loading:false,
                error:action.payload
            }
            
            case CLEAR_ERRORS:

            return {
                ...state,
                error:null
            }
            
            
    
        default:
            return state
    }
}

