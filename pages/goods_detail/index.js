import request from "../../request/index";
import wxshowToast from "../../utils/index";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods_detail: [],
    isActive: "",
  },
  params: { goods_id: "" }, //  请求参数列表
  goodsObj: "",
  async getgood_detail() {
    let sa = [];
    sa.some;
    const res = await request({
      url: "/goods/detail",
      data: this.params,
    });
    console.log(res);
    this.goodsObj = res;
    let collect = wx.getStorageSync("collect") || [];
    let isActive = collect.some(
      (v) => v.data.message.goods_id === this.goodsObj.data.message.goods_id
    );
    this.setData({
      goods_detail: {
        goods_name: res.data.message.goods_name,
        goods_price: res.data.message.goods_price,
        goods_introduce: res.data.message.goods_introduce.replace(
          /\.webp/g,
          ".jpg"
        ),
        pics: res.data.message.pics,
      },
      isActive,
    });
  },
  handleshop() {
    wx.switchTab({
      url: "/pages/cart/index",
      success: (result) => {},
      fail: () => {},
      complete: () => {},
    });
  },
  handlePrevewImage(e) {
    const urls = this.goodsObj.data.message.pics.map((v) => v.pics_big);
    const current = e.currentTarget.dataset.url;

    wx.previewImage({
      urls,
      current,
    });
  },
  handleCarAdd() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(
      (v) => v.data.message.goods_id == this.goodsObj.data.message.goods_id
    );
    if (index == -1) {
      this.goodsObj.data.message.Num = 1;
      this.goodsObj.data.message.checked = true;
      cart.push(this.goodsObj);
    } else {
      cart[index].data.message.Num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: "添加成功",
      icon: "success",

      mask: true,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let Pages = getCurrentPages(); //获取当前页面栈
    let currentPages = Pages[Pages.length - 1];
    let type = currentPages.options;
    const { goods_id } = type;

    this.params.goods_id = goods_id;
    this.getgood_detail();
  },
  handlecollect() {
    let isActive = false;
    // 1 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect") || [];
    // 2 判断该商品是否被收藏过
    let index = collect.findIndex(
      (v) => v.data.message.goods_id === this.goodsObj.data.message.goods_id
    );
    // 3 当index！=-1表示 已经收藏过
    if (index !== -1) {
      // 能找到 已经收藏过了  在数组中删除该商品
      collect.splice(index, 1);
      isActive = false;
      wx.showToast({
        title: "取消成功",
        icon: "success",
        mask: true,
      });
    } else {
      // 没有收藏过
      collect.push(this.goodsObj);
      isActive = true;
      wx.showToast({
        title: "收藏成功",
        icon: "success",
        mask: true,
      });
    }
    // 4 把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    // 5 修改data中的属性  isCollect
    this.setData({
      isActive,
    });
  },

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
