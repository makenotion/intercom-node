"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Visitor =
/*#__PURE__*/
function () {
  function Visitor(client) {
    _classCallCheck(this, Visitor);

    this.client = client;
  }

  _createClass(Visitor, [{
    key: "update",
    value: function update(params, f) {
      return this.client.post('/visitors', params, f);
    }
  }, {
    key: "find",
    value: function find(params, f) {
      if (params.id) {
        return this.client.get("/visitors/".concat(params.id), {}, f);
      } else if (params.user_id) {
        return this.client.get('/visitors', {
          user_id: params.user_id
        }, f);
      }
    }
  }, {
    key: "delete",
    value: function _delete(params, f) {
      return this.client["delete"]("/visitors/".concat(params.id), {}, f);
    }
  }, {
    key: "convert",
    value: function convert(params, f) {
      return this.client.post('/visitors/convert', params, f);
    }
  }]);

  return Visitor;
}();

exports["default"] = Visitor;