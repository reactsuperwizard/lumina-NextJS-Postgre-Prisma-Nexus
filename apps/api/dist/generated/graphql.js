"use strict";
exports.__esModule = true;
exports.VideoStatus = exports.TemplateFlavor = exports.SortOrder = exports.RequestStatus = exports.RequestLogsEvent = exports.RenderStatus = exports.QueryMode = exports.PermissionsRole = exports.OrderStatus = exports.InviteEmailType = exports.CloudinarySortType = exports.CloudinaryResourceType = exports.AssetType = void 0;
var AssetType;
(function (AssetType) {
    AssetType["Audio"] = "audio";
    AssetType["Image"] = "image";
    AssetType["Raw"] = "raw";
    AssetType["Video"] = "video";
})(AssetType = exports.AssetType || (exports.AssetType = {}));
/** Resource types for assets stored in Cloudinary.  Note: use 'video' for all audio assets, e.g. .mp3 */
var CloudinaryResourceType;
(function (CloudinaryResourceType) {
    CloudinaryResourceType["Image"] = "image";
    CloudinaryResourceType["Raw"] = "raw";
    CloudinaryResourceType["Video"] = "video";
})(CloudinaryResourceType = exports.CloudinaryResourceType || (exports.CloudinaryResourceType = {}));
/** Direction to sort results. */
var CloudinarySortType;
(function (CloudinarySortType) {
    CloudinarySortType["Asc"] = "asc";
    CloudinarySortType["Desc"] = "desc";
})(CloudinarySortType = exports.CloudinarySortType || (exports.CloudinarySortType = {}));
/** Invite type */
var InviteEmailType;
(function (InviteEmailType) {
    InviteEmailType["HomePage"] = "HOME_PAGE";
    InviteEmailType["Video"] = "VIDEO";
})(InviteEmailType = exports.InviteEmailType || (exports.InviteEmailType = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Completed"] = "completed";
    OrderStatus["InProgress"] = "inProgress";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
/** Admins have read and write access for everything.  User's can read everything for a given customer. Scripters are allowed only for scripting */
var PermissionsRole;
(function (PermissionsRole) {
    PermissionsRole["Admin"] = "admin";
    PermissionsRole["Manager"] = "manager";
    PermissionsRole["Scripter"] = "scripter";
    PermissionsRole["User"] = "user";
})(PermissionsRole = exports.PermissionsRole || (exports.PermissionsRole = {}));
var QueryMode;
(function (QueryMode) {
    QueryMode["Default"] = "default";
    QueryMode["Insensitive"] = "insensitive";
})(QueryMode = exports.QueryMode || (exports.QueryMode = {}));
var RenderStatus;
(function (RenderStatus) {
    RenderStatus["Completed"] = "completed";
    RenderStatus["Errored"] = "errored";
    RenderStatus["Queued"] = "queued";
    RenderStatus["Rendering"] = "rendering";
})(RenderStatus = exports.RenderStatus || (exports.RenderStatus = {}));
var RequestLogsEvent;
(function (RequestLogsEvent) {
    RequestLogsEvent["AllEditsDeleted"] = "AllEditsDeleted";
    RequestLogsEvent["CustomerRequestEdits"] = "CustomerRequestEdits";
    RequestLogsEvent["RenderCompleted"] = "RenderCompleted";
    RequestLogsEvent["RenderFailed"] = "RenderFailed";
    RequestLogsEvent["RequestAccepted"] = "RequestAccepted";
    RequestLogsEvent["RequestReturnedToQueue"] = "RequestReturnedToQueue";
    RequestLogsEvent["RequestSubmitted"] = "RequestSubmitted";
    RequestLogsEvent["ScriptAddedToRenderQueue"] = "ScriptAddedToRenderQueue";
    RequestLogsEvent["VideoPublished"] = "VideoPublished";
})(RequestLogsEvent = exports.RequestLogsEvent || (exports.RequestLogsEvent = {}));
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["Cancelled"] = "cancelled";
    RequestStatus["Completed"] = "completed";
    RequestStatus["Draft"] = "draft";
    RequestStatus["Final"] = "final";
    RequestStatus["Qa"] = "qa";
    RequestStatus["Queued"] = "queued";
    RequestStatus["Rendering"] = "rendering";
    RequestStatus["Scripting"] = "scripting";
    RequestStatus["Submitted"] = "submitted";
})(RequestStatus = exports.RequestStatus || (exports.RequestStatus = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["Asc"] = "asc";
    SortOrder["Desc"] = "desc";
})(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
var TemplateFlavor;
(function (TemplateFlavor) {
    TemplateFlavor["E1"] = "E1";
    TemplateFlavor["T1"] = "T1";
    TemplateFlavor["T10"] = "T10";
    TemplateFlavor["T11"] = "T11";
    TemplateFlavor["T12"] = "T12";
    TemplateFlavor["T13"] = "T13";
    TemplateFlavor["T14"] = "T14";
    TemplateFlavor["T15"] = "T15";
    TemplateFlavor["T16"] = "T16";
    TemplateFlavor["T2"] = "T2";
    TemplateFlavor["T4"] = "T4";
    TemplateFlavor["T6"] = "T6";
    TemplateFlavor["T7"] = "T7";
    TemplateFlavor["T8"] = "T8";
})(TemplateFlavor = exports.TemplateFlavor || (exports.TemplateFlavor = {}));
var VideoStatus;
(function (VideoStatus) {
    VideoStatus["Live"] = "live";
    VideoStatus["Pending"] = "pending";
})(VideoStatus = exports.VideoStatus || (exports.VideoStatus = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2dlbmVyYXRlZC9ncmFwaHFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQXFHQSxJQUFZLFNBS1g7QUFMRCxXQUFZLFNBQVM7SUFDbkIsNEJBQWUsQ0FBQTtJQUNmLDRCQUFlLENBQUE7SUFDZix3QkFBVyxDQUFBO0lBQ1gsNEJBQWUsQ0FBQTtBQUNqQixDQUFDLEVBTFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFLcEI7QUErT0QseUdBQXlHO0FBQ3pHLElBQVksc0JBSVg7QUFKRCxXQUFZLHNCQUFzQjtJQUNoQyx5Q0FBZSxDQUFBO0lBQ2YscUNBQVcsQ0FBQTtJQUNYLHlDQUFlLENBQUE7QUFDakIsQ0FBQyxFQUpXLHNCQUFzQixHQUF0Qiw4QkFBc0IsS0FBdEIsOEJBQXNCLFFBSWpDO0FBRUQsaUNBQWlDO0FBQ2pDLElBQVksa0JBR1g7QUFIRCxXQUFZLGtCQUFrQjtJQUM1QixpQ0FBVyxDQUFBO0lBQ1gsbUNBQWEsQ0FBQTtBQUNmLENBQUMsRUFIVyxrQkFBa0IsR0FBbEIsMEJBQWtCLEtBQWxCLDBCQUFrQixRQUc3QjtBQTZyREQsa0JBQWtCO0FBQ2xCLElBQVksZUFHWDtBQUhELFdBQVksZUFBZTtJQUN6Qix5Q0FBc0IsQ0FBQTtJQUN0QixrQ0FBZSxDQUFBO0FBQ2pCLENBQUMsRUFIVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQUcxQjtBQTZyQ0QsSUFBWSxXQUdYO0FBSEQsV0FBWSxXQUFXO0lBQ3JCLHNDQUF1QixDQUFBO0lBQ3ZCLHdDQUF5QixDQUFBO0FBQzNCLENBQUMsRUFIVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUd0QjtBQTBKRCxtSkFBbUo7QUFDbkosSUFBWSxlQUtYO0FBTEQsV0FBWSxlQUFlO0lBQ3pCLGtDQUFlLENBQUE7SUFDZixzQ0FBbUIsQ0FBQTtJQUNuQix3Q0FBcUIsQ0FBQTtJQUNyQixnQ0FBYSxDQUFBO0FBQ2YsQ0FBQyxFQUxXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBSzFCO0FBMmhCRCxJQUFZLFNBR1g7QUFIRCxXQUFZLFNBQVM7SUFDbkIsZ0NBQW1CLENBQUE7SUFDbkIsd0NBQTJCLENBQUE7QUFDN0IsQ0FBQyxFQUhXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBR3BCO0FBK0ZELElBQVksWUFLWDtBQUxELFdBQVksWUFBWTtJQUN0Qix1Q0FBdUIsQ0FBQTtJQUN2QixtQ0FBbUIsQ0FBQTtJQUNuQixpQ0FBaUIsQ0FBQTtJQUNqQix1Q0FBdUIsQ0FBQTtBQUN6QixDQUFDLEVBTFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFLdkI7QUEwcEJELElBQVksZ0JBVVg7QUFWRCxXQUFZLGdCQUFnQjtJQUMxQix1REFBbUMsQ0FBQTtJQUNuQyxpRUFBNkMsQ0FBQTtJQUM3Qyx1REFBbUMsQ0FBQTtJQUNuQyxpREFBNkIsQ0FBQTtJQUM3Qix1REFBbUMsQ0FBQTtJQUNuQyxxRUFBaUQsQ0FBQTtJQUNqRCx5REFBcUMsQ0FBQTtJQUNyQyx5RUFBcUQsQ0FBQTtJQUNyRCxxREFBaUMsQ0FBQTtBQUNuQyxDQUFDLEVBVlcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFVM0I7QUE0REQsSUFBWSxhQVVYO0FBVkQsV0FBWSxhQUFhO0lBQ3ZCLHdDQUF1QixDQUFBO0lBQ3ZCLHdDQUF1QixDQUFBO0lBQ3ZCLGdDQUFlLENBQUE7SUFDZixnQ0FBZSxDQUFBO0lBQ2YsMEJBQVMsQ0FBQTtJQUNULGtDQUFpQixDQUFBO0lBQ2pCLHdDQUF1QixDQUFBO0lBQ3ZCLHdDQUF1QixDQUFBO0lBQ3ZCLHdDQUF1QixDQUFBO0FBQ3pCLENBQUMsRUFWVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQVV4QjtBQW9tQ0QsSUFBWSxTQUdYO0FBSEQsV0FBWSxTQUFTO0lBQ25CLHdCQUFXLENBQUE7SUFDWCwwQkFBYSxDQUFBO0FBQ2YsQ0FBQyxFQUhXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBR3BCO0FBb01ELElBQVksY0FlWDtBQWZELFdBQVksY0FBYztJQUN4QiwyQkFBUyxDQUFBO0lBQ1QsMkJBQVMsQ0FBQTtJQUNULDZCQUFXLENBQUE7SUFDWCw2QkFBVyxDQUFBO0lBQ1gsNkJBQVcsQ0FBQTtJQUNYLDZCQUFXLENBQUE7SUFDWCw2QkFBVyxDQUFBO0lBQ1gsNkJBQVcsQ0FBQTtJQUNYLDZCQUFXLENBQUE7SUFDWCwyQkFBUyxDQUFBO0lBQ1QsMkJBQVMsQ0FBQTtJQUNULDJCQUFTLENBQUE7SUFDVCwyQkFBUyxDQUFBO0lBQ1QsMkJBQVMsQ0FBQTtBQUNYLENBQUMsRUFmVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQWV6QjtBQXNwQ0QsSUFBWSxXQUdYO0FBSEQsV0FBWSxXQUFXO0lBQ3JCLDRCQUFhLENBQUE7SUFDYixrQ0FBbUIsQ0FBQTtBQUNyQixDQUFDLEVBSFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFHdEIifQ==