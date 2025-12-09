(function () {
    function showGreetingMessage(name) {
        const msg = name ? "Halo, " + name + " selamat datang di praktikum JavaScript!" : "Halo, selamat datang di praktikum JavaScript! Silakan masukkan nama Anda.";
        // alert sebagai utama (sesuai request asal)
        alert(msg);
        // tampilkan juga di halaman jika ada elemen greeting
        const target = document.getElementById('greeting');
        if (target) target.textContent = msg;
    }

    function sapaFunc() {
        const inputEl = document.getElementById("inputNama");
        const nama = inputEl ? inputEl.value.trim() : "";
        showGreetingMessage(nama);
    }

    // buat global untuk kompatibilitas dengan onclick inline
    window.sapa = sapaFunc;

    // inisialisasi event listener untuk tombol dan enter di input
    document.addEventListener('DOMContentLoaded', function () {
        const btn = document.getElementById('sapaBtn');
        if (btn) {
            // tambahkan event listener aman
            btn.addEventListener('click', sapaFunc);
        }
        const input = document.getElementById('inputNama');
        if (input) {
            input.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    sapaFunc();
                    // hindari submit atau perilaku lain (jika input ada dalam form)
                    e.preventDefault();
                }
            });
        }
    });
})();