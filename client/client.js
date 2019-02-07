const publicVapidKey = 'BL9VMWM64kvKX_VH3RJHKQ9MHpevF_w0ZDX4mQOt2n6wfJnVJahy5W6vdlFOWcdI3M6_yikn-Lh_p0sTShq4s6I';

// Check for service workers
if ('serviceWorker' in navigator) {
    send().catch(err => console.log(err));
}

// Register the Service Worker, Register Push, Send Push
async function send() {
    console.log('Registering Service Worker...');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('Service Worker Registered...');
    // Register Push
    console.log('Registering Push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUnit8Array(publicVapidKey)
    });
    console.log("Push Registered");

    // Send Push Notification
    console.log('Sending Push...');
    await fetch('/subscribe', {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log("Push Sent...");
}

function urlBase64ToUnit8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }