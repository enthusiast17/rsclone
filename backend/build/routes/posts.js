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
/* eslint-disable @typescript-eslint/naming-convention */
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
var uuid_1 = require("uuid");
var Like_1 = __importDefault(require("../model/Like"));
var Post_1 = __importDefault(require("../model/Post"));
var User_1 = __importDefault(require("../model/User"));
var Comment_1 = __importDefault(require("../model/Comment"));
var error_1 = require("../utils/error");
var validators_1 = require("../utils/validators");
var router = express_1.Router();
var fileFormats = ['image/png', 'image/jpeg', 'image/gif'];
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:|\./g, '') + "-" + uuid_1.v4() + "-" + file.originalname);
    },
});
var upload = multer_1.default({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 4,
    },
    fileFilter: function (req, file, cb) {
        if (file === undefined || fileFormats.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            req.file = file;
            cb(null, false);
        }
    },
});
router.post('/', upload.single('contentImage'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validate, post, savedPost, user, fullName, avatar, _id, contentText, contentImage, createdDate, error_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                if (req.file && !fileFormats.includes(req.file.mimetype)) {
                    throw new error_1.ErrorJSON(415, 'Unsupported Media Type.', 'Please, load only jpeg or png.');
                }
                (_a = req.body) === null || _a === void 0 ? true : delete _a.contentImage;
                validate = validators_1.postValidator.validate(req.body);
                if (validate.error) {
                    throw new error_1.ErrorJSON(400, (_b = validate.error) === null || _b === void 0 ? void 0 : _b.details[0].message, 'Please, correct your post form.');
                }
                post = new Post_1.default({
                    userId: req.userId,
                    contentText: req.body.contentText,
                    contentImage: req.file ? req.file.path : null,
                });
                return [4 /*yield*/, post.save()];
            case 1:
                savedPost = _c.sent();
                return [4 /*yield*/, User_1.default.findById(savedPost.userId)];
            case 2:
                user = _c.sent();
                fullName = user.fullName, avatar = user.avatar;
                _id = savedPost._id, contentText = savedPost.contentText, contentImage = savedPost.contentImage, createdDate = savedPost.createdDate;
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Post created successfully.',
                        description: 'Please, wait a little bit.',
                        data: {
                            user: { fullName: fullName, avatar: avatar },
                            id: _id,
                            contentText: contentText,
                            contentImage: contentImage,
                            createdDate: createdDate,
                        },
                    })];
            case 3:
                error_2 = _c.sent();
                if (error_2.name !== 'ErrorJSON') {
                    return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
                }
                return [2 /*return*/, error_1.handleError(error_2, req, res)];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, currentPage, limit, currentUser, totalPostCount, total, startIdx, endIdx, nextPage, pageCount, posts, newPosts, _a, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 12, , 13]);
                page = req.query.page;
                currentPage = parseFloat(page);
                limit = 5;
                currentUser = null;
                if (!req.query.username) return [3 /*break*/, 2];
                return [4 /*yield*/, User_1.default.findOne({ username: req.query.username })];
            case 1:
                currentUser = _b.sent();
                _b.label = 2;
            case 2: return [4 /*yield*/, Post_1.default.countDocuments(currentUser ? { userId: currentUser } : {})];
            case 3:
                totalPostCount = _b.sent();
                total = req.query.total ? parseFloat(req.query.total) : totalPostCount;
                startIdx = ((currentPage - 1) * limit) + (totalPostCount - total);
                endIdx = currentPage * limit;
                nextPage = endIdx < totalPostCount ? currentPage + 1 : null;
                pageCount = Math.ceil(totalPostCount / limit);
                posts = [];
                if (!req.query.username) return [3 /*break*/, 5];
                return [4 /*yield*/, Post_1.default.find({ userId: currentUser })
                        .sort({ _id: -1 })
                        .limit(limit)
                        .skip(startIdx)];
            case 4:
                posts = _b.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, Post_1.default.find()
                    .sort({ _id: -1 })
                    .limit(limit)
                    .skip(startIdx)];
            case 6:
                posts = _b.sent();
                _b.label = 7;
            case 7:
                if (!(totalPostCount === total)) return [3 /*break*/, 8];
                _a = null;
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, Post_1.default.find()
                    .sort({ _id: -1 })
                    .limit(totalPostCount - total)];
            case 9:
                _a = _b.sent();
                _b.label = 10;
            case 10:
                newPosts = _a;
                return [4 /*yield*/, Promise.all(posts.map(function (post) { return __awaiter(void 0, void 0, void 0, function () {
                        var user, isLiked, likes, comments, fullName, email, username, avatar, _id, contentText, contentImage, createdDate;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, User_1.default.findById(post.userId)];
                                case 1:
                                    user = _a.sent();
                                    return [4 /*yield*/, Like_1.default
                                            .findOne({})
                                            .and([{ userId: req.userId, postId: post._id }])];
                                case 2:
                                    isLiked = _a.sent();
                                    return [4 /*yield*/, Like_1.default.find({ postId: post._id })];
                                case 3:
                                    likes = _a.sent();
                                    return [4 /*yield*/, Comment_1.default.find({ postId: post._id })];
                                case 4:
                                    comments = _a.sent();
                                    fullName = user.fullName, email = user.email, username = user.username, avatar = user.avatar;
                                    _id = post._id, contentText = post.contentText, contentImage = post.contentImage, createdDate = post.createdDate;
                                    return [2 /*return*/, {
                                            user: {
                                                fullName: fullName, email: email, username: username, avatar: avatar,
                                            },
                                            id: _id,
                                            contentText: contentText,
                                            contentImage: contentImage,
                                            createdDate: createdDate,
                                            likesCount: likes.length || 0,
                                            isUserLiked: !!isLiked,
                                            commentsCount: comments.length || 0,
                                        }];
                            }
                        });
                    }); }))];
            case 11:
                posts = _b.sent();
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Posts received successfully.',
                        description: 'Please, wait a little bit.',
                        data: {
                            posts: posts,
                            currentPage: currentPage,
                            nextPage: nextPage,
                            totalPostCount: totalPostCount,
                            pageCount: pageCount,
                            newPosts: newPosts,
                        },
                    })];
            case 12:
                error_3 = _b.sent();
                return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(400, 'Post page not found.', 'Please, try another post page.'), req, res)];
            case 13: return [2 /*return*/];
        }
    });
}); });
router.get('/id/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post, user, isLiked, likes, comments, fullName, email, username, avatar, _id, contentText, contentImage, createdDate, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                id = req.params.id;
                return [4 /*yield*/, Post_1.default.findById(id)];
            case 1:
                post = _a.sent();
                return [4 /*yield*/, User_1.default.findById(post.userId)];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, Like_1.default
                        .findOne({})
                        .and([{ userId: req.userId, postId: post._id }])];
            case 3:
                isLiked = _a.sent();
                return [4 /*yield*/, Like_1.default.find({ postId: post._id })];
            case 4:
                likes = _a.sent();
                return [4 /*yield*/, Comment_1.default.find({ postId: post._id })];
            case 5:
                comments = _a.sent();
                fullName = user.fullName, email = user.email, username = user.username, avatar = user.avatar;
                _id = post._id, contentText = post.contentText, contentImage = post.contentImage, createdDate = post.createdDate;
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Post received successfully.',
                        description: 'Please, wait a little bit.',
                        data: {
                            user: {
                                fullName: fullName, email: email, username: username, avatar: avatar,
                            },
                            id: _id,
                            contentText: contentText,
                            contentImage: contentImage,
                            createdDate: createdDate,
                            likesCount: likes.length || 0,
                            isUserLiked: !!isLiked,
                            commentsCount: comments.length || 0,
                        },
                    })];
            case 6:
                error_4 = _a.sent();
                return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(400, 'Post not found.', 'Please, try another post id.'), req, res)];
            case 7: return [2 /*return*/];
        }
    });
}); });
router.put('/id/:id', upload.single('contentImage'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, validate, post, contentImage, error_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = req.params.id;
                if (req.file && !fileFormats.includes(req.file.mimetype)) {
                    throw new error_1.ErrorJSON(415, 'Unsupported Media Type.', 'Please, load only jpeg, png and gif.');
                }
                validate = validators_1.postValidator.validate(req.body);
                if (validate.error) {
                    throw new error_1.ErrorJSON(400, (_a = validate.error) === null || _a === void 0 ? void 0 : _a.details[0].message, 'Please, correct your post form.');
                }
                return [4 /*yield*/, Post_1.default.findById(id)];
            case 1:
                post = _b.sent();
                if (!post) {
                    throw new error_1.ErrorJSON(400, 'Post not found.', 'Please, try another post id.');
                }
                if (post.userId.toString() !== req.userId) {
                    if (req.file) {
                        fs_1.default.unlinkSync(req.file.path);
                    }
                    throw new error_1.ErrorJSON(403, 'Forbidden', 'You have no access to edit this post.');
                }
                contentImage = null;
                if (req.body.contentImage === post.contentImage)
                    contentImage = post.contentImage;
                if ((req.file && post.contentImage) || (!contentImage && post.contentImage)) {
                    fs_1.default.unlinkSync(post.contentImage);
                }
                return [4 /*yield*/, Post_1.default.findByIdAndUpdate(id, {
                        contentText: req.body.contentText,
                        contentImage: req.file ? req.file.path : contentImage,
                    })];
            case 2:
                post = _b.sent();
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Post edited successfully.',
                        description: 'Please, wait a little bit',
                        data: {
                            contentText: post.contentText,
                            contentImage: post.contentImage,
                        },
                    })];
            case 3:
                error_5 = _b.sent();
                if (error_5.name !== 'ErrorJSON') {
                    return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
                }
                return [2 /*return*/, error_1.handleError(error_5, req, res)];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.delete('/id/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                id = req.params.id;
                return [4 /*yield*/, Post_1.default.findById(id)];
            case 1:
                post = _a.sent();
                if (!post) {
                    throw new error_1.ErrorJSON(400, 'Post not found.', 'Please, try another post id.');
                }
                if (post.userId.toString() !== req.userId) {
                    throw new error_1.ErrorJSON(403, 'Forbidden', 'You have no access to edit this post.');
                }
                if (post.contentImage) {
                    fs_1.default.unlinkSync(post.contentImage);
                }
                return [4 /*yield*/, Comment_1.default.deleteMany({ postId: post._id })];
            case 2:
                _a.sent();
                return [4 /*yield*/, Like_1.default.deleteMany({ postId: post._id })];
            case 3:
                _a.sent();
                return [4 /*yield*/, post.deleteOne()];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Post deleted successfully.',
                        description: 'Please, wait a little bit',
                        data: null,
                    })];
            case 5:
                error_6 = _a.sent();
                if (error_6.name !== 'ErrorJSON') {
                    return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
                }
                return [2 /*return*/, error_1.handleError(error_6, req, res)];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
