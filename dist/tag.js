"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tag =
/*#__PURE__*/
function () {
  function Tag(client) {
    _classCallCheck(this, Tag);

    this.client = client;
  }

  _createClass(Tag, [{
    key: "create",
    value: function create(data, f) {
      return this.client.post('/tags', data, f);
    }
  }, {
    key: "tag",
    value: function tag(data, f) {
      return this.client.post('/tags', data, f);
    }
  }, {
    key: "untag",
    value: function untag(data, f) {
      (data.users || []).forEach(function (user) {
        user.untag = true;
      });
      (data.companies || []).forEach(function (company) {
        company.untag = true;
      });
      return this.client.post('/tags', data, f);
    }
  }, {
    key: "delete",
    value: function _delete(params, f) {
      return this.client["delete"]("/tags/".concat(params.id), {}, f);
    }
  }, {
    key: "list",
    value: function list(f) {
      return this.client.get('/tags', {}, f);
    }
  }]);

  return Tag;
}();

exports["default"] = Tag;