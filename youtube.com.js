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
        player.innerHTML = `
<div id="player-container-outer" class="style-scope ytd-watch-flexy">
  <div id="player-container-inner" class="style-scope ytd-watch-flexy">
    <div id="player-container" role="complementary" class="style-scope ytd-watch-flexy" style="touch-action: auto;">
    <iframe 
        style="width: 100%; height: 100%"
        id="blockblock-player"
        src="${url}"
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
    </iframe>
    </div>
  </div>
</div>
        `;
    }
});

observer.observe(document.body, {
    childList: true,
});
