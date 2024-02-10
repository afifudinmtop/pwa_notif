// Mendengarkan event 'install'
self.addEventListener('install', function(event) {
    console.log('Service worker menginstall...');
    // Service worker melakukan install
});

// Mendengarkan event 'activate'
self.addEventListener('activate', function(event) {
    console.log('Service worker mengaktifkan...');
    // Service worker aktif
});

// Mendengarkan event 'push' untuk menerima push message
self.addEventListener('push', function(event) {
    console.log('Push event diterima.', event);

    // Tentukan nilai default untuk judul, isi, dan ikon
    var title = 'Push Notification';
    var body = 'Anda menerima pesan push.';
    var icon = '/icon.png'; // Ganti dengan path ke icon yang Anda inginkan
    var tag = 'simple-push-example-tag';

    // Coba baca payload dari push event
    if (event.data) {
        const dataText = event.data.text();
        try {
            const dataObject = JSON.parse(dataText);
            title = dataObject.title || title;
            body = dataObject.body || body;
            icon = dataObject.icon || icon;
            // Anda bisa menambahkan lebih banyak customisasi berdasarkan dataObject
        } catch (error) {
            console.error('Error parsing push notification data:', error);
        }
    }

    // Menentukan opsi untuk notifikasi
    var options = {
        body: body,
        icon: icon,
        tag: tag
    };

    // Menampilkan notifikasi
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});


// Mendengarkan event 'notificationclick' untuk menangani klik pada notifikasi
self.addEventListener('notificationclick', function(event) {
    console.log('Notifikasi diklik', event);
    event.notification.close(); // Menutup notifikasi

    // Contoh: membuka window/tab baru ketika notifikasi diklik
    event.waitUntil(
        clients.openWindow('https://example.com')
    );
});
