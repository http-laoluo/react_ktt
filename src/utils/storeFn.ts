import { ReactNode } from "react"
import LazyLoad from "./lazyLoad"

interface OriginItemType {
    path: string
    name: string
    component?: string
    children?: OriginItemType[]
}
interface MenuItemType {
    key: string
    label: string
    children?: MenuItemType[]
}
export const formaterMenu = (list: Array<OriginItemType>) => {
    let temp: MenuItemType[] = [];
    list.forEach(element => {
        let obj: MenuItemType = { key: element.path, label: element.name }
        if(obj.key.includes(":id")){
            obj.key = obj.key.replace(':id','1')
        }
        if (element.children) {
            obj.children = formaterMenu(element.children)
        }
        temp.push(obj)
    });
    return temp;
}

interface RouteItemType {
    path: string
    element: ReactNode
}
export const formaterRoutes = (list: Array<OriginItemType>): Array<RouteItemType> => {
    let temp: RouteItemType[] = []
    list.forEach((item: OriginItemType) => {
        if (item.component) {
            let obj = {
                path: item.path.slice(7, item.path.length),
                element: LazyLoad(item.component.slice(0, -4))
            }
     
            temp.push(obj)
        } else {
            if (item.children) {
                let arr = formaterRoutes(item.children)
                temp = temp.concat(arr)
            }
        }

    })
    return temp;
}
export const formaterRoutes2 = (list: Array<RouteItemType>): Array<RouteItemType> => {
    let temp: RouteItemType[] = []
    list.forEach((item: any) => {
        if (item.path) {
            let obj = {
                path: item.path,
                element: LazyLoad(item.component)
            }
            temp.push(obj)
        }

    })
    return temp;
}