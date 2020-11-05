import request from "../../request/index";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentindex: 0,
    leftMentList: [],
    rightMentList: [],
    init: 0,
  },
  cates: [],
  async getCates() {
    const res = await request({ url: "/categories" });
    this.cates = res.data.message;
    wx.setStorageSync("cates", { timer: Date.now(), data: this.cates });

    let leftMentList = this.cates.map((v) => {
      return v.cat_name;
    });
    let rightMentList = this.cates[0].children;
    this.setData({
      leftMentList,
      rightMentList,
    });
  },
  handchange(e) {
    if (this.currentindex == e.target.dataset.index) {
      return;
    }
    let currentindex = e.target.dataset.index;
    let rightMentList = this.cates[currentindex].children;
    this.setData({
      rightMentList,
      currentindex,
      init: 0,
    });
  },
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { const cates1 = wx.getStorageSync("cates");
  if (!cates1) {
    this.getCates();
  } else if (Date.now() - cates1.timer > 10 * 1000) {
    this.getCates();
    console.log(cates1.timer)
  } else {
    this.cates = cates1.data;
    let leftMentList = this.cates.map((v) => {
      return v.cat_name;
    });
    let rightMentList = this.cates[0].children;
    this.setData({
      leftMentList,
      rightMentList,
    });
  }},

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
