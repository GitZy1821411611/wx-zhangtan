// miniprogram/pages/my/my.js
const app = getApp();
const db = wx.cloud.database({
  env: "env-01b937"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    home: "暂未修改小区",
    tel: "暂未修改电话号码",
    area: "暂未修改地址",
    visible: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.onGetOpenid();
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  get: function() {
    console.log(this.data.userInfo)
  },
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  goPageModifyInfo() {
    wx.navigateTo({
      url: "../modifyInfo/modifyInfo"
    })
  },
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        console.log(app.globalData.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)

      }
    })
  },
  getInfo() {
    db.collection("tb_user").doc(app.globalData.openid).get().then(res => {
      this.setData({
        home: res.data.home == "" ? "暂未修改小区" : res.data.home,
        tel: res.data.tel == "" ? "暂未修改电话号码" : res.data.tel,
        area: res.data.area == "" ? "暂未修改地址" : res.data.area
      })
      if (res.data.home == "" || res.data.tel == "" || res.data.area == "") {
        this.setData({
          visible: true
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})