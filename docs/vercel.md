# Vercel-ə yerləşdirmə

Bir GitHub repozitoriyasından iki Vercel layihəsi yaradılır.
PostgreSQL ayrıca bulud xidməti olmalıdır; kompüterdəki Docker bazası Vercel-dən
əlçatan deyil. Docker volume avtomatik buluda köçürülmür.

```text
Brauzer (Nuxt) → HTTPS NestJS /api → PostgreSQL
                açıq API ünvanı     gizli DATABASE_URL
```

DB istifadəçi adı və parolu yalnız API layihəsində `DATABASE_URL` daxilində
saxlanır. Web layihəsinə Neon/Postgres inteqrasiyasını bağlama; onu API-yə bağla.
Web-də DB environment dəyişənləri varsa, sil. API ünvanında username, password
və query parametrləri olmamalıdır. Əgər DB parolu əvvəllər public dəyişənlə
yayımlanıbsa, provayderdə onu dəyiş və API environment-ini yenilə.

## Bu layihənin domenləri

- Frontend: `https://web-three-rose-51.vercel.app`
- Backend üçün göstərilən domen: `https://web-u3du.vercel.app`
- Web environment: `NUXT_PUBLIC_API_BASE=https://web-u3du.vercel.app/api`
- API environment: `WEB_ORIGIN=https://web-three-rose-51.vercel.app`
- API environment: `DATABASE_URL` — bulud bazasının gizli bağlantısı.

Backend domeninin aid olduğu layihədə Root Directory mütləq `apps/api`,
Framework isə NestJS olmalıdır. Domenin adında `web` olması onun Nuxt olması
demək deyil; layihənin ayarları həlledicidir. Domen dəyişsə URL-ləri də yenilə.

## Import ayarları

| Ayar | Frontend | Backend |
| --- | --- | --- |
| Təklif edilən ad | `langedu-web` | `langedu-api` |
| Root Directory | `apps/web` | `apps/api` |
| Framework | Nuxt | NestJS |
| Node.js | 24.x | 24.x |
| Install Command | `cd ../.. && npm ci` | `cd ../.. && npm ci` |
| Build Command | `npm run build` | NestJS preset-in standart ayarı |
| Output Directory | Nuxt preset-in standart ayarı | NestJS preset-in standart ayarı |

Hər iki layihədə **Include source files outside of the Root Directory in the
Build Step** seçimini aktiv saxla. Kök `package-lock.json` və
`packages/contracts` hər iki tətbiq üçün lazımdır. `npm ci` sonunda kök
`postinstall` ortaq tipləri və Nuxt tiplərini hazırlayır. Backend üçün `dist`
qovluğunu statik output kimi seçmə; Vercel `src/main.ts` girişini aşkarlayır.
`vercel.json` faylları framework və build/install ayarlarını repoda saxlayır.

## Mühit dəyişənləri

Ünvanlar nümunədir; Vercel-də layihəyə faktiki verilmiş ünvanlarla əvəz et.

| Layihə | Dəyişən | Nümunə/məqsəd |
| --- | --- | --- |
| API | `DATABASE_URL` | Bulud PostgreSQL bağlantısı; provayderin TLS və pooler ayarları ilə |
| API | `WEB_ORIGIN` | `https://langedu-web.vercel.app` — sonda slash yoxdur |
| Web | `NUXT_PUBLIC_API_BASE` | `https://langedu-api.vercel.app/api` |

`DATABASE_URL` yalnız API layihəsində saxlanır. Onu `NUXT_PUBLIC_*` dəyişəninə,
`vercel.json` faylına və ya GitHub-a yazma. `HOST` və `PORT` Vercel-də əl ilə
təyin edilmir. `VERCEL` dəyişənini platforma özü verir.

Vercel-də API yerli `.env` oxumur. Frontend-in build-i HTTPS API ünvanı olmadan
dayanır; bu, yayımlanmış saytın səhvən `localhost`-a sorğu göndərməsinin qarşısını alır.

## İlk bulud bazasını hazırlamaq

1. Provayderdə ayrıca baza və tətbiq istifadəçisi yarat. API üçün mümkündürsə
   pooled URL, migrasiya üçün provayderin tövsiyə etdiyi birbaşa bağlantını götür.
