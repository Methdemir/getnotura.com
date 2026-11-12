# Sarper Studios / Notura ayrımı — 12 Kasım 2026

## Sonuç ve yayın sınırı

Kod ayrımı ve yerel doğrulama hazır; **alan adı geçişi ve canlı 301 yayını tamamlanmadı**. Bu rapor canlı geçiş yapıldı anlamına gelmez. Mevcut üretim alan adları ve DNS değiştirilmedi. Tarayıcı kontrolü, native Chrome penceresinin URL'si güvenilir biçimde belirlenemediği için güvenlik katmanı tarafından durduruldu; panel işlemine devam edilmedi. Yerel Cloudflare kimlik bilgisi ve iki GitHub reposunda Actions secret bulunmadı. Bu nedenle uzaktaki Pages önizlemesi de oluşturulamadı.

## 1. Kaynaklar, commitler ve geri dönüş

- Başlangıç remote main: `0967f7205517beaff977f791b87ef11e44b5dfb3`.
- Studio kod commit'i: `203e74135764048e671c84aa80e7cdac8739b807`, branch `codex/seo-domain-split-20261112`, Methdemir/getnotura.com. Main değiştirilmedi.
- Yeni Notura ilk kod commit'i: `51f6e21bbb035e1ba3a98fb000495dbf521d6aba`, Methdemir/getnotura.com2 main. Son Notura uyumluluk commit'i: `8cecfb8a67deac7cdb6c5dd7662e4c8a432cba05` (remote main doğrulandı).
- Bu raporun commit'i kod commit'inden ayrıdır; `git log -1` ile doğrulanır.
- Ana kullanıcı çalışma klasörü `D:/Projects/getnotura.com`: başlangıç local main `978430d`, kullanıcı `.claude/settings.local.json`, `.claude/skills/`, `.impeccable/review/` değişiklikleri korunmuştur.
- Bağımsız çalışma alanları: `D:/Projects/_worktrees/studio-seo-20261112` ve `D:/Projects/_worktrees/notura-standalone-20261112`.
- Tam Git geçmişi yedeği: `D:/Projects/_worktrees/studio-before-split-20261112.bundle`; `git bundle verify` başarılı, başlangıç main SHA'sını içerir.
- Yayın sonrası geri dönüş: Studio Pages'te önceki başarılı production deployment'a rollback; Notura DNS/custom domain eski hedefe ancak başlangıç kayıtları yeniden okunup kaydedildikten sonra geri alınır. Henüz getnotura.com DNS paneli okunmadığı için eski kayıt hedefi varsayılmamalıdır. Kod için main'i force-push etmek yerine ayrım commitlerini revert eden yeni commit kullanılmalıdır.

## 2. Doğrulanan hosting durumu

| Alan / proje | Gözlenen durum | Yapılan değişiklik |
| --- | --- | --- |
| sarperstudios.com | Cloudflare DNS CNAME `sarperstudios.pages.dev`, proxied | Yok |
| Cloudflare Pages `sarperstudios` | `Methdemir/getnotura.com` bağlı; panelde 1 ek domain ve son commit açıklaması görüldü | Yok; production branch/build/custom-domain/SSL ayrıntıları henüz panelden okunmadı |
| Cloudflare Worker `getnotura-com` | Aynı repoya bağlı fakat son derlemeler başarısız; custom domain/route yok, workers.dev kapalı | Yok; canlı siteyi sunan Pages projesiyle karıştırılmamalı |
| getnotura.com | HTTP Server GitHub.com; GitHub Pages API cname getnotura.com, workflow built | Yok |
| GitHub Pages mevcut repo | main 0967f72 Actions run42987127638 success; workflow hâlâ main push'ta deploy eder | Branch'teki CNAME sarperstudios.com; main'e henüz aktarılmadı |
| Yeni Notura Pages | Oluşturulmadı | Yeni repo ve CI hazır, custom domain yok |

