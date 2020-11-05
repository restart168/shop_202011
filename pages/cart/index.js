// pages/cart/index.js
import {wxshowmodal,wxshowToast} from '../../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    cart:'',
    allchecked:'',
    allPrice:'',
    allNum:''
  },

  handleshop(){
  wx.chooseAddress({
    success: (result)=>{
      wx.setStorageSync('address', result);
        
    }
  });
  

  },
  handlepay(){
    const {address,allNum}=this.data;
    if(!address.userName){
      
       wxshowToast({title:'请先添加收货地址'})
       return
    }
    if(allNum==0){
      wxshowToast({title:'您还没有选中任何商品哦'})
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  }
  ,
  handleitemchange(e){
  const goods_id=e.currentTarget.dataset.id;
  let {cart} = this.data;
  let index=cart.findIndex(v=>v.data.message.goods_id===goods_id)
  cart[index].data.message.checked =!cart[index].data.message.checked
 this.setshow(cart)
  }

,
handleallchecked(){
  let {allchecked,cart} = this.data;

  allchecked =!allchecked;
  cart.map(v=>v.data.message.checked=allchecked)
  this.setshow(cart)

}
,
async handlesub(e){
  const {id,operation}=e.currentTarget.dataset;
  let {cart} = this.data;
  let index=cart.findIndex(v=>v.data.message.goods_id===id)
  if(cart[index].data.message.Num===1&&operation===-1){
   const res = await wxshowmodal();
   if (res.confirm) {
    cart.splice(index,1);
    this.setshow(cart);
    return;
  }
      
  }
  
  cart[index].data.message.Num+=operation;
  this.setshow(cart)

},


  setshow(cart){

 
    let allchecked=cart.length!==0?true:false;
    let allPrice=0;
    let allNum=0;
  
    cart.forEach((v)=>{
      if(v.data.message.checked)
      {
   allPrice+=v.data.message.goods_price*v.data.message.Num;
   allNum+=v.data.message.Num
    
      }else{
        allchecked=false;
      }
    })
    this.setData({
      
      cart,   
      allchecked,
      allNum,
      allPrice
    })
    wx.setStorageSync('cart',cart);
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address=wx.getStorageSync('address');
   
    const cart = wx.getStorageSync("cart")||[];
   this.setData({
     address
   })
   this.setshow(cart)
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
 
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})