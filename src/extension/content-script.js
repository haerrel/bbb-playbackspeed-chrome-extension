function inject () {
    console.log("Start injecting speedup button into DOM")
    const popcorn = Popcorn("#video")
    
    const speedUpButton = '<button id="speedup-button" class="acorn-fullscreen-button" title="change playback speed" aria-controls="video" tabindex="3">Playback speed</button>'
    $(".acorn-fullscreen-button").before(speedUpButton)
    
    function setButtonText(playbackRate) {
        const major = Math.floor(playbackRate)
        const minor = playbackRate*10 - major*10
        const iconPath = chrome.runtime.getURL("icon.svg")
        $.get(iconPath, function(svg) {
            svg = svg.replace("MAJOR-TOKEN", major).replace("MINOR-TOKEN", minor)
            const svg64 = window.btoa(svg);
            document.getElementById('speedup-button').style.backgroundImage = "url(data:image/svg+xml;base64," + svg64 + ")";
        },'html');
    }
    const speedLevels = [1, 1.2, 1.4, 1.6, 1.8, 2]
    let playbackRate = speedLevels[0]
    setButtonText(playbackRate)

    function nextSpeed() {
        currentIdx = speedLevels.indexOf(playbackRate)
        nextIdx = (currentIdx + 1) % speedLevels.length
        playbackRate = speedLevels[nextIdx]
    }
    
    $("#speedup-button").click(function () {
        nextSpeed()
        popcorn.playbackRate(playbackRate)
        setButtonText(playbackRate)
        console.log("Playbackspeed: " + playbackRate)
    })

    console.log("DONE: speedup button injected into DOM")
}    

function gatherPopcorn() {
    console.log("▶ Start gathering popcorn-content")
    return new Promise((res, rej) => {
        const maxRetries = 10
        const pollInterval = 1000
        let retry = 1
        const id = setInterval(() => {
            if (retry > maxRetries) {
                console.log("❌ Stop gathering popcorn-content")
                clearInterval(id)
                rej()
            } else {
                console.log("\t⏱ retry " + retry + "/" + maxRetries)
                try {
                    const isAvailable = Popcorn && Popcorn("#video")
                    if (isAvailable) {
                        console.log("✅ found popcorn-content")
                        clearInterval(id)
                        res()
                    }
                } catch (e) {
                    // console.log("unsucessful")
                }
            }
            retry++
        }, pollInterval)
    })

}

gatherPopcorn()
    .then(inject)
    .catch(() => console.log("INFO: looks like this is not a valid page.. cant find any popcorn-content"))


