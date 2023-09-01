import { useEffect, useState } from 'react'
import { GroupBuyType } from '../../types';
import { useParams } from 'react-router-dom';
import { getgroupBuyProduct } from '../../api/purchase';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { url } from 'inspector';

interface Iprops {
    groupInfo: GroupBuyType
}
const GroupProList = (props: Iprops) => {
    const params = useParams()
    const groupInfo = props.groupInfo
    let [data, setData] = useState('');
    const [products, setProducts] = useState()
    const [pagination, setPagenigation] = useState<any>({ total: 1, current: 1,size:3})
    const getProductsMd = () => {

        getgroupBuyProduct({...pagination, groupById: props.groupInfo.id }).then((res) => {
            setProducts(res.data.data)
            setPagenigation(res.data.pagination)
        })
    }
    const columns: ColumnsType<any> = [
        {
            title: '商品编号',
            dataIndex: 'id',
        },
        {
            title: '商品名称',
            dataIndex: 'productName',
        },
        {
            title: '商品图片',
            dataIndex: 'gallery',
            render:(urls:string)=>{
                var temp ;
                if(urls.includes(',')){
                    temp = urls.split(',')
                }else {
                    temp = urls.split('|')
                }
               return <img src={temp[0]} alt='图片' width={50}/>
            }
        },
        {
            title: '规格',
            dataIndex: 'specs',
        },
        {
            title: '正常价格',
            dataIndex: 'price',
        },
        {
            title: '促销价格',
            dataIndex: 'salePrice',
        },
        {
            title: '佣金比例',
            dataIndex: 'rate',
            render: (text) => {
                return text + '%'
            }
        },
        {
            title: '每人限购',
            dataIndex: 'limitBuy',
        },
        {
            title: '活动总量',
            dataIndex: 'stock',
        },
        {
            title: '剩余量',
            dataIndex: 'stock',
        },
        {
            title: '展示排序',
            dataIndex: 'id',
        },

    ];


    useEffect(() => {
        getProductsMd()
    }, [pagination.current])
    return (
        <div className='index'>
            商品列表
            <Table onChange={(value)=>{
                 console.log(value);
                 setPagenigation({...value,size:value.pageSize})
            }} pagination={{total:pagination.total,current:pagination.current,pageSize:pagination.size}} rowKey="id" columns={columns} dataSource={products} />;

        </div>
    )
}
export default GroupProList