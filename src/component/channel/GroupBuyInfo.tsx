import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getGroupBuy, getTag } from '../../api/purchase';
import type { GroupBuyType, TagType } from '../../types';
import { Button, Card, Col, Row, Tag } from 'antd';
import { CUSTOM_TYPE, DATETIME_FORMAT, DILIVER_TYPE, GROUPBUY_STATE, SHOW_HOME } from '../../api/config';
import dayjs from "dayjs"
interface Iprops {
    groupInfo: GroupBuyType
}
const GroupBuyInfo = (props: Iprops) => {
    let groupInfo = props.groupInfo
    const state = Number(groupInfo.state)
    const showHome = Number(groupInfo.showHome)
    const [tag,setTag]=useState<TagType>({})
    const getTagMd = ()=>{ 
        console.log(groupInfo,'groupInfo');
        
        getTag({id:groupInfo.tag}).then((res)=>{
            setTag(res.data.data[0])
        })
    }
    useEffect(()=>{
        if(groupInfo.tag !== undefined){
            getTagMd()
        }
       
    },[groupInfo])
    return (
        <div className='index'>
            活动详情{JSON.stringify(groupInfo)}
            <Card type="inner" title="活动状态" style={{marginBottom:"8px"}}>
                <Row>
                    <Col span={24}>
                        待开始
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        {state <= 2 ? <Button>{GROUPBUY_STATE[state]}</Button> : ''}
                    </Col>
                </Row>
            </Card>
            <Card type="inner" title="活动信息" style={{marginBottom:"8px"}}>
                <Row>
                    <Col span={24}>
                        活动名称：{groupInfo.name}
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        活动时间：{dayjs(groupInfo.startTime).format(DATETIME_FORMAT)} - {dayjs(groupInfo.endTime).format(DATETIME_FORMAT)}
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        广告语：{groupInfo.slogan}
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        预告时间：{dayjs(groupInfo.preTime).format(DATETIME_FORMAT)} 
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        首页展示：{SHOW_HOME[showHome]} 
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        标签：<Tag>{groupInfo.tag}</Tag> <img src={tag?.pic} alt='标签' width='60' />
                    </Col>
                </Row>
            </Card>
            <Card type="inner" title="活动规则" style={{marginBottom:"8px"}}>
                <Row>
                    <Col span={24}>
                        顾客类型：{CUSTOM_TYPE[Number(groupInfo.target)]}
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                       是否限量： {groupInfo.limitBuy === 999?'不限':groupInfo.limitBuy}
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                       配送方式： {DILIVER_TYPE[Number(groupInfo.deliverWay)]}
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                       提货时间： {dayjs(groupInfo.pickTime).format(DATETIME_FORMAT)}
                    </Col>
                </Row>
            </Card>

        </div>
    )
}
export default GroupBuyInfo