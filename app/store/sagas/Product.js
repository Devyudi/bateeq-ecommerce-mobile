import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";
import {GET_PROD_COLL_SEARCH} from "../constants/product";
import {gql} from "@apollo/client";
import {client} from "../../../index";


export function* __productSearch(){
    yield takeEvery(REQUEST(GET_PROD_COLL_SEARCH),function*({payload}){
        try{

            const gql1 = gql`query GetProducts($first: Int!, $query: String!) {
                products(first: $first, query: $query) {
                    nodes {
                        id
                        title

                        description
                        descriptionHtml
                        images(first: 4) {
                            nodes{
                                url
                            }
                        }
                        variants(first: 5) {
                            nodes {
                                id
                                weight
                                title
                                quantityAvailable
                                currentlyNotInStock
                                weightUnit
                                price {
                                    amount
                                    currencyCode
                                }
                                compareAtPrice {
                                    amount
                                    currencyCode
                                }
                                selectedOptions {
                                    name
                                    value
                                }
                            }
                        }
                    }
                }
            }`

            let response = yield call(client.query, {query:gql1,variables: { first:payload?.first ?? 10, query:payload?.query }});
            response = response?.data?.product?.nodes ?? []

            yield put({
                type:SUCCESS(GET_PROD_COLL_SEARCH),
                payload:response
            })
            // CALLBACK AFTER CALL SERVICES
            // yield all([
            //     put({
            //         type:SUCCESS(GET_PROD_COLL_SEARCH)
            //     })
            // ])
        }catch(err){
            yield put({
                type:FAILURE(GET_PROD_COLL_SEARCH)
            })
        }
    })
}



export default function* rootSaga(){
    yield all([
        fork(__productSearch)
    ])
}