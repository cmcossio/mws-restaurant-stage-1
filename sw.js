const cacheName = "restaurant-review-site";

/*cache static elements*/
self.addEventListener("install", function(event) {
    event.waitUntil (
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                "/",
                "/index.html",
                "/restaurant.html",
                "/css/styles.css",
                "/data/restaurants.json",
                "/js/",
                "/js/dbhelper.js",
                "/js/main.js",
                "/js/restaurant_info.js",
                "/img/na.png",
                "/js/register.js"
            ])
            .catch(function(error) {
                console.log("Caches open failed: " + error);
            });
        })
    );
});

/*improve offline experience*/
self.addEventListener("fetch", function(event) {
    let urlObject = new URL(event.request.url);
    
    if (urlObject.origin === location.origin) {

        if (urlObject.pathname.startsWith("/restaurant.html")) {
            event.respondWith(caches.match("/restaurant.html"));
            return;
        }
    }   
    
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return (response || fetch(event.request).then(function(networkResponse) {
                    return caches.open(cacheName).then(function(cache) {
                        cache.put(event.request.networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(function(error) {
                    if (event.request.url.indexOf(".jpg") >-1) {
                        return caches.match("/img/na.png");
                    }
                    return new Response("No internet connection", {
                        status: 404,
                        statusText: "No internet connection"
                    })
                })
            )
        })
    )
})