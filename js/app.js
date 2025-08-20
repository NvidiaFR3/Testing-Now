const produk = [
  {
    nama: "Nvidia Botz",
    harga: 20000,
    foto: "https://img1.pixhost.to/images/6937/618110027_rellcloud.jpg",
    variasi: ["Biasa", "Reseller", "Partner"],
    deskripsi: "Bot otomatis dengan berbagai tier keuntungan..."
  },
  {
    nama: "Jasa Pembuatan Website",
    harga: 5000,
    foto: null,
    variasi: ["Base PG", "Ringan No Domain", "Ringan + Domain", "Sedang", "Berat"],
    deskripsi: "Layanan pembuatan website dari ringan hingga berat..."
  },
  {
    nama: "Jasa Pembuatan Bot WhatsApp",
    harga: 10000,
    foto: null,
    variasi: ["Base", "5 Fitur", "5 Fitur + Bug", "Bebas No Bug", "Bebas + Bug"],
    deskripsi: "Bot WhatsApp dengan berbagai paket fitur..."
  },
  {
    nama: "Jasa Pembuatan Bot Telegram",
    harga: 15000,
    foto: null,
    variasi: ["Base", "5 Fitur", "5 Fitur + Bug", "Bebas No Bug", "Bebas + Bug"],
    deskripsi: "Bot Telegram dengan berbagai paket fitur..."
  },
  {
    nama: "Nvidia Rest Api",
    harga: 20000,
    foto: null,
    variasi: [],
    deskripsi: "API untuk integrasi berbagai layanan..."
  }
];

function renderProduk() {
  const container = document.getElementById("product-list");
  produk.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      ${p.foto ? `<img src="${p.foto}" alt="${p.nama}" />` : "<p>Foto Produk Tidak Ada</p>"}
      <h3>${p.nama}</h3>
      <p>Rp ${p.harga.toLocaleString()}</p>
      <a href="produk.html?id=${i}">Beli</a>
    `;
    container.appendChild(div);
  });
}

renderProduk();
