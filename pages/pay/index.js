// pages/cart/index.js
import request from "../../request/index";
import { wxshowToast, requestPayment } from "../../utils/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    cart: "",

    allPrice: "",
    allNum: "",
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
    const address = wx.getStorageSync("address");

    let cart = wx.getStorageSync("cart") || [];

    cart = cart.filter((v) => v.data.message.checked);
    let allPrice = 0;
    let allNum = 0;

    cart.forEach((v) => {
      allPrice += v.data.message.goods_price * v.data.message.Num;
      allNum += v.data.message.Num;
    });
    this.setData({
      address,
      cart,
      allNum,
      allPrice,
    });
  },
  async handlepay() {
    try {
      const token = wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({
          url: "/pages/auth/index",
        });
        return;
      }

      const order_price = this.data.allPrice;
      const consignee_addr = this.data.address;
      const { cart } = this.data;
      let goods = [];
      cart.forEach((v) =>
        goods.push({
          goods_id: v.data.message.goods_id,
          goods_number: v.data.message.Num,
          gods_price: v.data.message.goods_price,
        })
      );
      const orderParams = { order_price, consignee_addr, goods };
      const { order_number } = await request({
        url: "/my/order/create",
        method: "post",
        data: orderParams,
      });
      const { pay } = await request({
        url: "/my/order/req_unifiedorder",
        method: "post",

        data: { order_number },
      });
      await requestPayment(pay);
      const res = await request({
        url: "/my/order/chkOrder",
        method: "post",

        data: { order_number },
      });
      await wxshowToast({ title: "支付成功" });
      let newCart = wx.getStorageSync("cart"); //支付成功后，对数据进行一次筛选，删除已购买的商品，
      newCart = newCart.filter((v) => !v.data.message.checked);
      wx.setStorageSync("cart", newCart);
      wx.navigateTo({
        url: "/pages/order/index",
      });
    } catch (error) {
      await wxshowToast({ title: "很可惜呢，暂时不能购买呢", icon: "none" });
      console.log(error);
    }
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
