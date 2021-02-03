"use strict";
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
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv = __importStar(require("dotenv"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = __importDefault(require("http"));
var cookie_1 = __importDefault(require("cookie"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth_1 = __importDefault(require("./routes/auth"));
var posts_1 = __importDefault(require("./routes/posts"));
var likes_1 = __importDefault(require("./routes/likes"));
var comments_1 = __importDefault(require("./routes/comments"));
var profile_1 = __importDefault(require("./routes/profile"));
var followers_1 = __importDefault(require("./routes/followers"));
var search_1 = __importDefault(require("./routes/search"));
var rooms_1 = __importDefault(require("./routes/rooms"));
var auth_2 = __importDefault(require("./middlewares/auth"));
var Room_1 = __importDefault(require("./model/Room"));
var User_1 = __importDefault(require("./model/User"));
var error_1 = require("./utils/error");
var Message_1 = __importDefault(require("./model/Message"));
var app = express_1.default();
dotenv.config({ path: '.env' });
mongoose_1.default.connect(process.env.DB_CONNECT || '', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }).catch(function (error) { return console.log(error); });
mongoose_1.default.set('returnOriginal', false);
app.use(cors_1.default({ origin: '*', credentials: true }));
app.use(cookie_parser_1.default());
app.use('/', function (req, res) { return res.send({
    status: 'success',
    statusCode: 200,
    message: 'Thank you so much for running me!',
}); });
app.use('/uploads', express_1.default.static('uploads'));
app.use('/api/auth', express_1.default.json(), auth_1.default);
app.use(function (err, req, res, next) {
    if (err) {
        return error_1.handleError(new error_1.ErrorJSON(400, '400 Bad Request', 'Please, correct your JSON data.'), req, res);
    }
    return next();
});
app.use('/api/posts', auth_2.default, posts_1.default);
app.use(function (err, req, res, next) {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return error_1.handleError(new error_1.ErrorJSON(400, 'Bad Request', 'Your file size exceeds 5 MiB.'), req, res);
    }
    return next();
});
app.use('/api/likes', auth_2.default, likes_1.default);
app.use('/api/comments', [auth_2.default, express_1.default.json()], comments_1.default);
app.use(function (err, req, res, next) {
    if (err) {
        return error_1.handleError(new error_1.ErrorJSON(400, '400 Bad Request', 'Please, correct your JSON data.'), req, res);
    }
    return next();
});
app.use('/api/profile', auth_2.default, profile_1.default);
app.use('/api/followers', auth_2.default, followers_1.default);
app.use('/api/search', auth_2.default, search_1.default);
app.use('/api/rooms/', auth_2.default, rooms_1.default);
var server = http_1.default.createServer(app);
var io = new socket_io_1.default.Server(server, {
    cors: {
        origin: '*',
        credentials: true,
    },
});
io.on('connection', function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    var cookies, refreshToken, verifiedUser, senderUserModel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cookies = cookie_1.default.parse(socket.handshake.headers.cookie || '');
                refreshToken = cookies['refresh-token'];
                if (!process.env.REFRESH_TOKEN_SECRET_CODE) {
                    socket.disconnect();
                    return [2 /*return*/];
                }
                try {
                    verifiedUser = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_CODE);
                }
                catch (error) {
                    socket.disconnect();
                    return [2 /*return*/];
                }
                return [4 /*yield*/, User_1.default.findById(verifiedUser.userId)];
            case 1:
                senderUserModel = _a.sent();
                socket.username = senderUserModel.username;
                socket.on('ROOM:JOIN', function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var receiverUserModel, room;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!data.username) {
                                    socket.disconnect();
                                }
                                console.log('User is connected, ', senderUserModel.username, socket.id);
                                return [4 /*yield*/, User_1.default.findOne({ username: data.username })];
                            case 1:
                                receiverUserModel = _a.sent();
                                return [4 /*yield*/, Room_1.default.findOne().or([
                                        { users: [senderUserModel, receiverUserModel] },
                                        { users: [receiverUserModel, senderUserModel] },
                                    ])];
                            case 2:
                                room = _a.sent();
                                socket.leave(room._id.toString());
                                if (!!room) return [3 /*break*/, 4];
                                room = new Room_1.default({
                                    users: [senderUserModel, receiverUserModel],
                                });
                                return [4 /*yield*/, room.save()];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4:
                                socket.join(room._id.toString());
                                return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('ROOM:NEW_MESSAGE', function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var receiverUserModel, room, message;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, User_1.default.findOne({ username: data.username })];
                            case 1:
                                receiverUserModel = _a.sent();
                                return [4 /*yield*/, Room_1.default.findOne().or([
                                        { users: [senderUserModel, receiverUserModel] },
                                        { users: [receiverUserModel, senderUserModel] },
                                    ])];
                            case 2:
                                room = _a.sent();
                                message = new Message_1.default({
                                    userId: senderUserModel._id,
                                    roomId: room._id,
                                    contentText: data.contentText,
                                });
                                return [4 /*yield*/, message.save()];
                            case 3:
                                _a.sent();
                                socket.broadcast.to(room._id.toString()).emit('ROOM:NEW_MESSAGE', {
                                    id: message._id.toString,
                                    user: {
                                        fullName: senderUserModel.fullName,
                                        email: senderUserModel.email,
                                        username: senderUserModel.username,
                                        avatar: senderUserModel.avatar,
                                    },
                                    contentText: message.contentText,
                                    createdDate: message.createdDate,
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                socket.on('ROOM:LEAVE', function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var receiverUserModel, room;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, User_1.default.findOne({ username: data.username })];
                            case 1:
                                receiverUserModel = _a.sent();
                                return [4 /*yield*/, Room_1.default.findOne().or([
                                        { users: [senderUserModel, receiverUserModel] },
                                        { users: [receiverUserModel, senderUserModel] },
                                    ])];
                            case 2:
                                room = _a.sent();
                                socket.leave(room._id.toString());
                                socket.removeAllListeners('ROOM:NEW_MESSAGE');
                                socket.removeAllListeners('ROOM:JOIN');
                                socket.disconnect();
                                console.log('User is disconnected, ', senderUserModel.username, socket.id);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); });
server.listen(8000, function () { return console.log('Server is running on http://localhost:8000/'); });
