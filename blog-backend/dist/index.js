"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var koa_1 = __importDefault(require("koa"));
var koa_router_1 = __importDefault(require("koa-router"));
var koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
var koa_session_1 = __importDefault(require("koa-session"));
var mongoose_1 = __importDefault(require("mongoose"));
var api_1 = __importDefault(require("./api"));
var app = new koa_1.default();
var router = new koa_router_1.default();
var _a = process.env, _b = _a.PORT, port = _b === void 0 ? 4000 : _b, mongoURI = _a.MONGO_URI, signKey = _a.COOKIE_SIGN_KEY;
mongoose_1.default.Promise = global.Promise;
mongoose_1.default
    .connect(mongoURI)
    .then(function () {
    console.log('connected to mongodb');
})
    .catch(function (e) {
    console.error(e);
});
router.use('/api', api_1.default.routes());
app.use(koa_bodyparser_1.default());
var sessionConfig = {
    maxAge: 1000 * 60 * 60 * 24,
};
app.use(koa_session_1.default(sessionConfig, app));
app.keys = [signKey];
app.use(router.routes()).use(router.allowedMethods());
app.listen(port, function () {
    console.log('app is listening port', port);
});
