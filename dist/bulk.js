"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bulk =
/*#__PURE__*/
function () {
  function Bulk(client, dataType) {
    _classCallCheck(this, Bulk);

    this.client = client;
    this.dataType = dataType;
  }

  _createClass(Bulk, [{
    key: "bulk",
    value: function bulk(bulkOperations, f) {
      var dataType = this.dataType;
      var bulkParams = {
        items: []
      };
      var url = "/bulk/".concat(dataType, "s");
      bulkOperations.forEach(function (params) {
        for (var k in params) {
          var data = params[k];
          var method = k === 'create' ? 'post' : k;

          if (method !== 'post' && method !== 'delete') {
            throw new Error("Unknown bulk type: ".concat(method));
          }

          bulkParams.items.push({
            method: method,
            data_type: dataType,
            data: data
          });
        }
      });
      return this.client.post(url, bulkParams, f);
    }
  }]);

  return Bulk;
}();

exports["default"] = Bulk;