const observer = new MutationObserver(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    if (!urlParams.has('v')) {
        return;
    }

    const player = document.getElementById('player');
    const videoId = urlParams.get('v');

    if (player) {
        if (player.children.length === 1 && player.children.item(0).id === 'blockblock-player') {
            return;
        }
        player.innerHTML = `
<iframe 
    style="width: 100%; height: 35vh"
    id="blockblock-player"
    src="https://www.youtube.com/embed/${videoId}"
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
</iframe>
        `;
    }
});

observer.observe(document.body, {
    childList: true,
});
