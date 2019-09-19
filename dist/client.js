"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = require("util");

var _request2 = _interopRequireDefault(require("request"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _user = _interopRequireDefault(require("./user"));

var _event = _interopRequireDefault(require("./event"));

var _company = _interopRequireDefault(require("./company"));

var _contact = _interopRequireDefault(require("./contact"));

var _visitor = _interopRequireDefault(require("./visitor"));

var _counts = _interopRequireDefault(require("./counts"));

var _admin = _interopRequireDefault(require("./admin"));

var _tag = _interopRequireDefault(require("./tag"));

var _segment = _interopRequireDefault(require("./segment"));

var _message = _interopRequireDefault(require("./message"));

var _conversation = _interopRequireDefault(require("./conversation"));

var _note = _interopRequireDefault(require("./note"));

var _customer = _interopRequireDefault(require("./customer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Client =
/*#__PURE__*/
function () {
  function Client() {
    var _this = this;

    _classCallCheck(this, Client);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 2) {
      this.usernamePart = args[0];
      this.passwordPart = args[1];
    } else if (args.length === 1) {
      if (args[0].token) {
        this.usernamePart = args[0].token;
        this.passwordPart = '';
      } else {
        this.usernamePart = args[0].appId;
        this.passwordPart = args[0].appApiKey;
      }
    }

    if (!this.usernamePart || this.passwordPart === undefined) {
      throw new Error('Could not construct a client with those parameters');
    }

    this.users = new _user["default"](this);
    this.events = new _event["default"](this);
    this.companies = new _company["default"](this);
    this.contacts = new _contact["default"](this);
    this.leads = new _contact["default"](this);
    this.visitors = new _visitor["default"](this);
    this.counts = new _counts["default"](this);
    this.admins = new _admin["default"](this);
    this.tags = new _tag["default"](this);
    this.segments = new _segment["default"](this);
    this.messages = new _message["default"](this);
    this.conversations = new _conversation["default"](this);
    this.notes = new _note["default"](this);
    this.customers = new _customer["default"](this);
    this.promises = false;
    this.requestOpts = {
      baseUrl: 'https://api.intercom.io'
    };
    this.useBaseUrl = (0, _util.deprecate)(function (baseUrl) {
      return _this.useRequestOpts({
        baseUrl: baseUrl
      });
    }, 'intercom-client - client.useBaseUrl(url): Use client.useRequestOpts({ baseUrl: url }) instead');
  }

  _createClass(Client, [{
    key: "usePromises",
    value: function usePromises() {
      this.promises = true;
      return this;
    }
  }, {
    key: "useRequestOpts",
    value: function useRequestOpts(opts) {
      this.requestOpts = Object.assign(this.requestOpts, opts);
      return this;
    }
  }, {
    key: "promiseProxy",
    value: function promiseProxy(f, args) {
      var _this2 = this;

      if (this.promises || !f) {
        var callbackHandler = this.callback;
        return new _bluebird["default"](function (resolve, reject) {
          var resolver = function resolver(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          };

          _this2.request(args, function (err, r) {
            callbackHandler(resolver, err, r);
          });
        });
      } else {
        this.request(args, function (err, r) {
          return _this2.callback(f, err, r);
        });
      }
    }
  }, {
    key: "ping",
    value: function ping(f) {
      this.request({
        uri: '/admins'
      }, function (_, response) {
        return f(response.statusCode);
      });
    }
  }, {
    key: "put",
    value: function put(endpoint, data, f) {
      return this.promiseProxy(f, {
        method: 'put',
        uri: endpoint,
        body: data
      });
    }
  }, {
    key: "post",
    value: function post(endpoint, data, f) {
      return this.promiseProxy(f, {
        method: 'post',
        uri: endpoint,
        body: data
      });
    }
  }, {
    key: "get",
    value: function get(endpoint, data, f) {
      return this.promiseProxy(f, {
        method: 'get',
        uri: endpoint,
        qs: data
      });
    }
  }, {
    key: "nextPage",
    value: function nextPage(paginationObject, f) {
      return this.promiseProxy(f, {
        method: 'get',
        uri: paginationObject.next,
        baseUrl: null
      });
    }
  }, {
    key: "delete",
    value: function _delete(endpoint, data, f) {
      return this.promiseProxy(f, {
        method: 'delete',
        uri: endpoint,
        qs: data
      });
    }
  }, {
    key: "request",
    value: function request(args, callback) {
      var defaultArgs = {
        json: true,
        headers: {
          Accept: 'application/json',
          'User-Agent': 'intercom-node-client/2.0.0'
        }
      }; // Don't just use Object.assign(requestArgs, args) here because we need to handle special cases like .headers
      // Per request args should take prededence over the default, and both of these over the user specified args via .useRequestOpts

      var requestArgs = (0, _merge["default"])({}, this.requestOpts, defaultArgs, args);
      return (0, _request2["default"])(requestArgs, callback).auth(this.usernamePart, this.passwordPart);
    }
  }, {
    key: "callback",
    value: function callback(f, err, res) {
      if (!f) {
        return;
      }

      if (f.length >= 2) {
        if (res && res.body && res.body.type === 'error.list') {
          var message = null;

          if (Array.isArray(res.body.errors) && res.body.errors[0] && 'message' in res.body.errors[0]) {
            // Try to use the first errors message
            message = res.body.errors[0].message;
          }

          err = new Error(message || 'Response error');
          err.statusCode = res.statusCode;
          err.body = res.body;
          err.headers = res.headers;
        }

        if (err) {
          f(err, null);
        } else {
          f(null, res);
        }
      } else {
        f(res || null);
      }
    }
  }]);

  return Client;
}();

exports["default"] = Client;