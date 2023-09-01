import { useSelector } from "react-redux";
import { RootState } from "../store";
import baseRouter from "./baseRouter";
import { RouteObject, useRoutes } from "react-router-dom";
import { useEffect } from "react";

const RouterView = ()=>{
    const asyncRoutes = useSelector((state:RootState)=>state.auth.routes)
    // const routeList = baseRouter.concat(asyncRoutes)
    // const routeList = baseRouter.map((item:any)=>{
    //     if(item.path.includes("admin/*")){
    //         let arr = asyncRoutes.filter((value:any)=>{
    //             if(value.path.includes('/admin')){
    //                 value.path = value.path.slice(7,value.path.length)
    //                 return value
    //             }
              
    //         })
    //         // console.log(arr,'===============arr');
            
    //         item.children = [...item.children,...arr]
    //         // console.log(item.children,'===============arritem.children');
    //     }
    //     return item
    // })
    // console.log(routeList,'reouterlist=================');
    useEffect(()=>{
        baseRouter[1].children =[...baseRouter[1]?.children as Array<RouteObject>,...asyncRoutes] 
        // console.log(baseRouter,'====================baseRouter',asyncRoutes);
    },[asyncRoutes])
    const element = useRoutes(baseRouter)
  
    return <>
       {element}
    </>
}
export default RouterView