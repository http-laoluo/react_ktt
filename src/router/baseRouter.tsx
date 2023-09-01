import AdminView from "../views/admin/AdminView";
import LoginView from "../views/login/LoginView";
import LazyLoad from "../utils/lazyLoad";
// 权限控制
import Private from "../utils/private";
import { useSelector } from "react-redux";
import { RootState } from "../store";
const baseRouter = [
    {
        path:'/',
        element:<LoginView/> 
    },
    {
        path:'/admin/*',
        element:<Private><AdminView/></Private>,
        children:[
            {
                path:'',
                element:LazyLoad("/admin/DashView")
            },
            // {
            //     path:'dash',
            //     element:LazyLoad("/admin/DashView")
            // },
        ]
    }
]
 
export default baseRouter