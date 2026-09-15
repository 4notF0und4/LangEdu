# LangEdu

Proqramlaşdırma dilləri, framework və kitabxanalar üçün Azərbaycan dilində
bilik və öyrənmə platforması. İlk işlək texnologiya Python-dur.

## Texnologiya sahələri və yeni dizayn

- `/`: axtarış və növ filtrləri olan texnologiya kataloqu.
- `/python`: Python sahəsinin icmalı və öyrənmə istiqamətləri.
- `/python/melumat`: tarixçə, nəzəriyyə, ekosistem və rəsmi mənbələrə istinadlarla
  ensiklopedik məlumat kitabçası. Ad və terminlər xarici resurslara, nömrəli
  istinadlar səhifənin mənbə siyahısına aparır.
- `/python/ilk-proqram`: PostgreSQL-dən gələn ilk dərs və kod nümunəsi.
- `/python/praktika`: hazırlanmaqda olan kod icrası, tapşırıq və quiz imkanları.

`app/app.vue` ümumi başlıq və altlığı, `TechnologyWorkspace.vue` isə texnologiya
sahəsinin yan menyusunu və bölmə keçidlərini paylaşır. Mobil ekranda bölmə
keçidləri yan menyunu əvəz edir. `app/data/technologies.ts` kataloqun ad, növ və
mövcudluq metadatasını saxlayır. Digər texnologiyalar hazır dərs kimi təqdim edilmir.

Bu mərhələ informasiya quruluşunu və interfeysi yeniləyir. Python dərslərinin
API və baza modeli hələ Python-a aiddir. Yeni texnologiyanın dərslərini əlavə
edəndə texnologiya identifikatoru və texnologiya daxilində unikal dərs slug-ı üçün
baza migrasiyası, API və contracts yenilənməlidir. Təkcə kataloqa kart əlavə
etmək yeni dərs sahəsi yaratmır. Məlumat kitabçası hələ frontend məzmunudur.
Praktikada kod icrası, avtomatik qiymətləndirmə və quizlər hələ aktiv deyil.

Ensiklopediya mənbələri və mündəricatı `app/data/python-reference.ts` faylındadır.
`PythonCitation.vue` mənbə identifikatorundan nömrəli keçid yaradır. Yeni fakt
əlavə edəndə ilkin mənbəni yoxla, aid olduğu abzasda istinad göstər və məqalənin
mənbə yoxlama tarixini yenilə. Bu məqalə dərs API-sindən ayrı redaksiya məzmunudur.

## Mərhələ 3: Dərslərin PostgreSQL-də saxlanması

Dərs API-si məzmunu PostgreSQL-dən oxuyur. `Lesson` cavab tipi və Nuxt
səhifəsinin ünvanı dəyişməyib. Statik məzmun yalnız bazanı ilk dəfə dolduran
`apps/api/database/seed-lessons.json` faylında qalıb; API həmin faylı oxumur.

- `lessons`: dərsin slug-ı, başlığı, izahı və kod nümunəsi.
- `lesson_sections`: dərsin bölmələri; `lesson_id` dərsə bağlayır,
  `position` göstərilmə sırasını müəyyən edir.
- `schema_migrations`: tətbiq edilmiş SQL migrasiyalarının tarixçəsi.
- `DatabaseService`: məhdud sayda PostgreSQL bağlantısını idarə edir.
- `LessonsService`: parametrli SQL sorğusu ilə məlumatı alıb `Lesson` cavabına çevirir.

**Migrasiya** baza sxemini dəyişir. SQL faylları
`apps/api/database/migrations` qovluğunda sıra ilə tətbiq olunur.
Artıq tətbiq edilmiş faylı dəyişmə; yeni dəyişiklik üçün yeni nömrəli SQL faylı yarat.
Migrasiyalar transaction daxilində işləyir: xəta olarsa dəyişikliklər geri qaytarılır.
Paralel migrasiya prosesləri bazadakı kilidlə növbələnir.

**Seed** ilkin dərsi və bölmələrini əlavə edir. Təkrar işlətmək təhlükəsizdir:
dərs çoxalmır və mövcud məzmunun redaktələri əvəz edilmir.

### PostgreSQL-i hazırlamaq

Lokal inkişaf üçün Docker Desktop-da Linux konteynerlərindən istifadə edirik.
Docker Desktop işlək olduqdan sonra kök qovluqda:

```powershell
npm.cmd ci
npm.cmd run db:configure
docker compose up -d --wait db
npm.cmd run db:migrate
npm.cmd run db:seed
npm.cmd run dev
```

`db:configure` yalnız ilk dəfə işlədilir. Docker üçün kök `.env`, API üçün
`apps/api/.env` yaradır və administrator/tətbiq üçün ayrı təsadüfi parollar seçir.
Mövcud faylları əvəz etmir. Bu kompüterdə həmin fayllar artıq hazırlanıb.

