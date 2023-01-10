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
exports.__esModule = true;
exports.VolumeControl = void 0;
var react_1 = __importStar(require("react"));
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var icons_material_1 = require("@mui/icons-material");
var PREFIX = 'VolumeControl';
var classes = {
    button: "".concat(PREFIX, "-button"),
    volumeBox: "".concat(PREFIX, "-volumeBox"),
    sliderContainer: "".concat(PREFIX, "-sliderContainer"),
    sliderWrapper: "".concat(PREFIX, "-sliderWrapper"),
    slider: "".concat(PREFIX, "-slider")
};
var StyledSlider = (0, material_1.styled)(material_1.Slider)({
    color: (0, styles_1.alpha)('#1b1d1d', 0.8),
    width: 8,
    '& .MuiSlider-thumb': {
        color: (0, styles_1.alpha)('#242424', 0.9),
        width: 22,
        height: 8,
        borderRadius: '20%'
    },
    '& .MuiSlider-track': {
        width: 4,
        borderRadius: 4
    },
    '& .MuiSlider-rail': {
        width: 4,
        borderRadius: 4
    }
});
var Root = (0, material_1.styled)('div')(function (_a) {
    var _b;
    var theme = _a.theme;
    return (_b = {},
        _b["& .".concat(classes.button)] = {
            color: '#fff'
        },
        _b["& .".concat(classes.volumeBox)] = {
            height: '100%',
            borderRadius: '0 0 0 2px',
            width: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '000',
            textAlign: 'center',
            color: '#fff',
            '&:hover, .MuiIconButton-root': {
                backgroundColor: 'transparent'
            }
        },
        _b["& .".concat(classes.sliderContainer)] = {
            position: 'relative'
        },
        _b["& .".concat(classes.sliderWrapper)] = {
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 10,
            position: 'absolute',
            height: 100,
            bottom: 10,
            width: '40px',
            textAlign: 'center'
        },
        _b);
});
var VolumeControl = function (_a) {
    var doAdjustVolume = _a.doAdjustVolume, doToggleVolume = _a.doToggleVolume, doShowToolbar = _a.doShowToolbar, volume = _a.volume;
    var _b = (0, react_1.useState)(false), showSlider = _b[0], setShowSlider = _b[1];
    var _c = (0, react_1.useState)(null), sliderTimeout = _c[0], setSliderTimeout = _c[1];
    var doShowSlider = function () {
        setShowSlider(true);
        if (sliderTimeout) {
            clearTimeout(sliderTimeout);
            setSliderTimeout(null);
        }
    };
    var doHideSlider = function () {
        var timer = setTimeout(function () {
            setShowSlider(false);
        }, 1000);
        setSliderTimeout(timer);
    };
    var handleOnClick = function () {
        doToggleVolume();
        doShowToolbar();
        setShowSlider(true);
    };
    var handleAdjustSlider = function (
    // eslint-disable-next-line @typescript-eslint/ban-types
    event, value) {
        event.preventDefault();
        doAdjustVolume(value);
        doShowToolbar();
    };
    var cancelEvents = function (event) {
        event.stopPropagation();
    };
    return (react_1["default"].createElement(Root, { onClick: cancelEvents },
        react_1["default"].createElement("div", { style: { height: '100%' } },
            react_1["default"].createElement(material_1.Fade, { "in": showSlider },
                react_1["default"].createElement("div", { className: classes.sliderContainer },
                    react_1["default"].createElement("div", { className: classes.sliderWrapper },
                        react_1["default"].createElement(StyledSlider, { onMouseMove: doShowSlider, onMouseLeave: doHideSlider, className: classes.slider, value: volume * 100, onChange: function () { return handleAdjustSlider; }, onChangeCommitted: doHideSlider, orientation: "vertical" }))))),
        react_1["default"].createElement("div", { className: classes.volumeBox },
            react_1["default"].createElement(material_1.IconButton, { className: classes.button, onMouseEnter: doShowSlider, onMouseLeave: doHideSlider, onClick: handleOnClick, disableRipple: true, size: "large" }, volume === 0 ? (react_1["default"].createElement(icons_material_1.VolumeOff, { style: { fontSize: '30px' } })) : (react_1["default"].createElement(icons_material_1.VolumeUp, { style: { fontSize: '30px' } }))))));
};
exports.VolumeControl = VolumeControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVm9sdW1lQ29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL21vZHVsZXMvUGxheWVyL3Rvb2xiYXIvVm9sdW1lQ29udHJvbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBdUM7QUFFdkMsMENBQWdFO0FBRWhFLCtDQUE2QztBQUU3QyxzREFBeUQ7QUFFekQsSUFBTSxNQUFNLEdBQUcsZUFBZSxDQUFBO0FBRTlCLElBQU0sT0FBTyxHQUFHO0lBQ2QsTUFBTSxFQUFFLFVBQUcsTUFBTSxZQUFTO0lBQzFCLFNBQVMsRUFBRSxVQUFHLE1BQU0sZUFBWTtJQUNoQyxlQUFlLEVBQUUsVUFBRyxNQUFNLHFCQUFrQjtJQUM1QyxhQUFhLEVBQUUsVUFBRyxNQUFNLG1CQUFnQjtJQUN4QyxNQUFNLEVBQUUsVUFBRyxNQUFNLFlBQVM7Q0FDM0IsQ0FBQTtBQUVELElBQU0sWUFBWSxHQUFHLElBQUEsaUJBQU0sRUFBQyxpQkFBTSxDQUFDLENBQUM7SUFDaEMsS0FBSyxFQUFFLElBQUEsY0FBSyxFQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7SUFDNUIsS0FBSyxFQUFFLENBQUM7SUFDUixvQkFBb0IsRUFBRTtRQUNwQixLQUFLLEVBQUUsSUFBQSxjQUFLLEVBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQztRQUM1QixLQUFLLEVBQUUsRUFBRTtRQUNULE1BQU0sRUFBRSxDQUFDO1FBQ1QsWUFBWSxFQUFFLEtBQUs7S0FDcEI7SUFDRCxvQkFBb0IsRUFBRTtRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUNSLFlBQVksRUFBRSxDQUFDO0tBQ2hCO0lBQ0QsbUJBQW1CLEVBQUU7UUFDbkIsS0FBSyxFQUFFLENBQUM7UUFDUixZQUFZLEVBQUUsQ0FBQztLQUNoQjtDQUNKLENBQUMsQ0FBQTtBQUVGLElBQU0sSUFBSSxHQUFHLElBQUEsaUJBQU0sRUFBQyxLQUFLLENBQUMsQ0FBQyxVQUFD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