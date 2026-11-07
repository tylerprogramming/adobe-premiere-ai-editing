# PremiereOnScript - Panel Template

### This template provides basic setup for a simple CEP panel. 

# Get Started

1. `CSXS/manifest.xml` - the bundle id is `com.tyler.base`; change the name and menu entry to your own
2. `client/index.html` - the panel UI Premiere loads (`MainPath` in the manifest). Add your JS here and make ExtendScript calls with `cs.evalScript()`
3. `host/index.jsx` - the ExtendScript that runs inside Premiere (`ScriptPath` in the manifest). It holds the clip helpers (`getSelectedClipPath`, `getTimelineClipNames`, `splitSelectedClipAtTimes`)
4. `.debug` - set the extension id to `com.tyler.base` (it ships as `EXTENSION_ID_GOES_HERE`) for Chrome debugging on port 7777

`client/index.html` loads `../assets/js/CSInterface.js` and `../assets/js/index.js`. Neither file is in this repo: create `assets/js/` at the repo root, copy `CEP_10.x/CSInterface.js` from Adobe's [CEP-Resources](https://github.com/Adobe-CEP/CEP-Resources) into it (the manifest requires CSXS 10.0), and add your own `index.js` there.

The root `index.html` and `css/style.css` are left over from the original template; the manifest does not load them.

## Create a symlink into your `Adobe/CEP/Extensions` folder

### Congrats, your ready to roll.  

#test

