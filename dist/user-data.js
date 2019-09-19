"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("./index");

var _htmlencode = _interopRequireDefault(require("htmlencode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserData =
/*#__PURE__*/
function () {
  function UserData(settings) {
    _classCallCheck(this, UserData);

    this.loggedOut = !settings.user_id && !settings.email;

    if (!settings.app_id) {
      throw new Error('You must provide an app_id in your Intercom settings');
    }

    if (!this.loggedOut && !settings.verificationSecret) {
      throw new Error('You must provide your verification secret in your Intercom settings');
    }

    this.settings = settings;
  }

  _createClass(UserData, [{
    key: "json",
    value: function json() {
      this.setUserHash();
      return this.escapedSettings(this.settings);
    }
  }, {
    key: "getVerificationSecret",
    value: function getVerificationSecret() {
      var verificationSecret = this.settings.verificationSecret;
      delete this.settings.verificationSecret;
      return verificationSecret;
    }
  }, {
    key: "setUserHash",
    value: function setUserHash() {
      if (this.loggedOut || this.settings.user_hash !== undefined) {
        return;
      }

      var verificationSecret = this.settings.verificationSecret;
      delete this.settings.verificationSecret;
      var identifier = this.settings.user_id ? this.settings.user_id.toString() : this.settings.email;

      var userHash = _index.IdentityVerification.userHash({
        secretKey: verificationSecret,
        identifier: identifier
      });

      this.settings.user_hash = userHash;
    }
  }, {
    key: "escapedSettings",
    value: function escapedSettings(settings) {
      var _this = this;

      var intercomSettings = {};
      Object.keys(settings).map(function (key) {
        if (_typeof(settings[key]) === 'object' && settings[key] !== null) {
          intercomSettings[key] = _this.escapedSettings(settings[key]);
        } else {
          var escapedKey = _this.escapeString(key);

          var value = _this.escapeString(settings[key]);

          intercomSettings[escapedKey] = value;
        }
      });
      return intercomSettings;
    }
  }, {
    key: "escapeString",
    value: function escapeString(string) {
      if (typeof string === 'string') {
        string = _htmlencode["default"].htmlEncode(string).replace(/\&quot;/gi, '\\"');
      }

      return string;
    }
  }]);

  return UserData;
}();

exports["default"] = UserData;