import dayjs from "dayjs"
import { Button, Card, Col, Row, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useEffect, useState } from 'react'
import { GroupBuyType } from '../../../types';
import { getGroupBuy } from '../../../api/purchase';
import { DATETIME_FORMAT, GROUPBUY_STATE } from "../../../api/config";
import { GROUPBUY_STATECOLOR } from "../../../api/config";
import SearchParams from "../../../component/channel/SearchParams";
import { useNavigate } from "react-router-dom";
import useCallbackState from "../../../hook/useCallbackState";
import { PlusOutlined } from '@ant-design/icons';
const CommunityPurchase = () => {
    let [params, setParams] = useState({
        order: 'asc',
        state: '',
        id: '',
        name: '',
        products: '',
        startTime: '',
        endTime: "",
        shop: ''
    });
    const [pagination, setPagenigation] = useCallbackState({ total: 1, current: 1, size: 10 })
    const [groupBuyList, setGroupBuyList] = useState<Array<GroupBuyType>>([])
    const navigate = useNavigate()
    const columns: ColumnsType<GroupBuyType> = [
        {
            title: '活动编号',
            dataIndex: 'id',
        },
        {
            title: '活动名称',
            dataIndex: 'name',
        },
        {
            title: '参数门店',
            dataIndex: 'shop',
        },
        {
            title: '参数商品',
            dataIndex: 'products',
        },
        {
            title: '开始时间',
            dataIndex: 'startTime',
            render: (time: string) => {
                return dayjs(time).format(DATETIME_FORMAT)
            }
        },
        {
            title: '结束时间',
            dataIndex: 'endTime',
            render: (time: string) => {
                return dayjs(time).format(DATETIME_FORMAT)
            }
        },
        {
            title: '状态',
            dataIndex: 'state',
            render: (state) => {
                return <Tag color={GROUPBUY_STATECOLOR[state]}>{GROUPBUY_STATE[state]}</Tag>
            }
        },
        {
            title: '操作',
            render: (value) => {
                return <a onClick={(e) => {
                    e.stopPropagation()
                    // console.log(value);
                    navigate("/admin/channel/GroupBuyDetail/" + value.id)
                }}> 查看详情</a>
            }
        },
    ];
    const rowSelection = {
        // selectedRowKeys,
        // onChange: onSelectChange,
    };
    const getGroup = (value?: any) => {
        console.log('---------------///', params);

        getGroupBuy({ ...params, current: value ? value.current : pagination.current, size: value ? value.size : pagination.size }).then((res) => {
            setGroupBuyList(res.data.data)
            let p = res.data.pagination
            setPagenigation({
                current: p.current,
                total: p.total,
                size: p.size
            })
        })
    }

    useEffect(() => {
        getGroup()
    }, [params])
    return (
        <div className='index'>
          
            <Card style={{ marginBottom: '7px' }}>
                <Row style={{marginBottom:"16px"}}>
                    <Col span={24}>
                        创建团建：<Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => { navigate('/admin/channel/CreateGroupBuy')}}
                        >新建团建</Button>
                    </Col>
                </Row>

                <SearchParams params={params} setParams={setParams} getGroup={getGroup}></SearchParams>
            </Card>
            <Card >
                <Table pagination={{ ...pagination, pageSize: pagination.size }} onChange={(pa: any) => {
                    // console.log(pa); 
                    setPagenigation({ ...pagination, current: pa.current, size: pa.pageSize })
                    getGroup({ current: pa.current, size: pa.pageSize })
                }} rowKey="id" columns={columns} dataSource={groupBuyList} />
            </Card>

        </div>
    )
}
export default CommunityPurchase