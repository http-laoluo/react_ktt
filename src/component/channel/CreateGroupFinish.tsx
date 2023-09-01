import { useEffect, useState } from 'react'
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
const CreateGroupFinish = ()=>{
    let [data, setData] = useState(''); 
    useEffect(()=>{

    },[])
    return (
      <div className='index'>
           <Result
            icon={<SmileOutlined />}
            title="创建成功"
            extra={<></>}
          />
      </div>
    )
}
export default CreateGroupFinish