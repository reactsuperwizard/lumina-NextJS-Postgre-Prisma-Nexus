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
exports.Main = void 0;
var react_1 = __importStar(require("react"));
var vimeo_1 = __importDefault(require("react-player/vimeo"));
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var StartButton_1 = require("./ui/StartButton");
var MutedIndicator_1 = require("./ui/MutedIndicator");
var events_1 = require("./events");
var toolbar_1 = require("./toolbar");
var utils_1 = require("./utils");
var blackCorner = (0, styles_1.alpha)('#000', 0.6);
var blackBody = (0, styles_1.alpha)('#000', 0.3);
var transparentBlackBackground = "linear-gradient(90deg, ".concat(blackCorner, ", ").concat(blackBody, ")");
var rightControlsBlackCorner = (0, styles_1.alpha)('#000', 0.7);
var rightControlsBlackBody = (0, styles_1.alpha)('#000', 0.1);
var rightControlsBackground = "linear-gradient(42deg, ".concat(rightControlsBlackCorner, ", ").concat(rightControlsBlackBody, " 80%)");
var PREFIX = 'Main';
var classes = {
    root: "".concat(PREFIX, "-root"),
    playerWrapper: "".concat(PREFIX, "-playerWrapper"),
    show: "".concat(PREFIX, "-show"),
    bufferIndication: "".concat(PREFIX, "-bufferIndication"),
    playerEventTarget: "".concat(PREFIX, "-playerEventTarget"),
    toolbarContainer: "".concat(PREFIX, "-toolbarContainer"),
    toolbar: "".concat(PREFIX, "-toolbar"),
    button: "".concat(PREFIX, "-button"),
    rightControls: "".concat(PREFIX, "-rightControls")
};
// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
var Root = (0, material_1.styled)('div')(function (_a) {
    var _b;
    var theme = _a.theme;
    return (_b = {},
        _b["& .".concat(classes.root)] = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        _b["& .".concat(classes.playerWrapper)] = {
            height: '100%',
            width: '100%',
            maxWidth: 'calc(177.778vh)',
            maxHeight: 'calc(56.25vw)',
            position: 'absolute',
            top: 0,
            opacity: '0',
            transition: 'opacity 0.1s'
        },
        _b["& .".concat(classes.show)] = {
            opacity: '1'
        },
        _b["& .".concat(classes.bufferIndication)] = {
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'grey'
        },
        _b["& .".concat(classes.playerEventTarget)] = {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%'
        },
        _b["& .".concat(classes.toolbarContainer)] = {
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            padding: '5px'
        },
        _b["& .".concat(classes.toolbar)] = {
            display: 'flex',
            alignItems: 'center',
            height: '40px',
            padding: '5px'
        },
        _b["& .".concat(classes.button)] = {
            color: '#fff'
        },
        _b["& .".concat(classes.rightControls)] = {
            display: 'flex',
            alignItems: 'center',
            padding: '0 5px',
            height: '100%',
            background: rightControlsBackground
        },
        _b);
});
var Main = function (_a) {
    var responsive = _a.responsive, _b = _a.autoplay, autoplay = _b === void 0 ? false : _b, vimeoId = _a.vimeoId, _c = _a.poweredBy, poweredBy = _c === void 0 ? {
        logoSrc: '/Negative@3x.png',
        iconSrc: '/Negative@3xIcon.png',
        href: 'https://www.lumina.co'
    } : _c, onClickOverride = _a.onClick, previewOnly = _a.previewOnly, getEmbedCode = _a.getEmbedCode, events = _a.events, getCurrentTime = _a.getCurrentTime;
    var playerWrapper = (0, react_1.useRef)(null);
    var _d = (0, react_1.useState)(null), reactPlayer = _d[0], setReactPlayer = _d[1];
    var _e = (0, react_1.useState)(null), staticEventParams = _e[0], setStaticEventParams = _e[1];
    // abstrated analytics hook so that event analytics can easily be different things in different places down the road
    // that will still hook into the player events in the proper way
    var _events = (0, events_1.useEvents)(events);
    (0, react_1.useEffect)(function () {
        if (getEmbedCode) {
            getEmbedCode("<iframe title=\"lumina-player\" src=\"https://p.lmna.io/".concat(vimeoId, "\" frameborder=\"0\" allowfullscreen></iframe>"));
        }
    }, []);
    // useful for style an interactions based on the user clicking the entire target area
    // true if the mouse is over the player target area
    var _f = (0, react_1.useState)(false), active = _f[0], setActive = _f[1];
    // player started for the first time
    var _g = (0, react_1.useState)(autoplay), started = _g[0], setStarted = _g[1];
    // playing, or !playing is "paused"
    var _h = (0, react_1.useState)(autoplay), playing = _h[0], setPlaying = _h[1];
    // progress of playing the video
    var _j = (0, react_1.useState)(0), progress = _j[0], setProgress = _j[1];
    // amount of video loaded
    var _k = (0, react_1.useState)(0), buffer = _k[0], setBuffer = _k[1];
    // number between 0 and 1
    var _l = (0, react_1.useState)(autoplay ? 0 : 0.5), volume = _l[0], setVolume = _l[1];
    // save the volume of the player BEFORE a user clicks the mute button
    // so that if they unclick it, it doesn't go to 0
    var _m = (0, react_1.useState)(autoplay ? 0.5 : null), savedVolume = _m[0], setSavedVolume = _m[1];
    // is the toolbar showing?
    var _o = (0, react_1.useState)(false), showToolbar = _o[0], setShowToolbar = _o[1];
    // is the video buffering?
    var _p = (0, react_1.useState)(false), buffering = _p[0], setBuffering = _p[1];
    var _q = (0, react_1.useState)(false), loaded = _q[0], setLoaded = _q[1];
    // manage the hide toolbar timeout event so it can be canceled if need be
    var _r = (0, react_1.useState)(null), hideToolBarTimeout = _r[0], setHideToolBarTimeout = _r[1];
    var handleOnReady = function () { return __awaiter(void 0, void 0, void 0, function () {
        var vimeoPlayer, videoTitle, videoUrl, videoDuration, videoProvider, _staticEventParams;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!reactPlayer) {
                        console.warn('React Player was not set to state before ready state.');
                        return [2 /*return*/];
                    }
                    vimeoPlayer = reactPlayer === null || reactPlayer === void 0 ? void 0 : reactPlayer.getInternalPlayer();
                    if (!vimeoPlayer) {
                        console.error('Vimeo player cannot be found from reactPlayer.');
                        return [2 /*return*/];
                    }
                    // on mobile, give volume a 1 since volume is controlled by the device natively
                    // get the default volume of the vimeo player
                    // or give it a good ol 50% for the user to ensure they hear us
                    if ((0, utils_1.isMobile)()) {
                        autoplay ? setVolume(0) : setVolume(1);
                    }
                    else {
                        autoplay ? setVolume(0) : setVolume(0.5);
                    }
                    return [4 /*yield*/, (vimeoPlayer === null || vimeoPlayer === void 0 ? void 0 : vimeoPlayer.getVideoTitle())];
                case 1:
                    videoTitle = _a.sent();
                    videoUrl = "".concat(vimeoId);
                    return [4 /*yield*/, (vimeoPlayer === null || vimeoPlayer === void 0 ? void 0 : vimeoPlayer.getDuration())];
                case 2:
                    videoDuration = _a.sent();
                    videoProvider = 'vimeo';
                    _staticEventParams = {
                        videoTitle: videoTitle,
                        videoUrl: videoUrl,
                        videoProvider: videoProvider,
                        videoDuration: videoDuration
                    };
                    setStaticEventParams(_staticEventParams);
                    _events.onLoad(_staticEventParams);
                    setLoaded(true);
                    return [2 /*return*/];
            }
        });
    }); };
    // player event listeners
    // progress has changed!
    var handleOnProgress = function (_a) {
        var playedSeconds = _a.playedSeconds, played = _a.played, loaded = _a.loaded;
        // skip initial load of progress
        if (playedSeconds === 0)
            return;
        // only let react-player handle progress if the vid is playing
        if (!playing)
            return;
        var _progress = played * 100;
        setProgress(_progress);
        if (getCurrentTime)
            getCurrentTime(playedSeconds);
        setBuffer(loaded * 100);
        _events.onProgress(__assign(__assign({}, staticEventParams), { progress: _progress }));
    };
    // video is over!
    var handleOnEnded = function () {
        reactPlayer === null || reactPlayer === void 0 ? void 0 : reactPlayer.seekTo(0);
        setBuffering(false);
        doShowToolbar();
    };
    // for mobile, where device controls player - make sure our UI matches
    var handleOnPlay = function () {
        if (playing) {
            setBuffering(false);
            return;
        }
        setPlaying(true);
    };
    // for mobile, where device controls player - make sure our UI matches
    var handleOnPause = function () {
        if (!playing)
            return;
        setPlaying(false);
    };
    // end player event listeners
    // Things that manage how it works
    var doStart = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setPlaying(true);
            setStarted(true);
            _events.onStart(__assign(__assign({}, staticEventParams), { videoCurrentTime: 0 }));
            return [2 /*return*/];
        });
    }); };
    var doPlay = function () {
        if (!started)
            setStarted(true);
        if (!buffering)
            setBuffering(true);
        setPlaying(true);
    };
    var doPause = function () {
        setBuffering(false);
        setPlaying(false);
    };
    var doAdjustVolume = function (value) {
        var _volume = value / 100;
        setVolume(_volume);
    };
    // mute the volume of the video and store the current volume for unmuting
    var doToggleVolume = function () {
        if (volume === 0 && savedVolume) {
            setVolume(savedVolume);
            return;
        }
        if (volume > 0) {
            setSavedVolume(volume);
            setVolume(0);
            return;
        }
        if (process.env.NODE_ENV === 'development') {
            console.error('Volume is not being handled properly.');
        }
    };
    // remove toolbar after 2.5 seconds on all interactions where it is shown
    var doShowToolbar = function () {
        if (hideToolBarTimeout) {
            clearTimeout(hideToolBarTimeout);
        }
        var timer = setTimeout(function () {
            doHideToolbar();
        }, 2500);
        setHideToolBarTimeout(timer);
        setShowToolbar(true);
    };
    var doHideToolbar = function () { return setShowToolbar(false); };
    // end Things that manage how it works
    // top level interactions applied to entire player area
    var onMove = function (_event) {
        if (!started)
            return;
        doShowToolbar();
    };
    var onOver = function (_event) {
        document.body.style.cursor = 'pointer';
        if (!active)
            setActive(true);
    };
    var onOut = function (_event) {
        if (!active)
            return;
        setActive(false);
    };
    var onClick = function () {
        if (!started) {
            doStart();
        }
        if (playing) {
            doPause();
            doShowToolbar();
        }
        if (!playing) {
            doPlay();
        }
    };
    // end top level interactions applied to entire player area
    if (!vimeoId) {
        return null;
    }
    return (react_1["default"].createElement(Root, { className: classes.root, style: responsive
            ? {
                padding: '56.25% 0 0 0',
                position: 'relative'
            }
            : undefined, tabIndex: 0 },
        react_1["default"].createElement("div", { onClickCapture: onClickOverride, ref: playerWrapper, className: "".concat(classes.playerWrapper, " ").concat(loaded ? classes.show : '') },
            buffering && (react_1["default"].createElement("div", { className: classes.bufferIndication },
                react_1["default"].createElement(material_1.CircularProgress, { style: { color: 'grey' }, size: 70 }))),
            react_1["default"].createElement(vimeo_1["default"], { light: previewOnly && !started, playIcon: react_1["default"].createElement(StartButton_1.StartButton, { started: started, onClick: doStart }), ref: function (_reactPlayer) { return setReactPlayer(_reactPlayer); }, volume: volume, progressInterval: 50, onBuffer: function () {
                    setBuffering(true);
                }, onReady: handleOnReady, onProgress: handleOnProgress, onEnded: handleOnEnded, onPause: handleOnPause, onPlay: handleOnPlay, playing: playing, controls: false, height: "100%", width: "100%", url: "https://vimeo.com/".concat(vimeoId) }),
            react_1["default"].createElement("div", { className: classes.playerEventTarget, onClick: onClick, onMouseOver: onOver, onMouseMove: onMove, onMouseOut: onOut, onTouchStart: onMove, onTouchMove: onMove },
                react_1["default"].createElement("div", { className: classes.toolbarContainer },
                    react_1["default"].createElement(material_1.Fade, { "in": showToolbar, timeout: 300 },
                        react_1["default"].createElement("div", { className: classes.toolbar },
                            react_1["default"].createElement(toolbar_1.PlayControl, { doPause: doPause, doPlay: doPlay, playing: playing }),
                            react_1["default"].createElement(toolbar_1.ProgressBar, { doShowToolbar: doShowToolbar, background: transparentBlackBackground, progress: progress, buffer: buffer, playing: playing, setPlaying: setPlaying, setProgress: setProgress, 
                                // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                                seekTo: reactPlayer === null || reactPlayer === void 0 ? void 0 : reactPlayer.seekTo }),
                            react_1["default"].createElement("div", { className: classes.rightControls },
                                react_1["default"].createElement(toolbar_1.VolumeControl, { volume: volume, doShowToolbar: doShowToolbar, doAdjustVolume: doAdjustVolume, doToggleVolume: doToggleVolume }),
                                react_1["default"].createElement(toolbar_1.Fullscreen, { playerWrapper: playerWrapper.current }),
                                poweredBy && react_1["default"].createElement(toolbar_1.PoweredBy, __assign({}, poweredBy))))),
                    react_1["default"].createElement(MutedIndicator_1.MutedIndicator, { background: transparentBlackBackground, started: started, volume: volume, toolbarShowing: showToolbar }))),
            react_1["default"].createElement(StartButton_1.StartButton, { started: started, onClick: doStart }))));
};
exports.Main = Main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL21vZHVsZXMvUGxheWVyL01haW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBMEQ7QUFFMUQsNkRBQTRDO0FBRTVDLDBDQUE4RDtBQUM5RCwrQ0FBNEM7QUFFNUMsZ0RBQThDO0FBQzlDLHNEQUFvRDtBQUVwRCxtQ0FBOEQ7QUFFOUQscUNBTWtCO0FBRWxCLGlDQUFrQztBQUVsQyxJQUFNLFdBQVcsR0FBRyxJQUFBLGNBQUssRUFBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDdEMsSUFBTSxTQUFTLEdBQUcsSUFBQSxjQUFLLEVBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ3BDLElBQU0sMEJBQTBCLEdBQUcsaUNBQTBCLFdBQVcsZUFBSyxTQUFTLE1BQUcsQ0FBQTtBQUV6RixJQUFNLHdCQUF3QixHQUFHLElBQUEsY0FBSyxFQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUNuRCxJQUFNLHNCQUFzQixHQUFHLElBQUEsY0FBSyxFQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUNqRCxJQUFNLHVCQUF1QixHQUFHLGlDQUEwQix3QkFBd0IsZUFBSyxzQkFBc0IsVUFBTyxDQUFBO0FBRXBILElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQTtBQUVyQixJQUFNLE9BQU8sR0FBRztJQUNkLElBQUksRUFBRSxVQUFHLE1BQU0sVUFBTztJQUN0QixhQUFhLEVBQUUsVUFBRyxNQUFNLG1CQUFnQjtJQUN4QyxJQUFJLEVBQUUsVUFBRyxNQUFNLFVBQU87SUFDdEIsZ0JBQWdCLEVBQUUsVUFBRyxNQUFNLHNCQUFtQjtJQUM5QyxpQkFBaUIsRUFBRSxVQUFHLE1BQU0sdUJBQW9CO0lBQ2hELGdCQUFnQixF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