// 导入添加团购信息，添加团购商品，更新团购信息的接口
import {addGroupInfo,addGroupProduct,UpdateGroupInfo} from '../../api/purchase'
import {Button,Table,Input} from 'antd'
//导入选择商品的组件
import SelectPro from  './SelectPro'
import { useState,useEffect } from 'react';
import type {GroupBuyType,GroupProType} from '../../types'

 
interface Iprops {
  setCurrent: Function;
  setGroupInfo: Function;
  groupInfo: GroupBuyType;
}

function SelectProducts(props:Iprops) {
  // 是否显示弹框
  const [showSelectPro,setShowSelectPro] = useState(false)
  // 团购商品列表
  const [groupProductList,setGroupProductList] =useState<any>([])
  // 选择的商品列表
  const [selProductList,setSelProductList] =useState([])
  // 如果选择的商品列表发送变化，更新团购商品列表
  // 团购商品渲染列
const columns = [
  {
    title:"商品编码",dataIndex:'productId'},
  {title:"规格",dataIndex:'specs'},
  {title:"商品名称",dataIndex:'productName'},
  {title:"价格",dataIndex:'price'},
  {
    title:"优惠价格",dataIndex:'salePrice',
    render:(value:string,row:GroupProType,index:number)=>{
     
      return <Input 
      onChange={(e)=>{
        // 获取选择的数据列表
        var list = groupProductList;
        // 修改index行的salePrice为当前表单的值
        list[index].salePrice = e.target.value
        console.log(list,list[index]);
        // 更新团购商品列表
        setGroupProductList([...list]);
      }}
      value={value}/>
    }
  },
  {title:"佣金比例",dataIndex:'rate'},
  {title:"购买限量",dataIndex:'limitBuy'},
  {title:"库存",dataIndex:'stock'},
  {title:"排序",dataIndex:'order'},
]
  useEffect(()=>{
    // 由选择的商品列表，变化为团购的商品列表
    var list = selProductList.map((item:any)=>{
      var obj = {...item};
      // 删除商品id
      delete obj.id;
      // 商品id
      obj.productId =item.id;
      // 添加优惠价格
      obj.salePrice=obj.price
      obj.rate = 1;
      obj.limitBuy = 1;
      obj.stock = 999;
      obj.order = 0;
      return obj;
    })
    // 更新团购商品
    setGroupProductList(list)
  },[selProductList])
  // async 装饰函数会返回一个promise return的内容就是promise 的resolve
  // async 和await 一起使用 
  // await 等待异步操作resolve后才会执行下一行
  // Promise.all(异步数组) 等待异步数组都是resolve状态后，才会变成resolve
  // 数组高阶
  // 01 forEach((item,index,self)=>)
  // 遍历数组，item被遍历的项，index遍历的下标，self当前数组
  // 02 map((item,index,self)=>{})
  // 根据现有的数组返回一个新的数组
  // 03 filter((item,index,self)=>{}) 
  // 如果回调函数返回true，保留当前数组元素，返回false则移除
  // 04 reduce((a,b)=>{})
   // 上一次回调函数结果是这移除a参数  累计，查找，递归
  // 05 some((item,index,self)=>{}) 
  // 如果回调函数有一个返回的结果为true，最终返回结果为true
  // 06 every((item,index,self)=>{}) 
  // 如果回调函数所有个一返回为false 最终返回结果为false 全部返回为true最终返回为true
  // 07 findIndex((item,index,self)=>{})
  // 如果回调函数返回true，这最终结果为前遍历的index
  // 08 find((item,index,self)=>{})
  // 如果回调函数返回true，这最终结果为前遍历的item
  // 09 sort((a,b)=>)
  // 根据a,b属性排序
  async function done (){
    // 01 团购活动信息添加服务器  得到groupId
   const group =  await addGroupInfo(props.groupInfo)
   var groupBuyId = group.data.data.insertId;//插入团购信息后得到id
    // 02 有多个少团购商品，遍历添加的 服务器  products 团购商品id（多个）
   var list = groupProductList.map((item:any)=>addGroupProduct({...item,groupBuyId})) 
    // list 多个promise请求结果,Promise.all()
    const gplist = await Promise.all(list)
    // gplist 多个个求和得到的结果列表
   var products = gplist.map(item=>item.data.data.insertId).join(",")
   // 03 更新团购活动信息的products
  const result = await UpdateGroupInfo({id:groupBuyId,products})
  if(result.data.code===0){
    props.setCurrent(2);
    // 进入下步完成
  }else{
    console.log("创建活动失败")
  }
    // 04 进入下一步 props.setCurrent(2)
  }
  return ( <div className="SelectProducts">
   <p style={{textAlign:'center'}}><Button type='primary' onClick={()=>setShowSelectPro(true)}>+选择商品</Button></p>
   <Table rowKey="productId" pagination={false} dataSource={groupProductList} columns={columns}/>
   {showSelectPro&&<SelectPro 
   shopList={selProductList} 
   setShowShop={setShowSelectPro} 
   setShopList={setSelProductList}></SelectPro>} 
   <p>
     <Button onClick={()=>props.setCurrent(0)}>上一步，编辑商品信息</Button>  
     <Button onClick={()=>done()}>完成</Button>
   </p>
   {/* <p>{JSON.stringify(groupProductList)}</p> */}
    </div> );
}

export default SelectProducts;
