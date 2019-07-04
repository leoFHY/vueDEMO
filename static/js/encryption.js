export default{
  EDpass :{
    Emh: function (str) {
      return hex_md5(str);
    },
    Emb64: function (str) {
      return b64_md5(str);
    },
    Emhm: function (str) {
      return hex_hmac_md5(str);
    },
    Emb64m: function (str) {
      return b64_hmac_md5(str);
    },
    Emd5c: function (str) {
      return calcMD5(str);
    },
    Eb64: function (str) {
      var a64 = new Base64();
      return a64.encode(str);
    },
    Db64: function (str) {
      var a64 = new Base64();
      return a64.decode(str);
    },
    Eb64_UTF8: function (str) {
      var a64 = new Base64();
      return a64._utf8_encode(str);
    },
    Db64_UTF8: function (str) {
      var a64 = new Base64();
      return a64._utf8_decode(str);
    }
  }
}


/**
 * 原封装(已弃用)
 * @type {{
 * Emd5_hex: _EDPassword.Emd5_hex,
 * Emd5_b64: _EDPassword.Emd5_b64,
 * Emd5_hex_hmac: _EDPassword.Emd5_hex_hmac,
 * Emd5_b64_hmac: _EDPassword.Emd5_b64_hmac,
 * Emd5_calc: _EDPassword.Emd5_calc,
 * Eb64: _EDPassword.Eb64,
 * Db64: _EDPassword.Db64,
 * Eb64_UTF8: _EDPassword.Eb64_UTF8,
 * Db64_UTF8: _EDPassword.Db64_UTF8
 * }}
 * @private
 */
/*
var _EDPassword = {
    Emd5_hex: function (str) {
        return hex_md5(str);
    },
    Emd5_b64: function (str) {
        return b64_md5(str);
    },
    Emd5_hex_hmac: function (str) {
        return hex_hmac_md5(str);
    },
    Emd5_b64_hmac: function (str) {
        return b64_hmac_md5(str);
    },
    Emd5_calc: function (str) {
        return calcMD5(str);
    },
    Eb64: function (str) {
        var a64 = new Base64();
        return a64.encode(str);
    },
    Db64: function (str) {
        var a64 = new Base64();
        return a64.decode(str);
    },
    Eb64_UTF8: function (str) {
        var a64 = new Base64();
        return a64._utf8_encode(str);
    },
    Db64_UTF8: function (str) {
        var a64 = new Base64();
        return a64._utf8_decode(str);
    }
}
*/
