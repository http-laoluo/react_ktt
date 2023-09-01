import dayjs from "dayjs"
import { useEffect, useState } from 'react'
import { GroupBuyType } from '../../types';
import { Button, Col, DatePicker, Form, Input, Radio, Row } from 'antd';
import { DATETIME_FORMAT, GROUPBUY_STATE } from "../../api/config";
const { RangePicker } = DatePicker;
interface Iporps {
    params: GroupBuyType
    setParams: Function
    getGroup: Function
}
const SearchParams = (props: Iporps) => {
    let [data, setData] = useState('');
    const [form] = Form.useForm();
    useEffect(() => {

    }, [])
    const params = props.params
    const setParams = props.setParams
    const getGroup = props.getGroup

    const onFinish = (values: any) => {

        if (values.startTime != null) {
            values.startTime = [dayjs(values.startTime[0]).format(DATETIME_FORMAT), dayjs(values.startTime[1]).format(DATETIME_FORMAT)]
        }
        if (values.endTime != null) {
            values.endTime = [dayjs(values.endTime[0]).format(DATETIME_FORMAT), dayjs(values.endTime[1]).format(DATETIME_FORMAT)]
        }

        console.log('Success:', values);
        let params = {
            endTime: values.endTime == undefined ? '' : values.endTime.join(','),
            id: values.id == undefined ? '' : (values.id - 0),
            name: values.name == undefined ? '' : values.name,
            products: values.products == undefined ? '' : values.products,
            shop: values.shop == undefined ? '' : values.shop,
            startTime: values.startTime == undefined ? '' : values.startTime.join(','),
            state: values.state == undefined ? '' : values.state,
        }
        props.setParams((prevState:any) => {
            return { ...prevState, ...params};
        })

        // props.getGroup()


    };
    const onReset = () => {
        props.setParams({
            order: 'asc',
            state: '',
            id: '',
            name: '',
            products: '',
            startTime: '',
            endTime: "",
            shop:''
        })
        form.resetFields();
    };

    return (
        <div className='index'>
            <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
                <Row  justify="space-between">
                    <Col span={6}>
                        <Form.Item
                            label="活动编号："
                            name="id"
                        // rules={[{ required: true, message: 'Please input your id!' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="活动名称："
                            name="name"
                        // rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="活动开始时间："
                            name="startTime"
                        // rules={[{ required: true, message: 'Please input your startTime!' }]}
                        >
                            <RangePicker format={DATETIME_FORMAT} />

                        </Form.Item>
                    </Col>
                </Row>
                <Row  justify="space-between">
                    <Col span={6}>
                        <Form.Item
                            label="参与商品："
                            name="products"
                        // rules={[{ required: true, message: 'Please input your products!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="参与门店："
                            name="shop"
                        // rules={[{ required: true, message: 'Please input your shop!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="活动结束时间："
                            name="endTime"
                          // rules={[{ required: true, message: 'Please input your endTime!' }]}
                        >
                            <RangePicker format={DATETIME_FORMAT} />

                        </Form.Item>
                        
                    </Col>

                </Row>
                <Row  justify="space-between">
                    <Col span={10}>
                        <Form.Item
                            label="活动状态："
                            name="state"
                        // rules={[{ required: true, message: 'Please input your state!' }]}
                        >
                            <Radio.Group buttonStyle="solid" name="state">
                                {GROUPBUY_STATE.map((item, index) => {
                                    return <Radio.Button value={index} key={index}>{item}</Radio.Button>
                                })}
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Button style={{marginRight:'10px'}} type="primary" danger onClick={onReset}>重置</Button>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
export default SearchParams