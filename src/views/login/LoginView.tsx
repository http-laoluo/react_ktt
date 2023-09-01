import { useEffect, useState } from 'react'
import {Dispatch} from "redux"
import { Button, Checkbox, Form, Input, Row } from 'antd';
import "./index.scss"

import { useDispatch } from 'react-redux/es/exports';
import { login } from '../../store/auth/action';
import { useNavigate, useSearchParams } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const LoginView = ()=>{
    const dispatch:Dispatch<any> = useDispatch()
    let [data, setData] = useState(''); 
    const [userName,setUserName]= useState('zeng8')
    const [password,setPassword]= useState('zmm123')
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [search,setSearch] = useSearchParams();
    let redirect = search.getAll('redirect')[0] || '/admin';
    const callback = ()=>{
        navigate(redirect)
    }
    const onFinishFailed = (errorInfo: any) => {
       
    };
    useEffect(()=>{
      form.setFieldsValue({password:'zmm123',username:"zeng8"})
    },[])
    const onFinish = (values: any) => {
      console.log('Success:', values);
      console.log('==========');
      // form.validateFields().then(
      //   () => {
      //     console.log('成功');
          
      //     // setSubmittable(true);
      //   },
      //   () => {
      //      console.log('失败');
           
      //   },
      // );
      dispatch(login({name:userName,password},callback))
    };
    return (
      <div className='login'>
 <div className='loginview'>
           <h2 className='titlebox'><span className='title'>快团团</span> 登录</h2>
           <div className='formbox'>
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 4 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                  <Form.Item<FieldType>
      
                    label="用户名："
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input value={userName} onChange={(e)=> setUserName(e.target.value)}/>
                  </Form.Item>

                  <Form.Item<FieldType>
              
                    label="密码："
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password  value={password} onChange={(e)=> setPassword(e.target.value)} />
                  </Form.Item>

                  <Form.Item  wrapperCol={{ flex:'auto'}}>
                      <Row justify="center">
                          <Button type="primary" htmlType="submit">
                            登录
                          </Button>
                      </Row>
                   
                  </Form.Item>
              </Form>
           </div>
      </div>
      </div>
     
    )
}
export default LoginView