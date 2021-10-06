//  #####
//  #
//  #      # ##    ###   ## #    ###
//  ####   ##  #      #  # # #  #   #
//  #      #       ####  # # #  #####
//  #      #      #   #  # # #  #
//  #      #       ####  #   #   ###
/**
 * A class that provides functions for the frame scene.
 */
class Frame {
    //         #                 #
    //         #                 #
    //  ###   ###    ###  ###   ###
    // ##      #    #  #  #  #   #
    //   ##    #    # ##  #      #
    // ###      ##   # #  #       ##
    /**
     * Starts the frame scene.
     * @returns {void}
     */
    static start() {
        window.handleMessage = async (ev) => {
            switch (ev.type) {
                case "updateSpotify":
                    if (document.getElementById("spotify")) {
                        const lastTrack = ev.track ? JSON.stringify({
                            artist: ev.track.artist,
                            title: ev.track.title,
                            imageUrl: ev.track.imageUrl
                        }) : void 0;

                        if (lastTrack !== Frame.lastTrack) {
                            document.getElementById("spotify").innerHTML = window.SpotifyView.get(ev.track);
                        }

                        Frame.lastTrack = lastTrack;
                    }
                    break;
                case "phase":
                    switch (ev.phase) {
                        case "trailer":
                            {
                                /** @type {HTMLVideoElement} */
                                const video = document.getElementById("video-trailer");
                                video.play();
                            }
                            window.Home.stopSpotify();
                            break;
                        case "trailer-done":
                            {
                                /** @type {HTMLVideoElement} */
                                const video = document.getElementById("video-trailer");
                                video.classList.add("hidden");
                                document.getElementById("content").animate({opacity: [0, 1, 1], transform: ["scale(0.6)", "scale(0.68)", "scale(1)"], offset: [0, 0.2, 1]}, {duration: 5000, easing: "ease-in-out"});
                            }
                            window.Home.stopSpotify();
                            break;
                        case "webcam":
                            window.Home.stopSpotify();
                            break;
                        case "brb":
                            await Frame.startBRB();
                            window.Home.startSpotify();
                            break;
                        case "ending":
                            await Frame.startEnding(ev.version);
                            window.Home.stopSpotify();
                            break;
                        case "intro":
                            await Frame.startIntro();
                            window.Home.stopSpotify();
                            break;
                    }
                    break;
            }
        };
    }

    //         #                 #    ###   ###   ###
    //         #                 #    #  #  #  #  #  #
    //  ###   ###    ###  ###   ###   ###   #  #  ###
    // ##      #    #  #  #  #   #    #  #  ###   #  #
    //   ##    #    # ##  #      #    #  #  # #   #  #
    // ###      ##   # #  #       ##  ###   #  #  ###
    /**
     * Starts the BRB frame.
     * @returns {Promise} A promise that resolves when the BRB frame is shown.
     */
    static async startBRB() {
        await window.Common.loadTemplate("/js/?files=/views/home/frame/brb.js", "FrameBRBView");

        await window.Common.loadDataIntoTemplate(void 0, "#content", window.FrameBRBView.get);
    }

    //         #                 #    ####           #   #
    //         #                 #    #              #
    //  ###   ###    ###  ###   ###   ###   ###    ###  ##    ###    ###
    // ##      #    #  #  #  #   #    #     #  #  #  #   #    #  #  #  #
    //   ##    #    # ##  #      #    #     #  #  #  #   #    #  #   ##
    // ###      ##   # #  #       ##  ####  #  #   ###  ###   #  #  #
    //                                                               ###
    /**
     * Starts the ending frame.
     * @param {string} version The version.
     * @returns {Promise} A promise that resolves when the ending frame is shown.
     */
    static async startEnding(version) {
        await window.Common.loadTemplate("/js/?files=/views/home/frame/ending.js", "FrameEndingView");

        document.getElementById("content").innerHTML = window.FrameEndingView.get(version);

        const height = Math.floor(document.getElementById("crawler").getBoundingClientRect().height);

        setTimeout(() => {
            document.getElementById("crawler").animate({
                top: ["486px", `${486 - height}px`],
                offset: [0, 1]
            }, {
                duration: Math.min(40000, 10000 * height / 972),
                fill: "forwards"
            });
        }, 5000);
    }

    //         #                 #    ###          #
    //         #                 #     #           #
    //  ###   ###    ###  ###   ###    #    ###   ###   ###    ##
    // ##      #    #  #  #  #   #     #    #  #   #    #  #  #  #
    //   ##    #    # ##  #      #     #    #  #   #    #     #  #
    // ###      ##   # #  #       ##  ###   #  #    ##  #      ##
    /**
     * Starts the intro frame.
     * @returns {Promise} A promise that resolves when the intro frame is shown.
     */
    static async startIntro() {
        await window.Common.loadTemplate("/js/?files=/views/home/frame/trailer.js", "FrameTrailerView");

        await window.Common.loadDataIntoTemplate(void 0, "#content", window.FrameTrailerView.get);
    }
}

Frame.lastTrack = "";

window.Frame = Frame;
