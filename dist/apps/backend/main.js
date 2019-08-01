(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _lib_shared_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _lib_shared_data__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _lib_shared_data__WEBPACK_IMPORTED_MODULE_0__["b"]; });




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ang_weather_nx_shared_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var web_push__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var web_push__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(web_push__WEBPACK_IMPORTED_MODULE_5__);

var _a;





let AppService = class AppService {
    constructor(hs) {
        this.hs = hs;
        // TODO save, retrieve subscriptions in DB
        this.userSubscriptions = [];
        this.pollSubscriptions = [];
        this.period = 3 * 60 * 60 * 1000; // every 3 hour
        this.notificationPayload = {
            notification: {
                title: 'Weather News',
                body: 'Weather Precipitations',
                icon: 'assets/icons/icon-72x72.png',
                badge: 'assets/icons/icon-128x128.png',
                tag: '',
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1,
                    city: {},
                    day: ''
                },
                actions: [{
                        action: 'explore',
                        title: 'Go to the site'
                    }]
            }
        };
        this.searchPrecipitations = (weather) => weather.list.find(period => !!(period.snow && period.snow['3h'] || period.rain && period.rain['3h']));
        web_push__WEBPACK_IMPORTED_MODULE_5__["setVapidDetails"]('mailto:example@yourdomain.org', _ang_weather_nx_shared_data__WEBPACK_IMPORTED_MODULE_4__[/* ConfigData */ "a"].VAPID_PUBLIC_KEY, _ang_weather_nx_shared_data__WEBPACK_IMPORTED_MODULE_4__[/* ConfigData */ "a"].VAPID_PRIVATE_KEY);
        if (this.userSubscriptions.length) {
            this.setWeatherPolling();
        }
    }
    setWeatherPolling() {
        this.pollSubscriptions.forEach(sub => sub.unsubscribe());
        const allSubscriptions = this.userSubscriptions.reduce((arr, userSub) => [...arr, ...userSub.subscriptions], []);
        if (allSubscriptions.length) {
            allSubscriptions.forEach(sub => {
                this.pollSubscriptions.push(Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["interval"])(this.period)
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(() => this.get5DayForecastByCityId(sub.city.id)))
                    .subscribe(weather => {
                    const d = new Date();
                    console.log(`Got a weather at time - ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
                    const forecastPeriod = this.searchPrecipitations(weather);
                    if (forecastPeriod) {
                        this.sendNotifications(weather.city, forecastPeriod, sub.pushSubscription);
                    }
                }));
            });
        }
    }
    sendNotifications(city, forecastPeriod, pushSubscription) {
        const day = Object(_ang_weather_nx_shared_data__WEBPACK_IMPORTED_MODULE_4__[/* getWeekDay */ "b"])(forecastPeriod.dt);
        this.notificationPayload.notification.tag = day;
        this.notificationPayload.notification.body = `Found weather precipitations in ${city.name} at ${day}`;
        this.notificationPayload.notification.data.city = city;
        this.notificationPayload.notification.data.day = day;
        web_push__WEBPACK_IMPORTED_MODULE_5__["sendNotification"](pushSubscription, JSON.stringify(this.notificationPayload))
            .then(() => console.log(`Push Notification was sent for ${city.name}`))
            .catch(err => console.error('Error sending push notification, reason: ', err));
        // TODO handle web push errors
    }
    get5DayForecastByCityId(id) {
        const url = `${_ang_weather_nx_shared_data__WEBPACK_IMPORTED_MODULE_4__[/* ConfigData */ "a"].OPENWEATHERMAP_URL}forecast?id=${id}&appid=${_ang_weather_nx_shared_data__WEBPACK_IMPORTED_MODULE_4__[/* ConfigData */ "a"].OPENWEATHERMAP_APPID}&units=metric`;
        return this.hs.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(response => response.data));
    }
    findUserSubscription(userId) {
        return this.userSubscriptions.find(userSub => userSub.userId === userId);
    }
    getSubscriptions(userId) {
        const userSub = this.findUserSubscription(userId);
        return userSub ? userSub : { userId, subscriptions: [] };
    }
    addSubscription(userSubscription) {
        const userSub = this.findUserSubscription(userSubscription.userId);
        if (userSub) {
            userSub.subscriptions.push(userSubscription.subscriptions[0]);
        }
        else {
            this.userSubscriptions.push(userSubscription);
        }
        this.setWeatherPolling();
        return this.findUserSubscription(userSubscription.userId);
    }
    deleteSubscription(userId, cityId) {
        const userSub = this.findUserSubscription(userId);
        if (userSub) {
            userSub.subscriptions = userSub.subscriptions.filter(sub => sub.city.id !== cityId);
        }
        this.setWeatherPolling();
        return userSub;
    }
};
AppService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [typeof (_a = typeof _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpService"] !== "undefined" && _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpService"]) === "function" ? _a : Object])
], AppService);



/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("web-push");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigData; });
/* unused harmony export UserSubscriptions */
/* unused harmony export City */
/* unused harmony export FiveDayWeather */
/* unused harmony export ForecastPeriod */
/* unused harmony export Main */
/* unused harmony export Weather */
/* unused harmony export Clouds */
/* unused harmony export Wind */
/* unused harmony export Precipitation */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getWeekDay; });
class ConfigData {
}
ConfigData.ROUTE_PREFIX = 'api';
ConfigData.SUBSCRIPTIONS_URL = 'api/subscriptions';
ConfigData.FIREBASE_URL = 'https://weather-app-6e386.firebaseio.com/';
ConfigData.OPENWEATHERMAP_APPID = '547e48458270f5cd9a271cb7e1cdec51';
ConfigData.OPENWEATHERMAP_URL = 'https://api.openweathermap.org/data/2.5/';
ConfigData.VAPID_PUBLIC_KEY = 'BI3NVkrJAjjR1mFI408NCYtT-SnJ2KZrk5brxtRBySxrqoy_nIi4Ly1jnyB0YfYLXoF8QaEpYvZKO7eDJn-TA1M';
ConfigData.VAPID_PRIVATE_KEY = 'lzExeQb_2BdOGdyvxsBYXp1gxqfzCxVHmQit91GGFr8';
class UserSubscriptions {
}
class City {
}
class FiveDayWeather {
}
class ForecastPeriod {
}
class Main {
}
class Weather {
}
class Clouds {
}
class Wind {
}
class Precipitation {
}
function getWeekDay(dt) {
    const date = new Date(dt * 1000);
    const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysArr[date.getDay()];
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_core__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_data_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _frontend_middleware__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);







let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(_frontend_middleware__WEBPACK_IMPORTED_MODULE_6__[/* FrontendMiddleware */ "a"]).forRoutes({ path: '/**', method: _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["RequestMethod"].ALL });
    }
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpModule"]],
        controllers: [_app_controller__WEBPACK_IMPORTED_MODULE_2__[/* AppController */ "a"]],
        providers: [
            _app_service__WEBPACK_IMPORTED_MODULE_3__[/* AppService */ "a"],
            {
                provide: _nestjs_core__WEBPACK_IMPORTED_MODULE_4__["APP_PIPE"],
                useClass: _util_data_pipe__WEBPACK_IMPORTED_MODULE_5__[/* DataPipe */ "a"]
            }
        ]
    })
], AppModule);



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _ang_weather_nx_shared_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);

var _a;



let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getSubscriptions(userId) {
        return this.appService.getSubscriptions(userId);
    }
    addSubscription(subscription) {
        return this.appService.addSubscription(subscription);
    }
    deleteSubscription(userId, cityId) {
        return this.appService.deleteSubscription(userId, cityId);
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(_ang_weather_nx_shared_data__WEBPACK_IMPORTED_MODULE_3__[/* ConfigData */ "a"].SUBSCRIPTIONS_URL),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Query"])('userId')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Number]),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
], AppController.prototype, "getSubscriptions", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])(_ang_weather_nx_shared_data__WEBPACK_IMPORTED_MODULE_3__[/* ConfigData */ "a"].SUBSCRIPTIONS_URL),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Body"])()),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
], AppController.prototype, "addSubscription", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Delete"])(_ang_weather_nx_shared_data__WEBPACK_IMPORTED_MODULE_3__[/* ConfigData */ "a"].SUBSCRIPTIONS_URL),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Query"])('userId')), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Query"])('cityId')),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Number, Number]),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
], AppController.prototype, "deleteSubscription", null);
AppController = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [typeof (_a = typeof _app_service__WEBPACK_IMPORTED_MODULE_2__[/* AppService */ "a"] !== "undefined" && _app_service__WEBPACK_IMPORTED_MODULE_2__[/* AppService */ "a"]) === "function" ? _a : Object])
], AppController);



/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_transformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var class_transformer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(class_transformer__WEBPACK_IMPORTED_MODULE_2__);



let DataPipe = class DataPipe {
    transform(value, metadata) {
        const { metatype } = metadata;
        return Object(class_transformer__WEBPACK_IMPORTED_MODULE_2__["plainToClass"])(metatype, value);
    }
};
DataPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], DataPipe);



/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("class-transformer");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FrontendMiddleware; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ang_weather_nx_shared_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);





const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg',];
const resolvePath = (file) => {
    const filePath = _environments_environment__WEBPACK_IMPORTED_MODULE_4__[/* environment */ "a"].production ? `../frontend/${file}` : `dist/apps/frontend/${file}`;
    return path__WEBPACK_IMPORTED_MODULE_1__["resolve"](filePath);
};
let FrontendMiddleware = class FrontendMiddleware {
    use(req, res, next) {
        const { baseUrl } = req;
        if (baseUrl.indexOf(_ang_weather_nx_shared_data__WEBPACK_IMPORTED_MODULE_3__[/* ConfigData */ "a"].ROUTE_PREFIX) === 1) {
            next();
        }
        else if (allowedExt.filter(ext => baseUrl.indexOf(ext) > 0).length > 0) {
            res.sendFile(resolvePath(baseUrl));
        }
        else {
            res.sendFile(resolvePath('index.html'));
        }
    }
    ;
};
FrontendMiddleware = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_2__["Injectable"])()
], FrontendMiddleware);



/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
const environment = {
    production: true
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_3__);




function bootstrap() {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
        const app = yield _nestjs_core__WEBPACK_IMPORTED_MODULE_1__["NestFactory"].create(_app_app_module__WEBPACK_IMPORTED_MODULE_2__[/* AppModule */ "a"]);
        app.use(morgan__WEBPACK_IMPORTED_MODULE_3__('dev'));
        app.enableCors();
        const port = process.env.port || 3333;
        yield app.listen(port, () => {
            console.log('Listening at http://localhost:' + port + '/api');
        });
    });
}
bootstrap();


/***/ })
/******/ ])));
//# sourceMappingURL=main.js.map