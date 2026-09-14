# LangEdu

Python proqramlaşdırmasını öyrədən sayt. Layihəni kiçik mərhələlərlə qururuq.

## Mərhələ 1: Nuxt → NestJS bağlantısı

Bu mərhələnin nəticəsi: Nuxt səhifəsi brauzerdən NestJS-in
`GET http://localhost:3001/api/health` endpointinə sorğu göndərir,
JSON cavabını və **“Bağlantı uğurludur”** yazısını göstərir.
“Yenidən yoxla” düyməsi yeni sorğu göndərir. API əlçatan olmadıqda
aydın xəta mesajı görünür; sorğu üçün gözləmə müddəti 5 saniyədir.

### Yoxlanmış mühit

- Windows / PowerShell
- Node.js: `24.20.0`
- npm: `11.19.0`
- Nuxt: `4.5.2`, Vue 3, NestJS: `12.0.2`, TypeScript: `6.0.x`
- İlkin yoxlamada `pnpm` və `git` əmrləri PATH-də tapılmadı. Əlavə paket meneceri lazım deyil.
- PostgreSQL və Docker standart quraşdırma yollarında tapılmadı; bu mərhələ onlardan asılı deyil.

PowerShell bu kompüterdə `npm.ps1` skriptini bloklayır. Ona görə aşağıdakı
əmrlərdə işləyən `npm.cmd` istifadə olunur. PowerShell siyasətini dəyişmək
lazım deyil. macOS/Linux-da eyni əmrləri `npm` ilə işlət.

### İşə salmaq

Repozitoriyanın kök qovluğunda:

```powershell
npm.cmd ci
npm.cmd run dev
```

Paketlər artıq quraşdırılıbsa, yalnız `npm.cmd run dev` kifayətdir.
`ci` paketləri `package-lock.json`-dakı dəqiq versiyalarla quraşdırır.
Quraşdırmanın sonunda ortaq tiplər və Nuxt-un yaratdığı tip faylları hazırlanır.

- Sayt: <http://localhost:3000>
- API: <http://localhost:3001/api/health>
- Dayandırmaq: terminalda `Ctrl+C`.

`dev` ortaq tip paketini hazırlayır, sonra üç izləmə prosesini başladır:
ortaq tiplər, NestJS və Nuxt. Faylı dəyişəndə uyğun proses yenilənir.
Bir proses bağlananda qalanları da bağlanır.

Başlamazdan əvvəl `predev` portların boş olduğunu həm IPv4, həm IPv6 üçün
yoxlayır. Layihəni ikinci dəfə başlatsan, aydın mesajla dayanır.
Bu yoxlama vacibdir: Nuxt tutulmuş `3000` portundan avtomatik `3001`-ə
keçə bilər və API ünvanına Nuxt cavab verdiyi üçün 404 görünər.
Serveri yalnız bir terminalda başlat; yenidən başlatmazdan əvvəl `Ctrl+C` bas.

Öyrənmək üçün tətbiqləri ayrı terminallarda da başlada bilərsən:

```powershell
# Birinci terminal, kök qovluqda
npm.cmd run dev:api
```

```powershell
# İkinci terminal, kök qovluqda
npm.cmd run dev:web
```

### Nəyi və niyə yaratdıq?

```text
LangEdu/
├── apps/
│   ├── web/                    # Nuxt + Vue: istifadəçinin gördüyü səhifələr
│   │   ├── app/pages/index.vue # API sorğusu və nəticənin göstərilməsi
│   │   ├── app/assets/css/     # Səhifənin görünüşü
│   │   └── nuxt.config.ts     # API ünvanı və Nuxt ayarları
│   └── api/                    # NestJS: REST API
│       └── src/
│           ├── main.ts        # Serverin başladılması, /api prefiksi, CORS
│           ├── app.module.ts  # Tətbiqin əsas modulu
│           └── health/        # GET /api/health
├── packages/
│   └── contracts/src/index.ts # Hər iki tətbiqin istifadə etdiyi HealthResponse
├── tests/e2e/                 # Həqiqi brauzerlə bağlantı yoxlaması
├── package.json              # npm workspaces və ümumi əmrlər
└── package-lock.json         # Quraşdırılan paketlərin dəqiq versiyaları
```

