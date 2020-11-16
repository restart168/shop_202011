import request from "../../request/index";
Page({
  data: {
    swiperList: [],
    navlist: [],
    floorlist: [],
  },

  async getswiperlist() {
    const result = await request({ url: "/home/swiperdata" });
    this.setData({
      swiperList: result.data.message,
    });
  },
  async getnavlist() {
    const result = await request({ url: "/home/catitems" });
    this.setData({
      navlist: result.data.message,
    });
  },
  async getfloorlist() {
    const result = await request({ url: "/home/floordata" });
    const data = JSON.stringify(result.data.message).replace(
      /goods_list/g,
      "goods_list/index"
    );

    this.setData({
      floorlist: JSON.parse(data),
    });
  },

  //options(Object)
  onLoad: function (options) {
    this.getswiperlist();
    this.getnavlist();
    this.getfloorlist();
    console.log(this.data.floorlist);
  },

  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  onPageScroll: function () {},
  //item(index,pagePath,text)
  onTabItemTap: function (item) {},
});
