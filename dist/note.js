"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Note =
/*#__PURE__*/
function () {
  function Note(client) {
    _classCallCheck(this, Note);

    this.client = client;
  }

  _createClass(Note, [{
    key: "create",
    value: function create(params, f) {
      return this.client.post('/notes', params, f);
    }
  }, {
    key: "list",
    value: function list(params, f) {
      return this.client.get('/notes', params, f);
    }
  }, {
    key: "find",
    value: function find(params, f) {
      return this.client.get("/notes/".concat(params.id), {}, f);
    }
  }]);

  return Note;
}();

exports["default"] = Note;