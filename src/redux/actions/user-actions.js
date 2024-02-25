import { getUserDetailService, getUsersListService, userUpdService } from "../../services/user-service"
import { USER_DETAIL, USER_LIST, USER_LIST_ROW_UPD } from "../types";


export const userListAction = (paginator) => (dispatch) => {
    return getUsersListService(paginator).then((resp)=>{
        const list = Object.fromEntries(resp.data.data.map((el)=>[el.id, el]));
        const result = {
            userList: list,
            userListPaginator: {
                first: paginator.first,
                rows: paginator.rows,
                total: resp.data.total
            }
        }

        dispatch({
            type: USER_LIST,
            payload: result
        })

    })
}

export const userListUpdRowAction = (rowData) => (dispatch) => {
    return userUpdService(rowData).then(()=>{
        dispatch({
            type: USER_LIST_ROW_UPD,
            payload: rowData
        })
    })
}

export const userDetailAction = (userId=null) => (dispatch) => {
    
    if (userId) return getUserDetailService(userId).then((resp)=>{
        dispatch({
            type: USER_DETAIL,
            payload: resp.data
        })
    })

    return dispatch({
        type: USER_DETAIL,
        payload: {}
    })
}