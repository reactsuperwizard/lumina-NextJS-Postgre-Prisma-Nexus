on run argv
	tell application "/Applications/Adobe After Effects 2020/Adobe After Effects 2020.app/Contents/MacOS/After Effects"
		DoScriptFile item 1 of argv
	end tell
end run