"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hasBtn = _interopRequireDefault(require("./hasBtn"));

var _hasTable = _interopRequireDefault(require("./hasTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var directives = {
  hasBtn: _hasBtn.default,
  hasTable: _hasTable.default
}; // 批量注册指令

var _default = {
  install: function install(Vue) {
    Object.keys(directives).forEach(function (key) {
      Vue.directive(key, directives[key]);
    });
  }
};
exports.default = _default;