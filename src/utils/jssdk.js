// const JSBridge = window.$jssdk

export default {
  getOs: function() {
    return window.$jssdk("device.os");
  },
  qrcodeCamera: function() {
    return window.$jssdk("qrcode.camera");
  }
};
