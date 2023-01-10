"use strict";
exports.__esModule = true;
exports.useEvents = void 0;
var react_1 = require("react");
var useEvents = function (events) {
    var _a = events || {}, onLoad = _a.onLoad, onStart = _a.onStart, on25Percent = _a.on25Percent, on50Percent = _a.on50Percent, on75Percent = _a.on75Percent, onComplete = _a.onComplete;
    // set progress at interval
    var _b = (0, react_1.useState)(false), progress25 = _b[0], setProgress25 = _b[1];
    var _c = (0, react_1.useState)(false), progress50 = _c[0], setProgress50 = _c[1];
    var _d = (0, react_1.useState)(false), progress75 = _d[0], setProgress75 = _d[1];
    var _e = (0, react_1.useState)(false), complete = _e[0], setComplete = _e[1];
    var doOnLoad = function (args) {
        onLoad && onLoad(args);
        console.info('Video loaded');
    };
    var doOnStart = function (args) {
        onStart && onStart(args);
        console.info('Video started');
    };
    var doOn25Percent = function (args) {
        on25Percent && on25Percent(args);
        console.info('Progress 25');
    };
    var doOn50Percent = function (args) {
        on50Percent && on50Percent(args);
        console.info('Progress 50');
    };
    var doOn75Percent = function (args) {
        on75Percent && on75Percent(args);
        console.info('Progress 75');
    };
    var doOnComplete = function (args) {
        onComplete && onComplete(args);
        console.info('Progress 95 and video complete');
    };
    var doOnProgress = function (args) {
        var progress = args.progress;
        if (progress >= 95 && !complete) {
            setComplete(true);
            doOnComplete(args);
            return;
        }
        if (progress >= 75 && !progress75) {
            setProgress75(true);
            doOn75Percent(args);
            return;
        }
        if (progress >= 50 && !progress50) {
            setProgress50(true);
            doOn50Percent(args);
            return;
        }
        if (progress >= 25 && !progress25) {
            setProgress25(true);
            doOn25Percent(args);
            return;
        }
    };
    return {
        onLoad: doOnLoad,
        onStart: doOnStart,
        onProgress: doOnProgress
    };
};
exports.useEvents = useEvents;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlRXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbW9kdWxlcy9QbGF5ZXIvZXZlbnRzL3VzZUV2ZW50cy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQWdDO0FBSXpCLElBQU0sU0FBUyxHQUFHLFVBQUMsTUFBMEI7SUFDNUMsSUFBQSxLQUNKLE1BQU0sSUFBSSxFQUFFLEVBRE4sTUFBTSxZQUFBLEVBQUUsT0FBTyxhQUFBLEVBQUUsV0FBVyxpQkFBQSxFQUFFLFdBQVcsaUJBQUEsRUFBRSxXQUFXLGlCQUFBLEVBQUUsVUFBVSxnQkFDNUQsQ0FBQTtJQUVkLDJCQUEyQjtJQUNyQixJQUFBLEtBQThCLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsRUFBNUMsVUFBVSxRQUFBLEVBQUUsYUFBYSxRQUFtQixDQUFBO0lBQzdDLElBQUEsS0FBOEIsSUFBQSxnQkFBUSxFQUFDLEtBQUssQ0FBQyxFQUE1QyxVQUFVLFFBQUEsRUFBRSxhQUFhLFFBQW1CLENBQUE7SUFDN0MsSUFBQSxLQUE4QixJQUFBLGdCQUFRLEVBQUMsS0FBSyxDQUFDLEVBQTVDLFVBQVUsUUFBQSxFQUFFLGFBQWEsUUFBbUIsQ0FBQTtJQUM3QyxJQUFBLEtBQTBCLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsRUFBeEMsUUFBUSxRQUFBLEVBQUUsV0FBVyxRQUFtQixDQUFBO0lBRS9DLElBQU0sUUFBUSxHQUFHLFVBQUMsSUFBc0I7UUFDdEMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQzlCLENBQUMsQ0FBQTtJQUVELElBQU0sU0FBUyxHQUFHLFVBQUMsSUFBc0I7UUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQy9CLENBQUMsQ0FBQTtJQUVELElBQU0sYUFBYSxHQUFHLFVBQUMsSUFBc0I7UUFDM0MsV0FBVyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzdCLENBQUMsQ0FBQTtJQUVELElBQU0sYUFBYSxHQUFHLFVBQUMsSUFBc0I7UUFDM0MsV0FBVyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzdCLENBQUMsQ0FBQTtJQUVELElBQU0sYUFBYSxHQUFHLFVBQUMsSUFBc0I7UUFDM0MsV0FBVyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzdCLENBQUMsQ0FBQTtJQUVELElBQU0sWUFBWSxHQUFHLFVBQUMsSUFBc0I7UUFDMUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUE7SUFDaEQsQ0FBQyxDQUFBO0lBRUQsSUFBTSxZQUFZLEdBQUcsVUFBQyxJQUFzQjtRQUMxQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBa0IsQ0FBQTtRQUN4QyxJQUFJLFFBQVEsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDL0IsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2pCLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNsQixPQUFNO1NBQ1A7UUFDRCxJQUFJLFFBQVEsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ25CLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNuQixPQUFNO1NBQ1A7UUFDRCxJQUFJLFFBQVEsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ25CLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNuQixPQUFNO1NBQ1A7UUFDRCxJQUFJLFFBQVEsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ25CLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNuQixPQUFNO1NBQ1A7SUFDSCxDQUFDLENBQUE7SUFFRCxPQUFPO1FBQ0wsTUFBTSxFQUFFLFFBQVE7UUFDaEIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsVUFBVSxFQUFFLFlBQVk7S0FDekIsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQXJFWSxRQUFBLFNBQVMsYUFxRXJCIn0=