"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.PoweredBy = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var PREFIX = 'PoweredBy';
var classes = {
    phoneWrap: "".concat(PREFIX, "-phoneWrap"),
    mainWrap: "".concat(PREFIX, "-mainWrap"),
    logoImage: "".concat(PREFIX, "-logoImage"),
    mobileLogoImage: "".concat(PREFIX, "-mobileLogoImage")
};
var Root = (0, material_1.styled)('div')(function (_a) {
    var _b;
    var theme = _a.theme;
    return (_b = {},
        _b["& .".concat(classes.phoneWrap)] = {
            position: 'relative',
            height: '100%',
            width: '30px',
            margin: '0 7px',
            padding: '5px 0',
            transition: 'margin 0.2s, width 0.2s',
            '&:hover': {
                margin: '-2px 5px',
                width: '26px'
            }
        },
        _b["& .".concat(classes.mainWrap)] = {
            position: 'relative',
            height: '28px',
            width: '88px',
            padding: '5px 6px',
            transition: 'height 0.2s, width 0.2s, margin 0.2s',
            '&:hover': {
                padding: '5px 5px',
                margin: '-2px',
                height: '32px',
                width: '92px'
            }
        },
        _b["& .".concat(classes.logoImage)] = {
            position: 'relative',
            padding: '0px',
            display: 'block',
            width: '100%',
            height: '100%',
            minWidth: '100%',
            maxWidth: '100%',
            minHeight: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
        },
        _b["& .".concat(classes.mobileLogoImage)] = {
            position: 'relative',
            padding: '0px',
            display: 'block',
            width: '80%'
        },
        _b);
});
var PoweredBy = function (_a) {
    var logoSrc = _a.logoSrc, iconSrc = _a.iconSrc, href = _a.href;
    var theme = (0, styles_1.useTheme)();
    var isPhone = (0, material_1.useMediaQuery)(theme.breakpoints.down('md'));
    // make sure that video doesn't start playing after someone clicks powered by logo
    var cancelEvents = function (event) {
        event.stopPropagation();
    };
    return (react_1["default"].createElement(Root, null, isPhone ? (react_1["default"].createElement("div", { onClick: cancelEvents, className: classes.phoneWrap },
        react_1["default"].createElement("a", { href: href, 
            // eslint-disable-next-line react/jsx-no-target-blank
            target: "_blank" },
            react_1["default"].createElement("img", { 
                // objectFit="contain"
                src: iconSrc, 
                // layout="fill"
                alt: "Powered By Lumina", className: classes.mobileLogoImage })))) : (react_1["default"].createElement("div", { onClick: cancelEvents, className: classes.mainWrap },
        react_1["default"].createElement("a", { href: href, 
            // eslint-disable-next-line react/jsx-no-target-blank
            target: "_blank" },
            react_1["default"].createElement("img", { src: logoSrc, alt: "Powered By Lumina", className: classes.logoImage }))))));
};
exports.PoweredBy = PoweredBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG93ZXJlZEJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbW9kdWxlcy9QbGF5ZXIvdG9vbGJhci9Qb3dlcmVkQnkudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdEQUF5QjtBQUV6QiwwQ0FBcUQ7QUFDckQsK0NBQStDO0FBRS9DLElBQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQTtBQUUxQixJQUFNLE9BQU8sR0FBRztJQUNkLFNBQVMsRUFBRSxVQUFHLE1BQU0sZUFBWTtJQUNoQyxRQUFRLEVBQUUsVUFBRyxNQUFNLGNBQVc7SUFDOUIsU0FBUyxFQUFFLFVBQUcsTUFBTSxlQUFZO0lBQ2hDLGVBQWUsRUFBRSxVQUFHLE1BQU0scUJBQWtCO0NBQzdDLENBQUE7QUFFRCxJQUFNLElBQUksR0FBRyxJQUFBLGlCQUFNLEVBQUMsS0FBSyxDQUFDLENBQUMsVUFBQyxFQUFTOztRQUFQLEtBQUssV0FBQTtJQUFPLE9BQUE7UUFDeEMsR0FBQyxhQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUUsSUFBRztZQUMzQixRQUFRLEVBQUUsVUFBVTtZQUNwQixNQUFNLEVBQUUsTUFBTTtZQUNkLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLE9BQU87WUFDZixPQUFPLEVBQUUsT0FBTztZQUNoQixVQUFVLEVBQUUseUJBQXlCO1lBQ3JDLFNBQVMsRUFBRTtnQkFDVCxNQUFNLEVBQUUsVUFBVTtnQkFDbEIsS0FBSyxFQUFFLE1BQU07YUFDZDtTQUNGO1FBQ0QsR0FBQyxhQUFNLE9BQU8sQ0FBQyxRQUFRLENBQUUsSUFBRztZQUMxQixRQUFRLEVBQUUsVUFBVTtZQUNwQixNQUFNLEVBQUUsTUFBTTtZQUNkLEtBQUssRUFBRSxNQUFNO1lBQ2IsT0FBTyxFQUFFLFNBQVM7WUFDbEIsVUFBVSxFQUFFLHNDQUFzQztZQUNsRCxTQUFTLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEtBQUssRUFBRSxNQUFNO2FBQ2Q7U0FDRjtRQUNELEdBQUMsYUFBTSxPQUFPLENBQUMsU0FBUyxDQUFFLElBQUc7WUFDM0IsUUFBUSxFQUFFLFVBQVU7WUFDcEIsT0FBTyxFQUFFLEtBQUs7WUFDZCxPQUFPLEVBQUUsT0FBTztZQUNoQixLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU07WUFDaEIsU0FBUyxFQUFFLE1BQU07WUFDakIsU0FBUyxFQUFFLE1BQU07WUFDakIsU0FBUyxFQUFFLFNBQVM7U0FDckI7UUFDRCxHQUFDLGFBQU0sT0FBTyxDQUFDLGVBQWUsQ0FBRSxJQUFHO1lBQ2pDLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsT0FBTyxFQUFFLE9BQU87WUFDaEIsS0FBSyxFQUFFLEtBQUs7U0FDYjtXQUNEO0FBNUN3QyxDQTRDeEMsQ0FBQyxDQUFBO0FBRUksSUFBTSxTQUFTLEdBQUcsVUFBQyxFQVF6QjtRQVBDLE9BQU8sYUFBQSxFQUNQLE9BQU8sYUFBQSxFQUNQLElBQUksVUFBQTtJQU1KLElBQU0sS0FBSyxHQUFHLElBQUEsaUJBQVEsR0FBRSxDQUFBO0lBQ3hCLElBQU0sT0FBTyxHQUFHLElBQUEsd0JBQWEsRUFBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQzNELGtGQUFrRjtJQUNsRixJQUFNLFlBQVksR0FBRyxVQUNuQixLQUFtRDtRQUVuRCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUE7SUFDekIsQ0FBQyxDQUFBO0lBRUQsT0FBTyxDQUNMLGlDQUFDLElBQUksUUFDRixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQ1QsMENBQUssT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7UUFDdEQsd0NBQ0UsSUFBSSxFQUFFLElBQUk7WUFDVixxREFBcUQ7WUFDckQsTUFBTSxFQUFDLFFBQVE7WUFFZjtnQkFDRSxzQkFBc0I7Z0JBQ3RCLEdBQUcsRUFBRSxPQUFPO2dCQUNaLGdCQUFnQjtnQkFDaEIsR0FBRyxFQUFDLG1CQUFtQixFQUN2QixTQUFTLEVBQUUsT0FBTyxDQUFDLGVBQWUsR0FDbEMsQ0FDQSxDQUNBLENBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FDRiwwQ0FBSyxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsUUFBUTtRQUNyRCx3Q0FDRSxJQUFJLEVBQUUsSUFBSTtZQUNWLHFEQUFxRDtZQUNyRCxNQUFNLEVBQUMsUUFBUTtZQUVmLDBDQUNFLEdBQUcsRUFBRSxPQUFPLEVBQ1osR0FBRyxFQUFDLG1CQUFtQixFQUN2QixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVMsR0FDNUIsQ0FDQSxDQUNBLENBQ1AsQ0FDSSxDQUNSLENBQUE7QUFDSCxDQUFDLENBQUE7QUFyRFksUUFBQSxTQUFTLGFBcURyQiJ9