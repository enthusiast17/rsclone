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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var express_1 = require("express");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv = __importStar(require("dotenv"));
var User_1 = __importDefault(require("../model/User"));
var validators_1 = require("../utils/validators");
var error_1 = require("../utils/error");
var router = express_1.Router();
dotenv.config({ path: '.env' });
router.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validate, isEmailExists, isUsernameExists, salt, hashedPassword, user, error_2, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                validate = validators_1.registerValidator.validate(req.body);
                if (validate.error) {
                    throw (new error_1.ErrorJSON(400, (_a = validate.error) === null || _a === void 0 ? void 0 : _a.details[0].message, 'Please, correct your register form.'));
                }
                return [4 /*yield*/, User_1.default.findOne({ email: req.body.email })];
            case 1:
                isEmailExists = _b.sent();
                if (isEmailExists) {
                    throw new error_1.ErrorJSON(400, 'Email is already exists.', 'Please, choose another email address.');
                }
                return [4 /*yield*/, User_1.default.findOne({ username: req.body.username })];
            case 2:
                isUsernameExists = _b.sent();
                if (isUsernameExists) {
                    throw new error_1.ErrorJSON(400, 'Username is already exists.', 'Please, choose another username.');
                }
                _b.label = 3;
            case 3:
                _b.trys.push([3, 7, , 8]);
                if (!process.env.SALT_NUMBER) {
                    throw new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.');
                }
                return [4 /*yield*/, bcryptjs_1.default.genSalt(parseFloat(process.env.SALT_NUMBER))];
            case 4:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(req.body.password, salt)];
            case 5:
                hashedPassword = _b.sent();
                user = new User_1.default(__assign(__assign({}, req.body), { password: hashedPassword, birthdayDate: null, avatar: null }));
                return [4 /*yield*/, user.save()];
            case 6:
                _b.sent();
                // eslint-disable-next-line no-underscore-dangle
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Registration completed successfully.',
                        description: 'Now, try to log in.',
                    })];
            case 7:
                error_2 = _b.sent();
                throw new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.');
            case 8: return [3 /*break*/, 10];
            case 9:
                error_3 = _b.sent();
                if (error_3.name !== 'ErrorJSON') {
                    return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
                }
                return [2 /*return*/, error_1.handleError(error_3, req, res)];
            case 10: return [2 /*return*/];
        }
    });
}); });
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validate, user, isPasswordValid, refreshToken, accessToken, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                validate = validators_1.loginValidator.validate(req.body);
                if (validate.error) {
                    throw new error_1.ErrorJSON(400, validate.error.details[0].message, 'Please, correct your login form.');
                }
                return [4 /*yield*/, User_1.default.findOne({ email: req.body.email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new error_1.ErrorJSON(400, 'Email or password is wrong.', 'Please, correct your email or password.');
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(req.body.password, user.password)];
            case 2:
                isPasswordValid = _a.sent();
                if (!isPasswordValid) {
                    throw new error_1.ErrorJSON(400, 'Email or password is wrong.', 'Please, correct your email or password.');
                }
                if (!process.env.REFRESH_TOKEN_SECRET_CODE
                    || !process.env.REFRESH_TOKEN_EXPIRES_IN
                    || !process.env.REFRESH_TOKEN_MAX_AGE
                    || !process.env.ACCESS_TOKEN_SECRET_CODE
                    || !process.env.ACCESS_TOKEN_EXPIRES_IN
                    || !process.env.ACCESS_TOKEN_MAX_AGE) {
                    throw new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.');
                }
                refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET_CODE, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
                res.cookie('refresh-token', refreshToken, {
                    httpOnly: true,
                    // secure: true,
                    // sameSite: 'strict',
                    expires: new Date(Number(new Date()) + parseFloat(process.env.REFRESH_TOKEN_MAX_AGE)),
                });
                accessToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET_CODE, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
                res.cookie('access-token', accessToken, {
                    httpOnly: true,
                    // secure: true,
                    // sameSite: 'strict',
                    expires: new Date(Number(new Date()) + parseFloat(process.env.ACCESS_TOKEN_MAX_AGE)),
                });
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Logged in successfully.',
                        description: 'Please, wait a little bit.',
                    })];
            case 3:
                error_4 = _a.sent();
                if (error_4.name !== 'ErrorJSON') {
                    return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
                }
                return [2 /*return*/, error_1.handleError(error_4, req, res)];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/logout', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.clearCookie('access-token');
            res.clearCookie('refresh-token');
            return [2 /*return*/, res.status(200).send({
                    status: 'success',
                    statusCode: 200,
                    message: 'Logged out successfully.',
                    description: 'Please, wait a little bit.',
                })];
        }
        catch (error) {
            return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
        }
        return [2 /*return*/];
    });
}); });
router.get('/newaccesstoken', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, user, accessToken;
    return __generator(this, function (_a) {
        refreshToken = req.cookies['refresh-token'];
        if (!process.env.REFRESH_TOKEN_SECRET_CODE
            || !process.env.ACCESS_TOKEN_SECRET_CODE
            || !process.env.ACCESS_TOKEN_MAX_AGE) {
            return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
        }
        try {
            user = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_CODE);
            accessToken = jsonwebtoken_1.default.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET_CODE, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
            res.cookie('access-token', accessToken, {
                httpOnly: true,
                // secure: true,
                // sameSite: 'strict',
                expires: new Date(Number(new Date()) + parseFloat(process.env.ACCESS_TOKEN_MAX_AGE)),
            });
            return [2 /*return*/, res.status(200).send({
                    status: 'success',
                    statusCode: 200,
                    message: 'Your access token updated successfully.',
                    description: '',
                })];
        }
        catch (error) {
            if (error.name !== 'ErrorJSON') {
                return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(403, 'Forbidden.', 'Please, try to log in again.'), req, res)];
            }
            return [2 /*return*/, error_1.handleError(error, req, res)];
        }
        return [2 /*return*/];
    });
}); });
router.get('/me', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, verifiedUser, user, fullName, email, username, avatar, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refreshToken = req.cookies['refresh-token'];
                if (!process.env.REFRESH_TOKEN_SECRET_CODE) {
                    return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(500, 'Internal Error.', 'Upps! Sorry, something went wrong in internal server.'), req, res)];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                verifiedUser = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_CODE);
                return [4 /*yield*/, User_1.default.findOne({ _id: verifiedUser.userId })];
            case 2:
                user = _a.sent();
                fullName = user.fullName, email = user.email, username = user.username, avatar = user.avatar;
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Logged in successfully.',
                        description: 'Please, wait a little bit.',
                        data: {
                            fullName: fullName,
                            email: email,
                            username: username,
                            avatar: avatar,
                        },
                    })];
            case 3:
                error_5 = _a.sent();
                return [2 /*return*/, error_1.handleError(new error_1.ErrorJSON(403, 'Forbidden.', 'Please, try to log in again.'), req, res)];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
