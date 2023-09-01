// 导入选择店铺组件
import SelectShop from "./SelectShop";
// 导入标签组件
import SelectTag from "./SelectTag";
import dayjs from "dayjs";
import { Card, Input, DatePicker ,Button,Checkbox,Upload, Image,Radio,Select, Tag} from "antd";
import { DATE_FORMAT } from "../../api/config"; 
import type { GroupBuyType } from "../../types";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;
// 定义props的接口
interface Iprops {
  setCurrent: Function;
  setGroupInfo: Function;
  groupInfo: GroupBuyType;
}
const fallback="data:image/png;base64,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"
interface shopType{
  id?:number
  name?:string
  type?:string
  address?:string
}
function CreateGroupInfo(props: Iprops) {
  // 选择的店铺列表
  const [shopList,setShopList] = useState<shopType[]>([])
  // 是否现在选择店铺
  const [showShop,setShowShop] = useState(false)
  // 从props解构属性和方法
  const { groupInfo, setCurrent, setGroupInfo } = props;
  // 标签
  const [tag,setTag] = useState({pic:'',type:'',name:'',id:''})
  // 标签类型
  const [tagType,setTagType] = useState(1)
  // 是否显示标签
  const [showTag,setShowTag] =useState(false)
  // 监听tag的变化修改groupInfo的tag值
  useEffect(()=>{
    setGroupInfo({...groupInfo,tag:tag?.id})
  },[tag])
  // 监听shopList，更新gruopInfo的值
  useEffect(()=>{
    console.log("更新shop")
    setGroupInfo({...groupInfo,shop:shopList.map(item=>item.id).join(',')})
  },[shopList])
  return (
    <div className="CreateGroupInfo">
      <Card type="inner" title="活动信息">
        
        <p>
          <span className="label">活动名称：</span>
          <span>
            <Input
              value={groupInfo.name}
              onChange={(e) => {
                setGroupInfo({ ...groupInfo, name: e.target.value });
              }}
            />
          </span>
        </p>
        <p>
          <span className="label">活动时间：</span>
          <span>
            <RangePicker
              onChange={(value, str) => {
                setGroupInfo({
                  ...groupInfo,
                  startTime: str[0],
                  endTime: str[1],
                });
              }}
              format={DATE_FORMAT}
              value={[
                groupInfo.startTime ? dayjs(groupInfo.startTime) : null,
                groupInfo.endTime ? dayjs(groupInfo.endTime) : null,
              ]}
            />
          </span>
        </p>
        
        <p>
          <span className="label">广告语：</span>
          <span>            
            <Input
              value={groupInfo.slogan}
              onChange={(e) => {
                setGroupInfo({ ...groupInfo, slogan: e.target.value });
              }}
            />
          </span>
        </p>
        <p>
          <span className="label">首页展示：</span>
          <span>            
             <Checkbox 
              onChange={(e) => {
                setGroupInfo({ ...groupInfo, showHome: Number(e.target.checked) });
              }}
             checked={Boolean(groupInfo.showHome)}/>
          </span>
        </p>
        <p>
          <span className="label">首页展示图：</span>
          <span  style={{width:200,display:'inline-block',verticalAlign:'middle'}}>            
        <Upload 
       
        showUploadList={false} 
        listType="picture-card"
        className="avatar-uploader"
        onChange={info=>{
          if(info.file&&info.file.response){         
          setGroupInfo({...groupInfo,homePic:'http://dida100.com:8888'+info.file.response.file.path})
          }
        }}
        name="file"
        action="http://dida100.com:8888/api/file/upload">
          {
             groupInfo.homePic?<Image preview={false}   src={groupInfo.homePic} width={110} fallback={fallback} />:<Button>上传图片</Button>
          }
        </Upload>
          
          </span>
        </p>
        
        <p>
          <span className="label"> 活动主题页海报：</span>
          <span  style={{width:200,display:'inline-block',verticalAlign:'middle'}}>            
        <Upload 
       
        showUploadList={false} 
        listType="picture-card"
        className="avatar-uploader"
        onChange={info=>{
          if(info.file&&info.file.response){         
          setGroupInfo({...groupInfo,banner:'http://dida100.com:8888'+info.file.response.file.path})
          }
        }}
        name="file"
        action="http://dida100.com:8888/api/file/upload">
          {
             groupInfo.banner?<Image  preview={false} src={groupInfo.banner} width={110} fallback={fallback} />:<Button>上传图片</Button>
          }
        </Upload>
          
          </span>
        </p>
        <p>
          <span className="label">活动主题页展示样式：</span>
          <span>            
          <Radio.Group onChange={e=>setGroupInfo({...groupInfo,showType:e.target.value})} value={groupInfo.showType}>
          <Radio value={1}>一行一列</Radio>
          <Radio value={2}>一行两列</Radio>
          <Radio value={3}>一行三列</Radio>
         
          </Radio.Group>
          </span>
        </p>
        <p>
          <span className="label">促销标签：</span>
          <span>            
          <Select
          onChange={e=>{
            setTagType(e)
            setShowTag(true)
          }}
          defaultValue={1}
          style={{ width: 120 }}         
          options={[{ value: 1, label: '团购' },{ value: 2, label: '活动' }]}
        />&emsp;&emsp;
        {/* 图片单击 执行setShowTag(true) 显示弹框 */}
        <Image 
        preview={false}
        onClick={()=>setShowTag(true)}
        src={tag?.pic} fallback={fallback} width={64}/>
          </span>
        </p>
        {/* 如果可以显示弹框，则显示 并传入setShowTag方法 */}
        {showTag&&<SelectTag setShowTag={setShowTag} tagType={tagType} setTag={setTag}/>}
       
      </Card>
      <Card type="inner" title="规则设置" >
      <p>
          <span className="label">预告时间：</span>
          <span>
            <DatePicker
              onChange={(value, str) => {
                setGroupInfo({
                  ...groupInfo,
                  preTime: str,
                 
                });
              }}
              format={DATE_FORMAT}
              value={  groupInfo.preTime ? dayjs(groupInfo.preTime ) : null                
               }
            />
          </span>
        </p>
      <p>
          <span className="label">活动对象：</span>
          <span>            
          <Radio.Group onChange={e=>setGroupInfo({...groupInfo,target:e.target.value})} value={groupInfo.target}>
            <Radio value={1}>不限</Radio>
            <Radio value={2}>新用户</Radio>
          </Radio.Group>
          </span>
        </p>        
       
        <p>
          <span className="label">购买限量：</span>
          <span>            
            <Input
              value={groupInfo.limitBuy}
              onChange={(e) => {
                setGroupInfo({ ...groupInfo, limitBuy: e.target.value });
              }}
            />
          </span>
        </p>
        <p>
          <span className="label">配置方式：</span>
          <span>            
          <Radio.Group onChange={e=>setGroupInfo({...groupInfo,deliverWay:e.target.value})} value={groupInfo.deliverWay}>
            <Radio value={1}>自提</Radio>
            <Radio value={2}>配置</Radio>
          </Radio.Group>
          </span>
        </p> 
        <p>
          <span className="label">店铺现在：</span>
          <span>            
          <Radio.Group onChange={e=>{
            setGroupInfo({...groupInfo,shop:e.target.value})
            if(e.target.value){
              setShowShop(true);
            }
            }} value={groupInfo.shop}>
            <Radio value={''}>不限</Radio>
            <Radio value={1}>选择店铺</Radio>
          </Radio.Group>
         { groupInfo.shop&&<span onClick={()=>setShowShop(true)}> </span>}
          </span><span>{shopList.map(item=>item.name).join(' ,')}</span>
        </p> 
        <p>
          <span className="label">提货时间：</span>
          <span>
            <DatePicker
              onChange={(value, str) => {
                setGroupInfo({
                  ...groupInfo,
                  pickTime: str,
                 
                });
              }}
              format={DATE_FORMAT}
              value={  groupInfo.pickTime ? dayjs(groupInfo.pickTime ) : null                
               }
            />
          </span>
        </p>  
      </Card>
      <p><Button type="primary" onClick={()=>setCurrent(1)}>下一步，选择商品</Button></p>
      {showShop&&<SelectShop shopList={shopList} setShowShop={setShowShop} setShopList={setShopList}></SelectShop>}
    </div>
  );
}

export default CreateGroupInfo;
