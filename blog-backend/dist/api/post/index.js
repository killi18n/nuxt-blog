"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var postCtrl = __importStar(require("./post.ctrl"));
var posts = new koa_router_1.default();
posts.get('/', postCtrl.list);
posts.get('/:id', postCtrl.checkObjectId, postCtrl.read);
posts.post('/', postCtrl.checkLogin, postCtrl.write);
posts.patch('/:id', postCtrl.checkLogin, postCtrl.checkObjectId, postCtrl.update);
posts.delete('/:id', postCtrl.checkLogin, postCtrl.checkObjectId, postCtrl.remove);
exports.default = posts;
