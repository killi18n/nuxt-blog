"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var post_1 = __importDefault(require("models/post"));
var joi_1 = __importDefault(require("joi"));
var mongoose_1 = require("mongoose");
var ObjectId = mongoose_1.Types.ObjectId;
exports.checkObjectId = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = ctx.params.id;
        if (!ObjectId.isValid(id)) {
            ctx.status = 400;
            return [2 /*return*/];
        }
        return [2 /*return*/, next()];
    });
}); };
exports.checkLogin = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!ctx.session.logged) {
            ctx.status = 401;
            return [2 /*return*/, null];
        }
        return [2 /*return*/, next()];
    });
}); };
exports.list = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var page, tag, query, posts, postCount, limitBodyLength, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = parseInt(ctx.query.page || 1, 10);
                if (page < 1) {
                    ctx.status = 400;
                    return [2 /*return*/];
                }
                tag = ctx.query.tag;
                console.log('tag', tag);
                query = tag
                    ? {
                        tags: tag,
                    }
                    : {};
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, post_1.default.find(query)
                        .sort({ _id: -1 })
                        .limit(10)
                        .skip((page - 1) * 10)
                        .lean()
                        .exec()];
            case 2:
                posts = _a.sent();
                return [4 /*yield*/, post_1.default.count(query).exec()];
            case 3:
                postCount = _a.sent();
                limitBodyLength = function (post) { return (__assign({}, post, { body: post.body.length < 200 ? post.body : post.body.slice(0, 200) + "..." })); };
                ctx.body = {
                    posts: posts.map(limitBodyLength),
                    lastPage: Math.ceil(postCount / 10),
                };
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                ctx.throw(e_1, 500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.write = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var schema, result, _a, title, body, tags, post, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                schema = joi_1.default.object().keys({
                    title: joi_1.default.string().required(),
                    body: joi_1.default.string().required(),
                    tags: joi_1.default.array()
                        .items(joi_1.default.string())
                        .required(),
                });
                result = joi_1.default.validate(ctx.request.body, schema);
                if (result.error) {
                    ctx.status = 400;
                    ctx.body = result.error;
                    return [2 /*return*/];
                }
                _a = ctx.request.body, title = _a.title, body = _a.body, tags = _a.tags;
                post = new post_1.default({
                    title: title,
                    body: body,
                    tags: tags,
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, post.save()];
            case 2:
                _b.sent();
                ctx.body = post;
                ctx.status = 201;
                return [3 /*break*/, 4];
            case 3:
                e_2 = _b.sent();
                ctx.throw(e_2, 500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.read = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var id, post, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = ctx.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, post_1.default.findById(id).exec()];
            case 2:
                post = _a.sent();
                if (!post) {
                    ctx.status = 404;
                    return [2 /*return*/];
                }
                ctx.body = post;
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                ctx.throw(e_3, 500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.update = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var id, post, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = ctx.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, post_1.default.findByIdAndUpdate(id, ctx.request.body, {
                        new: true,
                    }).exec()];
            case 2:
                post = _a.sent();
                if (!post) {
                    ctx.status = 404;
                    return [2 /*return*/];
                }
                ctx.body = post;
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                ctx.throw(e_4, 500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.remove = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var id, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = ctx.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, post_1.default.findByIdAndRemove(id).exec()];
            case 2:
                _a.sent();
                ctx.status = 204;
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                ctx.throw(e_5, 500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