2. Kompüterdə `apps/api/.env.cloud` faylı yarat və içinə yalnız həmin bulud
   bazasının `DATABASE_URL` dəyərini yaz. Bu fayl Git-dən kənarda qalır.
3. Kök qovluqda, ünvanın düzgün bazaya aid olduğunu yoxladıqdan sonra işlə:

```powershell
node --env-file=apps/api/.env.cloud apps/api/database/migrate.mjs
node --env-file=apps/api/.env.cloud apps/api/database/seed.mjs
```

Bu əmrlər sxemi və başlanğıc dərsini yaradır. Mövcud lokal redaktələri köçürmür.
Mövcud shell-də `DATABASE_URL` təyin edilibsə, Node onu `.env.cloud` dəyərindən
üstün tutur: əmrləri belə dəyişən təyin edilməmiş yeni terminalda işlə.
Migrasiya istifadəçisinə sxemi dəyişmək icazəsi lazımdır.
Build və tətbiqin başlanğıcı migrasiya və seed işləmir.

## Deploy ardıcıllığı

1. Bulud bazasını hazırla, migrasiya və seed-i işlə.
2. API-ni import et, `DATABASE_URL` və planlaşdırılmış frontend `WEB_ORIGIN`-ini
   əlavə et, deploy et. `/api/health` və `/api/lessons/ilk-proqram` ünvanlarını yoxla.
3. Web-i import et, API-nin faktiki ünvanını `NUXT_PUBLIC_API_BASE` kimi əlavə et,
   deploy et.
4. Web-in faktiki ünvanı fərqli çıxsa, API-də `WEB_ORIGIN`-i düzəlt və redeploy et.
5. Saytda dərsi aç; brauzerdə Network bölməsində sorğunun uğurlu olduğunu yoxla.

`/api/health` API-nin cavabını, `/api/health/ready` isə hər sorğuda PostgreSQL-ə
çıxışı və `lessons` cədvəlini yoxlayır. Readiness uğurda 200, problem olduqda
məxfi məlumat açıqlamadan 503 qaytarır. Başlanğıc dərsini
`/api/lessons/ilk-proqram` ilə də yoxla. Deploy uğuru yalnız lokal
build ilə təsdiqlənmir; canlı mühitdə bu yoxlamalar ayrıca aparılmalıdır.

Environment dəyişikliyindən sonra redeploy tələb olunur. Web build-də
`NUXT_PUBLIC_API_BASE` xətası çıxsa, yuxarıdakı faktiki API ünvanını daxil et.
Brauzerin Network bölməsində sorğu API domeninə getməli, cavabda yalnız dərs
məlumatı olmalıdır. Nuxt public runtime config yalnız `apiBase` daşıyır;
`pg` və baza servisi API daxilindədir, contracts yalnız tiplərdir.

## Preview deploy-lar

Production və Preview mühit dəyişənlərini ayrı təyin et. Preview üçün ayrıca
test bazası istifadə et. `WEB_ORIGIN` bir neçə dəqiq HTTPS origin-i vergüllə
qəbul edir; bütün `*.vercel.app` domenlərinə icazə vermirik.
Preview frontend ünvanını preview API allowlist-inə əlavə edib API-ni yenidən
deploy etmək lazım ola bilər. Sınaq üçün sabit branch domeni daha rahatdır.

API preview-si Deployment Protection ilə qorunursa, brauzerdən gələn sorğu
API-yə çatmaya bilər. Production yoxlamasını uyğun production API ünvanında
apar; qoruma açarlarını frontend-ə yerləşdirmə. Preview inteqrasiyasını ayrıca
sazlamaq lazımdır.

## Bağlantı hovuzu

API hər instance üçün ən çox 5 PostgreSQL bağlantısı saxlayır. Vercel-də
`attachDatabasePool` boş bağlantıların funksiya dayandırılarkən buraxılmasına
kömək edir. Ümumi bağlantı sayı instance sayı ilə artır; bulud bazasının
connection limitinə uyğun pooler və region seç.

## Mənbələr

- [NestJS on Vercel](https://vercel.com/docs/frameworks/backend/nestjs)
- [Nuxt on Vercel](https://vercel.com/docs/frameworks/full-stack/nuxt)
- [Monorepo ayarları](https://vercel.com/docs/monorepos/monorepo-faq)
- [Bağlantı hovuzu](https://vercel.com/kb/guide/connection-pooling-with-functions)