**Workspaces** bir repozitoriyada bir neçə paketi idarə etməyə imkan verir.
Frontend və backend ayrı tətbiqlərdir, amma paketləri kökdən quraşdırırıq
və ortaq tipləri lokal paket kimi istifadə edirik.

**NestJS modulu** əlaqəli hissələri bir yerə yığır. `AppModule`,
`HealthModule`-u qoşur; `HealthModule` isə `HealthController`-i qeydiyyata alır.
**Controller** HTTP sorğusunu qəbul edir. `@Controller('health')` və `@Get()`
birlikdə `/health` yolunu yaradır. `main.ts`-dəki `setGlobalPrefix('api')`
nəticəsində yekun ünvan `/api/health` olur. Bu sadə cavab üçün ayrıca service
lazım deyil; biznes məntiqi yarandıqda service əlavə edəcəyik.

API-də ES modulları (`"type": "module"`) istifadə olunur. Lokal TypeScript
importlarında `.js` uzantısı görəcəksən: build zamanı `.ts` faylları `.js`
olur və Node.js həmin çıxış fayllarını işlədir.

**Contracts** API cavabının formasını təsvir edir. Hər iki tətbiq
`import type { HealthResponse } from '@langedu/contracts'` istifadə edir.
Paket yalnız `.d.ts` tip faylları yaradır; icra olunan kod saxlamır.
TypeScript tipləri proqram yazarkən kömək edir, şəbəkədən gələn məlumatı
icra zamanı avtomatik yoxlamır. Sonrakı mərhələdə giriş məlumatlarına
uyğun validasiya əlavə edəcəyik.

**Nuxt `useFetch`** sorğunu göndərir və `data`, `status`, `error`, `refresh`
verir. `server: false` sayəsində sorğu səhifə brauzerdə açıldıqdan sonra
göndərilir. Bu, ilk məqsədimiz olan brauzer → NestJS əlaqəsini də yoxlayır.

**CORS** lazımdır, çünki `localhost:3000` və `localhost:3001` fərqli origin-lərdir.
NestJS yalnız konfiqurasiya edilmiş frontend origin-i üçün brauzerə cavabı
oxumağa icazə verir. CORS istifadəçi autentifikasiyasını əvəz etmir.

Sorğunun yolu:

```text
Brauzerdə Nuxt səhifəsi
  → GET http://localhost:3001/api/health
  → NestJS HealthController
  → HealthResponse şəklində JSON
  → Nuxt səhifəsində status və cavab
```

Nümunə cavab (`timestamp` hər sorğuda yenilənir):

```json
{
  "status": "ok",
  "service": "langedu-api",
  "timestamp": "2026-09-14T10:00:00.000Z"
}
```

Bu endpoint yalnız API-nin cavab verdiyini göstərir; PostgreSQL və Judge0
hazırlığını yoxlamır.

### Mühit dəyişənləri

Standart ünvanlarla işləmək üçün `.env` yaratmağa ehtiyac yoxdur.
Dəyişiklik lazım olsa, kök qovluqdan nümunələri kopyala:

```powershell
Copy-Item apps/api/.env.example apps/api/.env
Copy-Item apps/web/.env.example apps/web/.env
```

| Fayl | Dəyişən | Standart dəyər | Məqsəd |
| --- | --- | --- | --- |
| `apps/api/.env` | `PORT` | `3001` | API portu |
| `apps/api/.env` | `HOST` | `127.0.0.1` | API-nin lokal dinləmə ünvanı |
| `apps/api/.env` | `WEB_ORIGIN` | `http://localhost:3000` | CORS üçün frontend origin-i |
| `apps/web/.env` | `NUXT_PUBLIC_API_BASE` | `http://localhost:3001/api` | Nuxt-un sorğu göndərdiyi API bazası |

