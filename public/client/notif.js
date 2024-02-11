let currentSubscription = null;

// Memeriksa apakah service worker dan push messaging didukung
if ("serviceWorker" in navigator && "PushManager" in window) {
  console.log("Service Worker dan Push Messaging didukung");

  // Mendaftarkan service worker
  navigator.serviceWorker
    .register("service-worker.js")
    .then(function (swReg) {
      console.log("Service Worker terdaftar", swReg);

      // Meminta izin untuk notifikasi
      Notification.requestPermission().then(function (status) {
        if (status === "granted") {
          console.log("Izin notifikasi diterima");

          // Mendapatkan subscription
          swReg.pushManager.getSubscription().then(function (subscription) {
            if (!subscription) {
              // Subscribe user (Isi Dengan Public Key Anda)
              const applicationServerKey = urlBase64ToUint8Array(
                "BJZ5NFQDxJ9AB4kGx7qZd2eNwTTpCJovGk0xmdWcrXehe3dpypN4gaIAoao_UJ8mbGT9OnnkhprhR-MBX-4rk7c"
              );
              swReg.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: applicationServerKey,
                })
                .then(function (subscription) {
                  console.log("Berhasil melakukan subscribe.");
                  currentSubscription = subscription;

                  // Kirim subscription ke server
                  fetch("/subscribe", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(subscription),
                  });
                })
                .catch(function (err) {
                  console.warn("Gagal melakukan subscribe:", err);
                });
            } else {
              // Jika sudah ter-subscribe, simpan subscription
              currentSubscription = subscription;
            }
          });
        }
      });
    })
    .catch(function (error) {
      console.error("Gagal mendaftarkan service worker:", error);
    });
}

// Fungsi untuk mengubah VAPID key dari URL-safe base64 string menjadi Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Fungsi untuk mengupdate username
function update_username() {
  const username = document.getElementById("username").value;
  if (currentSubscription && username) {
    fetch("/update-username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        subscriptionEndpoint: currentSubscription.endpoint,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    console.log("No subscription or username available.");
  }
}
