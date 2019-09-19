"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Client", {
  enumerable: true,
  get: function get() {
    return _client["default"];
  }
});
Object.defineProperty(exports, "User", {
  enumerable: true,
  get: function get() {
    return _user["default"];
  }
});
Object.defineProperty(exports, "Snippet", {
  enumerable: true,
  get: function get() {
    return _snippet["default"];
  }
});
Object.defineProperty(exports, "UserData", {
  enumerable: true,
  get: function get() {
    return _userData["default"];
  }
});
exports.IdentityVerification = void 0;

var _client = _interopRequireDefault(require("./client"));

var _user = _interopRequireDefault(require("./user"));

var _snippet = _interopRequireDefault(require("./snippet"));

var _userData = _interopRequireDefault(require("./user-data"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IdentityVerification =
/*#__PURE__*/
function () {
  function IdentityVerification() {
    _classCallCheck(this, IdentityVerification);
  }

  _createClass(IdentityVerification, null, [{
    key: "userHash",
    value: function userHash(params) {
      var secretKey = params.secretKey;
      var identifier = params.identifier;

      if (!secretKey) {
        throw new Error('secretKey must be provided');
      }

      if (!identifier) {
        throw new Error('identifier must be provided');
      }

      return _crypto["default"].createHmac('sha256', secretKey).update(identifier).digest('hex');
    }
  }]);

  return IdentityVerification;
}();

exports.IdentityVerification = IdentityVerification;