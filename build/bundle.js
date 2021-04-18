/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Vector.js":
/*!***********************!*\
  !*** ./src/Vector.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Vector)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Vector = /*#__PURE__*/function () {\n  function Vector(x, y) {\n    _classCallCheck(this, Vector);\n\n    this.x = x;\n    this.y = y;\n  }\n\n  _createClass(Vector, null, [{\n    key: \"random\",\n    value: function random() {\n      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;\n      var way = Math.random() * Math.PI * 2;\n      var x = Math.cos(way) * length;\n      var y = Math.sin(way) * length;\n      return new Vector(x, y);\n    }\n  }]);\n\n  return Vector;\n}();\n\n\n\n//# sourceURL=webpack://my-webpack-project/./src/Vector.js?");

/***/ }),

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"canvas\": () => (/* binding */ canvas),\n/* harmony export */   \"ctx\": () => (/* binding */ ctx)\n/* harmony export */ });\nvar canvas = document.getElementById('canvas');\nvar ctx = canvas.getContext(\"2d\");\n\n\n//# sourceURL=webpack://my-webpack-project/./src/canvas.js?");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((module) => {

eval("module.exports = {\n  antSpeed: 5\n};\n\n//# sourceURL=webpack://my-webpack-project/./src/config.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _objects_Ant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects/Ant */ \"./src/objects/Ant.js\");\n/* harmony import */ var _objects_Food__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objects/Food */ \"./src/objects/Food.js\");\n/* harmony import */ var _objects_Home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./objects/Home */ \"./src/objects/Home.js\");\n/* harmony import */ var _objects_Pheromone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./objects/Pheromone */ \"./src/objects/Pheromone.js\");\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./canvas */ \"./src/canvas.js\");\n\n\n\n\n // Resize canvas\n\nfunction resize() {\n  _canvas__WEBPACK_IMPORTED_MODULE_4__.canvas.width = window.innerWidth;\n  _canvas__WEBPACK_IMPORTED_MODULE_4__.canvas.height = window.innerHeight;\n}\n\nwindow.onresize = resize;\nresize(); // ---\n\nfunction clear() {\n  _canvas__WEBPACK_IMPORTED_MODULE_4__.ctx.beginPath();\n  _canvas__WEBPACK_IMPORTED_MODULE_4__.ctx.clearRect(0, 0, _canvas__WEBPACK_IMPORTED_MODULE_4__.canvas.width, _canvas__WEBPACK_IMPORTED_MODULE_4__.canvas.height);\n}\n\nvar home = new _objects_Home__WEBPACK_IMPORTED_MODULE_2__.default(100, 100);\nvar food = new _objects_Food__WEBPACK_IMPORTED_MODULE_1__.default(400, 400);\nhome.spawn();\n\nfunction draw() {\n  clear();\n  home.draw();\n  food.draw();\n  _objects_Pheromone__WEBPACK_IMPORTED_MODULE_3__.default.all.forEach(function (pher) {\n    pher.evaporate();\n    pher.draw();\n  });\n  _objects_Ant__WEBPACK_IMPORTED_MODULE_0__.default.all.forEach(function (ant) {\n    ant.move();\n    ant.eat();\n    ant.trace();\n    ant.draw();\n  });\n  _objects_Pheromone__WEBPACK_IMPORTED_MODULE_3__.default.clear();\n}\n\nsetInterval(draw, 50);\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

/***/ }),

/***/ "./src/objects/Ant.js":
/*!****************************!*\
  !*** ./src/objects/Ant.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ant)\n/* harmony export */ });\n/* harmony import */ var _Pheromone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pheromone */ \"./src/objects/Pheromone.js\");\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vector */ \"./src/Vector.js\");\n/* harmony import */ var _Food__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Food */ \"./src/objects/Food.js\");\n/* harmony import */ var _Home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Home */ \"./src/objects/Home.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ \"./src/config.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../canvas */ \"./src/canvas.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\nvar Ant = /*#__PURE__*/function () {\n  function Ant(x, y) {\n    _classCallCheck(this, Ant);\n\n    this.x = x;\n    this.y = y;\n    this.hasFood = false;\n    this.contactSmell = 1;\n    this.direction = _Vector__WEBPACK_IMPORTED_MODULE_1__.default.random((_config__WEBPACK_IMPORTED_MODULE_4___default().antSpeed));\n    Ant.all.push(this);\n  }\n\n  _createClass(Ant, [{\n    key: \"draw\",\n    value: function draw() {\n      _canvas__WEBPACK_IMPORTED_MODULE_5__.ctx.beginPath();\n      _canvas__WEBPACK_IMPORTED_MODULE_5__.ctx.fillStyle = \"rgb(255, 255, 255)\";\n      _canvas__WEBPACK_IMPORTED_MODULE_5__.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2, false);\n      _canvas__WEBPACK_IMPORTED_MODULE_5__.ctx.fill();\n    }\n  }, {\n    key: \"move\",\n    value: function move() {\n      var angle = Math.atan2(this.direction.y, this.direction.x);\n      var change = (Math.random() - 0.5) * 0.7;\n      var ts = this.takeSmell();\n      if (ts) angle = ts;\n      angle += change;\n      var x = Math.cos(angle) * (_config__WEBPACK_IMPORTED_MODULE_4___default().antSpeed);\n      var y = Math.sin(angle) * (_config__WEBPACK_IMPORTED_MODULE_4___default().antSpeed);\n      this.direction = new _Vector__WEBPACK_IMPORTED_MODULE_1__.default(x, y);\n      this.x += x;\n      this.y += y;\n      this.goBack();\n      this.contactSmell -= 0.01;\n    }\n  }, {\n    key: \"takeSmell\",\n    value: function takeSmell() {\n      var _this = this;\n\n      var dir;\n      var power = 0;\n\n      var check = function check(pher) {\n        var dist = Math.pow(Math.pow(Math.abs(pher.x - _this.x), 2) + Math.pow(Math.abs(pher.y - _this.y), 2), 0.5);\n        var newPower = pher.power;\n\n        if (newPower > power && dist <= 15) {\n          power = newPower;\n          var x = pher.x - _this.x;\n          var y = pher.y - _this.y;\n          dir = new _Vector__WEBPACK_IMPORTED_MODULE_1__.default(x, y);\n        }\n      };\n\n      if (this.hasFood) _Pheromone__WEBPACK_IMPORTED_MODULE_0__.default.fromHome.forEach(check);else _Pheromone__WEBPACK_IMPORTED_MODULE_0__.default.fromFood.forEach(check);\n\n      if (power > 0) {\n        return Math.atan2(dir.y, dir.x);\n      }\n\n      return false;\n    }\n  }, {\n    key: \"goBack\",\n    value: function goBack() {\n      if (this.x < 0) {\n        this.x = Math.abs(this.x);\n        this.direction.x = -this.direction.x;\n      }\n\n      if (this.y < 0) {\n        this.y = Math.abs(this.y);\n        this.direction.y = -this.direction.y;\n      }\n\n      if (this.x > _canvas__WEBPACK_IMPORTED_MODULE_5__.canvas.width) {\n        this.x = 2 * _canvas__WEBPACK_IMPORTED_MODULE_5__.canvas.width - this.x;\n        this.direction.x = -this.direction.x;\n      }\n\n      if (this.y > _canvas__WEBPACK_IMPORTED_MODULE_5__.canvas.height) {\n        this.y = 2 * _canvas__WEBPACK_IMPORTED_MODULE_5__.canvas.width - this.y;\n        this.direction.y = -this.direction.y;\n      }\n    }\n  }, {\n    key: \"trace\",\n    value: function trace() {\n      if (this.contactSmell > 0) new _Pheromone__WEBPACK_IMPORTED_MODULE_0__.default(this.x, this.y, this.hasFood, this.contactSmell);\n    }\n  }, {\n    key: \"eat\",\n    value: function eat() {\n      var _this2 = this;\n\n      if (!this.hasFood) {\n        _Food__WEBPACK_IMPORTED_MODULE_2__.default.all.forEach(function (food) {\n          if (food.checkDistant(_this2)) {\n            _this2.hasFood = true;\n            food.weight -= 0.001;\n            _this2.contactSmell = 1;\n          }\n        });\n      }\n\n      if (this.hasFood && _Home__WEBPACK_IMPORTED_MODULE_3__.default.obj.checkDistant(this)) {\n        this.hasFood = false;\n        this.contactSmell = 1;\n      }\n    }\n  }]);\n\n  return Ant;\n}();\n\n_defineProperty(Ant, \"all\", []);\n\n\n\n//# sourceURL=webpack://my-webpack-project/./src/objects/Ant.js?");

