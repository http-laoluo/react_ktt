import { GroupBuyType, GroupProType, ProductType, TagType } from "../types";
import request from "../utils/request";

export function getGroupBuy(params: GroupBuyType) {
    return request({
        url: "/api/yp/groupBuy",
        method: 'get',
        params
    })
}

export function getTag(params: TagType) {
    return request({
        url: "/api/yp/tag",
        method: 'get',
        params
    })
}

interface Ptype {
    groupById?: string | number
}
export function getgroupBuyProduct(params: Ptype) {
    return request({
        url: "/api/yp/groupBuyProduct",
        method: 'get',
        params
    })
}
interface Stype {
    id?: string | number
    size?: number
    current?: number
}
// 获取店铺
export function getShops(params: Stype) {
    return request.get("/api/yp/shop", { params })
}
//  定义获取商品的接口
export function getProduts(params: ProductType) {
    return request.get("/api/yp/product", { params })
}

// 定义添加团购商品的接口
export function addGroupProduct(data: GroupProType) {
    return request.post("/api/yp/groupBuyProduct", data)
}
// 定义添加团购信息
export function addGroupInfo(data: GroupBuyType) {
    return request.post("/api/yp/groupBuy", data)
}
// 更新团购信息
export function UpdateGroupInfo(data: GroupBuyType) {
    return request.put("/api/yp/groupBuy", data)
}