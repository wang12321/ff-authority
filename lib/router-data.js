"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controlFindData = controlFindData;
exports.dateAndTimestampConversion = dateAndTimestampConversion;
exports.getSubPlatformData = getSubPlatformData;
exports.menuList = void 0;
exports.routerData = routerData;
exports.setMenuImportJson = setMenuImportJson;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getToken = '';
var url = '';
var urldev = 'http://authorityapi.test.xq5.com';
var urlProd = 'https://authorityapi.xq5.com';
var routerMaps = []; // 路由映射地址

var originalData = []; // 原数据

var menuList = []; // 菜单数据

exports.menuList = menuList;
var controlDataTagList = {}; // 控件数据

var service = _axios.default.create({
  headers: {}
}); // 响应拦截器
// response interceptor


service.interceptors.response.use(function (response) {
  var res = response.data;
  return res;
}, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(error) {
    var errorInfo;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errorInfo = {
              errno: -1,
              errmsg: ''
            };

            if (!error.response) {
              errorInfo.errmsg = "".concat(error.config.url, "\u54CD\u5E94\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u6D4F\u89C8\u5668\u91CD\u8BD5\u3002\u539F\u56E0").concat(error);
            } else if (error.response.status === 401) {
              errorInfo.errmsg = "\u767B\u5F55\u4FE1\u606F\u8FC7\u671F\uFF0C\u8DF3\u8F6C\u767B\u5F55\u9875401";
            } else {
              errorInfo.errmsg = "\u9519\u8BEF\u72B6\u6001\u7801\uFF1A".concat(error.response.status);
            }

            return _context.abrupt("return", Promise.reject(errorInfo));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
/**
 *
 * @param token
 * @param platform_key  平台key
 * @param sub_id  子平台ID
 * @param routerUrl   映射地址
 * @param dataType  数据类型: 1-菜单数据，2-控件和数据标签数据 3-原始数据 4-All
 * @param env     测试：dev  正式：prod
 *  @param env_id   环境  省内环境：1 省外环境：2 新环境：3
 */

function routerData(_ref2) {
  var token = _ref2.token,
      platform_key = _ref2.platform_key,
      routerUrl = _ref2.routerUrl,
      _ref2$sub_id = _ref2.sub_id,
      sub_id = _ref2$sub_id === void 0 ? 0 : _ref2$sub_id,
      _ref2$dataType = _ref2.dataType,
      dataType = _ref2$dataType === void 0 ? 1 : _ref2$dataType,
      _ref2$env = _ref2.env,
      env = _ref2$env === void 0 ? 'dev' : _ref2$env,
      _ref2$env_id = _ref2.env_id,
      env_id = _ref2$env_id === void 0 ? '1' : _ref2$env_id;
  return new Promise(function (resolve, reject) {
    if (token) {
      getToken = token;
    }

    if (getToken.length === 0) {
      resolve({
        errno: 1,
        errmsg: 'token参数错误'
      });
    }

    var dataTypeList = {
      dev: urldev,
      prod: urlProd
    };
    url = url && url.length !== 0 ? url : dataTypeList[env];
    routerMaps = routerUrl;
    getMenuDataAndTag({
      platform_key: platform_key,
      sub_id: sub_id,
      env_id: Number(env_id)
    }).then(function (data) {
      exports.menuList = menuList = data.menuData;
      controlDataTagList = data.tagData;
      console.log('menu and control', controlDataTagList, menuList);
      var dataTypeList = {
        1: menuList,
        2: controlDataTagList,
        3: originalData,
        4: {
          menuList: menuList,
          controlDataTagList: controlDataTagList
        }
      };
      resolve(dataTypeList[Number(dataType)] || dataTypeList[4]);
    }).catch(function (errno) {
      resolve(errno);
    });
  });
}

function containsNumber(str) {
  for (var i = 0; i < 10; i++) {
    if (str.indexOf(i) !== -1) return true;
  }

  return false;
}
/**
 *
 * @param path router地址 默认是当前文件路径 如果路由带了id需要自行传path ,(是数字特殊处理，为了兼容老项目获取path)
 * @param permissionId  权限标识
 * @param isBool ture返回布尔值 false返回数据
 * @param return
 * 1、如果有permissionId，isBool为true 返回布尔值
 * 2、如果有permissionId，isBool为false 返回对象
 * 3、如果没有permissionId 返回数组
 */


var pathOld = '';
var controlData = {};

function controlFindData(_ref3) {
  var _ref3$path = _ref3.path,
      path = _ref3$path === void 0 ? '' : _ref3$path,
      _ref3$permissionId = _ref3.permissionId,
      permissionId = _ref3$permissionId === void 0 ? '' : _ref3$permissionId,
      _ref3$isBool = _ref3.isBool,
      isBool = _ref3$isBool === void 0 ? true : _ref3$isBool;
  var hash = window.location.hash.replace(/#/g, '');
  path = path.length === 0 ? hash.indexOf('?') > 0 ? hash.substring(0, hash.indexOf('?')) : hash || window.location.pathname : path; // 如果路由绑定了动态ID
  // 需要过滤ID

  var regExp = new RegExp(/^(\-|\+)?\d+(\.\d+)?$/);

  if (containsNumber(path)) {
    var pathList = path.split('/');
    var newPathList = pathList.filter(function (item) {
      return item && !regExp.test(item);
    });
    path = newPathList ? '/' + newPathList.join('/') : path;
  }

  if (pathOld !== path) {
    var dataList = controlDataTagList[path] || [];
    controlData = onControlFindDataObj(dataList);
    pathOld = path;
  }

  if (permissionId.length !== 0) {
    var controlObj = controlData[permissionId] || {};

    if (Number(controlObj.type) === 5 || Number(controlObj.type) === 6) {
      return controlObj;
    }

    return isBool ? Object.keys(controlObj).length !== 0 : controlObj;
  } else {
    return controlData;
  }
}

function onControlFindDataObj(data) {
  var dataObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  data.forEach(function (item) {
    if (item.permission_id) {
      dataObj[item.permission_id] = item;

      if (item.children && item.children.length !== 0) {
        onControlFindDataObj(item.children, dataObj);
      }
    }
  });
  return dataObj;
} // 递归查找 -- 不用
// eslint-disable-next-line no-unused-vars


function onControlFindData(data, permissionId) {
  var dataObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  data.forEach(function (item) {
    if (item.permission_id === permissionId) {
      dataObj.push(item);
    } else {
      if (item.children && item.children.length !== 0) {
        onControlFindData(item.children, permissionId, dataObj);
      }
    }
  });
  return dataObj;
}

var getMenuDataAndTag = function getMenuDataAndTag(params) {
  return new Promise(function (resolve, reject) {
    service.defaults.headers.common['x-xq5-jwt'] = getToken;
    service.get("".concat(url, "/v1/web/menu"), {
      params: params
    }).then(function (res) {
      if (res && res.data && Number(res.errno) === 0) {
        originalData = res.data || []; // type: 1: 菜单 ，2:控件和数据标签

        var menuData = generateAsyncRouter(originalData, 1);
        var tagData = generateAsyncRouter(originalData, 2);
        resolve({
          menuData: menuData,
          tagData: tagData
        });
      } else {
        reject({
          errno: res.errno || 1,
          errmsg: res.errmsg || 'Error'
        });
      }
    }).catch(function (errno) {
      reject(errno);
    });
  });
}; // 映射服务器返回菜单与本地component


function generateAsyncRouter(serverRouterMap) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var menuList = [];

  switch (type) {
    case 1:
    case '1':
      serverRouterMap.forEach(function (item) {
        if ((Number(item.type) === 1 || Number(item.type) === 2) && Number(item.status) === 1) {
          var isParent = item.children && item.children.length > 0;
          var isChildrenMenu = isParent && item.children && item.children.filter(function (item) {
            return item.type === 2;
          }).length !== 0;
          var parent = generateRouter(item, children ? isChildrenMenu : true, children);

          if (isChildrenMenu) {
            parent.children = generateAsyncRouter(item.children, type, true) || [];
          } else if (!children) {
            parent.children = [generateRouter(item, isParent ? item.children && item.children.filter(function (item) {
              return item.type === 2;
            }).length !== 0 : false, children)];
          }

          menuList.push(parent);
        }
      });
      return menuList;

    case 2:
    case '2':
      return generateControlAndDataTag(serverRouterMap);

    default:
      return [];
  }
}

var generateRouter = function generateRouter(item, isParent, children) {
  return {
    path: !item.is_out_link ? isParent || !children ? item.route_data.indexOf('/') === 0 ? item.route_data : "/".concat(item.route_data) : item.route_data || '' : item.route_data,
    name: !item.is_out_link ? isParent ? item.route_data + 'p' : item.route_data || '' : item.route_data,
    alwaysShow: false,
    meta: {
      title: item.name,
      icon: item.icon,
      id: item.menu_id,
      newTime: item.showtime ? dateAndTimestampConversion(item.showtime) : '',
      noCache: false
    },
    component: !item.is_out_link ? isParent && !children ? routerMaps['Layout'] : routerMaps[item.route_data.indexOf('/') === 0 ? item.route_data.slice(1, item.route_data.length) : item.route_data] || '' : item.route_data
  };
};

var generateControlAndDataTag = function generateControlAndDataTag(serverRouterMap) {
  var routerUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var controlList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  serverRouterMap.forEach(function (item) {
    var isParent = item.children && item.children.length > 0;
    var parent = {};
    var routerUrlStr = routerUrl;

    if (Number(item.type) !== 1 && Number(item.type) !== 2 && Number(item.status) === 1) {
      parent = dataControlAndDataTag(serverRouterMap);
      controlList[routerUrl] = parent;
    } else if ((Number(item.type) === 1 || Number(item.type) === 2) && Number(item.status) === 1) {
      routerUrlStr += !item.is_out_link ? item.route_data.indexOf('/') === 0 ? item.route_data : "/".concat(item.route_data) : item.route_data;

      if (isParent) {
        generateControlAndDataTag(item.children, routerUrlStr, controlList);
      }
    }
  });
  return controlList;
};

function dataControlAndDataTag(data) {
  var treeList = [];
  data.forEach(function (item) {
    var tmp = {};

    if (Number(item.type) === 3 || Number(item.type) === 4) {
      tmp = {
        name: item.name,
        icon: item.icon,
        type: item.type,
        permission_id: item.route_data
      };
    } else if (Number(item.type) === 5 || Number(item.type) === 6) {
      tmp = {
        name: item.name,
        backend_api: item.backend_api,
        type: item.type,
        data_labels: item.data_labels,
        backend_api_method: item.backend_api_method,
        permission_id: item.route_data,
        show_prop: item.fields
      };
    }

    if (item.children) {
      tmp.children = dataControlAndDataTag(item.children);
    }

    treeList.push(tmp);
  });
  return treeList;
}

function getSubPlatformData(_ref4) {
  var token = _ref4.token,
      _ref4$platform_key = _ref4.platform_key,
      platform_key = _ref4$platform_key === void 0 ? '' : _ref4$platform_key,
      _ref4$env = _ref4.env,
      env = _ref4$env === void 0 ? 'dev' : _ref4$env,
      _ref4$env_id = _ref4.env_id,
      env_id = _ref4$env_id === void 0 ? '1' : _ref4$env_id;
  return new Promise(function (resolve, reject) {
    if (token) {
      getToken = token;
    }

    if (getToken.length === 0) {
      resolve({
        errno: 1,
        errmsg: 'token参数错误'
      });
    }

    var dataTypeList = {
      dev: urldev,
      prod: urlProd
    };
    url = url && url.length !== 0 ? url : dataTypeList[env];
    service.defaults.headers.common['x-xq5-jwt'] = getToken;
    service.get("".concat(url, "/v1/web/sub_platform"), {
      params: {
        platform_key: platform_key,
        env_id: Number(env_id)
      }
    }).then(function (res) {
      if (res && res.data && Number(res.errno) === 0) {
        resolve(res.data);
      } else {
        resolve({
          errno: res.errno || 1,
          errmsg: res.errmsg || 'Error'
        });
      }
    }).catch(function (errno) {
      resolve(errno);
    });
  });
}

function setMenuImportJson(_ref5) {
  var token = _ref5.token,
      _ref5$platform_key = _ref5.platform_key,
      platform_key = _ref5$platform_key === void 0 ? '' : _ref5$platform_key,
      _ref5$env_id = _ref5.env_id,
      env_id = _ref5$env_id === void 0 ? '1' : _ref5$env_id,
      _ref5$tree_data = _ref5.tree_data,
      tree_data = _ref5$tree_data === void 0 ? [] : _ref5$tree_data;
  return new Promise(function (resolve, reject) {
    if (token) {
      getToken = token;
    }

    if (getToken.length === 0) {
      resolve({
        errno: 1,
        errmsg: 'token参数错误'
      });
    }

    var dataTypeList = {
      dev: urldev,
      prod: urlProd
    };
    url = url && url.length !== 0 ? url : dataTypeList['dev'];
    service.defaults.headers.common['x-xq5-jwt'] = getToken;
    service.post("".concat(url, "/v1/web/import_json"), {
      platform_key: platform_key,
      env_id: Number(env_id),
      tree_data: tree_data
    }).then(function (res) {
      if (res && Number(res.errno) === 0) {
        resolve({
          errno: 0,
          errmsg: res.errmsg || '上传成功'
        });
      } else {
        resolve({
          errno: res.errno || 1,
          errmsg: res.errmsg || 'Error'
        });
      }
    }).catch(function (errno) {
      resolve(errno);
    });
  });
}
/**
 * 时间戳和日期相互转换
 * @param {number|string}  time 时间戳或日期（日期示例:2022-08-10或者2022/08/10 16:37:51）
 * @param {boolean} isDisplayDate  是否仅展示年月日 默认true
 * @returns {string|number}
 * @example
 * dateAndTimestampConversion(1660120671762) // '2022-08-10'
 * dateAndTimestampConversion(1660120671762,false) // '2022-08-10 16:37:51'
 * dateAndTimestampConversion('2022-08-10 16:37:51') // 1660120671000
 * dateAndTimestampConversion('2022/08/10 16:37:51') // 1660120671000
 */


function dateAndTimestampConversion(time) {
  var isDisplayDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var timeType = Object.prototype.toString.call(time);

  if (timeType !== '[object Number]' && timeType !== '[object String]') {
    throw new Error('参数应为数字或字符串类型');
  }

  var isTimeTypeIsNum = timeType === '[object Number]';

  if (isTimeTypeIsNum && String(time).length !== 10 && String(time).length !== 13) {
    throw new Error('时间戳位数应为10位数或13位数');
  }

  if (!isTimeTypeIsNum && time.length !== 10 && time.length !== 19) {
    throw new Error('日期位数应为10位数或19位数');
  }

  if (String(time).includes('-') || String(time).includes('/')) {
    var timeTransition = time.replace(/-/g, '/');
    return new Date(timeTransition).getTime();
  } else {
    var now = new Date(String(time).length === 10 ? Number(time) * 1000 : Number(time));
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString().padStart(2, '0');
    var date = now.getDate().toString().padStart(2, '0');
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var second = now.getSeconds().toString().padStart(2, '0');

    if (isDisplayDate) {
      return "".concat(year, "-").concat(month, "-").concat(date);
    } else {
      return "".concat(year, "-").concat(month, "-").concat(date, " ").concat(hours, ":").concat(minutes, ":").concat(second);
    }
  }
}