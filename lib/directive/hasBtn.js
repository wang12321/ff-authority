"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _routerData = require("../router-data");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * 默认参数：path 路径：取默认值, permissionId 权限标识(必填), isBool true返回布尔值 false返回数据对象
 * 使用所有el-button 标签
 * permissionId: 权限标识
 */
var _default = {
  inserted: function inserted(el, binding, vnode) {
    if (!_routerData.menuList || _routerData.menuList && _routerData.menuList.length === 0) {
      return;
    }

    if (_typeof(binding.value) === 'object' && Object.prototype.hasOwnProperty.call(binding.value, 'permissionId') && binding.value.permissionId !== '') {
      var hasPermissions = (0, _routerData.controlFindData)(_objectSpread({}, binding.value));

      if (!hasPermissions || _typeof(hasPermissions) === 'object' && Object.keys(hasPermissions).length === 0) {
        el.parentNode && el.parentNode.removeChild(el);
      } else if (Object.prototype.hasOwnProperty.call(binding.value, 'isBool') && !binding.value['isBool']) {
        el.innerHTML = "\n        <i class='".concat(hasPermissions['icon'], "'></i>\n        <span>").concat(hasPermissions['name'], "</span>\n        ");
      }
    } else if (typeof binding.value === 'string') {
      if (binding.value) {
        var _hasPermissions = (0, _routerData.controlFindData)({
          permissionId: binding.value
        });

        if (!_hasPermissions) {
          el.parentNode && el.parentNode.removeChild(el);
        }
      }
    } else {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
};
exports.default = _default;