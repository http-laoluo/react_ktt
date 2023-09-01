import { Card, Col, Row } from 'antd';
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Steps } from 'antd';
import CreateGroupFinish from '../../../component/channel/CreateGroupFinish';
import CreateGroupInfo from '../../../component/channel/CreateGroupInfo';
import SelectProducts from '../../../component/channel/SelectProducts';
const baseGroupInfo = {
  "name": "测试团购活动",
  "startTime": dayjs().format("YYYY-MM-DD HH:mm:ss"),
  "endTime": dayjs().format("YYYY-MM-DD HH:mm:ss"),
  "slogan": '测试口号',
  "showHome": "1",
  "homePic": 'https://m15.360buyimg.com/mobilecms/jfs/t1/90537/28/34381/94784/63ead64aFabb4d1b8/154e0b4180874a0e.jpg!cr_1125x449_0_166!q70.jpg',
  "banner": 'https://m15.360buyimg.com/mobilecms/jfs/t1/90537/28/34381/94784/63ead64aFabb4d1b8/154e0b4180874a0e.jpg!cr_1125x449_0_166!q70.jpg',
  "showType": 1,
  "target": 1,
  "limitBuy": 999,
  "shop": '829,824',
  "deliverWay": 1,
  "pickTime": dayjs(new Date(Date.now() + 1000 * 60 * 60 * 24) + "").format("YYYY-MM-DD HH:mm:ss"),
  "products": "586,587,588",
  "preTime": dayjs(new Date(Date.now() - 1000 * 60 * 60 * 24) + "").format("YYYY-MM-DD HH:mm:ss"),
  "tag": 1,
  "state": 1
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
      content: <SelectProducts setCurrent={setCurrent} groupInfo={groupInfo} setGroupInfo={setGroupInfo} />,
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
