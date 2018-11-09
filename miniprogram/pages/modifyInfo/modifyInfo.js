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
    tel: "",
    isFirst: false
  },
  modify() {
    if (this.data.isFirst) {
      this.updateDb();
    } else {
      this.insertDb();
    }
  },
  getInfo() {
    wx.showLoading({
      title: '加载中',
    })
    db.collection("tb_user").doc(app.globalData.openid).get().then(res => {
      console.log(res.data)
      wx.hideLoading();
      this.setData({
        home: res.data.home,
        tel: res.data.tel,
        area: res.data.area,
        isFirst: true
      })
    }).catch(error => {
      console.log(error)
      wx.hideLoading();
    })
  },
  updateDb() {
    const self = this;
    console.log(self.data.home)
    console.log(self.data.tel)
    db.collection('tb_user').doc(app.globalData.openid).update({
      // data 字段表示需新增的 JSON 数据
      data: {
        home: self.data.home,
        tel: self.data.tel,
        area: self.data.area
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  },
  insertDb() {
    const self = this;
    db.collection('tb_user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: app.globalData.openid,
        userid: app.globalData.openid,
        home: self.data.home,
        tel: self.data.tel,
        area: self.data.area
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        self.setData({
          isFirst: true
        })
      }
    })
  },
  open2() {
    this.setData({
      visible2: true,
    })
  },
  homeChange(e) {
    this.setData({
      home: e.detail.detail.value
    })
  },
  telChange(e) {
    this.setData({
      tel: e.detail.detail.value
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
    this.getInfo()
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