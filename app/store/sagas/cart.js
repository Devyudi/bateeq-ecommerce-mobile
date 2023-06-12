import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
    CART_LINE_ITEM_ADD,
    DELETE_CART_LIST_OF_ITEM,
    GENERATE_CART_ID,
    GET_CART_LIST,
    PUT_CART_QTY_ITEM,
    PUT_CART_TOTAL_QTY
} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {REQUEST, SUCCESS,FAILURE} from "../actions/action.type";
export function* __cartGenerateId(){
    yield takeEvery(REQUEST(GENERATE_CART_ID), function*({payload}){
        try {
            if(payload?.id){
                AsyncStorage.setItem('cart', payload?.id)
            }
            yield all([
                put({
                    type: SUCCESS(GENERATE_CART_ID),
                    payload:payload?.id
                })
            ])
        }catch(err){
            yield put({
                type:FAILURE(GENERATE_CART_ID),
                payload:err?.message ?? "Some Error"
            })
        }
    })
}
export function* __putCartQty(){
    yield takeEvery(REQUEST(PUT_CART_TOTAL_QTY), function*({payload}){
        try{
            yield all([
                put({
                    type: SUCCESS(PUT_CART_TOTAL_QTY),
                    payload:payload
                })
            ])
        }catch(err){
            yield put({
                type:FAILURE(PUT_CART_TOTAL_QTY),
                payload:err?.message ?? "Some Error"
            })
        }
    })
}

export default function* rootSaga(){
    yield all([
        fork(__cartGenerateId),
        fork(__putCartQty),
    ])
}