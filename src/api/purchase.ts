import { GroupBuyType, TagType } from "../types";
import request from "../utils/request";

export function getGroupBuy(params:GroupBuyType){
    return request({
        url:"/api/yp/groupBuy",
        method:'get',
        params
    })
}

export function getTag(params:TagType){
    return request({
        url:"/api/yp/tag",
        method:'get',
        params
    })
}

interface Ptype {
    groupById?:string|number
}
export function getgroupBuyProduct(params:Ptype){
    return request({
        url:"/api/yp/groupBuyProduct",
        method:'get',
        params
    })
}

