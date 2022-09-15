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
 * 封装的table,根据json生成表格--适用 不适用未封装的el-table
 * columnKey: 表头数据字段  默认tableColumn
 * prop: 某一列的属性值 默认prop
 * permissionId: 权限标识
 */
var _default = {
  inserted: function inserted(el, binding, vnode) {
    if (_typeof(binding.value) === 'object' && Object.prototype.hasOwnProperty.call(binding.value, 'permissionId') && binding.value.permissionId !== '') {
      var _binding$value = binding.value,
          _binding$value$column = _binding$value.columnKey,
          columnKey = _binding$value$column === void 0 ? 'tableColumn' : _binding$value$column,
          _binding$value$column2 = _binding$value.columnProp,
          columnProp = _binding$value$column2 === void 0 ? 'prop' : _binding$value$column2;
      var hasPermissions = (0, _routerData.controlFindData)(_objectSpread(_objectSpread({}, binding.value), {}, {
        isBool: false
      }));

      if (hasPermissions && hasPermissions.show_prop && Object.prototype.hasOwnProperty.call(vnode.context, columnKey)) {
        vnode.context[columnKey] = vnode.context[columnKey].filter(function (item) {
          return hasPermissions.show_prop && hasPermissions.show_prop.includes(item[columnProp]);
        });
      } else {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else if (typeof binding.value === 'string') {
      var _hasPermissions = (0, _routerData.controlFindData)({
        permissionId: binding.value,
        isBool: false
      });

      if (_hasPermissions && Object.prototype.hasOwnProperty.call(vnode.context, 'tableColumn')) {
        if (_hasPermissions.show_prop && _hasPermissions.show_prop.length !== 0) {
          vnode.context['tableColumn'] = vnode.context['tableColumn'].filter(function (item) {
            return _hasPermissions.show_prop.includes(item['prop']);
          });
        }
      } else {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
};
exports.default = _default;