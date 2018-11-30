// miniprogram/pages/publish/publish.js
import utils from "../../utils.js";
const app = getApp();
let images = [];
const db = wx.cloud.database({
  env: "env-01b937"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadImages: [],
    pTitle: "",
    detail: ""
  },
  titleChange: function(e) {
    this.setData({
      pTitle: e.detail.detail.value
    })
  },
  bindTextAreaBlur: function(e) {
    this.setData({
      detail: e.detail.value
    })
  },
  // 上传图片
  doUpload: function() {
    const _this = this;
    if (!app.globalData.openid) {
      wx.showModal({
        title: '提示',
        content: '未授权用户，请跳转到个人信息进行授权',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: "../my/my"
            })
          } else if (res.cancel) {}
        }
      })
      return
    }
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        // 上传图片
        const cloudPath = app.globalData.openid + "-" + (new Date()).getTime() + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            images.push(res.fileID);
            _this.setData({
              uploadImages: images
            })
            console.log(_this.data.uploadImages)
            wx.showToast({
              icon: 'success',
              title: '上传成功',
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  //发布
  publish: function() {
    // if (!this.data.pTitle) {
    //   wx.showToast({
    //     icon: 'none',
    //     title: '请输入标题',
    //   })
    //   return;
    // }
    if (!this.data.detail) {
      wx.showToast({
        icon: 'none',
        title: '请输入详情描述',
      })
      return;
    }
    const self = this;
    db.collection('tb_records').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        recordid: app.globalData.openid,
        recordcontent: self.data.detail,
        recordimages: self.data.uploadImages,
        recordtitle: self.data.pTitle,
        recordtype: 1,
        recordtime: utils.formatDate(new Date())
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        if (res.errMsg === "collection.add:ok") {
          wx.showModal({
            title: '提示',
            content: '宝贝发布成功,是否继续发布?',
            success(res) {
              if (res.confirm) {

              } else if (res.cancel) {
                wx.switchTab({
                  url: "../my/my"
                })
              }
            }
          })
          self.setData({
            pTitle: "",
            detail: "",
            uploadImages: []
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.errMsg,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.onGetOpenid();
        }
      }
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    images = [];
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