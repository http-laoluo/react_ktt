// purchase 接口类型
export interface GroupBuyType {
    order?:string
    state?:string
    id?:number | string
    name?:string
    products?:string
    startTime?:string
    endTime?:string
    current?:number
    shop?:string
    pageSize?:string|number
    slogan?:string
    preTime?:string
    showHome?:number|string
    tag?:string
    target?:number|string
    limitBuy?:number
    deliverWay?:number|string
    pickTime?:string
    size?:string|number
    homePic?:string
    banner?:string
    showType?:string|number
}

// api 类型
export interface resType {
    code:number
    msg?:string
    token:string
    user:any
}

export interface UserType {
   name:string
   password:string
}

export interface ActionType {
    type:string
    payload?:any
}
export interface LoginresponseType {
    code:number
    token:string
    user:any
    msg?:string
}

export interface TagType {
    id?:number|string
    name?:string
    pic?:string
}