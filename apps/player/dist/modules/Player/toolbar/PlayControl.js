"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
exports.PlayControl = void 0;
var react_1 = __importDefault(require("react"));
var styles_1 = require("@mui/material/styles");
var icons_material_1 = require("@mui/icons-material");
var material_1 = require("@mui/material");
var PREFIX = 'PlayControl';
var classes = {
    root: "".concat(PREFIX, "-root"),
    playArrowBox: "".concat(PREFIX, "-playArrowBox")
};
var greyCorner = (0, styles_1.alpha)('#808080', 0.6);
var greyBody = (0, styles_1.alpha)('#808080', 0.3);
var blackCorner = (0, styles_1.alpha)('#000', 0.6);
var blackBody = (0, styles_1.alpha)('#000', 0.3);
var Root = (0, material_1.styled)('div')((_a = {
        margin: '0 10px',
        borderRadius: '2px',
        width: '70px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    _a["& .".concat(classes.root)] = {
        color: '#fff',
        background: "linear-gradient(90deg, ".concat(blackCorner, ", ").concat(blackBody, ")"),
        borderRadius: '2px',
        height: '100%',
        '&:hover': {
            color: 'black',
            background: "linear-gradient(90deg, ".concat(greyCorner, ", ").concat(greyBody, ")"),
            opacity: 0.7
        },
        transitionProperty: 'none'
    },
    _a));
var PlayControl = function (_a) {
    var doPlay = _a.doPlay, doPause = _a.doPause, playing = _a.playing;
    return (react_1["default"].createElement(Root, null, playing ? (react_1["default"].createElement(material_1.IconButton, { disableRipple: true, className: classes.root, onClick: doPause, size: "large" },
        react_1["default"].createElement(icons_material_1.Pause, { style: { fontSize: '30px' } }))) : (react_1["default"].createElement(material_1.IconButton, { disableRipple: true, className: classes.root, onClick: doPlay, size: "large" },
        react_1["default"].createElement(icons_material_1.PlayArrow, { style: { fontSize: '30px' } })))));
};
exports.PlayControl = PlayControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheUNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9tb2R1bGVzL1BsYXllci90b29sYmFyL1BsYXlDb250cm9sLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsZ0RBQXlCO0FBRXpCLCtDQUE0QztBQUM1QyxzREFBc0Q7QUFDdEQsMENBQWtEO0FBRWxELElBQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQTtBQUU1QixJQUFNLE9BQU8sR0FBRztJQUNkLElBQUksRUFBRSxVQUFHLE1BQU0sVUFBTztJQUN0QixZQUFZLEVBQUUsVUFBRyxNQUFNLGtCQUFlO0NBQ3ZDLENBQUE7QUFDRCxJQUFNLFVBQVUsR0FBRyxJQUFBLGNBQUssRUFBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDeEMsSUFBTSxRQUFRLEdBQUcsSUFBQSxjQUFLLEVBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBRXRDLElBQU0sV0FBVyxHQUFHLElBQUEsY0FBSyxFQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUN0QyxJQUFNLFNBQVMsR0FBRyxJQUFBLGNBQUssRUFBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDcEMsSUFBTSxJQUFJLEdBQUcsSUFBQSxpQkFBTSxFQUFDLEtBQUssQ0FBQztRQUN4QixNQUFNLEVBQUUsUUFBUTtRQUNoQixZQUFZLEVBQUUsS0FBSztRQUNuQixLQUFLLEVBQUUsTUFBTTtRQUNiLE1BQU0sRUFBRSxNQUFNO1FBQ2QsT0FBTyxFQUFFLE1BQU07UUFDZixVQUFVLEVBQUUsUUFBUTtRQUNwQixjQUFjLEVBQUUsUUFBUTs7SUFDeEIsR0FBQyxhQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUUsSUFBRztRQUN0QixLQUFLLEVBQUUsTUFBTTtRQUNiLFVBQVUsRUFBRSxpQ0FBMEIsV0FBVyxlQUFLLFNBQVMsTUFBRztRQUNsRSxZQUFZLEVBQUUsS0FBSztRQUNuQixNQUFNLEVBQUUsTUFBTTtRQUNkLFNBQVMsRUFBRTtZQUNULEtBQUssRUFBRSxPQUFPO1lBQ2QsVUFBVSxFQUFFLGlDQUEwQixVQUFVLGVBQUssUUFBUSxNQUFHO1lBQ2hFLE9BQU8sRUFBRSxHQUFHO1NBQ2I7UUFDRCxrQkFBa0IsRUFBRSxNQUFNO0tBQzNCO1FBQ0QsQ0FBQTtBQVFLLElBQU0sV0FBVyxHQUFHLFVBQUMsRUFBbUM7UUFBakMsTUFBTSxZQUFBLEVBQUUsT0FBTyxhQUFBLEVBQUUsT0FBTyxhQUFBO0lBQ3BELE9BQU8sQ0FDTCxpQ0FBQyxJQUFJLFFBQ0YsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUNULGlDQUFDLHFCQUFVLElBQ1QsYUFBYSxFQUFFLElBQUksRUFDbkIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQ2hCLElBQUksRUFBQyxPQUFPO1FBRVosaUNBQUMsc0JBQUssSUFBQyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUksQ0FDM0IsQ0FDZCxDQUFDLENBQUMsQ0FBQyxDQUNGLGlDQUFDLHFCQUFVLElBQ1QsYUFBYSxFQUFFLElBQUksRUFDbkIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQ2YsSUFBSSxFQUFDLE9BQU87UUFFWixpQ0FBQywwQkFBUyxJQUFDLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsR0FBSSxDQUMvQixDQUNkLENBQ0ksQ0FDUixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBeEJZLFFBQUEsV0FBVyxlQXdCdkIifQ==