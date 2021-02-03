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
var Message_1 = __importDefault(require("../model/Message"));
var Room_1 = __importDefault(require("../model/Room"));
var User_1 = __importDefault(require("../model/User"));
var error_1 = require("../utils/error");
var router = express_1.Router();
router.get('/messages', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, senderUserModel_1, receiverUserModel_1, room, messages, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                username = req.query.username;
                if (!username) {
                    throw new error_1.ErrorJSON(400, 'Bad Request', 'Please, correct http query.');
                }
                return [4 /*yield*/, User_1.default.findById(req.userId)];
            case 1:
                senderUserModel_1 = _a.sent();
                return [4 /*yield*/, User_1.default.findOne({ username: username })];
            case 2:
                receiverUserModel_1 = _a.sent();
                return [4 /*yield*/, Room_1.default.findOne().or([
                        { users: [senderUserModel_1, receiverUserModel_1] },
                        { users: [receiverUserModel_1, senderUserModel_1] },
                    ])];
            case 3:
                room = _a.sent();
                if (!room) {
                    throw new error_1.ErrorJSON(403, 'Forbidden', 'You have no access.');
                }
                return [4 /*yield*/, Message_1.default.find({ roomId: room._id })];
            case 4:
                messages = _a.sent();
                return [4 /*yield*/, Promise.all(messages.map(function (message) {
                        var user;
                        if (message.userId.toString() === senderUserModel_1._id.toString()) {
                            user = {
                                fullName: senderUserModel_1.fullName,
                                email: senderUserModel_1.email,
                                username: senderUserModel_1.username,
                                avatar: senderUserModel_1.avatar,
                            };
                        }
                        else {
                            user = {
                                fullName: receiverUserModel_1.fullName,
                                email: receiverUserModel_1.email,
                                username: receiverUserModel_1.username,
                                avatar: receiverUserModel_1.avatar,
                            };
                        }
                        return {
                            id: message._id,
                            user: user,
                            contentText: message.contentText,
                            createdAt: message.createdAt,
                        };
                    }))];
            case 5:
                messages = _a.sent();
                return [2 /*return*/, res.status(200).send({
                        status: 'success',
                        statusCode: 200,
                        message: 'Messages received successfully.',
                        description: 'Please, wait a little bit.',
                        data: messages,
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
exports.default = router;
