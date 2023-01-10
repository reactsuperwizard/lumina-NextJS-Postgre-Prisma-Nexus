"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.MutedIndicator = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
// Indicates that volume is off in video, when toolbar is not showing so user knows to turn volume on
var MutedIndicator = function (_a) {
    var toolbarShowing = _a.toolbarShowing, volume = _a.volume, started = _a.started, background = _a.background;
    return (react_1["default"].createElement(material_1.Fade, { "in": !toolbarShowing && volume === 0 && started, timeout: { enter: 300, exit: 0 }, mountOnEnter: true, unmountOnExit: true },
        react_1["default"].createElement("div", { style: {
                position: 'absolute',
                right: '5px',
                bottom: '5px',
                borderRadius: '0 0 0 2px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: background,
                textAlign: 'center',
                color: '#fff'
            } },
            react_1["default"].createElement(icons_material_1.VolumeOff, { style: {
                    fontSize: '30px'
                } }))));
};
exports.MutedIndicator = MutedIndicator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXV0ZWRJbmRpY2F0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9tb2R1bGVzL1BsYXllci91aS9NdXRlZEluZGljYXRvci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQXlCO0FBQ3pCLDBDQUFvQztBQUNwQyxzREFBK0M7QUFTL0MscUdBQXFHO0FBQzlGLElBQU0sY0FBYyxHQUFHLFVBQUMsRUFLdkI7UUFKTixjQUFjLG9CQUFBLEVBQ2QsTUFBTSxZQUFBLEVBQ04sT0FBTyxhQUFBLEVBQ1AsVUFBVSxnQkFBQTtJQUVWLE9BQU8sQ0FDTCxpQ0FBQyxlQUFJLElBQ0gsSUFBRSxFQUFFLENBQUMsY0FBYyxJQUFJLE1BQU0sS0FBSyxDQUFDLElBQUksT0FBTyxFQUM5QyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFDaEMsWUFBWSxRQUNaLGFBQWE7UUFFYiwwQ0FDRSxLQUFLLEVBQUU7Z0JBQ0wsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLEtBQUssRUFBRSxLQUFLO2dCQUNaLE1BQU0sRUFBRSxLQUFLO2dCQUNiLFlBQVksRUFBRSxXQUFXO2dCQUN6QixLQUFLLEVBQUUsTUFBTTtnQkFDYixNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUUsTUFBTTtnQkFDZixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsY0FBYyxFQUFFLFFBQVE7Z0JBQ3hCLFVBQVUsWUFBQTtnQkFDVixTQUFTLEVBQUUsUUFBUTtnQkFDbkIsS0FBSyxFQUFFLE1BQU07YUFDZDtZQUVELGlDQUFDLDBCQUFTLElBQ1IsS0FBSyxFQUFFO29CQUNMLFFBQVEsRUFBRSxNQUFNO2lCQUNqQixHQUNELENBQ0UsQ0FDRCxDQUNSLENBQUE7QUFDSCxDQUFDLENBQUE7QUFyQ1ksUUFBQSxjQUFjLGtCQXFDMUIifQ==