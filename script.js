

// ======================
// FUNGSI kirim data checkout ke Whatsapp
// ======================
function kirimWhatsapp(e){
    e.preventDefault();
    let nama = document.getElementById("nama").value;
    let alamat = document.getElementById("alamat").value;
    let hp = document.getElementById("hp").value;

    //  Buat isi pesan Whatsapp
    let pesan = `Halo, saya ${nama}, ingin pesan. Alamat: ${alamat}, Nomor Hp: ${hp}`;

    // Buka link Whatsapp dengan isi pesan 
    window.open("https://wa.me/081932518720?text=" + encodeURIComponent(pesan), "_blank");

    // Tampilkan toast notifikasi berhasil 
    showToast("Pesanan berhasil dikirim ke Whatsapp!");
}

// ======================
// CEK LOGIN USER dengan localStorage
// ======================
const user = JSON.parse(localStorage.getItem("loggedInUser"));
if(user){
    document.getElementById("loginMenu").innerHTML = `<a href="#">Halo, ${user.nama}</a>`;
    document.getElementById("resisterMenu").innerHTML = `<a href="#" id="logoutBtn">Logout</a>`;

    // Tambahkan event untuk logout
    document.getElementById("logoutBtn").addEventListener("click", function(e){
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
        showToast("Anda telah logout!");
        window.location.reload();
    });
}

// =======================
// FUNGSI Keranjang Belanja
// =======================
let keranjang =[];
const tombolTambah = document.querySelectorAll(".tambah-keranjang");

// Tambahkan produk saat tombol diklik
tombolTambah.forEach((btn) => {
    btn.addEventListener("click", () => {
        const produkItem = btn.parentElement;
    const namaProduk = produkItem.querySelector("h3").innerText;
const hargaProduk = parseInt(produkItem.querySelector("p").innerText.replace("Rp", "").replace(".", ""));

// Cek apakah produk sudah ada di keranjang
const cekProduk = keranjang.find(item => item.nama === namaProduk);
if(cekProduk){
    cekProduk.jumlah += 1;
} else {
    keranjang.push({nama: namaProduk, harga: hargaProduk, jumlah:1});
}
 renderKeranjang();

  // Tampilkan notifikasi toast
  showToast(`${namaProduk} ditambahkan ke keranjang!`); 
  });
});

// =======================
// FUNGSI render Keranjang 
// =======================
function renderKeranjang(){
    const daftar = document.getElementById("daftar-keranjang");
    daftar.innerHTML = "";
    let total = 0;

    keranjang.forEach((item, i) => {
        const subtotal = item.harga * item.jumlah;
        total += subtotal;

        // Tambahkan baris tabel untuk setiap item 
        daftar.innerHTML += `<tr>
             <td>${item.nama}</td> <!-- Nama produk -->
             <td>${item.jumlah}</td> <!-- Jumlah produk -->
             <td>Rp ${item.harga}</td> <!-- Harga satuan --> 
             <td>Rp ${subtotal}</td> <!-- Total harga produk -->
             <td><button onclick="hapusItem(${i})">Hapus</button></td> <!-- Tombol Hapus --> 
        </tr>`;
     });

    document.getElementById("total-belanja").innerText = total;
}

// =======================
// Fungsi hapus item dari keranjang
// ======================
function hapusItem(index){
    const namaProduk = keranjang[index].nama;
    keranjang.splice(index, 1);
    renderKeranjang();

    // Tampilkan notifikasi toast
    showToast(`${namaProduk} di hapus dari keranjang`);
}

//========================
// FUNGSI TOAST NOTIFIKASI
// =======================
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.style.displey = "block";

    // Hilangkan otomatis setelah 3 detik
    setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
    }
