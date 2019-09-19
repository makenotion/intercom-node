"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Admin =
/*#__PURE__*/
function () {
  function Admin(client) {
    _classCallCheck(this, Admin);

    this.client = client;
  }

  _createClass(Admin, [{
    key: "list",
    value: function list(f) {
      return this.client.get('/admins', {}, f);
    }
  }, {
    key: "find",
    value: function find(id, f) {
      return this.client.get("/admins/".concat(id), {}, f);
    }
  }, {
    key: "me",
    value: function me(f) {
      return this.client.get('/me', {}, f);
    }
  }, {
    key: "away",
    value: function away(id, params, f) {
      return this.client.put("/admins/".concat(id, "/away"), params, f);
    }
  }]);

  return Admin;
}();

exports["default"] = Admin;