"use strict";
// Yapılandırma: Edge Function adresi (yayın sırasında ortamına göre ayarlanır).
const FUNCTION_URL = "https://mkabqygeatrgiparxqsx.supabase.co/functions/v1/quote-public";
const token = (location.hash || "").replace(/^#/, "");
const $ = (id) => document.getElementById(id);
const tl = (k) => (Number(k) / 100).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₺";
const qty = (m) => (Number(m) / 1000).toLocaleString("tr-TR", { maximumFractionDigits: 3 });
function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
function row(left, sub, right, cls) {
  const r = el("div", "row" + (cls ? " " + cls : ""));
  const l = el("div", "l", left); if (sub) l.appendChild(el("div", "sub", sub));
  r.appendChild(l); r.appendChild(el("div", "r", right || "")); return r;
}
function status(text, badgeText, badgeCls) {
  const s = $("status"); s.replaceChildren();
  if (badgeText) s.appendChild(el("span", "badge " + badgeCls, badgeText));
  s.appendChild(el("p", null, text));
}
const MESSAGES = {
  not_found: "Bağlantı geçersiz. Servisten yeni bağlantı isteyin.",
  revoked: "Bu bağlantı servis tarafından yenilendi. Servisten gelen en son bağlantıyı kullanın.",
  expired: "Bağlantının süresi doldu. Servisten yeni bağlantı isteyin.",
  changed: "Teklif güncellendi. Güncel teklif için servisten yeni bağlantı isteyin.",
  closed: "Bu iş emri kapatıldı.",
};
async function call(body) {
  const r = await fetch(FUNCTION_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), referrerPolicy: "no-referrer", cache: "no-store" });
  if (!r.ok && r.status !== 200) throw new Error("http " + r.status);
  return r.json();
}
function render(d) {
  if (d.service) $("service").textContent = [d.service.name, d.service.phone].filter(Boolean).join(" · ");
  const q = d.quote;
  if (q) {
    $("vehicle").replaceChildren();
    if (q.plate) $("vehicle").appendChild(el("span", "plate", q.plate));
    if (q.vehicle) $("vehicle").appendChild(document.createTextNode("  " + q.vehicle));
    const ops = $("ops"); ops.replaceChildren();
    for (const o of q.operations || []) ops.appendChild(row(o.title, o.location, o.total_kurus != null ? tl(o.total_kurus) : ""));
    const parts = $("parts"); parts.replaceChildren();
    for (const p of q.parts || []) {
      const sub = [p.location, [p.brand, p.serial].filter(Boolean).join(" "), qty(p.qty_milli) + " " + p.unit + " × " + tl(p.unit_price_kurus)].filter(Boolean).join(" · ");
      parts.appendChild(row(p.title, sub, tl(p.total_kurus)));
    }
    $("partsCard").classList.toggle("hidden", !(q.parts || []).length);
    const t = q.totals, tot = $("totals"); tot.replaceChildren();
    const opSum = (q.operations || []).reduce((s, o) => s + (o.total_kurus != null ? Number(o.total_kurus) : 0), 0);
    const labor = q.labor_total_kurus != null ? Number(q.labor_total_kurus) : opSum;
    // Eski usul (kalem başına işçilik) tekliflerde de işçilik toplamı görünsün.
    if (labor > 0 || q.labor_total_kurus != null) tot.appendChild(row("İşçilik", null, tl(labor)));
    if ((q.parts || []).length) tot.appendChild(row("Parçalar", null, tl((q.parts || []).reduce((s, p) => s + Number(p.total_kurus), 0))));
    if (Number(t.discount_kurus) > 0) tot.appendChild(row("İndirim", null, "−" + tl(t.discount_kurus)));
    if (Number(t.vat_rate_bps) > 0) tot.appendChild(row("KDV (%" + (Number(t.vat_rate_bps) / 100).toLocaleString("tr-TR") + ")", null, tl(t.vat_kurus)));
    tot.appendChild(row("Genel toplam", null, tl(t.grand_total_kurus), "total"));
    $("quote").classList.remove("hidden");
  } else {
    $("quote").classList.add("hidden");
  }
  const when = d.decided_at ? new Date(d.decided_at).toLocaleString("tr-TR") : "";
  if (d.state === "active") {
    status("Teklifi inceleyip onaylayabilir veya reddedebilirsiniz. Bağlantı " + new Date(d.expires_at).toLocaleDateString("tr-TR") + " tarihine kadar geçerli.");
    $("decide").classList.remove("hidden");
  } else {
    $("decide").classList.add("hidden");
    if (d.state === "decided") status(when ? "Kararınız " + when + " tarihinde iletildi." : "Kararınız iletildi.", d.decision === "approved" ? "Onaylandı" : "Reddedildi", d.decision === "approved" ? "ok" : "no");
    else status(MESSAGES[d.state] || MESSAGES.not_found, null, null);
  }
}
async function decide(decision) {
  const text = decision === "approved" ? "Teklifi onaylıyor musunuz?" : "Teklifi reddetmek istiyor musunuz?";
  if (!confirm(text)) return;
  $("btnApprove").disabled = $("btnReject").disabled = true;
  try {
    const d = await call({ action: "decide", token, decision });
    if (d.state === "decided") render(Object.assign(await call({ action: "view", token }), {}));
    else render(d);
  } catch { status("Karar gönderilemedi. Bağlantınızı kontrol edip tekrar deneyin.", "Hata", "warn"); }
  finally { $("btnApprove").disabled = $("btnReject").disabled = false; }
}
$("btnApprove").addEventListener("click", () => decide("approved"));
$("btnReject").addEventListener("click", () => decide("rejected"));
(async () => {
  if (!/^[A-Za-z0-9_-]{43}$/.test(token)) { status(MESSAGES.not_found); return; }
  try { render(await call({ action: "view", token })); }
  catch { status("Teklif şu anda açılamıyor. Lütfen daha sonra tekrar deneyin.", "Hata", "warn"); }
})();
