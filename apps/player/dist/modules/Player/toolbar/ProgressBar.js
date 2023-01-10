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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ProgressBar = void 0;
var react_1 = __importStar(require("react"));
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var makeStyles_1 = __importDefault(require("@mui/styles/makeStyles"));
var utils_1 = require("../utils");
var useStyles = (0, makeStyles_1["default"])({
    progressBarContainer: {
        margin: '0 10px',
        width: '100%',
        cursor: 'hand',
        border: '1px solid rgba(0, 0, 0, 0.3)',
        borderRadius: '3px'
    },
    progressBar: {
        borderRadius: '2px',
        height: '25px',
        '& .MuiLinearProgress-bar1Buffer': {
            transition: 'transform 0.02s linear',
            backgroundColor: (0, styles_1.alpha)('#fff', 0.9)
        },
        '& .MuiLinearProgress-bar2Buffer': {
            backgroundColor: (0, styles_1.alpha)('#fff', 0.2)
        },
        '& .MuiLinearProgress-dashedColorPrimary': {
            backgroundImage: 'none'
        }
    }
});
var ProgressBar = function (_a) {
    var playing = _a.playing, progress = _a.progress, buffer = _a.buffer, background = _a.background, seekTo = _a.seekTo, setPlaying = _a.setPlaying, setProgress = _a.setProgress;
    var classes = useStyles();
    var _b = (0, react_1.useState)(false), seeking = _b[0], setSeeking = _b[1];
    var _c = (0, react_1.useState)(null), playingTimeout = _c[0], setPlayingTimeout = _c[1];
    var onSeekStart = function (event) {
        // prevent event propogating to onClick interactions above
        event.stopPropagation();
        setSeeking(true);
        onSeekInteraction(event);
    };
    // seek interaction on
    var onSeekInteraction = function (event) {
        if (playingTimeout) {
            clearTimeout(playingTimeout);
        }
        var currentTarget = event.currentTarget;
        var boundingRect = currentTarget.getBoundingClientRect();
        var location;
        if ((0, utils_1.isMouseEvent)(event)) {
            location = event.clientX - boundingRect.x;
        }
        if ((0, utils_1.isTouchEvent)(event)) {
            location = event.touches[0].clientX - boundingRect.x;
        }
        if (location) {
            var _seekTo = Math.max(0, Math.min(location / boundingRect.width, 1));
            // if the video was playing stop in temporarily
            if (playing) {
                setPlaying(false);
                var timer = setTimeout(function () {
                    setPlaying(true);
                }, 100);
                setPlayingTimeout(timer);
            }
            setProgress(_seekTo * 100);
            seekTo(_seekTo);
        }
    };
    var onSeekEnd = function (_event) {
        setSeeking(false);
    };
    var cancelEvent = function (event) {
        event.stopPropagation();
    };
    return (react_1["default"].createElement("div", { onClick: cancelEvent, className: classes.progressBarContainer, onMouseDown: onSeekStart, onMouseMove: seeking ? onSeekInteraction : undefined, onMouseUp: onSeekEnd, onTouchStart: onSeekStart, onTouchMove: onSeekInteraction },
        react_1["default"].createElement(material_1.LinearProgress, { variant: "buffer", value: progress, valueBuffer: buffer, className: classes.progressBar, style: { background: background } })));
};
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3NCYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9tb2R1bGVzL1BsYXllci90b29sYmFyL1Byb2dyZXNzQmFyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUF1QztBQUV2QywwQ0FBOEM7QUFDOUMsK0NBQTZDO0FBRTdDLHNFQUFnRDtBQUdoRCxrQ0FBcUQ7QUFFckQsSUFBTSxTQUFTLEdBQUcsSUFBQSx1QkFBVSxFQUFDO0lBQzNCLG9CQUFvQixFQUFFO1FBQ3BCLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLEtBQUssRUFBRSxNQUFNO1FBQ2IsTUFBTSxFQUFFLE1BQU07UUFDZCxNQUFNLEVBQUUsOEJBQThCO1FBQ3RDLFlBQVksRUFBRSxLQUFLO0tBQ3BCO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsWUFBWSxFQUFFLEtBQUs7UUFDbkIsTUFBTSxFQUFFLE1BQU07UUFDZCxpQ0FBaUMsRUFBRTtZQUNqQyxVQUFVLEVBQUUsd0JBQXdCO1lBQ3BDLGVBQWUsRUFBRSxJQUFBLGNBQUssRUFBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO1NBQ3BDO1FBQ0QsaUNBQWlDLEVBQUU7WUFDakMsZUFBZSxFQUFFLElBQUEsY0FBSyxFQUFDLE1BQU0sRUFBRSxHQUFHLENBQUM7U0FDcEM7UUFDRCx5Q0FBeUMsRUFBRTtZQUN6QyxlQUFlLEVBQUUsTUFBTTtTQUN4QjtLQUNGO0NBQ0YsQ0FBQyxDQUFBO0FBYUssSUFBTSxXQUFXLEdBQUcsVUFBQyxFQVFwQjtRQVBOLE9BQU8sYUFBQSxFQUNQLFFBQVEsY0FBQSxFQUNSLE1BQU0sWUFBQSxFQUNOLFVBQVUsZ0JBQUEsRUFDVixNQUFNLFlBQUEsRUFDTixVQUFVLGdCQUFBLEVBQ1YsV0FBVyxpQkFBQTtJQUVYLElBQU0sT0FBTyxHQUFHLFNBQVMsRUFBRSxDQUFBO0lBQ3JCLElBQUEsS0FBd0IsSUFBQSxnQkFBUSxFQUFDLEtBQUssQ0FBQyxFQUF0QyxPQUFPLFFBQUEsRUFBRSxVQUFVLFFBQW1CLENBQUE7SUFDdkMsSUFBQSxLQUFzQyxJQUFBLGdCQUFRLEVBQ2xELElBQUksQ0FDTCxFQUZNLGNBQWMsUUFBQSxFQUFFLGlCQUFpQixRQUV2QyxDQUFBO0lBRUQsSUFBTSxXQUFXLEdBQUcsVUFDbEIsS0FFb0M7UUFFcEMsMERBQTBEO1FBQzFELEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUN2QixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEIsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDMUIsQ0FBQyxDQUFBO0lBRUQsc0JBQXNCO0lBQ3RCLElBQU0saUJBQWlCLEdBQUcsVUFDeEIsS0FFb0M7UUFFcEMsSUFBSSxjQUFjLEVBQUU7WUFDbEIsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1NBQzdCO1FBQ0QsSUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQTtRQUN6QyxJQUFNLFlBQVksR0FBRyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQTtRQUMxRCxJQUFJLFFBQVEsQ0FBQTtRQUNaLElBQUksSUFBQSxvQkFBWSxFQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUE7U0FDMUM7UUFDRCxJQUFJLElBQUEsb0JBQVksRUFBQyxLQUFLLENBQUMsRUFBRTtZQUN2QixRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQTtTQUNyRDtRQUNELElBQUksUUFBUSxFQUFFO1lBQ1osSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3ZFLCtDQUErQztZQUMvQyxJQUFJLE9BQU8sRUFBRTtnQkFDWCxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ2pCLElBQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQztvQkFDdkIsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNsQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQ1AsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUE7YUFDekI7WUFFRCxXQUFXLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFBO1lBQzFCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUNoQjtJQUNILENBQUMsQ0FBQTtJQUVELElBQU0sU0FBUyxHQUFHLFVBQ2hCLE1BRW9DO1FBRXBDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQixDQUFDLENBQUE7SUFFRCxJQUFNLFdBQVcsR0FBRyxVQUFDLEtBQW1EO1FBQ3RFLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUN6QixDQUFDLENBQUE7SUFFRCxPQUFPLENBQ0wsMENBQ0UsT0FBTyxFQUFFLFdBQVcsRUFDcEIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxvQkFBb0IsRUFDdkMsV0FBVyxFQUFFLFdBQVcsRUFDeEIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFDcEQsU0FBUyxFQUFFLFNBQVMsRUFDcEIsWUFBWSxFQUFFLFdBQVcsRUFDekIsV0FBVyxFQUFFLGlCQUFpQjtRQUU5QixpQ0FBQyx5QkFBYyxJQUNiLE9BQU8sRUFBQyxRQUFRLEVBQ2hCLEtBQUssRUFBRSxRQUFRLEVBQ2YsV0FBVyxFQUFFLE1BQU0sRUFDbkIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQzlCLEtBQUssRUFBRSxFQUFFLFVBQVUsWUFBQSxFQUFFLEdBQ3JCLENBQ0UsQ0FDUCxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBM0ZZLFFBQUEsV0FBVyxlQTJGdkIifQ==