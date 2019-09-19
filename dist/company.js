"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _scroll = _interopRequireDefault(require("./scroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Company =
/*#__PURE__*/
function () {
  function Company(client) {
    _classCallCheck(this, Company);

    this.client = client;
    this.scroll = new _scroll["default"](this.client, 'companie');
  }

  _createClass(Company, [{
    key: "create",
    value: function create(data, f) {
      return this.client.post('/companies', data, f);
    }
  }, {
    key: "update",
    value: function update(data, f) {
      return this.create(data, f);
    }
  }, {
    key: "list",
    value: function list(f) {
      return this.client.get('/companies', {}, f);
    }
  }, {
    key: "listBy",
    value: function listBy(params, f) {
      return this.client.get('/companies', params, f);
    }
  }, {
    key: "find",
    value: function find(params, f) {
      if (params.id) {
        return this.client.get("/companies/".concat(params.id), {}, f);
      } else if (params.company_id) {
        return this.client.get('/companies', {
          company_id: params.company_id
        }, f);
      } else if (params.name) {
        return this.client.get('/companies', {
          name: params.name
        }, f);
      }
    }
  }, {
    key: "listUsers",
    value: function listUsers(params, f) {
      if (params.id) {
        return this.client.get("/companies/".concat(params.id, "/users"), {}, f);
      } else if (params.company_id) {
        return this.client.get('/companies', {
          company_id: params.company_id,
          type: 'user'
        }, f);
      } else if (params.name) {
        return this.client.get('/companies', {
          name: params.name,
          type: 'user'
        }, f);
      }
    }
  }]);

  return Company;
}();

exports["default"] = Company;