Görev metnindeki “iki domain aynı Pages projesine bağlı” varsayımı kanıtla doğrulanmadı: aynı içerik iki ayrı barındırmadan sunuluyor. getnotura.com eski Pages projesinden çıkarılacakmış gibi kör bir kaldırma yapılmamalıdır. Mevcut GitHub Pages custom-domain ve DNS geçişi ayrıca ele alınmalıdır.

## 3. Taşınan sayfalar ve içerik

Notura: nötr `/` + yayımlanmış `en,tr,de,fr,es,it,pt-br` dillerinin her biri için ana sayfa, product, features, how-it-works, privacy, terms = **43 canonical sayfa**. Yollar locale ve rota yapılandırmasından üretilir; rezerv `pt` yayınlanmaz. Eski `/notura/` içerik klasörü Studio'dan kaldırıldı.

Yeni origin `https://getnotura.com`; preview `noindex,follow` korunur. Privacy/terms erişime açık HTML'dir. `src/config/site-release.ts` içindeki `siteReleaseStatus` ileride public yapılarak indeksleme açılır. Çeviriler, hukuki metinler, stiller ve görsellerin 51 kaynak dosyası byte düzeyinde korunmuştur. Yeni repoda diğer ürün HTML sayfaları yoktur.

Studio Notura kartı `https://getnotura.com/`, privacy `https://getnotura.com/en/privacy/`; MomentBack footer'daki eski Notura linki de düzeltildi. Diğer ürün metinleri değiştirilmedi. Diğer ürünler, app-ads ve tracker başlangıç hash testleriyle korunur; footer href değişimi normalleştirilerek kontrol edilir.

## 4. Yönlendirmeler ve ilk 21 URL

Studio: 43 eski `/notura/` yolu + 42 eski kök locale yolu = **85 eşleme**, slash ve slashless için **170 kesin HTTP 301 kuralı**. `public/_redirects`, `scripts/notura-redirects.mjs` ve `generate-redirects.mjs` ile configten üretilir. Astro HTML/meta-refresh redirectleri kaldırıldı. Bilinmeyen `/notura/unknown/` 404 kalır.