`compose.yaml` PostgreSQL 18 konteynerini yalnız `127.0.0.1:5432` ünvanına
bağlayır. `docker/postgres/init-app.sh` boş volume-da ilk başlanğıc zamanı
superuser olmayan tətbiq istifadəçisini yaradır. `postgres_data` adlı volume
baza məlumatlarını saxlayır. [Rəsmi PostgreSQL Docker image sənədi](https://hub.docker.com/_/postgres)

Gündəlik istifadə:

```powershell
docker compose up -d --wait db
npm.cmd run dev
```

Tətbiqi terminalda `Ctrl+C`, bazanı isə `docker compose stop db` ilə dayandır.
`docker compose down` konteyneri silsə də volume qalır. `down -v` məlumatları
da silir — adi dayandırma üçün istifadə etmə. `.env` parolunu dəyişmək artıq
yaradılmış bazanın parolunu dəyişmir; mövcud volume-un parolu ilə uyğunluq saxla.

Docker əmri tanınmırsa, quraşdırmadan sonra VS Code-u yenidən aç.
Docker-in Linux mühərriki üçün WSL 2 hazır olmalıdır.

### Mövcud və ya bulud bazasından istifadə

İşləyən PostgreSQL bazası və ona qoşula bilən istifadəçi lazımdır.
Lokal və ya bulud PostgreSQL istifadə oluna bilər. Bu layihə üçün ayrıca
`langedu` bazası və superuser olmayan `langedu` istifadəçisi yarat.
Administrator kimi `psql` daxilində nümunə:

```sql
CREATE ROLE langedu LOGIN;
\password langedu
CREATE DATABASE langedu OWNER langedu;
```

`\password` parolu interaktiv qəbul edir. API administrator hesabı ilə qoşulmur.
Kök qovluqdan, `.env` faylı hələ yoxdursa:

```powershell
Copy-Item apps/api/.env.example apps/api/.env
```

`apps/api/.env` daxilində `DATABASE_URL` dəyərini real baza ünvanı və parolla
əvəz et. Parolda URL üçün xüsusi simvollar varsa, onları URL-encode et.
Bulud bazasında provayderin verdiyi TLS/SSL parametrlərini saxla.
`.env` və `.local/` Git-ə daxil edilmir; parolu commit və ya çat mesajına yazma.

Sonra layihənin kök qovluğunda:

```powershell
npm.cmd ci
npm.cmd run db:migrate
npm.cmd run db:seed
npm.cmd run dev
```

Mövcud hazırlanmış bazada gündəlik başlanğıc üçün yalnız `npm.cmd run dev`
lazımdır. Build migrasiya və seed işləmir, baza məlumatlarını dəyişmir.
API açılarkən bağlantını və `lessons` cədvəlini yoxlayır. Bazaya çıxış və ya
migrasiya yoxdursa, izahlı mesajla dayanır. Sonradan SQL sorğusu alınmasa
dərs endpointi HTTP 503, mövcud olmayan dərs üçün HTTP 404 qaytarır.

### Baza yoxlaması

```powershell
npm.cmd run test:db
npm.cmd run test:e2e
```

`test:db` real PostgreSQL-də təsadüfi adlı ayrıca test sxemi yaradır və sonda
yalnız həmin sxemi silir. Lokal inkişaf/test bazasında işlət; istehsal bazası
üçün istifadə etmə. Test istifadəçisinə həmin bazada sxem yaratmaq icazəsi lazımdır.
Test migrasiya və seed-in təkrar icrasını, redaktənin saxlanmasını, API-nin
bazadakı dəyişikliyi görməsini, bölmə sırasını, 404 və 503 cavablarını yoxlayır.
`test:e2e` üçün əsas inkişaf bazasında migrasiya və seed əvvəlcədən işlədilməlidir.

## Mərhələ 2: İlk Python dərsi

Ana səhifədə **İlk dərsə başla** keçidi `/python/ilk-proqram` səhifəsini açır.
Səhifə `GET /api/lessons/ilk-proqram` sorğusu ilə dərsi NestJS-dən alır:
Python haqqında giriş, `print()` izahı, kod nümunəsi və gözlənilən nəticə.
Məzmun Azərbaycan dilindədir. Kod bu mərhələdə icra edilmir.

Bu axında hissələrin vəzifələri:

- `LessonsController`: URL-dən `slug` qəbul edir və service-i çağırır.
- `LessonsService`: dərsi tapır; mövcud olmayan slug üçün HTTP 404 qaytarır.
- Mərhələ 3-dən etibarən məzmun PostgreSQL-də saxlanır.
- `packages/contracts` daxilində `Lesson`: API cavabının ortaq tipidir.
- `apps/web/app/pages/python/[slug].vue`: məzmunu, yüklənmə və xəta vəziyyətlərini göstərir.

`slug` dərsin URL-dəki oxunaqlı identifikatorudur: məsələn, `ilk-proqram`.
Məlumatın saxlanması mərhələ 3-də PostgreSQL-ə keçirilib.
Məzmun Vue mətn interpolasiyası ilə göstərilir; API-dən HTML icra edilmir.
Hazırda sorğu brauzerdən göndərilir. Dərs səhifələrinin SSR/SEO davranışını
ictimai yayıma hazırlıq mərhələsində ayrıca işləyəcəyik.

Brauzer testləri ana səhifədən keçidi, birbaşa açılışı, API məzmununu,
yüklənməni, şəbəkə xətasından bərpanı və mövcud olmayan dərsi yoxlayır.

## Mərhələ 1: Nuxt → NestJS bağlantısı

İlk mərhələdə əlaqə `/api/health` vasitəsilə yoxlanılıb. Diaqnostika bloku
artıq ana səhifədən çıxarılıb; ana səhifə istifadəçini ilk dərsə yönləndirir.
Endpoint API-ni ayrıca yoxlamaq üçün saxlanılır. Brauzer → NestJS əlaqəsi
dərs səhifəsində real məzmun sorğusu ilə yoxlanılır.

### Yoxlanmış mühit

- Windows / PowerShell
- Node.js: `24.20.0`
- npm: `11.19.0`
- Nuxt: `4.5.2`, Vue 3, NestJS: `12.0.2`, TypeScript: `6.0.x`
- İlkin yoxlamada `pnpm` və `git` əmrləri PATH-də tapılmadı. Əlavə paket meneceri lazım deyil.
- İlkin mərhələdə baza tələb olunmurdu; cari versiya işləyən PostgreSQL tələb edir.

PowerShell bu kompüterdə `npm.ps1` skriptini bloklayır. Ona görə aşağıdakı
əmrlərdə işləyən `npm.cmd` istifadə olunur. PowerShell siyasətini dəyişmək
lazım deyil. macOS/Linux-da eyni əmrləri `npm` ilə işlət.

### İşə salmaq

Repozitoriyanın kök qovluğunda:

```powershell
npm.cmd ci
npm.cmd run db:migrate
npm.cmd run db:seed
npm.cmd run dev
```

Əvvəlcə yuxarıdakı PostgreSQL hazırlığını və `apps/api/.env` ayarını tamamla.
Paketlər və baza artıq hazırlanıbsa, yalnız `npm.cmd run dev` kifayətdir.
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
`import type { Lesson } from '@langedu/contracts'` istifadə edir.
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
  → GET http://localhost:3001/api/lessons/ilk-proqram
  → NestJS LessonsController → PostgreSQL
  → Lesson şəklində JSON
  → Nuxt səhifəsində dərs məzmunu
```

Ayrıca `/api/health` endpointinin nümunə cavabı (`timestamp` hər sorğuda yenilənir):

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

API üçün `DATABASE_URL` mütləqdir. Mövcud `.env` fayllarını əvəz etmədən,
lazım olan nümunələri kök qovluqdan kopyala:

```powershell
Copy-Item apps/api/.env.example apps/api/.env
Copy-Item apps/web/.env.example apps/web/.env
```

| Fayl | Dəyişən | Standart dəyər | Məqsəd |
| --- | --- | --- | --- |
| `apps/api/.env` | `PORT` | `3001` | API portu |
| `apps/api/.env` | `HOST` | `127.0.0.1` | API-nin lokal dinləmə ünvanı |
| `apps/api/.env` | `WEB_ORIGIN` | `http://localhost:3000` | CORS üçün frontend origin-i |
| `apps/api/.env` | `DATABASE_URL` | Real bağlantı tələb olunur | PostgreSQL bağlantısı |
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
- `test:e2e`: API health cavabı, ana səhifədən dərsə keçid, real dərs məzmunu,
  şəbəkə xətasından sonra təkrar cəhd və mövcud olmayan dərs üçün 404 davranışı.

Brauzer testləri standart portlardan istifadə edir və lazım olsa serverləri
özləri başladır. Windows-da quraşdırılmış Microsoft Edge istifadə olunur.
Başqa sistemdə bir dəfə `npx playwright install chromium` işlə.
Windows-da Edge yoxdursa, `npx.cmd playwright install chromium` işlədib
`$env:PLAYWRIGHT_CHANNEL = 'chromium'` təyin edə bilərsən.

API-ni ayrıca yoxlamaq üçün:

```powershell
Invoke-RestMethod http://localhost:3001/api/health
```

Dərs səhifəsində `F12` → **Network** bölməsində `ilk-proqram` sorğusunun URL-ni,
`200` statusunu və JSON cavabını görmək olar.

### Növbəti kiçik mərhələlər

1. Tamamlandı: Python haqqında məlumat və ilk dərsin frontend/API axını.
2. PostgreSQL bağlantısı, migrasiya və seed vasitəsilə dərslərin saxlanması.
3. CodeMirror və ayrıca sandbox-da Judge0 vasitəsilə nümunələrin icrası.
4. Testlərlə yoxlanan tapşırıqlar, sonra quizlər.
5. İstifadəçi hesabı, irəliləyiş və sadə admin paneli.

**İstifadəçi Python kodu NestJS prosesində icra edilməyəcək.** İcra hissəsi
əlavə olunanda backend yalnız ayrıca Judge0 sandbox xidmətinə müraciət edəcək.
Bu mərhələdə kod icrası və istifadəçi hesabı qurulmayıb.

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