API `.env` faylını Node.js-in `loadEnvFile` funksiyası ilə oxuyur.
Nuxt inkişaf və build zamanı öz `.env` faylını oxuyur.
İstehsal mühitində Nuxt dəyişənlərini serverin mühit dəyişənləri kimi ver.
`NUXT_PUBLIC_*` dəyərləri brauzerdə görünür; burada məxfi açar saxlanmır.
Dəyişiklikdən sonra serverləri yenidən başlat.

Frontend-i `http://localhost:3000` ilə aç: `http://127.0.0.1:3000` ayrıca
origin sayılır. Portu dəyişsən, frontend ünvanı və `WEB_ORIGIN` uyğun olmalıdır.

### Yoxlamalar

```powershell
npm.cmd run typecheck
npm.cmd run build
npm.cmd run test:e2e
```

- `typecheck`: bütün workspace-lərin TypeScript uyğunluğu.
- `build`: contracts, NestJS və Nuxt-un build-i.
- `test:e2e`: brauzerdən real HTTP 200 cavabı, CORS, JSON-un göstərilməsi,
  düymə ilə təkrar sorğu, şəbəkə xətası və bağlantının bərpası.

Brauzer testləri standart portlardan istifadə edir və lazım olsa serverləri
özləri başladır. Windows-da quraşdırılmış Microsoft Edge istifadə olunur.
Başqa sistemdə bir dəfə `npx playwright install chromium` işlə.
Windows-da Edge yoxdursa, `npx.cmd playwright install chromium` işlədib
`$env:PLAYWRIGHT_CHANNEL = 'chromium'` təyin edə bilərsən.

API-ni ayrıca yoxlamaq üçün:

```powershell
Invoke-RestMethod http://localhost:3001/api/health
```

Brauzerdə `F12` → **Network** bölməsində `health` sorğusunun URL-ni,
`200` statusunu və JSON cavabını görmək olar.

### Növbəti kiçik mərhələlər

1. Python haqqında səhifə və ilk dərsin frontend/API axını.
2. PostgreSQL bağlantısı və dərslərin bazada saxlanması.
3. CodeMirror və ayrıca sandbox-da Judge0 vasitəsilə nümunələrin icrası.
4. Testlərlə yoxlanan tapşırıqlar, sonra quizlər.
5. İstifadəçi hesabı, irəliləyiş və sadə admin paneli.

**İstifadəçi Python kodu NestJS prosesində icra edilməyəcək.** İcra hissəsi
əlavə olunanda backend yalnız ayrıca Judge0 sandbox xidmətinə müraciət edəcək.
Bu mərhələdə kod icrası, verilənlər bazası və istifadəçi hesabı qurulmayıb.

### Git ilə dəyişikliklərin saxlanması

Bu kök qovluq bütün workspace-lər üçün tək Git repozitoriyasıdır.
`commit` dəyişikliklərin lokal tarixçəsini saxlayır, `push` həmin commit-ləri
GitHub-a göndərir. Hər tamamlanmış kiçik mərhələni ayrıca commit edirik.

Sonrakı dəyişikliklər üçün kök qovluqda:

```powershell
git status
git diff
git add apps/web/app/pages/index.vue
git commit -m "feat: add Python introduction page"
git push
```

Buradakı fayl yolu və commit mesajı nümunədir; dəyişdirdiyin fayllara və
gördüyün işə uyğunlaşdır. Push-dan əvvəl dəyişiklik üçün uyğun yoxlamaları işlə.
`.env`, `node_modules`, build və test nəticələri `.gitignore` ilə kənarda qalır.
Git yeni quraşdırılıbsa, əmr tanınması üçün VS Code-u yenidən açmaq lazım ola bilər.

### Rəsmi mənbələr

- [Nuxt quraşdırılması](https://nuxt.com/docs/4.x/getting-started/installation)
- [Nuxt useFetch](https://nuxt.com/docs/4.x/api/composables/use-fetch)
- [Nuxt konfiqurasiyası](https://nuxt.com/docs/4.x/getting-started/configuration)
- [NestJS ilk addımlar](https://docs.nestjs.com/first-steps)
- [NestJS CORS](https://docs.nestjs.com/security/cors)
