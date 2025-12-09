// Ganti implementasi fungsi ubahwarna/kembalikanwarna dengan one-click cycleTextColor

(function () {
    const colors = ['red', 'green', 'blue', 'orange', 'purple']; // daftar warna yang digilir
    const states = {}; // { [elementId]: { index, defaultColor, headingEl, btnEl } }

    function initState(elementId, buttonId) {
        if (states[elementId]) return;
        const heading = document.getElementById(elementId);
        const btn = document.getElementById(buttonId);
        if (!heading) {
            console.warn('initState: heading not found for id', elementId);
        }
        const defaultColor = heading ? (heading.style.color || window.getComputedStyle(heading).color) : '';
        states[elementId] = {
            index: -1,
            headingEl: heading,
            btnEl: btn,
            defaultColor: defaultColor
        };
        if (btn) btn.textContent = 'Ganti Warna';
    }

    window.cycleTextColorFor = function (elementId, buttonId) {
        initState(elementId, buttonId);
        const s = states[elementId];
        if (!s || !s.headingEl || !s.btnEl) {
            console.warn('cycleTextColorFor: missing state or elements for', elementId, buttonId);
            return;
        }

        s.index = (s.index + 1) % (colors.length + 1);
        if (s.index === colors.length) {
            s.headingEl.style.color = s.defaultColor;
            s.btnEl.textContent = 'Ganti Warna';
            s.index = -1;
        } else {
            s.headingEl.style.color = colors[s.index];
            s.btnEl.textContent = 'Warna: ' + colors[s.index];
        }
    };

    // Ke belakang kompatibel untuk file yang memanggil cycleTextColor()
    window.cycleTextColor = function () {
        // fallback: try 'judul' and 'ubahWarnaBtn' if present
        window.cycleTextColorFor('judul', 'ubahWarnaBtn');
    };

    // Background variants (kelas CSS dan label)
    const bgVariants = [
        { cls: 'bg-variant-sunset', label: 'Sunset' },
        { cls: 'bg-variant-aurora', label: 'Aurora' },
        { cls: 'bg-variant-ocean', label: 'Ocean' },
        { cls: 'bg-variant-forest', label: 'Forest' },
        { cls: 'bg-variant-mono', label: 'Mono' }
    ];
    let bgIndex = -1; // -1 => default (no variant class)

    // Hapus semua kelas variant dari body
    function clearBgVariants() {
        const classes = bgVariants.map(v => v.cls);
        document.body.classList.remove(...classes);
    }

    // Fungsi global untuk berganti background. btnId wajib agar teks tombol dapat berubah.
    window.cycleBackground = function (btnId) {
        const btn = document.getElementById(btnId);
        if (!btn) {
            console.warn('cycleBackground: button not found for id', btnId);
            return;
        }
        bgIndex = (bgIndex + 1) % (bgVariants.length + 1); // +1 for default
        clearBgVariants();

        if (bgIndex === bgVariants.length) {
            // kembali ke default
            btn.textContent = 'Background: Default';
        } else {
            const v = bgVariants[bgIndex];
            document.body.classList.add(v.cls);
            btn.textContent = 'Background: ' + v.label;
        }
    };

    // Inisialisasi semua tombol yang punya class 'cycle-color-btn' dan atribut data-target
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.cycle-color-btn').forEach(function (btn) {
            const targetId = btn.dataset.target || btn.getAttribute('data-target') || btn.getAttribute('data-target-id') || '';
            const id = targetId ? targetId.replace(/^#/, '') : (btn.dataset.target || btn.id);
            if (id && btn.id) {
                initState(id, btn.id);
            } else {
                console.warn('cycle-color-btn init: missing data-target or id for button', btn);
            }
        });

        // Inisialisasi tombol .bg-cycle-btn di DOM (agar teks awal ditetapkan)
        document.querySelectorAll('.bg-cycle-btn').forEach(function (btn) {
            // set text ke default saat load
            btn.textContent = 'Background: Default';
        });
    });
})();