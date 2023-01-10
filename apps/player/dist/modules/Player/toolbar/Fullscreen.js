"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.__esModule = true;
exports.Fullscreen = void 0;
var react_1 = __importStar(require("react"));
var screenfull_1 = __importDefault(require("screenfull"));
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var PREFIX = 'FullScreen';
var classes = {
    button: "".concat(PREFIX, "-button"),
    fullScreenBox: "".concat(PREFIX, "-fullScreenBox"),
    fullScreen: "".concat(PREFIX, "-fullScreen"),
    fullScreenIcon: "".concat(PREFIX, "-fullScreenIcon")
};
// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
var Root = (0, material_1.styled)('div')(function (_a) {
    var _b;
    var theme = _a.theme;
    return (_b = {},
        _b["& .".concat(classes.button)] = {
            color: '#fff'
        },
        _b["& .".concat(classes.fullScreenBox)] = {
            width: '40px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        _b["& .".concat(classes.fullScreen)] = {
            textAlign: 'center',
            '&:hover, .MuiIconButton-root': {
                backgroundColor: 'transparent'
            }
        },
        _b["& .".concat(classes.fullScreenIcon)] = {
            transition: 'font-size 0.2s',
            fontSize: '30px',
            '&:hover': { fontSize: '35px' }
        },
        _b);
});
var Fullscreen = function (_a) {
    var playerWrapper = _a.playerWrapper;
    var _b = (0, react_1.useState)(false), fullscreen = _b[0], setFullscreen = _b[1];
    (0, react_1.useEffect)(function () {
        if (screenfull_1["default"].isEnabled) {
            var callback_1 = function () {
                if (screenfull_1["default"].isEnabled && screenfull_1["default"].isFullscreen) {
                    setFullscreen(true);
                    return;
                }
                setFullscreen(false);
            };
            screenfull_1["default"].on('change', callback_1);
            return function () {
                if (screenfull_1["default"].isEnabled) {
                    screenfull_1["default"].off('change', callback_1);
                }
            };
        }
    }, [screenfull_1["default"].isEnabled]);
    var doFullScreen = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(!fullscreen && screenfull_1["default"].isEnabled && playerWrapper)) return [3 /*break*/, 2];
                    return [4 /*yield*/, screenfull_1["default"].request(playerWrapper)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var doRegularScreen = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(fullscreen && screenfull_1["default"].isEnabled)) return [3 /*break*/, 2];
                    return [4 /*yield*/, screenfull_1["default"].exit()];
                case 1:
                    _a.sent();
                    setFullscreen(false);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var cancelEvents = function (event) {
        event.stopPropagation();
    };
    return (react_1["default"].createElement(Root, { className: classes.fullScreen, onClick: cancelEvents },
        react_1["default"].createElement("div", { className: classes.fullScreenBox }, fullscreen ? (react_1["default"].createElement(material_1.IconButton, { disableRipple: true, onClick: doRegularScreen, className: classes.button, size: "large" },
            react_1["default"].createElement(icons_material_1.FullscreenExit, { className: classes.fullScreenIcon }))) : (react_1["default"].createElement(material_1.IconButton, { disableRipple: true, onClick: doFullScreen, className: classes.button, size: "large" },
            react_1["default"].createElement(icons_material_1.Fullscreen, { className: classes.fullScreenIcon }))))));
};
exports.Fullscreen = Fullscreen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnVsbHNjcmVlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL21vZHVsZXMvUGxheWVyL3Rvb2xiYXIvRnVsbHNjcmVlbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBa0Q7QUFFbEQsMERBQW1DO0FBRW5DLDBDQUFrRDtBQUVsRCxzREFHNEI7QUFFNUIsSUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFBO0FBRTNCLElBQU0sT0FBTyxHQUFHO0lBQ2QsTUFBTSxFQUFFLFVBQUcsTUFBTSxZQUFTO0lBQzFCLGFBQWEsRUFBRSxVQUFHLE1BQU0sbUJBQWdCO0lBQ3hDLFVBQVUsRUFBRSxVQUFHLE1BQU0sZ0JBQWE7SUFDbEMsY0FBYyxFQUFFLFVBQUcsTUFBTSxvQkFBaUI7Q0FDM0MsQ0FBQTtBQUVELCtGQUErRjtBQUMvRixJQUFNLElBQUksR0FBRyxJQUFBLGlCQUFNLEVBQUMsS0FBSyxDQUFDLENBQUMsVUFBQyxFQUFTOztRQUFQLEtBQUssV0FBQTtJQUFPLE9BQUE7UUFDeEMsR0FBQyxhQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUUsSUFBRztZQUN4QixLQUFLLEVBQUUsTUFBTTtTQUNkO1FBRUQsR0FBQyxhQUFNLE9BQU8sQ0FBQyxhQUFhLENBQUUsSUFBRztZQUMvQixLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxFQUFFLE1BQU07WUFDZixVQUFVLEVBQUUsUUFBUTtZQUNwQixjQUFjLEVBQUUsUUFBUTtTQUN6QjtRQUVELEdBQUMsYUFBTSxPQUFPLENBQUMsVUFBVSxDQUFFLElBQUc7WUFDNUIsU0FBUyxFQUFFLFFBQVE7WUFDbkIsOEJBQThCLEVBQUU7Z0JBQzlCLGVBQWUsRUFBRSxhQUFhO2FBQy9CO1NBQ0Y7UUFFRCxHQUFDLGFBQU0sT0FBTyxDQUFDLGNB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