"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-underscore-dangle */
var express_1 = require("express");
var Follower_1 = __importDefault(require("../model/Follower"));
var User_1 = __importDefault(require("../model/User"));
var error_1 = require("../utils/error");
var router = express_1.Router();
router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, followerId, followingUser, followingId, follower, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                username = req.query.username;
                followerId = req.userId;
                if (!username) {
                    throw new error_1.ErrorJSON(400, 'Bad Request', 'Please, correct http query.');
                }
                return [4 /*yield*/, User_1.default.findOne({ username: username })];
            case 1:
                followingUser = _a.sent();
                if (!followingUser) {
                    throw new error_1.ErrorJSON(400, 'User not found.', 'Please, try another username.');
                }
                followingId = followingUser._id;
                return [4 /*yield*/, Follower_1.default.findOne({
                        followingId: followingId,
                        followerId: followerId,
                    })];
            case 2:
                follower = _a.sent();
                if (!!follower) return [3 /*break*/, 4];
                return [4 /*yield*/, new Follower_1.default({
                        followingId: followingId,
                        followerId: followerId,
                    }).save()];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, follower.deleteOne()];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/, res.status(200).send({
                    status: 'success',
                    statusCode: 200,
                    message: 'Follower created successfully.',
                    description: 'Please, wait a little bit.',
                })];
            case 7:
                error_2 = _a.sent();
                if (error_2.name !== 'ErrorJSON') {
                    return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
                }
                return [2 /*return*/, error_1.handleError(error_2, req, res)];
            case 8: return [2 /*return*/];
        }
    });
}); });
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var followingUser, followers, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.query.username) {
                    throw new error_1.ErrorJSON(400, 'Bad Request', 'Please, correct http query.');
                }
                return [4 /*yield*/, User_1.default.findOne({ username: req.query.username })];
            case 1:
                followingUser = _a.sent();
                if (!followingUser) {
                    throw new error_1.ErrorJSON(400, 'User not found.', 'Please, try another username.');
                }
                return [4 /*yield*/, Follower_1.default.find({ followingId: followingUser._id })];
            case 2:
                followers = _a.sent();
                return [4 /*yield*/, Promise.all(followers.map(function (follower) { return __awaiter(void 0, void 0, void 0, function () {
                        var user, fullName, email, username, avatar;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, User_1.default.findById(follower.followerId)];
                                case 1:
                                    user = _a.sent();
                                    fullName = user.fullName, email = user.email, username = user.username, avatar = user.avatar;
                                    return [2 /*return*/, {
                                            fullName: fullName,
                                            email: email,
                                            username: username,
                                            avatar: avatar,
                                        }];
                            }
                        });
                    }); }))];
            case 3:
                followers = _a.sent();
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Followers received successfully.',
                        description: 'Please, wait a little bit.',
                        data: followers,
                    })];
            case 4:
                error_3 = _a.sent();
                if (error_3.name !== 'ErrorJSON') {
                    return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
                }
                return [2 /*return*/, error_1.handleError(error_3, req, res)];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get('/following/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var followerUser, following, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.query.username) {
                    throw new error_1.ErrorJSON(400, 'Bad Request', 'Please, correct http query.');
                }
                return [4 /*yield*/, User_1.default.findOne({ username: req.query.username })];
            case 1:
                followerUser = _a.sent();
                if (!followerUser) {
                    throw new error_1.ErrorJSON(400, 'User not found.', 'Please, try another username.');
                }
                return [4 /*yield*/, Follower_1.default.find({ followerId: followerUser._id })];
            case 2:
                following = _a.sent();
                return [4 /*yield*/, Promise.all(following.map(function (follower) { return __awaiter(void 0, void 0, void 0, function () {
                        var user, fullName, email, username, avatar;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, User_1.default.findById(follower.followingId)];
                                case 1:
                                    user = _a.sent();
                                    fullName = user.fullName, email = user.email, username = user.username, avatar = user.avatar;
                                    return [2 /*return*/, {
                                            fullName: fullName,
                                            email: email,
                                            username: username,
                                            avatar: avatar,
                                        }];
                            }
                        });
                    }); }))];
            case 3:
                following = _a.sent();
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Following received successfully.',
                        description: 'Please, wait a little bit.',
                        data: following,
                    })];
            case 4:
                error_4 = _a.sent();
                if (error_4.name !== 'ErrorJSON') {
                    return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
                }
                return [2 /*return*/, error_1.handleError(error_4, req, res)];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
