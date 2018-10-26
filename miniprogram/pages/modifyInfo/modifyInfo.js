// miniprogram/pages/modifyInfo/modifyInfo.js
import areaList from "../../area.js"
const app = getApp();
const db = wx.cloud.database({
  env: "env-01b937"
})
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible2: false,
    areaList: areaList,
    area: "",
    home: "",
    tel: ""
  },
  insertDb() {
    db.collection('tb_user').where({
      userid: app.globalData.openid
    }).update({
      // data 字段表示需新增的 JSON 数据
      data: {
        userid: app.globalData.openid,
        home: this.data.home,
        tel: this.data.tel
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  },
  open2() {
    this.setData({
      visible2: true,
    })
  },
  onClose(key) {
    console.log('onClose')
    this.setData({
      [key]: false,
    })
  },
  onClose2() {
    this.onClose('visible2')
  },
  confirmCity(e) {
    this.onClose('visible2')
    this.setData({
      area: e.detail.detail.province + e.detail.detail.city + e.detail.detail.county
    })
  },
  cancelPop() {
    this.onClose('visible2')
  },
  back() {
    console.log("back")
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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