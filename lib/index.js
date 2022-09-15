"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _directive = _interopRequireDefault(require("./directive"));

var _mixin = require("./mixin");

require("./sidebar/sidebar.css");

var _sidebar2 = _interopRequireDefault(require("./sidebar"));

var _ffButton = _interopRequireDefault(require("./ffButton"));

var _menuImport = _interopRequireDefault(require("./menuImport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// base on element-ui
_vue.default.use(_directive.default);

// 全局混入
_vue.default.mixin(_mixin.limitsMixin);

// 注册为全局组件
_vue.default.component('Sidebar', _sidebar2.default); // 引入


// 注册为全局组件
_vue.default.component('ffButton', _ffButton.default); // 引入


// 注册为全局组件
_vue.default.component('menuImport', _menuImport.default);