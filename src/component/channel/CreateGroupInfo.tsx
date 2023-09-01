import { useEffect, useState } from 'react'
import dayjs from "dayjs"
import { GroupBuyType } from '../../types'
import { Button, Checkbox, Col, DatePicker, Input, Row, Upload, Image, Radio, Select } from 'antd'
import { DATETIME_FORMAT, SHOW_HOME } from '../../api/config'
import { UploadOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
interface Iprops {
    setCurrent: Function
    groupInfo: GroupBuyType
    setGroupInfo: Function
}
const fallback = "data:image/png;base64,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"

const CreateGroupInfo = (props: Iprops) => {
    const {
        setCurrent,
        groupInfo,
        setGroupInfo,
    } = props
    const [tag,setTag]=useState({pic:'',name:'',type:''})
    useEffect(() => {

    }, [])
    return (
        <div className='index'>
            <Row style={{ marginBottom: "16px" }}>
                <Col className='f_jcc_aic'>
                    {JSON.stringify(groupInfo)}
                </Col>
            </Row>
            <Row style={{ marginBottom: "16px" }}>
                <Col span={5} className='f_jcfe_aic' style={{ marginRight: "12px" }}>
                    活动名称 :
                </Col>
                <Col span={8}>
                    <Input value={groupInfo.name} onChange={(e) => setGroupInfo({ ...groupInfo, name: e.target.value })} />
                </Col>
            </Row>
            <Row style={{ marginBottom: "16px" }}>
                <Col span={5} className='f_jcfe_aic' style={{ marginRight: "12px" }}>
                    活动时间 :
                </Col>
                <RangePicker format={DATETIME_FORMAT} value={[dayjs(groupInfo.startTime), dayjs(groupInfo.endTime)]} onChange={(value, str) => {
                    setGroupInfo({ ...groupInfo, startTime: str[0], endTime: str[1] })
                }} />
                {/* <Col >
                    <DatePicker format={DATETIME_FORMAT} value={dayjs(groupInfo.startTime)} onChange={(value, str) => {
                        setGroupInfo({ ...groupInfo, startTime: str })
                    }}></DatePicker>
                </Col>
                <Col className='f_jcc_aic' style={{ marginRight: "12px",marginLeft:"12px" }}>
                    到
                </Col>
                <Col>
                    <DatePicker format={DATETIME_FORMAT} value={dayjs(groupInfo.startTime)} onChange={(value, str) => {
                        setGroupInfo({ ...groupInfo, startTime: str })
                    }}></DatePicker>

                </Col> */}
            </Row>
            <Row style={{ marginBottom: "16px" }}>
                <Col span={5} className='f_jcfe_aic' style={{ marginRight: "12px" }}>
                    广告语 :
                </Col>
                <Col span={8}>
                    <Input value={groupInfo.slogan} onChange={(e) => {
                        console.log(e);

                        setGroupInfo({ ...groupInfo, slogan: e.target.value })
                    }} />
                </Col>
            </Row>

            <Row style={{ marginBottom: "16px" }}>
                <Col span={5} className='f_jcfe_aic' style={{ marginRight: "12px" }}>
                    首页展示 :
                </Col>
                <Col span={8}>
                    <Checkbox onChange={e => {
                        setGroupInfo({ ...groupInfo, showHome: Number(e.target.checked) })
                    }} checked={Boolean(groupInfo.showHome)}></Checkbox>
                </Col>
            </Row>
            <Row style={{ marginBottom: "16px" }}>
                <Col span={5} className='f_jcfe_aic' style={{ marginRight: "12px" }}>
                    首页展示图片 :
                </Col>
                <Col span={12}>
                    <Upload
                        showUploadList={false}
                        onChange={(info) => {
                            console.log(info);

                            if (info.file && info.file.response) {
                                setGroupInfo({ ...groupInfo, homePic: 'http://dida100.com:8888' + info.file.response.file.path })
                            }
                        }}
                        name='file' action='http://dida100.com:8888/api/file/upload'>
                        <Button icon={<UploadOutlined />}>上传图片</Button>
                    </Upload>
                    <span style={{ marginLeft: "12px" }}>
                        <Image
                            width={100}
                            fallback={fallback}
                            src={groupInfo.homePic}
                        />
                    </span>

                </Col>
            </Row>
            <Row style={{ marginBottom: "16px" }}>
                <Col span={5} className='f_jcfe_aic' style={{ marginRight: "12px" }}>
                    活动主题海报 :
                </Col>
                <Col span={12}>
                    <Upload
                        showUploadList={false}
                        onChange={(info) => {
                            console.log(info);

                            if (info.file && info.file.response) {
                                setGroupInfo({ ...groupInfo, banner: 'http://dida100.com:8888' + info.file.response.file.path })
                            }
                        }}
                        name='file' action='http://dida100.com:8888/api/file/upload'>
                        <Button icon={<UploadOutlined />}>上传图片</Button>
                    </Upload>
                    <span style={{ marginLeft: "12px" }}>
                        <Image
                            width={100}
                            fallback={fallback}
                            src={groupInfo.banner}
                        />
                    </span>
                </Col>
            </Row>
            <Row style={{ marginBottom: "16px" }}>
                <Col span={5} className='f_jcfe_aic' style={{ marginRight: "12px" }}>
                    活动主题页展示样式 :
                </Col>
                <Col span={12}>
                    <Radio.Group onChange={e => setGroupInfo({ ...groupInfo, showType: e.target.value })} value={groupInfo.showType}>
                        <Radio value={1}>一行一列</Radio>
                        <Radio value={2}>一行两列</Radio>
                        <Radio value={3}>一行三列</Radio>
                    </Radio.Group>
                </Col>
            </Row>
            <Row style={{ marginBottom: "16px" }}>
                <Col span={5} className='f_jcfe_aic' style={{ marginRight: "12px" }}>
                    促销标签 :
                </Col>
                <Col span={12}>
                    <Select
                        
                        defaultValue="1"
                        style={{ width: 120 }}
                        onChange={(e) => { }}
                        options={[
                            { value: '1', label: '团购' },
                            { value: '2', label: '活动' },
                        ]}
                    />
                    &nbsp; &nbsp; &nbsp;
                    <Image src={tag.pic} fallback={fallback} width={64}></Image>
                </Col>
            </Row>

            <Row style={{ marginBottom: "16px" }}>
                <Col span={8} className='f_jcc_aic' style={{ marginRight: "12px" }}>
                    <Button type="primary" onClick={() => setCurrent(1)}>下一步,选择商品</Button>
                </Col>
            </Row>

        </div>
    )
}
export default CreateGroupInfo