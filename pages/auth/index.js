// pages/auth/index.js
import { wxlogin } from "../../utils/index";
import request from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  async handlegetuserinfo(e) {
    try {
      const { encrytedData, rawData, iv, signature } = e.detail;
      const { code } = await wxlogin();
      const loginParams = { encrytedData, rawData, iv, signature, code };
      //const {token}= await request({url:'/user/wxlogin',data:loginParams,method:'post'})
      //获取token值，需要企业账号，该支付功能未实现
      wx.setStorageSync(
        "token",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      ); //正确写法：wx.setStorageSync('token', token);，为了下一步开发，编造假的token
      wx.navigateBack({
        delta: 1, //返回上一层，若为2则返回上两层
      });
    } catch (error) {
      console.log(err);
    }
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
