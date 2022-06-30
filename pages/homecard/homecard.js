// pages/homecard/homecard.js
import Api from "../../api/index";
import storage from "../../utils/cache";

let App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    buttontop: 602,
    navHeight: 0,
    navTop: 0,
    windowHeight: 0,
  },
  bindimageload(e) {
    let { windowHeight } = App.globalData;
    let { width, height } = e.detail;
    let that = this;
    var query = wx.createSelectorQuery();
    //获取内容高度
    query.select(".card").boundingClientRect();
    //获取完回掉
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      //取高度
      that.setData({
        buttontop: res[0].height * 0.94,
      });
    });
    console.log(e, windowHeight, width, height);
  },
  getPhone(e) {
    console.log(e);
    let { code, encryptedData, iv } = e.detail;
    var that = this;
    //用户授权
    Api.wx_mini_login({ code, encryptedData, iv }).then(res => {
      console.log(res);
      storage.setToken(res.token);
      wx.navigateTo({
        url: "/pages/visitingCard/visitingCard",
      });
    });
  },
  loading() {
    wx.showLoading({
      title: "加载中",
    });
    setTimeout(() => {
      wx.hideLoading({
        success: res => {},
      });
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { navHeight, navTop, windowHeight } = App.globalData;
    this.setData({
      navHeight,
      navTop,
      windowHeight,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loading();
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
