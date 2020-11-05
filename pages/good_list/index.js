import request from "../../request/index";
//Page Object
Page({
  data: {
    tabs: [
      { id: 1, name: "综合", isActive: true },
      { id: 2, name: "销量", isActive: false },
      { id: 3, name: "价格", isActive: false },
    ],
    goodlist: [],
  },
  QueryPanams: {
    query: "",
    cid: "",
    pagenum: "1",
    pagesize: "10",
  },
  totalPages: 1,
  //该函数为获取tab栏索引值
  getindex(e) {
    // console.log(e);
    const index = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => {
      i == index ? (v.isActive = true) : (v.isActive = false);
    });
    this.setData({
      tabs,
    });
  },
  async getgoodlist() {
    const goodlist = await request({
      url: "/goods/search",
      data: this.QueryPanams,
    });
    const total = goodlist.data.message.total;
    this.totalPages = Math.ceil(total / this.QueryPanams.pagesize);
    this.setData({
      goodlist: [...this.data.goodlist, ...goodlist.data.message.goods],
    });
    console.log(this.data.goodlist);
  },
  //options(Object)
  onLoad: function (options) {
    this.QueryPanams.cid = options.cid;
    this.getgoodlist();
    console.log(this.data.goodlist);
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    this.getgoodlist();
  },
  onReachBottom: function () {
    console.log("触底了");
    if (this.QueryPanams.pagenum >= this.totalPages) {
      wx.showToast({
        title: "没有数据啦",
      });
      return;
    }

    this.QueryPanams.pagenum++;
    this.getgoodlist();
  },
  onShareAppMessage: function () {},
  onPageScroll: function () {},
  //item(index,pagePath,text)
  onTabItemTap: function (item) {},
});
