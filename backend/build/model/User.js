"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 25,
    },
    birthdayDate: {
        type: Date,
    },
    avatar: {
        type: String,
    },
    aboutme: {
        type: String,
        min: 1,
        max: 150,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024,
    },
}, { timestamps: {} });
var User = mongoose_1.default.model('User', userSchema);
exports.default = User;
