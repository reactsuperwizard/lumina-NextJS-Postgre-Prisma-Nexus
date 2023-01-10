## About

This app is designed to provide a publicly sharable url and landing page for each video published via the Web app.

The video is accessed via a hash of it's ID.  If an invalid hash is passed, the app displays a default Vercel 404 page.

There are two versions that are shown depending on the value of `Video.embedJobPage`.
- If `true`: The requested video is displayed in a collapsible top section, with the rest of the page being used to display the job posting in an iframe. If an invalid url is stored in the video's jobUrl field, the page is currently set up to simply display the video's name.
- If `false` (default): The requested video is displayed over a wallpaper background.  If the provided `Video.jobUrl` is a valid URL, it also displays an `APPLY NOW` button that opens that link in a new tab.
