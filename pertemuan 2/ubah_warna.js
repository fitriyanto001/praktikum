// ===========================
// GANTI WARNA TEKS (Judul)
// ===========================
let textColors = ["red", "blue", "green", "purple", "orange"];
let textIndex = 0;

function cycleTextColor() {
    const judul = document.getElementById("judul");
    textIndex = (textIndex + 1) % textColors.length;
    judul.style.color = textColors[textIndex];
}


// ===========================
// GANTI BACKGROUND BODY
// ===========================
let bgColors = ["lightblue", "lightgreen", "lightpink", "khaki", "lavender"];
let bgIndex = 0;

function cycleBackground() {
    bgIndex = (bgIndex + 1) % bgColors.length;
    document.body.style.backgroundColor = bgColors[bgIndex];
}
