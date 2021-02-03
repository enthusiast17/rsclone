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
var error_1 = require("../utils/error");
var validators_1 = require("../utils/validators");
var Comment_1 = __importDefault(require("../model/Comment"));
var User_1 = __importDefault(require("../model/User"));
var router = express_1.Router();
router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validate, comment, user, fullName, email, username, avatar, postId, contentText, createdAt, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                validate = validators_1.commentValidator.validate(req.body);
                if (validate.error) {
                    throw (new error_1.ErrorJSON(400, (_a = validate.error) === null || _a === void 0 ? void 0 : _a.details[0].message, 'Please, correct your comment form.'));
                }
                return [4 /*yield*/, new Comment_1.default({
                        userId: req.userId,
                        postId: req.body.postId,
                        contentText: req.body.contentText,
                    }).save()];
            case 1:
                comment = _b.sent();
                return [4 /*yield*/, User_1.default.findById(comment.userId)];
            case 2:
                user = _b.sent();
                fullName = user.fullName, email = user.email, username = user.username, avatar = user.avatar;
                postId = comment.postId, contentText = comment.contentText, createdAt = comment.createdAt;
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Comment created successfully.',
                        description: 'Please, wait a little bit.',
                        data: {
                            user: {
                                fullName: fullName, email: email, username: username, avatar: avatar,
                            },
                            postId: postId,
                            contentText: contentText,
                            createdAt: createdAt,
                        },
                    })];
            case 3:
                error_2 = _b.sent();
                if (error_2.name !== 'ErrorJSON') {
                    return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
                }
                return [2 /*return*/, error_1.handleError(error_2, req, res)];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, modelComments, comments, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                post = req.query.post;
                if (!post) {
                    throw new error_1.ErrorJSON(400, '400 Bad Request', 'Please, correct your request.');
                }
                return [4 /*yield*/, Comment_1.default.find({ postId: post }).sort({ _id: -1 })];
            case 1:
                modelComments = _a.sent();
                return [4 /*yield*/, Promise.all(modelComments.map(function (comment) { return __awaiter(void 0, void 0, void 0, function () {
                        var user, fullName, email, username, avatar, postId, contentText, createdAt;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, User_1.default.findById(comment.userId)];
                                case 1:
                                    user = _a.sent();
                                    fullName = user.fullName, email = user.email, username = user.username, avatar = user.avatar;
                                    postId = comment.postId, contentText = comment.contentText, createdAt = comment.createdAt;
                                    return [2 /*return*/, {
                                            user: {
                                                fullName: fullName, email: email, username: username, avatar: avatar,
                                            },
                                            id: comment._id,
                                            postId: postId,
                                            contentText: contentText,
                                            createdAt: createdAt,
                                        }];
                            }
                        });
                    }); }))];
            case 2:
                comments = _a.sent();
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Comments received successfully.',
                        description: 'Please, wait a little bit.',
                        data: comments,
                    })];
            case 3:
                error_3 = _a.sent();
                if (error_3.name !== 'ErrorJSON') {
                    return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
                }
                return [2 /*return*/, error_1.handleError(error_3, req, res)];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.put('/id/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, validate, comment, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = req.params.id;
                validate = validators_1.commentValidator.validate(req.body);
                if (validate.error) {
                    throw (new error_1.ErrorJSON(400, (_a = validate.error) === null || _a === void 0 ? void 0 : _a.details[0].message, 'Please, correct your comment form.'));
                }
                return [4 /*yield*/, Comment_1.default.findById(id)];
            case 1:
                comment = _b.sent();
                if (comment.userId.toString() !== req.userId) {
                    throw new error_1.ErrorJSON(403, 'Forbidden', 'You have no access to edit this comment.');
                }
                return [4 /*yield*/, comment.updateOne({
                        contentText: req.body.contentText,
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Comment edited successfully.',
                        description: 'Please, wait a little bit.',
                        data: null,
                    })];
            case 3:
                error_4 = _b.sent();
                if (error_4.name !== 'ErrorJSON') {
                    return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
                }
                return [2 /*return*/, error_1.handleError(error_4, req, res)];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.delete('/id/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, comment, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, Comment_1.default.findById(id)];
            case 1:
                comment = _a.sent();
                if (comment.userId.toString() !== req.userId) {
                    throw new error_1.ErrorJSON(403, 'Forbidden', 'You have no access to delete this comment.');
                }
                return [4 /*yield*/, comment.deleteOne()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Comment deleted successfully.',
                        description: 'Please, wait a little bit.',
                        data: null,
                    })];
            case 3:
                error_5 = _a.sent();
                if (error_5.name !== 'ErrorJSON') {
                    return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
                }
                return [2 /*return*/, error_1.handleError(error_5, req, res)];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
