import { ActionType } from "../../types";
import { formaterRoutes } from "../../utils/storeFn";
import { SET_MENU, SET_ROUTES, SET_TOKEN, SET_USER } from "../Type";
let meneList = sessionStorage.getItem('menu')==null?'[]':sessionStorage.getItem('menu')
let menu:any[] = JSON.parse(meneList as string)
let routesList = sessionStorage.getItem('routes')==null?`[]`:sessionStorage.getItem('routes')
let routes:any[] =formaterRoutes(JSON.parse(routesList as string))
let userObj = sessionStorage.getItem('userInfo')==null?`{}`:sessionStorage.getItem('userInfo')
let userInfo:any =JSON.parse(userObj as string)
const initialState = {
    userInfo:userInfo,
    token:"",
    menu,
    routes,
}
function reducer (state = initialState,action:ActionType){
   switch(action.type){
     case SET_USER:
        return {...state,userInfo:action.payload}
     case SET_TOKEN:
        return {...state,token:action.payload}
     case SET_ROUTES :
        return {...state,routes:action.payload}
     case SET_MENU :
        return {...state,menu:action.payload}
     default :
        return state
   }
}

export default reducer