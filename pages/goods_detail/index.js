import request from "../../request/index";

Page({
  /**
   * 页面的初始数据
   */
  data: {
   
    goods_detail: [],
  },
  params: { goods_id: "" }, //  请求参数列表
  goodsObj:"",
  async getgood_detail() {
    const res = await request({
      url: "/goods/detail",
      data: this.params,
    });
    console.log(res)
    this.goodsObj=res;
    this.setData({
      goods_detail: {
        goods_name:res.data.message.goods_name,
        goods_price:res.data.message.goods_price,
        goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:res.data.message.pics
      }
    });
  },
  handleshop(){
wx.switchTab({
  url: '/pages/cart/index',
  success: (result) => {
    
  },
  fail: () => {},
  complete: () => {}
});
  

  },
  handlePrevewImage(e){
  const urls = this.goodsObj.data.message.pics.map(v=>v.pics_big);
  const current = e.currentTarget.dataset.url;
 
    wx.previewImage({
      urls,
      current,
    })
  },
  handleCarAdd(){
    let cart=wx.getStorageSync('cart')||[];
    let index=cart.findIndex(v=>v.data.message.goods_id==this.goodsObj.data.message.goods_id);
    if(index==-1){
      this.goodsObj.data.message.Num=1;
      this.goodsObj.data.message.checked=true;
      cart.push(this.goodsObj)
    }else{
      cart[index].data.message.Num++;
    }
    wx.setStorageSync('cart',cart);
    wx.showToast({
      title: '添加成功',
      icon: 'success',
    
      mask: true,
    })
      
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
  
    this.params.goods_id = goods_id;
    this.getgood_detail();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