/***/ }),

/***/ "./src/objects/Food.js":
/*!*****************************!*\
  !*** ./src/objects/Food.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Food)\n/* harmony export */ });\n/* harmony import */ var _Pheromone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pheromone */ \"./src/objects/Pheromone.js\");\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../canvas */ \"./src/canvas.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar Food = /*#__PURE__*/function () {\n  function Food(x, y) {\n    var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;\n\n    _classCallCheck(this, Food);\n\n    this.x = x;\n    this.y = y;\n    this.weight = 1;\n    this.radius = radius;\n    Food.all.push(this);\n    new _Pheromone__WEBPACK_IMPORTED_MODULE_0__.default(x, y, true, Number.POSITIVE_INFINITY);\n  }\n\n  _createClass(Food, [{\n    key: \"draw\",\n    value: function draw() {\n      _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.beginPath();\n      _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.fillStyle = \"rgba(81, 202, 70, \".concat(this.weight, \")\");\n      _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);\n      _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.fill();\n    }\n  }, {\n    key: \"checkDistant\",\n    value: function checkDistant(ant) {\n      var dx = Math.abs(ant.x - this.x);\n      var dy = Math.abs(ant.y - this.y);\n      var dlen = Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 0.5);\n      return dlen <= this.radius;\n    }\n  }]);\n\n  return Food;\n}();\n\n_defineProperty(Food, \"all\", []);\n\n\n\n//# sourceURL=webpack://my-webpack-project/./src/objects/Food.js?");

