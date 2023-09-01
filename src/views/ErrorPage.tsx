import { Result } from 'antd'
import { useEffect, useState } from 'react'
interface PropsType {
  message: string
}
const ErrorPage = (props: PropsType) => {
  return (
    <div style={{ width: '100%', height: '100%' }} className='f_jcc_aic' >
      {/* <h2>页面加载错误...</h2> */}
      <Result
        title="页面还未开发......"
        extra={
          <div>
            {props.message}
          </div>
        }
      />
     
    </div>
  )
}
export default ErrorPage