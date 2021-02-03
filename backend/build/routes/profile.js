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
var multer_1 = __importDefault(require("multer"));
var uuid_1 = require("uuid");
var fs_1 = __importDefault(require("fs"));
var Post_1 = __importDefault(require("../model/Post"));
var User_1 = __importDefault(require("../model/User"));
var error_1 = require("../utils/error");
var validators_1 = require("../utils/validators");
var Follower_1 = __importDefault(require("../model/Follower"));
var router = express_1.Router();
router.get('/username/:username', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, isFollowing, postsCount, followersCount, followingCount, fullName, email, username, birthdayDate, avatar, aboutme, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, User_1.default.findOne({ username: req.params.username })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new error_1.ErrorJSON(400, 'Profile not found.', 'Please, try another profile username.');
                }
                return [4 /*yield*/, Follower_1.default.findOne({
                        followingId: user._id,
                        followerId: req.userId,
                    })];
            case 2:
                isFollowing = _a.sent();
                return [4 /*yield*/, Post_1.default.countDocuments({ userId: user._id })];
            case 3:
                postsCount = _a.sent();
                return [4 /*yield*/, Follower_1.default.countDocuments({ followingId: user._id })];
            case 4:
                followersCount = _a.sent();
                return [4 /*yield*/, Follower_1.default.countDocuments({ followerId: user._id })];
            case 5:
                followingCount = _a.sent();
                fullName = user.fullName, email = user.email, username = user.username, birthdayDate = user.birthdayDate, avatar = user.avatar, aboutme = user.aboutme;
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Proile received successfully.',
                        description: 'Please, wait a little bit.',
                        data: {
                            fullName: fullName,
                            email: email,
                            username: username,
                            birthdayDate: birthdayDate,
                            avatar: avatar,
                            aboutme: aboutme,
                            postsCount: postsCount,
                            followersCount: followersCount,
                            followingCount: followingCount,
                            groupsCount: 0,
                            isFollowing: !!isFollowing,
                        },
                    })];
            case 6:
                error_2 = _a.sent();
                if (error_2.name !== 'ErrorJSON') {
                    return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
                }
                return [2 /*return*/, error_1.handleError(error_2, req, res)];
            case 7: return [2 /*return*/];
        }
    });
}); });
var fileFormats = ['image/png', 'image/jpeg'];
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
        fileSize: 1024 * 1024 * 3,
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
router.put('/username/:username', upload.single('avatar'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validate, user, isEmailExists, isUsernameExists, avatar, error_3;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 7, , 8]);
                if (req.file && !fileFormats.includes(req.file.mimetype)) {
                    throw new error_1.ErrorJSON(415, 'Unsupported Media Type.', 'Please, load only jpeg or png.');
                }
                if (req.body.birthdayDate === 'null')
                    req.body.birthdayDate = null;
                if (req.body.aboutme === 'null' || req.body.aboutme === '')
                    req.body.aboutme = null;
                validate = validators_1.profileValidator.validate(req.body);
                if (!req.body || validate.error) {
                    throw new error_1.ErrorJSON(400, ((_a = validate.error) === null || _a === void 0 ? void 0 : _a.details[0].message) || 'Bad Request', 'Please, correct your profile form.');
                }
                return [4 /*yield*/, User_1.default.findOne({ username: req.params.username })];
            case 1:
                user = _d.sent();
                if (!user) {
                    throw new error_1.ErrorJSON(400, 'Profile not found.', 'Please, try another profile username.');
                }
                if (user._id.toString() !== req.userId) {
                    if (req.file) {
                        fs_1.default.unlinkSync(req.file.path);
                    }
                    throw new error_1.ErrorJSON(403, 'Forbidden', 'You have no access to edit this profile.');
                }
                if (!(req.body.email !== user.email)) return [3 /*break*/, 3];
                return [4 /*yield*/, User_1.default.findOne({ email: req.body.email })];
            case 2:
                isEmailExists = _d.sent();
                if (isEmailExists) {
                    throw new error_1.ErrorJSON(400, 'Email is already exists.', 'Please, choose another email address.');
                }
                _d.label = 3;
            case 3:
                if (!(req.body.username !== user.username)) return [3 /*break*/, 5];
                return [4 /*yield*/, User_1.default.findOne({ username: req.body.username })];
            case 4:
                isUsernameExists = _d.sent();
                if (isUsernameExists) {
                    throw new error_1.ErrorJSON(400, 'Username is already exists.', 'Please, choose another username.');
                }
                _d.label = 5;
            case 5:
                avatar = null;
                if (req.body.avatar === user.avatar)
                    avatar = user.avatar;
                if ((req.file && user.avatar) || (!avatar && user.avatar)) {
                    fs_1.default.unlinkSync(user.avatar);
                }
                return [4 /*yield*/, User_1.default.findOneAndUpdate({
                        username: req.params.username,
                    }, __assign(__assign({}, req.body), { birthdayDate: ((_b = req.body) === null || _b === void 0 ? void 0 : _b.birthdayDate) ? req.body.birthdayDate : null, avatar: req.file ? req.file.path : avatar, aboutme: ((_c = req.body) === null || _c === void 0 ? void 0 : _c.aboutme) ? req.body.aboutme : null }))];
            case 6:
                user = _d.sent();
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Profile edited successfully.',
                        description: 'Please, wait a little bit',
                        data: {
                            fullName: user.fullName,
                            email: user.email,
                            username: user.username,
                            birthdayDate: user.birthdayDate,
                            avatar: user.avatar,
                            aboutme: user.aboutme,
                        },
                    })];
            case 7:
                error_3 = _d.sent();
                if (error_3.name !== 'ErrorJSON') {
                    return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
                }
                return [2 /*return*/, error_1.handleError(error_3, req, res)];
            case 8: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
