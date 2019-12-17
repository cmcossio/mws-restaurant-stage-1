if (navigator.serviceWorker) {
    navigator.serviceWorker.register("/sw.js")
        .then(function(reg) {
            console.log("Service worker registration successful");
        })
        .catch(function(error) {
            console.log("Service worker registration unsuccessful: " + error);
        });
};