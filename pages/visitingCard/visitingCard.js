// pages/visitingCard/visitingCard.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  // 下载图片
  bindseaveimage:function(){

    wx.getImageInfo({
      src: this.data.imagecode,//这里放你要下载图片的数组(多张) 或 字符串(一张) 下面代码不用改动
      success: function (ret) {
        var path = ret.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(result) {
            console.log("成功");
            wx.hideLoading();
            wx.showToast({
              title: '下载图片成功',
              duration: 2000,
              mask: true,
            });
          },
          fail(result) {
            console.log("失败,你取消了" + JSON.stringify(result))
            console.log(path);
            wx.openSetting({
              success: (res) => {
                console.log(res);
              }
            })
          }
        });
      }
 
    });
  },
  // 添加手机通讯录联系人。
  addPhoneContact() {
    wx.addPhoneContact({
      nickName: "昵称",
      lastName: "姓",
      firstName: "名",
      remark: "备注",
      mobilePhoneNumber: "11443234322", //手机号
      weChatNumber: "wx123",
      success: function () {
        console.log("success");
        wx.showToast({
          title: "保存成功",
          icon: "none",
          mask: true,
        });
      },
      fail: function () {
        console.log("fail");
        wx.showToast({
          title: "保存失败，请从新保存",
          icon: "none",
          mask: true,
        });
      },
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
  onShareAppMessage: function () {
    return {
      title: "某某的名片",
      path:
        "pages/visitingCard/visitingCard?id=" + 1,
      success: function (res) {
        console.log("成功", res);
      },
    };
  },
});
