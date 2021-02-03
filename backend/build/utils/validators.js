"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileValidator = exports.commentValidator = exports.postValidator = exports.loginValidator = exports.registerValidator = void 0;
var joi_1 = __importDefault(require("joi"));
var joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
var registerJoi = {
    fullName: joi_1.default.string().trim().min(3).max(50)
        .required(),
    email: joi_1.default.string().min(3).max(255).email()
        .required(),
    username: joi_1.default.string().pattern(/^[a-z0-9]*$/).min(3)
        .max(25)
        .required(),
    birthdayDate: joi_1.default.date(),
    password: joi_password_complexity_1.default().required(),
};
var registerValidator = joi_1.default.object(registerJoi);
exports.registerValidator = registerValidator;
var loginJoi = {
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
};
var loginValidator = joi_1.default.object(loginJoi);
exports.loginValidator = loginValidator;
var postJoi = {
    contentText: joi_1.default.string().trim().min(1).max(1000)
        .required(),
    contentImage: joi_1.default.string(),
};
var postValidator = joi_1.default.object(postJoi);
exports.postValidator = postValidator;
var commentJoi = {
    postId: joi_1.default.string().required(),
    contentText: joi_1.default.string().trim().min(1).max(500)
        .required(),
};
var commentValidator = joi_1.default.object(commentJoi);
exports.commentValidator = commentValidator;
var profileJoi = {
    fullName: joi_1.default.string().trim().min(3).max(50)
        .required(),
    email: joi_1.default.string().min(3).max(255).email()
        .required(),
    username: joi_1.default.string().pattern(/^[a-z0-9]*$/).min(3)
        .max(25)
        .required(),
    birthdayDate: joi_1.default.date().allow(null),
    avatar: joi_1.default.string().allow(null),
    aboutme: joi_1.default.string().allow(null).trim().min(1)
        .max(150),
};
var profileValidator = joi_1.default.object(profileJoi);
exports.profileValidator = profileValidator;
