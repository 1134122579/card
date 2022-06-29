// pages/visitingCard/visitingCard.js

import Api from "../../api/index";
let App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    show: false,
  },
  oncode() {
    this.setData({
      show: true,
    });
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  loading(){
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      wx.hideLoading({
        success: (res) => {},
      })
    }, 1000);
  },
  // 下载图片
  bindseaveimage: function () {
    wx.getImageInfo({
      src: this.data.userInfo.mini_code, //这里放你要下载图片的数组(多张) 或 字符串(一张) 下面代码不用改动
      success: function (ret) {
        var path = ret.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(result) {
            console.log("成功");
            wx.hideLoading();
            wx.showToast({
              title: "下载图片成功",
              duration: 2000,
              mask: true,
            });
          },
          fail(result) {
            console.log("失败,你取消了" + JSON.stringify(result));
            console.log(path);
            wx.openSetting({
              success: res => {
                console.log(res);
              },
            });
          },
        });
      },
    });
  },
  // 添加手机通讯录联系人。
  addPhoneContact() {
    let userInfo = this.data.userInfo;
    wx.getSetting({
      success:res=>{
        console.log(res)
        if(res.authSetting['scope.addPhoneContact']){
          wx.addPhoneContact({
            // nickName: "昵称",
            // lastName: "姓",
            firstName: userInfo.name,
            // organization:'',
            email: userInfo.email,
            // remark: ,
            url: userInfo.website,
            title: userInfo.position,
            addressStreet: userInfo.address,
            mobilePhoneNumber: userInfo.mobile, //手机号
            // weChatNumber: "wx123",
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
        }else{
          wx.openSetting({
            success:res=>{
              console.log(res)
            }
          })
        }
      },fail(){
        wx.openSetting({
          success:res=>{
            console.log(res)
          }
        })
      }
    })
    return

  
  },
  getUserInfo() {
    Api.getUserInfo().then(res => {
      console.log(res);
      this.setData({
        userInfo: res,
      });
    });
  },
  getCardInfo(id) {
    Api.getCardInfo({ id }).then(res => {
      console.log(res);
      this.setData({
        userInfo: res,
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options?.id) {
      this.getCardInfo(options.id);
    } else {
      this.getUserInfo();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loading()
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
  onShareAppMessage: function () {
    return {
      title: this.data.userInfo.name+"名片",
      path: "pages/visitingCard/visitingCard?id=" + this.data.userInfo.id,
      success: function (res) {
        console.log("成功", res);
      },
    };
  },
});