/***/ }),

/***/ "./src/objects/Home.js":
/*!*****************************!*\
  !*** ./src/objects/Home.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var _Ant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ant */ \"./src/objects/Ant.js\");\n/* harmony import */ var _Pheromone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pheromone */ \"./src/objects/Pheromone.js\");\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../canvas */ \"./src/canvas.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nvar Home = /*#__PURE__*/function () {\n  function Home(x, y) {\n    var ants = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;\n    var radius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;\n\n    _classCallCheck(this, Home);\n\n    this.x = x;\n    this.y = y;\n    this.ants = ants;\n    this.radius = radius;\n    Home.obj = this;\n    new _Pheromone__WEBPACK_IMPORTED_MODULE_1__.default(x, y, false, Number.POSITIVE_INFINITY);\n  }\n\n  _createClass(Home, [{\n    key: \"draw\",\n    value: function draw() {\n      _canvas__WEBPACK_IMPORTED_MODULE_2__.ctx.beginPath();\n      _canvas__WEBPACK_IMPORTED_MODULE_2__.ctx.fillStyle = \"rgb(209, 77, 77)\";\n      _canvas__WEBPACK_IMPORTED_MODULE_2__.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);\n      _canvas__WEBPACK_IMPORTED_MODULE_2__.ctx.fill();\n    }\n  }, {\n    key: \"spawn\",\n    value: function spawn() {\n      for (var i = 0; i < this.ants; i++) {\n        var angle = Math.random() * Math.PI * 2;\n        var x1 = Math.cos(angle) * this.radius;\n        var y1 = Math.sin(angle) * this.radius;\n        var length = Math.random();\n        var x = x1 * length;\n        var y = y1 * length;\n        new _Ant__WEBPACK_IMPORTED_MODULE_0__.default(this.x + x, this.y + y);\n      }\n    }\n  }, {\n    key: \"checkDistant\",\n    value: function checkDistant(ant) {\n      var dx = Math.abs(ant.x - this.x);\n      var dy = Math.abs(ant.y - this.y);\n      var dlen = Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 0.5);\n      return dlen <= this.radius;\n    }\n  }]);\n\n  return Home;\n}();\n\n_defineProperty(Home, \"obj\", void 0);\n\n\n\n//# sourceURL=webpack://my-webpack-project/./src/objects/Home.js?");

/***/ }),

/***/ "./src/objects/Pheromone.js":
/*!**********************************!*\
  !*** ./src/objects/Pheromone.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Pheromone)\n/* harmony export */ });\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../canvas */ \"./src/canvas.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nvar Pheromone = /*#__PURE__*/function () {\n  function Pheromone(x, y, type) {\n    var power = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;\n\n    _classCallCheck(this, Pheromone);\n\n    this.x = x;\n    this.y = y;\n    this.type = type;\n    this.power = power;\n    Pheromone.all.push(this);\n  }\n\n  _createClass(Pheromone, [{\n    key: \"draw\",\n    value: function draw() {\n      _canvas__WEBPACK_IMPORTED_MODULE_0__.ctx.beginPath();\n      if (this.type) _canvas__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"rgba(81, 202, 70, \".concat(this.power, \")\");else _canvas__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"rgba(209, 77, 77, \".concat(this.power, \")\");\n      _canvas__WEBPACK_IMPORTED_MODULE_0__.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2, false);\n      _canvas__WEBPACK_IMPORTED_MODULE_0__.ctx.fill();\n    }\n  }, {\n    key: \"evaporate\",\n    value: function evaporate() {\n      this.power -= 0.005;\n    }\n  }], [{\n    key: \"fromHome\",\n    get: function get() {\n      return Pheromone.all.filter(function (pher) {\n        return !pher.type;\n      });\n    }\n  }, {\n    key: \"fromFood\",\n    get: function get() {\n      return Pheromone.all.filter(function (pher) {\n        return pher.type;\n      });\n    }\n  }, {\n    key: \"clear\",\n    value: function clear() {\n      Pheromone.all = Pheromone.all.filter(function (pher) {\n        return pher.power > 0;\n      });\n    }\n  }]);\n\n  return Pheromone;\n}();\n\n_defineProperty(Pheromone, \"all\", []);\n\n\n\n//# sourceURL=webpack://my-webpack-project/./src/objects/Pheromone.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;