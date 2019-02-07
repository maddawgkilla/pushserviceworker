console.log("Service Worker Loaded");

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log("Push Received...");
    self.registration.showNotification(data.title, {
        body: 'Notified by Sami Tariq',
        icon: 'http://image.ibb.co/frYOFd/tmlogo.png'
    });
});