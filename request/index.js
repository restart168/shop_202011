let ajaxtimes = 0;
export default function request(params) {
  let header = { ...params.header };
  if (params.url.includes("/my/")) {
    header["Authorization"] = wx.getStorageSync("token");
  }
  ajaxtimes++;
  const baseurl = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    wx.request({
      ...params,
      header: header,
      url: baseurl + params.url,

      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxtimes--;
        if (ajaxtimes == 0) {
          wx.hideLoading();
        }
      },
    });
  });
}
