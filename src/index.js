const observer = new MutationObserver(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    if (!urlParams.has('v')) {
        return;
    }

    const player = document.getElementById('player');
    const videoId = urlParams.get('v');

    if (player) {
        if (player.children.length === 1 && player.children.item(0).id === 'player-container-outer') {
            return;
        }
        let url = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        // TODO: Found a way to clean up params before applying it to the iframe
        // if (urlParams.has('t')) {
        //     url += `&start=${urlParams.get('t')}`;
        // }
        const playerContainerOuter = document.createElement('div');
        const playerContainerInner = document.createElement('div');
        const playerContainer = document.createElement('div');
        const blockBlockPlayer = document.createElement('iframe');

        playerContainerOuter.className = "style-scope ytd-watch-flexy";
        playerContainerOuter.id = "player-container-outer";

        playerContainerInner.className = "style-scope ytd-watch-flexy"
        playerContainerInner.id = "player-container-inner";

        playerContainer.className = "style-scope ytd-watch-flexy";
        playerContainer.id = "player-container";
        playerContainer.role = "complementary";
        playerContainer.style.touchAction = "auto";

        blockBlockPlayer.id = "blockblock-player";
        blockBlockPlayer.style.width = '100%';
        blockBlockPlayer.style.height = '100%';
        blockBlockPlayer.style.borderRadius = '8px';
        blockBlockPlayer.src = url;
        blockBlockPlayer.title = "YouTube video player"
        blockBlockPlayer.frameborder = 0;
        blockBlockPlayer.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        blockBlockPlayer.allowFullscreen = true;

        playerContainer.appendChild(blockBlockPlayer);
        playerContainerInner.appendChild(playerContainer);
        playerContainerOuter.appendChild(playerContainerInner);

        player.replaceChildren(playerContainerOuter);
    }
});

observer.observe(document.body, {
    childList: true,
});
