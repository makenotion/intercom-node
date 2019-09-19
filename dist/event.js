"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bulk = _interopRequireDefault(require("./bulk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Event =
/*#__PURE__*/
function () {
  function Event(client) {
    _classCallCheck(this, Event);

    this.client = client;
  }

  _createClass(Event, [{
    key: "create",
    value: function create(data, f) {
      return this.client.post('/events', data, f);
    }
  }, {
    key: "listBy",
    value: function listBy(params, f) {
      return this.client.get('/events', params, f);
    }
  }, {
    key: "bulk",
    value: function bulk(params, f) {
      return new _bulk["default"](this.client, 'event').bulk(params, f);
    }
  }]);

  return Event;
}();

exports["default"] = Event;