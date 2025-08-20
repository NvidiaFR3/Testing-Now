const params = new URLSearchParams(location.search);
const amount = params.get("amount");
const nomor = params.get("nomor");
const id = params.get("id");
const varian = params.get("varian");
const namaProduk = produk[id].nama;

let trxId = "";

async function createPayment() {
  const res = await fetch("../api/create_payment.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `amount=${amount}`
  });
  const data = await res.json();
  if (!data.status) return alert("Gagal buat QRIS");

  trxId = data.result.idtransaksi;
  document.getElementById("qris").src = data.result.imageqris.url;
  document.getElementById("info").textContent = "Scan QRIS sebelum waktu habis!";
  startTimer(new Date(data.result.expired));
  pollPayment();
}

function startTimer(expire) {
  const interval = setInterval(() => {
    const now = new Date();
    const diff = expire - now;
    if (diff <= 0) {
      clearInterval(interval);
      alert("QRIS kadaluarsa");
      location.href = "index.html";
    } else {
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      document.getElementById("timer").textContent = `${mins}:${secs.toString().padStart(2, "0")}`;
    }
  }, 1000);
}

async function pollPayment() {
  const res = await fetch("https://api.nvidiabotz.xyz/orderkuota/mutasiqr?username=bangluxz&token=1411540:QEyCKljfu91OcsYd54xWJz7BvPL6VbZp");
  const data = await res.json();
  if (!data.status) return setTimeout(pollPayment, 3000);

  const paid = data.result.some(tx => tx.kredit === amount.toString());
  if (paid) {
    // Kirim notifikasi ke Telegram
    await fetch(`https://api.telegram.org/bot8315521806:AAFJDo7AF49nUaze9WMRoQIQ_FNlC7OEOR0/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: 7609309506,
        text: `BARANG DARI WEBSITE STORE ANDA SUCSSES TERBAYAR:
NOMOR TRX: ${trxId}
NOMOR USER: ${nomor}
BARANG YANG DI BELI: ${namaProduk} (${varian})
METODE PEMBAYARAN: QRIS`
      })
    });

    alert("Pembayaran berhasil!");
    location.href = "index.html";
  } else {
    setTimeout(pollPayment, 3000);
  }
}

createPayment();
