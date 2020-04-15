# Big Blue Button Playback-Speed - Chrome-Extension

Lecture recordings at University of Applied Science Munich get uploaded to a Big Blue Button (BBB) server.
* The BBB integrated video player does not offer playback speed adjustments
* Although HTML5 video capabilities are used, there is some sort of overlay, which gives existing HTML5-video Chrome-Extensions a hard time
* *(maybe all the previous points are totally made up and I needed of a excuse to build a chrome extension 🤔)*
  
⚠❌ **this chrome extension only works for pages served by bbb.cs.hm.edu** ⚠❌
  
## Solution

BBB uses Mozilla's [popcorn.js](https://github.com/mozilla/popcorn-js/). Popcorn provides a API to adjust the playbackRate easily,
hence the functionality was already there, but there was no ability to adjust it through the UI.  

In summary this adds a simple button in the video player control bar, right next to the fullscreen-button.

## Install

* Download the latest release from the [releases tab](https://github.com/haerrel/bbb-playbackspeed-chrome-extension/releases/latest)
* Unzip the file
* Load the folder as extension in Google Chrome ([see description here](https://developer.chrome.com/extensions/getstarted#manifest))

## Dependencies

The bundled version of this solution contains [popcorn.js](https://github.com/mozilla/popcorn-js/) and [jQuery](https://github.com/jquery/jquery).
I am not the author of any of these projects. Full credit belongs to them :-)

## Development

Clone the repository and download required dependencies
```
npm install
grunt init
```

Build the project: this creates a bundle.zip
```
grunt build
```
