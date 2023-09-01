import { Space, Spin } from 'antd'
import { Suspense, lazy } from 'react'
const LazyLoad = (url: string) => {
    const Module = lazy(() => {
        // return import('../views'+url)

        return new Promise((resolve, reject) => {
            // console.log(url,'////////////////////////////////');

            import('../views' + url).then((res) => {
                // console.log(res,'///////////////////////////--res');

                resolve(res)
            }).catch((err) => {
                resolve(import('../views' + '/ErrorPage'))
                // console.log(err);

            })
        })
    })
    return (
        <Suspense fallback={
            <div className='f_jcc_aic' style={{ width: '100%', height: "100%" }}>
                <Spin style={{ width: "100px" }} tip="加载中..." spinning={true}>
                    <div className="content" />
                </Spin>
            </div>}>
            <Module />
        </Suspense>
    )
}
export default LazyLoad