"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.StartButton = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var icons_material_1 = require("@mui/icons-material");
var PREFIX = 'StartButton';
var classes = {
    button: "".concat(PREFIX, "-button")
};
// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
var Root = (0, material_1.styled)('div')(function (_a) {
    var _b, _c;
    var theme = _a.theme;
    return (_b = {
            borderRadius: '8px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            color: 'white',
            background: "linear-gradient(90deg, ".concat((0, styles_1.alpha)('#000', 0.6), ", ").concat((0, styles_1.alpha)('#000', 0.3), ")"),
            '& button': (_c = {
                    fontSize: '3em'
                },
                _c[theme.breakpoints.up('sm')] = {
                    fontSize: '6em'
                },
                _c[theme.breakpoints.up('md')] = {
                    fontSize: '6em'
                },
                _c[theme.breakpoints.up('lg')] = {
                    fontSize: '8em'
                },
                _c.padding = '0 0.3em 0 0.3em',
                _c),
            '&:hover': {
                color: 'black',
                background: "linear-gradient(90deg, ".concat((0, styles_1.alpha)('#808080', 0.6), ", ").concat((0, styles_1.alpha)('#808080', 0.3), ")")
            }
        },
        _b["& .".concat(classes.button)] = {
            color: 'white',
            borderRadius: '8px',
            '&:hover': {
                color: 'black'
            }
        },
        _b);
});
var StartButton = function (_a) {
    var onClick = _a.onClick, started = _a.started;
    return (react_1["default"].createElement(material_1.Fade, { "in": !started, unmountOnExit: true },
        react_1["default"].createElement(Root, null,
            react_1["default"].createElement(material_1.IconButton, { className: classes.button, onClick: onClick, disableRipple: true, size: "large" },
                react_1["default"].createElement(icons_material_1.PlayArrow, { fontSize: "inherit" })))));
};
exports.StartButton = StartButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnRCdXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9tb2R1bGVzL1BsYXllci91aS9TdGFydEJ1dHRvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQXlCO0FBQ3pCLDBDQUF3RDtBQUN4RCwrQ0FBNkM7QUFDN0Msc0RBQStDO0FBSS9DLElBQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQTtBQUU1QixJQUFNLE9BQU8sR0FBRztJQUNkLE1BQU0sRUFBRSxVQUFHLE1BQU0sWUFBUztDQUMzQixDQUFBO0FBRUQsK0ZBQStGO0FBQy9GLElBQU0sSUFBSSxHQUFHLElBQUEsaUJBQU0sRUFBQyxLQUFLLENBQUMsQ0FBQyxVQUFDLEVBQVM7O1FBQVAsS0FBSyxXQUFBO0lBQU8sT0FBQTtZQUNwQyxZQUFZLEVBQUUsS0FBSztZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixHQUFHLEVBQUUsS0FBSztZQUNWLElBQUksRUFBRSxLQUFLO1lBQ1gsU0FBUyxFQUFFLHNCQUFzQjtZQUNqQyxLQUFLLEVBQUUsT0FBTztZQUNkLFVBQVUsRUFBRSxpQ0FBMEIsSUFBQSxjQUFLLEVBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxlQUFLLElBQUEsY0FBSyxFQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBRztZQUNsRixVQUFVO29CQUNKLFFBQVEsRUFBRSxLQUFLOztnQkFDdkIsR0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBRztvQkFDNUIsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCO2dCQUNELEdBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUc7b0JBQzVCLFFBQVEsRUFBRSxLQUFLO2lCQUNoQjtnQkFDRCxHQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFHO29CQUM1QixRQUFRLEVBQUUsS0FBSztpQkFDaEI7Z0JBQ0csVUFBTyxHQUFFLGlCQUFpQjttQkFDM0I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsVUFBVSxFQUFFLGlDQUEwQixJQUFBLGNBQUssRUFBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLGVBQUssSUFBQSxjQUFLLEVBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxNQUFHO2FBQ3pGOztRQUNILEdBQUMsYUFBTSxPQUFPLENBQUMsTUFBTSxDQUFFLElBQUc7WUFDeEIsS0FBSyxFQUFFLE9BQU87WUFDZCxZQUFZLEVBQUUsS0FBSztZQUNuQixTQUFTLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLE9BQU87YUFDZjtTQUNGO1dBQ0Q7QUFoQ3NDLENBZ0N0QyxDQUFDLENBQUE7QUFRRSxJQUFNLFdBQVcsR0FBRyxVQUFDLEVBR3BCO1FBRk4sT0FBTyxhQUFBLEVBQ1AsT0FBTyxhQUFBO0lBR1AsT0FBTyxDQUNMLGlDQUFDLGVBQUksSUFBQyxJQUFFLEVBQUUsQ0FBQyxPQUFPLEVBQUUsYUFBYTtRQUMvQixpQ0FBQyxJQUFJO1lBR0gsaUNBQUMscUJBQVUsSUFDVCxTQUFTLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFDekIsT0FBTyxFQUFFLE9BQU8sRUFDaEIsYUFBYSxFQUFFLElBQUksRUFDbkIsSUFBSSxFQUFDLE9BQU87Z0JBQ1osaUNBQUMsMEJBQVMsSUFBQyxRQUFRLEVBQUMsU0FBUyxHQUFHLENBQ3JCLENBQ1IsQ0FDRixDQUNSLENBQUM7QUFDSixDQUFDLENBQUE7QUFwQlksUUFBQSxXQUFXLGVBb0J2QiJ9