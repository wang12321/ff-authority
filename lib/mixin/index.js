"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.limitsMixin = void 0;

var _routerData = require("../router-data");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * 默认参数：path 路径：取默认值, permissionId 权限标识(必填), isBool true返回布尔值 false返回数据对象
 * 1、如果参数是字符串  字符串代表权限标识，其他值取的是默认值
 * 1.1 如果数据类型type 是5或者6 则是数据标签 自行判断显示
 * 返回显示字段的集合(,隔开的字符串)
 * 1.2 如果数据类型type 是3或者4 则是控件
 *  返回布尔值 true为存在 false为不存在
 * 2、如果参数是对象
 * 2.1 如果数据类型type 是5或者6 则是数据标签
 * 补充参数: prop table某一列属性值prop
 * prop有值且isBool为true(默认true) 返回布尔值 true为存在 false为不存在  建议使用(填写prop)
 * 如果prop无值或者isBool为false 返回显示字段的集合(,隔开的字符串)
 * 如果hasPermissions.show_prop 没值，那么默认显示
 * 2.2 如果数据类型type 是3或者4 则是控件
 * isBool为true(默认true) 返回布尔值 true为存在 false为不存在  建议使用(填写prop)
 * isBool为false 返回该权限标识下全部数据，自行判断显示，或者使用相关名称和icon
 * 如果需要使用接口返回的icon和name 那isBool设置为false
 * 2.3 如果permissionId 不填 会返回该路径下的所有控件数据
 */
var limitsMixin = {
  data: function data() {
    return {};
  },
  methods: {
    controlLimits: function controlLimits(parameter) {
      if (!_routerData.menuList || _routerData.menuList && _routerData.menuList.length === 0) {
        return true;
      }

      if (_typeof(parameter) === 'object') {
        var hasPermissions = (0, _routerData.controlFindData)(_objectSpread({}, parameter));

        if (Number(hasPermissions.type) === 5 || Number(hasPermissions.type) === 6) {
          var prop = parameter.prop,
              _parameter$isBool = parameter.isBool,
              isBool = _parameter$isBool === void 0 ? true : _parameter$isBool;

          if (prop && isBool) {
            return hasPermissions.show_prop && hasPermissions.show_prop.length !== 0 ? hasPermissions.show_prop.includes(prop) : true;
          } else {
            return hasPermissions.show_prop || '';
          }
        }

        return hasPermissions;
      } else if (typeof parameter === 'string') {
        var _hasPermissions = (0, _routerData.controlFindData)({
          permissionId: parameter
        });

        if (Number(_hasPermissions.type) === 5 || Number(_hasPermissions.type) === 6) {
          return _hasPermissions.show_prop || '';
        }

        return _hasPermissions;
      } else {
        return false;
      }
    }
  }
};
exports.limitsMixin = limitsMixin;