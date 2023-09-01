import request from "../utils/request";

import {UserType, resType} from "../types"
import { AxiosResponse } from "axios";

export  function login(data:UserType):Promise<AxiosResponse<resType>>{
    return request({
       url:'/api/login',
       method:'post',
       data
    })
 }
 export  function getUserMenu(){
    return request({
       url:'/api/yp/user_permission',
       method:'get',
    })
 }
  