import Fly from "./fly";
import storage from "./cache";


// import {
//     encrypt
// } from './crypto.js'

let fly = new Fly();
var loadingNum = 0;
// 动画加载
function loadingFun(loadingNum) {
  if (loadingNum > 0) {
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
  }
  if (loadingNum <= 0) {
    wx.hideLoading();
  }
}

fly.config.baseURL = "https://api.catcius.com/api/v3/" // 开发
// fly.config.baseURL = "https://carshop.nxcsoft.top/api/v1/"; // 生产
// 添加请求拦截器，加入微信用户sessionId头部
fly.interceptors.request.use((request) => {
  //loding
  try {
    request.headers["app-type"] = "ios";
    // request.headers['sign'] = encrypt(new Date().getTime())
    request.headers["sign"] = 123;
    // 获取token
    storage.setToken("c392e7df03a23dbe58f9d5613e2eb40ffca98ebdf0f410f55043b891c039992ab957ef2d84a0bac8b9551123ebf6f10479edd848cbf3928c3128b8ffa3e16dc03da57ec124c4906e923fdcfc01dfe57a")
    let token = storage.oldgetToken()
    if (token) {
      request.headers["access-user-token"] = token;
    }


    return request;
  } catch (e) {}
});

// 添加响应拦截器，统一处理错误
fly.interceptors.response.use(
  (response) => {},
  (err) => {
    return Promise.resolve(err);
  }
);

// 拦截处理
const handleResponse = ({
  config,
  response
}) => {
  if (!config.loading) {
    loadingNum--;
    loadingFun(loadingNum); //loding
  }
  // console.log("请求拦截======", {
  //   config,
  //   response,
  // });
  // 是第三方的接口.直接返回
  if (config.isThree) {
    return response;
  }

  // 兼容，服务器返回的空的data（接口返回500）
  response.data = response.data || {};

  return response.data.data;
  // 如果返回错误
  if (response.data.status !== 200) {
    // 没有登录
    if (response.data.status == 203) {
      try {
        wx.navigateTo({
          url: "/pages/login/login",
        });
        return;
      } catch (e) {
        console.error(e);
      }
    }
    // 统一报错
    !config.noToastError &&
      wx.hideLoading() &&
      wx.showToast({
        title: response.data.message || "系统错误",
        mask: true,
        icon: "none",
      });
    return Promise.reject(response.data);
  }
  return response.data.data;
};

const fly_request = (config) => {
  let url = config.url;
  const method = (config.method || "").toLowerCase();
  let params = config.params || {};
  // 是否显示loading
  if (!config.loading) {
    loadingNum++;
    loadingFun(loadingNum);
  }
  return fly[method](url, params)
    .then((response) => {
      return Promise.resolve({
        config,
        response,
      });
    })
    .then(handleResponse)
    .catch((error) => {
      return Promise.reject(error);
    });
};

export default fly_request;