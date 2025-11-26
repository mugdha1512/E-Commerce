import axios from "axios";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS } from "./ActionType";
import { API_BASE_URL } from "../../config/apiConfig";



export const createOrder = (reqData)=> async(dispatch)=>{
    //console.log("req data", reqData);
     dispatch({type: CREATE_ORDER_REQUEST});

    try {
       
        /*
        const config ={
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${reqData.jwt}`,
            },
        };
        */

        const {data} =await api.post(  //other than axios we used api here
            `/api/orders`,
            reqData.address,
            //config
        );

        if(data.id){
            reqData.navigate({ search: `step=3&order_id=${data.id}`});
        }
        console.log("created order - ", data);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log("catch error :", error);
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.message,
            /*error.response && error.response.data.messsage
                ? error.response.data.messsage
                : error.messsage,
                */
        });
        
    }
};

export const getOrderById = (orderId)=> async (dispatch)=>{
    dispatch({type: GET_ORDER_BY_ID_REQUEST});
    try{
        const{ data } =await api.get(
            `/api/orders/${orderId}`,

        );

        console.log("oredr by id ", data);
        dispatch({
            type: GET_ORDER_BY_ID_SUCCESS,
            payload: error.message
        });
    }
    catch (error){
        console.log("catch ", error)
        dispatch({
            type: GET_ORDER_BY_ID_FAILURE,
            payload: error.message
        });
    }
};