import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react'
import { Steps } from 'antd';
import CreateGroupFinish from '../../../component/channel/CreateGroupFinish';
import CreateGroupInfo from '../../../component/channel/CreateGroupInfo';
import SelectProducts from '../../../component/channel/SelectProducts';
const baseGroupInfo = {
  order: "2",
  state: '2',
  name: "大王来了",
  products: "12,13,14",
  startTime:"2023-02-08T14:31:26.000Z",
  endTime: new Date() + "",
  current: 1,
  shop: '店铺',
  slogan:"比周五偏移一半",
  preTime: "2023-02-08T14:31:26.000Z",
  showHome: '1',
  tag: '4',
  target: '1',
  banner: '',
  homePic: '', 
  limitBuy: 1111,
  deliverWay: '1',
  pickTime: "2023-02-07T14:30:27.000Z",
  showType:"1",
}

const CreateGroupBuy = () => {
  let [current, setCurrent] = useState(0);
  const [groupInfo, setGroupInfo] = useState(baseGroupInfo)
  useEffect(() => {

  }, [])
  const items = [
    {
      title: '活动信息',
      content: <CreateGroupInfo setCurrent={setCurrent} groupInfo={groupInfo} setGroupInfo={setGroupInfo} />,
    },
    {
      title: '添加活动商品',
      content: <SelectProducts />,
    },
    {
      title: '创建完成',
      content: <CreateGroupFinish />,
    },
  ]
  const onChange = (value: number) => {
    // console.log('onChange:', value);
    // setCurrent(value);
  };
  return (
    <div className='index'>
      <Card >
        <Card style={{ marginBottom: '7px' }}>
          <Row justify={'space-around'} style={{ marginBottom: "16px" }}>
            <Col span={18}>
              <Steps
                onChange={onChange}
                current={current}
                items={items}
              />
            </Col>
          </Row>
          <Card title={items[current].title}>
            {items[current].content}
          </Card>

        </Card>
      </Card>
    </div>
  )
}
export default CreateGroupBuy