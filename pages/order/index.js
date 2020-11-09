import request from "../../request/index";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 1, name: "全部", isActive: true },
      { id: 2, name: "待付款", isActive: false },
      { id: 3, name: "待收货", isActive: false },
      { id: 4, name: "退款/退货", isActive: false },
    ],
    orders: "",
  },
  changeTitleByIndex(index) {
    let { tabs } = this.data;
    tabs.forEach((v, i) => {
      i == index ? (v.isActive = true) : (v.isActive = false);
    });
    this.setData({
      tabs,
    });
  },
  getindex(e) {
    // console.log(e);
    const index = e.detail;
    this.changeTitleByIndex(index);
    this.getOrders(index + 1);
  },
  async getOrders(type) {
    const res = await request({ url: "/my/orders/all", data: { type } });
    console.log(res);

    this.setData({
      orders: res.data.message.orders.map((v) => ({
        ...v,
        create_time_cn: new Date(v.create_time * 1000).toLocaleString(),
      })),
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: "/pages/auth/index",
      });
      return;
    }

    let Pages = getCurrentPages(); //获取当前页面栈
    let currentPages = Pages[Pages.length - 1];
    let { type } = currentPages.options;

    this.changeTitleByIndex(type - 1);
    this.getOrders(type);
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
