"use strict";
exports.__esModule = true;
exports.slugify = void 0;
var slugify = function (dumbString) {
    var specialChar = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;&-';
    var slugChar = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz        ';
    var specialCharIndex = new RegExp(specialChar.split('').join('|'), 'g');
    return ('@' +
        dumbString
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '') // Replace spaces with -
            .replace(specialCharIndex, function (c) { return slugChar.charAt(specialChar.indexOf(c)); }) // Replace special characters
            .replace(/[^\w\-]+/g, '') // Remove all non-word characters
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '') // Trim - from end of text
    );
};
exports.slugify = slugify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2x1Z2lmeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9zbHVnaWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFPLElBQU0sT0FBTyxHQUFHLFVBQUMsVUFBa0I7SUFDeEMsSUFBTSxXQUFXLEdBQ2YsbUZBQW1GLENBQUE7SUFDckYsSUFBTSxRQUFRLEdBQ1osbUZBQW1GLENBQUE7SUFDckYsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUV6RSxPQUFPLENBQ0wsR0FBRztRQUNILFVBQVU7YUFDUCxRQUFRLEVBQUU7YUFDVixXQUFXLEVBQUU7YUFDYixPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLHdCQUF3QjthQUM1QyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBdkMsQ0FBdUMsQ0FBQyxDQUFDLDZCQUE2QjthQUNyRyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGlDQUFpQzthQUMxRCxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLDRCQUE0QjthQUMvQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLDBCQUEwQjtLQUNqRCxDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBbEJZLFFBQUEsT0FBTyxXQWtCbkIifQ==