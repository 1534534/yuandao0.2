Page({
  data: {
    date: "",
    region: [],
    groupId: '',
  },
  onLoad: function (e) {
    if (e.groupId) {
      this.setData({
        groupId: e.groupId,

      });
    }
  },
  submit: function (e) {
    if (this.data.loading) {
      return;
    };
    let u = e.detail.value;
    this.setData({
      loading: true,
    });
    wx.showLoading({});
    if (this.data.groupId) {
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          data: {
            type: "joinGroup",
            data: {
              ...u,
              age: new Date().getFullYear() - this.data.date,
              region: this.data.region,
              groupId: Number(this.data.groupId),
            },
          },
        }).then((res) => {
          this.setData({
            loading: false,
          });
          wx.hideLoading();
          if (res.success) {
            wx.redirectTo({
              url:
                "/pages/tip/index?grjoupId=" +
                this.data.groupId +
                "&code=" +
                res.result.code,
            })
          }
          else {
            wx.showModal({
              title: "提示",
              content: res.result.errorMessage,
              success: function () {
                wx.navigateBack({
                  dalta: 1,
                });
              },
            });
          }
        })


    } else {
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          data: {
            type: "createGroup",
            data: {
              ...u,
              age: new Date().getFullYear() - this.data.date,
              region: this.data.region,
            },
          },
        }).then((res) => {
          this.setData({
            loading: false,
          });
          wx.hideLoading();
          wx.redirectTo({
            url:
              "/pages/tip/index?grjoupId=" + String(res.result.groupId),
            });
          });
      }
    },
  dateChange: function (e) {
    this.setData({
      date: e.detail.value,
    });
  },
  regionChange: function (e) {
    this.setData({
      region: e.detail.value,
    });
  },
});
