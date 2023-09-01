import { useEffect, useState } from 'react'
import { Card, Tabs } from 'antd';
import GroupShopList from '../../../component/channel/GroupShopList';
import GroupProList from '../../../component/channel/GroupProList';
import GroupBuyInfo from '../../../component/channel/GroupBuyInfo';
import { useParams } from 'react-router-dom';
import { getGroupBuy } from '../../../api/purchase';
import { GroupBuyType } from '../../../types';
const GroupBuyDetail = () => {
    let [data, setData] = useState('');
    const [groupInfo, setGroupInfo] = useState<GroupBuyType>({}); 
    const items = [
        { label: '活动信息', key: '1', children: <GroupBuyInfo groupInfo={groupInfo}/> },
        { label: '商品列表', key: '2', children: <GroupProList groupInfo={groupInfo}/> },
        { label: '店铺列表', key: '3', children: <GroupShopList/> },
    ]

    const onChange = (key: string) => {
        console.log(key);
    };

    const params = useParams();
    const getGroupBuyInfo = ()=>{

        getGroupBuy({id:params.id}).then((res)=>{
            setGroupInfo(res.data.data[0])
        })
    }
    useEffect(()=>{
        console.log(params,'params===');
        
        getGroupBuyInfo()
    },[])
    return (
        <div className='index'>
            <Card>
                <Tabs
                    onChange={onChange}
                    type="card"
                    items={items}
                />
            </Card>
        </div>
    )
}
export default GroupBuyDetail