- Wrangler Pages 4.160.1 gerçek yerel HTTP: **170/170 doğru 301 ve Location**, 21 public sayfa200, 2 bilinmeyen404 = **193/193 PASS**. Kanıt `docs/seo-domain-split/studio-local-http.json`.
- Canlı başlangıç: 43 eski Notura URL'sinin **43'ü200 + noindex**, **0'ı301**. Kanıt `docs/seo-evidence/notura-live-before-43.json`. Canlı yayın yapılmadığı için bu sorun henüz canlıda kapanmadı.
- Search Console'daki 21 noindex sayısı yetkili hesapta görüldü; **21 tekil örneğin listesi dışa aktarılamadı**. Görev metni bunların /notura altında olduğunu bildiriyor. Test tüm43 yayımlanmış /notura yolunu kapsar, ancak bunun Search Console21 kimlik eşleştirmesi olarak sunulmaması gerekir. Sonraki oturumda gerçek21 liste alınmalı ve aynı canlı testin sonucuyla eşleştirilmelidir.
- `_redirects` GitHub Pages'te HTTP301 sağlamaz; bu doğrulama Cloudflare Pages önizlemesinde ve production'da tekrar yapılmalıdır. [Cloudflare resmi redirect belgesi](https://developers.cloudflare.com/pages/configuration/redirects/).

Yeniden çalıştırma: önce `npm run validate`, ardından Pages URL'siyle `node scripts/validate-http.mjs https://STUDIO-PREVIEW.pages.dev docs/seo-domain-split/studio-preview-http.json`.

## 5. Search Console'daki diğer 15 gerçek örnek

Yetkili hesapla rapor okundu: `CAMYFyAC`, rapor ekranı son güncelleme9 Kasım2026, ilk tespit10 Kasım. 12 Kasım'da tüm15 satır görüntülendi. Liste aşağıda varsayım değildir. Ham gözlem + HTTP denetimi: `docs/seo-evidence/live-before-15.json`.

| URL yolu | HTTP | Robots | Canonical | Canlı sitemap önce | Görünür karakter | Bulgu / işlem |
| --- | --- | --- | --- | --- | --- | --- |
| `/momentback/tr/terms/` | 200 | index,follow | doğru | YOK | 8018 | MomentBack sitemap kaydı eksikti; 6 sayfa eklendi. |
| `/999kb/tr/` | 200 | index,follow | doğru | var | 3721 | HTTP/robots/canonical/sitemap/iç bağlantıda teknik engel bulunmadı; Google seçimi devam ediyor. |
| `/jutsu/tr/privacy/` | 200 | index,follow | doğru | var | 3874 | HTTP/robots/canonical/sitemap/iç bağlantıda teknik engel bulunmadı; Google seçimi devam ediyor. |
| `/999kb/tr/privacy/` | 200 | index,follow | doğru | var | 2987 | HTTP/robots/canonical/sitemap/iç bağlantıda teknik engel bulunmadı; Google seçimi devam ediyor. |
| `/momentback/privacy/` | 200 | index,follow | doğru | YOK | 9448 | MomentBack sitemap kaydı eksikti; 6 sayfa eklendi. |
| `/momentback/terms/` | 200 | index,follow | doğru | YOK | 7904 | MomentBack sitemap kaydı eksikti; 6 sayfa eklendi. |
| `/999kb/privacy/` | 200 | index,follow | doğru | var | 3092 | HTTP/robots/canonical/sitemap/iç bağlantıda teknik engel bulunmadı; Google seçimi devam ediyor. |
| `/momentback/tr/` | 200 | index,follow | doğru | YOK | 9913 | MomentBack sitemap kaydı eksikti; 6 sayfa eklendi. |
| `/jutsu/privacy/` | 200 | index,follow | doğru | var | 3860 | HTTP/robots/canonical/sitemap/iç bağlantıda teknik engel bulunmadı; Google seçimi devam ediyor. |
| `/vergi-hesabim/` | 200 | index,follow | doğru | var | 2877 | HTTP/robots/canonical/sitemap/iç bağlantıda teknik engel bulunmadı; Google seçimi devam ediyor. |
| `/momentback/` | 200 | index,follow | doğru | YOK | 10082 | MomentBack sitemap kaydı eksikti; 6 sayfa eklendi. |
| `/jutsu/` | 200 | index,follow | doğru | var | 2418 | HTTP/robots/canonical/sitemap/iç bağlantıda teknik engel bulunmadı; Google seçimi devam ediyor. |
| `/kimo/` | 200 | index,follow | doğru | var | 411 | Kısa içerik (411 karakter); doğrulanmamış açıklama eklenmedi, ürün sahibi incelemesi gerekir. |
| `/vergi-hesabim/privacy/` | 200 | index,follow | doğru | var | 7214 | HTTP/robots/canonical/sitemap/iç bağlantıda teknik engel bulunmadı; Google seçimi devam ediyor. |
| `/` | 200 | index,follow | doğru | var | 2538 | HTTP/robots/canonical/sitemap/iç bağlantıda teknik engel bulunmadı; Google seçimi devam ediyor. |

Tüm15 sayfada server-rendered okunabilir HTML, dil bilgisi ve iç linkler mevcut; X-Robots-Tag kısıtı görülmedi. Canonical tek ve kendi sarperstudios.com URL'si. Yanlış yönlendirme veya soft404 işareti görülmedi. Çeviri varyantları diller arası alternate ilişkisiyle sunuluyor. Hukuki metinlerin benzerliği tek başına teknik hata sayılmadı; açıklamalar ve hukuki iddialar yeniden yazılmadı. İncelenen15 sayfa içinde her URL'ye en az1 iç bağlantı var. Kim O? kısa metni için kalite değerlendirmesi ürün sahibine bırakıldı; içerik uzunluğu tek başına indeksleme teşhisi değildir.

HTTP istemci farkı: Python-urllib UA home403, curl varsayılan UA200, Googlebot UA taklidi home ve999kb/privacy200. Bu yalnız istemci/UA farklılığını gösterir, gerçek Googlebot erişiminin kanıtı değildir. WAF/robots durumunun Search Console canlı URL testiyle doğrulanması gerekir. Gerçek Googlebot IP erişimi bu tur ölçülmedi.

MomentBack sitemap eksikliği giderildi; bu Google'ın “Tarandı” kararının kesin nedeni olarak sunulamaz. Sitemap Google'a keşif sinyali sağlar, indekslenmeyi garanti etmez. [Google sitemap belgesi](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).

## 6. Canonical, hreflang, sitemap ve testler

- Studio sitemap21 public URL; Notura, legacy redirect, tracker ve404 dahil değil. MomentBack'in6 sayfası eklendi.
- Studio self-canonical, reciprocal hreflang, iç link/asset, hukuki içerik, zero-client-JS (tracker istisnası), app-ads ve404 kontrolleri PASS.
- Notura43 self-canonical,7dil reciprocal hreflang ve x-default,43URL sitemap ve yeni-domain robots, içerik/dil/asset/içlink kontrolleri PASS.
- İki repoda `npm run validate` ve üretim build başarılı. Studio Astro0 hata/uyarı/ipucu; Notura Astro0 hata/uyarı/ipucu. Notura GitHub CI ilk push için success run43170281889.
- Var olan lockfile npm10 advisory bildiriyor (1moderate,8high,1critical); bağımlılık sürümleri bu ayrımda değiştirilmedi. Bu rapor bağımlılık güvenlik denetiminin kapandığı anlamına gelmez.

## 7. Gerekli panel ve yayın sırası

1. Cloudflare yetkili oturumda mevcut `sarperstudios` Pages project settings: repo, production branch, root, build command, dist output, Node ve custom-domain/SSL durumunu okuyup kaydet. Mevcut deployment kimliğini geri dönüş için kaydet.
2. Aynı hesapta yeni **Pages** projesi oluştur; Git repo `Methdemir/getnotura.com2`, branch main, build `npm run build`, output `dist`, Node24. Mevcut ilgisiz Worker'ı yeni site diye kullanma.
3. Yeni gerçek pages.dev URL'de43Notura200,preview noindex,14legal200,canonical/hreflang/robots/sitemap/assets ve compatibility301'i doğrula.
4. Studio branch'in Pages preview deployment'ını doğrula; HTTP193 testini gerçek preview'de tekrar koş. Diğer uygulama legal veapp-ads200 doğrula.
5. getnotura.com zone'un gerçek DNS kayıtlarını ve GitHub Pages cname ayarını kaydet. Yeni site hazır olmadan GitHub Pages custom domaini/DNS'i ayırma. Kullanılacak Pages projesine getnotura.com custom domain ekleyip DNS/SSL durumuna göre sıralı geçiş yap; kullanıcı/CLI yetkisi bu tur mevcut değildi.
6. getnotura.com yeni Notura'yı HTTPS üzerinden sunduktan sonra Studio branch main'e alınabilir. **Mevcut GitHub Pages workflow ve public/CNAME etkisi bu noktada gözden geçirilmeli; getnotura.com eski GitHub Pages'e bağlıyken CNAME değişen main'i deploy etme.** GitHub Pages deploy job'ını yalnız CI'ya çevirmek veya eski yayını devreden çıkarmak geçişin parçasıdır.
7. sarperstudios.com Pages dağıtımı bitince85eşleme170varyant gerçek301+Location; iki domainin200/404/robots/meta/canonical/hreflang/sitemap/SSL veapp-ads testlerini tekrar çalıştır.21gerçeknoindex örneği ayrıca eşleştir. Installed Takip PWA'nın domain geçişini kullanıcı tarayıcısında doğrula.

## 8. Search Console son işlemleri

- Teknik yayın ve canlı301'ler doğrulandıktan sonra sarperstudios.com/sitemap.xml'i yeniden gönder; birkaç app/legal URL'sinde canlı URL testi çalıştır.
- “Tarandı — şu anda dizine eklenmiş değil” için düzeltmeyi doğrulamayı ancak yayın sonrası başlat. Gerekirse ana sayfa ve ürünlerin indeksleme isteğini gönder; kabul garanti edilemez.
- Eski noindex Notura sayfaları artık301 olacağı için Google bunları redirect olarak yeniden sınıflandıracaktır; bunların eski domainde indekslenmesi istenmez.
- getnotura.com önizleme noindex davranışını koru. Notura yayınlanmaya hazır olduğunda public switch, yeniden build/deploy, canlımeta kontrolü ve yeni-domain Search Console sitemap gönderimi yap.
- Bu yalnız bir ürün alt dizini ayrımıdır; bütün sarperstudios.com mülkü için domain değişikliği bildirimi yapılmamalıdır.

## 9. Tamamlanmamış / doğrulanamayanlar

- Yeni Cloudflare Pages projesi, uzaktaki pages.dev preview ve DNS/custom-domain/SSL geçişi.
- Studio main merge ve canlı dağıtım; mevcut GitHub Pages deploy workflow'unun geçişte devreden çıkarılması.
- Gerçek Search Console21 noindex örnek listesinin alınması ve canlı301eşleştirmesi.
- Canlı iki-site bitiş kriteri, canlı301'ler, Search Console validate/indexing requestleri.
- Cloudflare Pages mevcut build/root/env ayarlarının ayrıntılı okunması; başarısız eskiWorker buildlerinin nedeni (aktif trafiği yok).
- Gerçek Googlebot canlı test/WAF doğrulaması; Kim O? içerik kabulü; npm advisory çözümü.


## Ek teslim — eski getnotura.com bağlantıları ve bağımsız inceleme

- Son Notura SHA: `8cecfb8a67deac7cdb6c5dd7662e4c8a432cba05`, main'e push edildi. İki repo ayrı commitlerde tutuldu.
- Yeni Notura'da129 gerçek301 kuralı: eski43Notura slash/slashless86,20Studio ürün/legal slash/slashless40, Takip kök/slashless/wildcard3. Diğer-app sayfaları HTML olarak kopyalanmadan sarperstudios.com aynıpath'e yönlenir.
- `app-ads.txt` yeni repo kökünde eski Git blobuyla byte-identical korunur; eski reklam doğrulama URL'leri taşınırken dosya kaybolmaz.
- Notura Wrangler Pages yerel **175/175 PASS**:129redirect301+Location,43canonical200vepreviewnoindex,2unknown404,appads200. Kanıt `docs/seo-evidence/notura-local-http.json`, çalıştırma `node docs/seo-evidence/audit-notura-http.mjs` (varsayılan sibling Notura worktree ve127.0.0.1:8792 emülatörü).
- Salt okunur bağımsız inceleme, ilk Notura sürümündeki eski-link404 riskini buldu; yukarıdaki uyumluluk commit'iyle giderildi. Studio203e741 ayrıca bağımsız incelendi, engelleyici kod bulgusu yok; validate:build tekrarPASS.
- Eski Takip installedPWA serviceworker/manifest origin göçü ayrıca canlı kullanıcı kabulü ister. Tracker backend'i ayrı iframe origininde olduğundan veri taşıma yapılmadı.
- Bu ek testler yereldir; gerçek pages.dev/domain/SSL doğrulamasının yerini tutmaz. Canlı301sonucu hâlâ0/43 başlangıç durumundadır; bitiş kriteri henüz karşılanmadı.

## Linux CI düzeltmesi

DraftPR https://github.com/Methdemir/getnotura.com/pull/1 açıldı. İlkLinuxCI app-ads.txt WindowsCRLF baseline farkını yakaladı. Dosyanın başlangıç0967f72Gitblob(LF) baytları çalışma alanına geri yazıldı, public/app-ads.txt için .gitattributes eol=lf sabitlendi ve fixture hash kaynakGitblobundan yeniden hesaplandı. İçerik/satıcı değişikliği yapılmadı. Nihai kod SHA gitlog/PR head üzerinden okunmalıdır; ilk203e741 commit'ine ek çaprazplatform düzeltme commit'i vardır.
