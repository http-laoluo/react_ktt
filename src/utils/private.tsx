import { FC, useEffect, useState } from 'react'
import { Navigate,useLocation } from 'react-router-dom';
interface Props {
    children: any; 
}
const Private:FC<Props> = (props)=>{
    let [data, setData] = useState(''); 
    let token = sessionStorage.getItem("token")
    let location= useLocation()
    if(token){
        return <>
           {props.children}
        </>
    }else {
        return <>
           <Navigate to={{pathname:"/",search:"?redirect=" + location.pathname}} ></Navigate>
        </>
    }
   
}
export default Private