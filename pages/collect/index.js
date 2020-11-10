// pages/collect/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    collect: [],
    tabs: [
      { id: 1, name: "商品收藏", isActive: true },
      { id: 2, name: "店铺收藏", isActive: false },
      { id: 3, name: "品牌收藏", isActive: false },
      { id: 4, name: "浏览器足迹", isActive: false },
    ],
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
    let { type } = currentPages.options;

    this.changeTitleByIndex(type - 1);

    const collect = wx.getStorageSync("collect") || [];
    this.setData({
      collect: collect.map((v) => v.data.message),
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
