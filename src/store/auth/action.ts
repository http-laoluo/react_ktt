import { Dispatch } from "redux";
import { getUserMenu, login as loginApi} from "../../api/auth";
import { SET_MENU, SET_ROUTES, SET_TOKEN, SET_USER } from "../Type";
import { UserType } from "../../types";
import type { ReactNode } from "react";
import LazyLoad from "../../utils/lazyLoad";
import { formaterMenu, formaterRoutes } from "../../utils/storeFn";

export function login(data:UserType,callback?:Function){
    return (dispatch:Dispatch<any>)=>{
         loginApi(data).then((res)=>{
               if(res.data.code===200){
                sessionStorage.setItem('token',res.data.token)
                sessionStorage.setItem('userInfo',JSON.stringify(res.data.user))
                dispatch({type:SET_TOKEN,payload:res.data.token})
                dispatch({type:SET_USER,payload:res.data.user})
                if(callback){
                    callback()
                }
                dispatch(getMenu())
            }
         })
    }
}

 export function getMenu(){
    return (dispatch:Dispatch)=>{
        getUserMenu().then((res)=>{
            console.log(res);
            sessionStorage.setItem('menu',JSON.stringify(formaterMenu(res.data.list)))
            sessionStorage.setItem('routes',JSON.stringify(res.data.list))
            // 更新redux menu
            dispatch({type:SET_MENU,payload:formaterMenu(res.data.list)})
            // 更新redex路由
            // console.log(formaterRoutes(res.data.list),'///////////////////////');
            
            dispatch({type:SET_ROUTES,payload:formaterRoutes(res.data.list).reverse()})
            // dispatch({type:SET_ROUTES,payload:formaterRoutes2(res.data.route)})
        })
    }
}