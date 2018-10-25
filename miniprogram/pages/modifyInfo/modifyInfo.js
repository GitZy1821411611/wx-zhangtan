// miniprogram/pages/modifyInfo/modifyInfo.js
import areaList from "../../area.js"
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