<script setup lang="ts">
import { technologies } from "~/data/technologies";
import { pythonContents, pythonReferences } from "~/data/python-reference";
const python = technologies[0]!;
useHead({
  title: "Python haqqında — Tarixçə, nəzəriyyə və mənbələr · LangEdu",
  meta: [
    {
      name: "description",
      content:
        "Python-un yaranması, Guido van Rossum, dilin fəlsəfəsi, tiplər, funksiyalar, ekosistem və istifadə sahələri. Rəsmi mənbələrə istinadlarla Azərbaycan dilində nəzəriyyə.",
    },
  ],
});
</script>
<template>
  <TechnologyWorkspace :technology="python">
    <main class="workspace-content reference-layout encyclopedia-layout">
      <article
        class="prose encyclopedia"
        aria-labelledby="python-article-title"
      >
        <p class="eyebrow">MƏLUMAT KİTABÇASI / ENSİKLOPEDİYA</p>
        <h1 id="python-article-title">Python <em>nədir?</em></h1>
        <p class="lead">
          Python — ümumi təyinatlı, yüksək səviyyəli proqramlaşdırma dilidir.
          Prosedur, obyekt yönümlü və funksional proqramlaşdırma yanaşmalarını
          dəstəkləyir. Oxunaqlı sintaksisi və geniş ekosistemi onun fərqli
          sahələrdə tətbiqinə imkan verir.<PythonCitation source="faq" />
        </p>
        <div class="article-meta">
          <span>Nəzəriyyə · Python 3</span
          ><span
            >Mənbələr yoxlanılıb:
            <time datetime="2026-09-15">15 sentyabr 2026</time></span
          >
        </div>
        <p class="reading-guide">
          İstədiyin bölmədən başla. Altından xətt çəkilmiş adlar əlavə məlumat
          səhifələrinə, nömrəli istinadlar isə aşağıdakı mənbə siyahısına
          aparır.
        </p>

        <section id="qisa-melumat" aria-labelledby="facts-title">
          <h2 id="facts-title">Qısa məlumat</h2>
          <dl class="encyclopedia-facts">
            <div>
              <dt>Müəllif</dt>
              <dd>
                <a href="https://gvanrossum.github.io/">Guido van Rossum</a
                ><PythonCitation source="guido" />
              </dd>
            </div>
            <div>
              <dt>Yaranma yeri</dt>
              <dd>
                Niderland, <a href="https://www.cwi.nl/">CWI</a> tədqiqat
                institutu<PythonCitation source="history" />
              </dd>
            </div>
            <div>
              <dt>Başlanğıc / ilk paylaşım</dt>
              <dd>Dekabr 1989 / fevral 1991<PythonCitation source="faq" /></dd>
            </div>
            <div>
              <dt>Adının mənşəyi</dt>
              <dd>
                <a
                  href="https://docs.python.org/3/faq/general.html#why-is-it-called-python"
                  >Monty Python’s Flying Circus</a
                >
                komediya proqramı<PythonCitation source="faq" />
              </dd>
            </div>
            <div>
              <dt>Əsas reallaşdırma</dt>
              <dd>
                <a href="https://docs.python.org/3/glossary.html#term-CPython"
                  >CPython</a
                ><PythonCitation source="glossary" />
              </dd>
            </div>
            <div>
              <dt>Lisenziya</dt>
              <dd>
                <a href="https://docs.python.org/3/license.html#psf-license"
                  >PSF License Version 2</a
                >; açıq mənbə<PythonCitation source="history" />
              </dd>
            </div>
            <div>
              <dt>Rəsmi resurslar</dt>
              <dd>
                <a href="https://www.python.org/">python.org</a> ·
                <a href="https://docs.python.org/3/">Sənədlər</a> ·
                <a href="https://github.com/python/cpython">Mənbə kodu</a>
              </dd>
            </div>
          </dl>
        </section>

        <section id="tarixce">
          <h2>Necə yaranıb və kim yaradıb?</h2>
          <p>
            <a href="https://gvanrossum.github.io/">Guido van Rossum</a>
            Python-u CWI-də işləyərkən yaratdı. O, əvvəllər
            <a
              href="https://docs.python.org/3/faq/general.html#why-was-python-created-in-the-first-place"
              >ABC dili</a
            >
            üzərində işləmişdi. ABC-nin oxunaqlılığı və yüksək səviyyəli məlumat
            strukturları ona təsir göstərdi; Python-da isə genişləndirilə bilən
            bir dil qurmaq istədi.<PythonCitation
              source="guido"
            /><PythonCitation source="faq" />
          </p>
          <p>
            CWI-dəki
            <a
              href="https://docs.python.org/3/faq/general.html#why-was-python-created-in-the-first-place"
              >Amoeba</a
            >
            paylanmış əməliyyat sistemi layihəsi üçün sistem idarəetməsini
            asanlaşdıran vasitə lazım idi. Van Rossum 1989-cu ilin Milad
            tətilində dilin reallaşdırılmasına başladı. Təxminən bir il sonra,
            1991-ci ilin fevralında onu Usenet vasitəsilə ictimaiyyətlə
            paylaşdı.<PythonCitation source="faq" />
          </p>
          <p>
            “Python” adı ilandan götürülməyib. Van Rossum həmin vaxt
            <a
              href="https://docs.python.org/3/faq/general.html#why-is-it-called-python"
              >Monty Python’s Flying Circus</a
            >
            proqramının ssenarilərini oxuyurdu və dil üçün qısa, fərqli ad
            axtarırdı.<PythonCitation source="faq" />
          </p>
        </section>

        <section id="inkisaf">
          <h2>İnkişaf mərhələləri</h2>
          <ol class="history-timeline">
            <li>
              <strong>1989–1991 · İlk addımlar</strong>
              <p>
                Şəxsi layihə kimi başlayan dil CWI-də istifadə olundu və daha
                sonra açıq paylaşıldı.<PythonCitation source="faq" />
              </p>
            </li>
            <li>
              <strong>1995 · CNRI dövrü</strong>
              <p>
                Van Rossum ABŞ-dakı
                <a href="https://www.cnri.reston.va.us/"
                  >Corporation for National Research Initiatives</a
                >
                təşkilatında Python üzərində işləməyə davam etdi.<PythonCitation
                  source="history"
                />
              </p>
            </li>
            <li>
              <strong>2000–2001 · Yeni təşkilati əsas</strong>
              <p>
                PythonLabs komandası əvvəl BeOpen.com-a, sonra Digital
                Creations-a keçdi. Python 2.0 2000-ci ildə çıxdı. 2001-ci ildə
                Python Software Foundation yaradıldı.<PythonCitation
                  source="history"
                />
              </p>
            </li>
            <li>
              <strong>2008 · Python 3.0</strong>
              <p>
                3 dekabr 2008-də yayımlandı. Köhnə dizayn qərarlarını yeniləmək
                üçün Python 2 ilə tam geriyə uyğunluq qorunmadı.<PythonCitation
                  source="python3"
                />
              </p>
            </li>
            <li>
              <strong>2020 · Python 2 dəstəyinin sonu</strong>
              <p>
                1 yanvar 2020-dən Python 2-nin rəsmi dəstəyi dayandırıldı. Yeni
                öyrənənlər Python 3 materiallarından istifadə
                etməlidir.<PythonCitation source="sunset" />
              </p>
            </li>
          </ol>
          <p>
            Python 2 və Python 3 fərqi təkcə versiya nömrəsi deyil. Məsələn,
            Python 3-də <code>print()</code> funksiyadır, mətn üçün
            <code>str</code> və ikili məlumat üçün <code>bytes</code> ayrılır.
            Köhnə dərslərdəki kod yeni versiyada dəyişiklik tələb edə bilər.
            <a href="https://docs.python.org/3/whatsnew/3.0.html"
              >Python 3.0 dəyişiklikləri</a
            >
            bu keçidi izah edir.
          </p>
          <p>
            Ən yeni buraxılış və dəstək məlumatı üçün
            <a href="https://www.python.org/downloads/"
              >rəsmi yükləmə səhifəsinə</a
            >
            bax. Buradakı nəzəri izahlar Python 3 ailəsinə aiddir.
          </p>
        </section>

        <section id="felsefe">
          <h2>Dizayn fəlsəfəsi: oxunaqlı kod</h2>
          <p>
            <a href="https://peps.python.org/pep-0020/">The Zen of Python</a>,
            Tim Peters-in dilin dizayn yanaşmasını ifadə edən prinsipləridir.
            Onların məğzi sadəlik, aydınlıq və oxunaqlılıqdır: kod həm
            kompüterin icra etdiyi göstəriş, həm də insanların oxuduğu mətndir.
            <code>import this</code> həmin prinsipləri Python mühitində
            göstərir.<PythonCitation source="zen" />
          </p>
          <p>
            <a href="https://peps.python.org/pep-0008/">PEP 8</a> kodun yazılış
            üslubuna aiddir. Məsələn, hər girinti səviyyəsi üçün dörd boşluq,
            funksiyalar üçün <code>snake_case</code> adları tövsiyə olunur.
            Üslub tövsiyəsi ilə dil qaydası fərqlidir: düzgün girinti
            sintaksisin hissəsidir, adlandırma üslubu isə kodun vahid
            görünməsinə kömək edir.<PythonCitation source="style" />
          </p>
        </section>

        <section id="sintaksis">
          <h2>Sintaksis və proqramın icrası</h2>
          <p>
            Python-da blokları girinti müəyyən edir. <code>if</code>,
            <code>for</code> və funksiya tərifindən sonra gələn içəri çəkilmiş
            sətirlər həmin blokun tərkibidir. <code>#</code> ilə başlayan
            şərhlər izah üçündür. İnteraktiv mühitdə ifadəni yazıb dərhal
            nəticəni görmək, yaxud kodu <code>.py</code> faylında saxlamaq
            mümkündür.<PythonCitation source="intro" /><PythonCitation
              source="control"
            />
          </p>
          <CodePanel
            label="Şərt və mətn"
            :code="'ad = &quot;Aysel&quot;\nif ad:\n    print(f&quot;Salam, {ad}!&quot;)'"
          />
          <p>
            Burada <code>ad</code> adı mətn obyektinə bağlanır. Boş olmayan mətn
            şərtdə doğru sayıldığı üçün proqram
            <code>Salam, Aysel!</code> yazır.
            <a
              href="https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals"
              ><code>f</code> prefiksi</a
            >
            mətnə ifadə nəticəsi daxil etməyə imkan verir.<PythonCitation
              source="intro"
            />
          </p>
          <p>
            “İnterpretasiya olunan dil” ifadəsi “heç vaxt kompilyasiya edilmir”
            demək deyil. CPython mənbə kodunu
            <a href="https://docs.python.org/3/glossary.html#term-bytecode"
              >baytkoda</a
            >
            çevirir və onu icra edir. Python dilin özüdür, CPython isə həmin
            dili həyata keçirən proqramdır; başqa reallaşdırmaların daxili
            davranışı fərqli ola bilər.<PythonCitation source="glossary" />
          </p>
        </section>

        <section id="tipler">
          <h2>Məlumat tipləri və yaddaş modeli</h2>
          <p>
            Python dinamik tiplənən dildir: adları əvvəlcədən sabit tipli
            dəyişən kimi elan etmək tələb olunmur. Əməliyyatın mümkün
            olub-olmaması istifadə edilən obyektlərin tiplərindən asılıdır.
            Məsələn, <code>3 + "4"</code> avtomatik olaraq iki ədədi toplamır;
            uyğun çevirmə edilmədən xəta yaranır.<PythonCitation
              source="typing"
            /><PythonCitation source="model" />
          </p>
          <p>
            Python-da məlumat obyektlərlə təmsil olunur. Obyektin tipi, dəyəri
            və kimliyi var. Dəyişən adı obyektə istinaddır:
            <code>x = 3</code> adın tam ədədə bağlanmasıdır; sonra
            <code>x = "üç"</code> yazmaq adı başqa obyektə bağlayır. Bu, əvvəlki
            tam ədəd obyektinin tipini dəyişmir.<PythonCitation
              source="model"
            />
          </p>
          <div class="reference-table-wrap">
            <table class="reference-table">
              <caption>
                Əsas tiplərə baxış
              </caption>
              <thead>
                <tr>
                  <th scope="col">Tip</th>
                  <th scope="col">Mənası</th>
                  <th scope="col">Nümunə</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><code>int</code> / <code>float</code></th>
                  <td>Tam və üzən nöqtəli ədəd</td>
                  <td><code>42</code> / <code>3.5</code></td>
                </tr>
                <tr>
                  <th scope="row"><code>str</code></th>
                  <td>Unicode mətn</td>
                  <td><code>"Bakı"</code></td>
                </tr>
                <tr>
                  <th scope="row"><code>bool</code></th>
                  <td>Məntiqi dəyər</td>
                  <td><code>True</code>, <code>False</code></td>
                </tr>
                <tr>
                  <th scope="row"><code>list</code> / <code>tuple</code></th>
                  <td>Dəyişdirilə bilən / dəyişməz ardıcıllıq</td>
                  <td><code>[1, 2]</code> / <code>(1, 2)</code></td>
                </tr>
                <tr>
                  <th scope="row"><code>dict</code></th>
                  <td>Açar–dəyər uyğunluğu</td>
                  <td><code>{"ad": "Aysel"}</code></td>
                </tr>
                <tr>
                  <th scope="row"><code>set</code></th>
                  <td>Təkrarsız elementlər çoxluğu</td>
                  <td><code>{1, 2}</code></td>
                </tr>
                <tr>
                  <th scope="row"><code>NoneType</code></th>
                  <td>Dəyərin olmamasını ifadə edən tip</td>
                  <td><code>None</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Rəqəmlər və sətirlər dəyişməzdir; siyahı və lüğətin məzmunu
            dəyişdirilə bilər. <code>tuple</code> daxilindəki istinadlar
            dəyişməsə də, onun istinad etdiyi siyahı dəyişə bilər. Bu fərq
            funksiyaya məlumat ötürərkən və eyni obyektə bir neçə ad bağlayarkən
            əhəmiyyətlidir.<PythonCitation source="model" /><PythonCitation
              source="types"
            />
          </p>
          <p>
            <a href="https://docs.python.org/3/library/typing.html"
              >Tip annotasiyaları</a
            >
            gözlənilən tipləri göstərir. Məsələn,
            <code>yas: int = 20</code> oxucuya və analiz alətlərinə kömək edir.
            Python icra mühiti bu annotasiyanı avtomatik tip yoxlamasına
            çevirmir; bunun üçün ayrıca tip yoxlayıcısı istifadə oluna
            bilər.<PythonCitation source="typing" />
          </p>
          <p>
            Yaddaş idarəetməsi avtomatlaşdırılıb. CPython istinad sayğacından və
            dövri istinadları aşkar edən təmizləmə mexanizmindən istifadə edir.
            Lakin fayl və şəbəkə bağlantıları kimi resursları vaxtında bağlamaq
            yenə proqramın məsuliyyətidir.<PythonCitation source="model" />
          </p>
        </section>

        <section id="idarəetmə">
          <h2>Şərtlər, dövrlər və funksiyalar</h2>
          <p>
            <code>if / elif / else</code> şərtə görə seçim edir.
            <code>for</code> ardıcıl elementlər üzərində gəzir,
            <code>while</code> isə şərt doğru olduğu müddətdə təkrarlanır.
            <code>break</code> dövrü dayandırır, <code>continue</code> növbəti
            iterasiyaya keçir. Funksiya <code>def</code> ilə tərif edilir;
            parametrlər giriş məlumatını, <code>return</code> nəticəni ifadə
            edir.<PythonCitation source="control" />
          </p>
          <CodePanel
            label="Funksiya və dövr"
            :code="'def kvadrat(eded):\n    return eded * eded\n\nfor eded in range(1, 4):\n    print(kvadrat(eded))'"
          />
          <p>
            Nəticə ayrı sətirlərdə <code>1</code>, <code>4</code> və
            <code>9</code> olur. <code>range(1, 4)</code> son sərhəd olan 4-ü
            daxil etmir. Funksiya eyni hesablama qaydasını fərqli girişlər üçün
            təkrar istifadə etməyə imkan verir.<PythonCitation
              source="control"
            />
          </p>
        </section>

        <section id="obyektler">
          <h2>Obyekt yönümlü yanaşma və xətalar</h2>
          <p>
            <a href="https://docs.python.org/3/tutorial/classes.html"
              >Sinif — class</a
            >
            məlumat və davranışı bir yerdə təsvir edir. Sinifdən yaradılan
            obyektin atributları vəziyyətini, metodları isə edə bildiyi
            əməliyyatları göstərir. Python irsiliyi, o cümlədən çoxsaylı
            irsiliyi dəstəkləyir. Hər işi siniflə qurmaq məcburi deyil: kiçik
            proqram üçün funksiyalar kifayət edə bilər.<PythonCitation
              source="classes"
            />
          </p>
          <p>
            <strong>Sintaksis xətası</strong> kodun dil qaydalarına uyğun
            yazılmamasıdır. <strong>İstisna — exception</strong> isə icra zamanı
            yarana bilər: məsələn, sıfıra bölmə və ya olmayan faylın açılması.
            <code>try / except</code> gözlənilən xətanı idarə edir,
            <code>finally</code> təmizləmə addımı üçün işlənir,
            <code>raise</code> istisna yaradır. Bütün xətaları səssiz udmaq
            problemin səbəbini gizlədə bilər.<PythonCitation source="errors" />
          </p>
          <p>
            <code>with</code> kontekst meneceri ilə resursun həyat dövrünü idarə
            etmək mümkündür. Məsələn, fayl bloku bitəndə, xəta baş versə belə,
            bağlana bilər. Bu yanaşma resursun bağlanmasını hər çıxış yolunda əl
            ilə xatırlamaq ehtiyacını azaldır.<PythonCitation source="errors" />
          </p>
        </section>

        <section id="ekosistem">
          <h2>Modul, paket, kitabxana və framework</h2>
          <dl class="definition-list">
            <div>
              <dt>Modul</dt>
              <dd>
                Adətən Python tərifləri və əmrləri saxlayan bir
                <code>.py</code> faylıdır. <code>import</code> başqa modulun
                imkanlarından istifadə etməyə kömək edir.<PythonCitation
                  source="modules"
                />
              </dd>
            </div>
            <div>
              <dt>Paket</dt>
              <dd>
                Modulları ad məkanı altında təşkil edir. Quraşdırılan
                distributiv paketin adı ilə kodda import edilən ad həmişə eyni
                olmaya bilər.<PythonCitation source="modules" /><PythonCitation
                  source="packaging"
                />
              </dd>
            </div>
            <div>
              <dt>Kitabxana və framework</dt>
              <dd>
                Kitabxana istifadə etdiyin hazır funksionallıq toplusudur.
                Framework tətbiqin quruluşu və iş axını üçün çərçivə təqdim
                edir. Məsələn,
                <a href="https://www.djangoproject.com/">Django</a> veb
                framework-dür.<PythonCitation source="apps" />
              </dd>
            </div>
          </dl>
          <p>
            Python-un standart kitabxanasına fayllar, mətn, tarix, JSON, test və
            başqa işlər üçün modullar daxildir.
            <a href="https://docs.python.org/3/library/"
              >Standart kitabxana kataloqu</a
            >
            bu imkanların sorğu kitabçasıdır. Üçüncü tərəf paketlərini
            <a href="https://pypi.org/">Python Package Index — PyPI</a>
            üzərindən tapmaq,
            <a
              href="https://packaging.python.org/en/latest/tutorials/installing-packages/"
              >pip</a
            >
            vasitəsilə quraşdırmaq mümkündür.<PythonCitation
              source="packaging"
            />
          </p>
          <p>
            <a href="https://docs.python.org/3/library/venv.html">venv</a> hər
            layihə üçün ayrıca Python mühiti yaratmağa kömək edir. Beləliklə,
            iki layihə eyni kitabxananın fərqli versiyalarından istifadə edə
            bilər. Virtual mühit paketləri ayırır; təhlükəli kodu təhlükəsiz
            icra edən sandbox deyil.<PythonCitation source="venv" />
          </p>
        </section>

        <section id="istifade">
          <h2>Harada istifadə olunur?</h2>
          <ul class="encyclopedia-list">
            <li>
              <strong>Veb tətbiqlər:</strong>
              <a href="https://www.djangoproject.com/">Django</a> və
              <a href="https://flask.palletsprojects.com/">Flask</a> ilə server
              məntiqi və veb xidmətlər.
            </li>
            <li>
              <strong>Elmi hesablamalar:</strong>
              <a href="https://scipy.org/">SciPy</a> ilə riyaziyyat, elm və
              mühəndislik məsələləri.
            </li>
            <li>
              <strong>Məlumat analizi:</strong>
              <a href="https://pandas.pydata.org/">pandas</a> ilə cədvəl
              məlumatlarını emal etmək və təhlil etmək.
            </li>
            <li>
              <strong>Avtomatlaşdırma və proqram təminatı:</strong> təkrarlanan
              işlər, testlər və proqramın hazırlanması prosesinə kömək edən
              alətlər.
            </li>
            <li>
              <strong>Təhsil və interaktiv araşdırma:</strong>
              proqramlaşdırmanın əsasları,
              <a href="https://ipython.org/">IPython</a> ilə interaktiv iş
              sessiyaları.
            </li>
          </ul>
          <p>
            Bu nümunələr Python.org-un
            <a href="https://www.python.org/about/apps/"
              >tətbiq sahələri icmalında</a
            >
            da təqdim olunur. Konkret alətin seçimi görüləcək işdən
            asılıdır.<PythonCitation source="apps" />
          </p>
        </section>

        <section id="mehdudiyyetler">
          <h2>İmkanlar və məhdudiyyətlər</h2>
          <p>
            Oxunaqlı sintaksis, interaktiv iş və hazır paketlər prototip
            hazırlamağı asanlaşdırır. Bununla belə, dil seçərkən yalnız kodun
            qısalığına deyil, icra mühitinə, yaddaş ehtiyacına və istifadə
            olunan kitabxanalara baxmaq lazımdır.
          </p>
          <p>
            CPython-un GIL aktiv olan quruluşlarında bir proses daxilində eyni
            anda yalnız bir axın Python baytkodunu icra edir. Bu, “Python-da
            paralellik yoxdur” demək deyil: ayrı proseslər və GIL-i buraxan
            genişləndirmələr fərqli imkanlar yaradır.
            <a
              href="https://docs.python.org/3/glossary.html#term-global-interpreter-lock"
              >GIL anlayışı</a
            >
            məhz reallaşdırma detalıdır.<PythonCitation source="glossary" />
          </p>
          <p>
            Python 3.13-dən etibarən CPython-un GIL olmadan işləyə bilən ayrıca
            <a href="https://docs.python.org/3/howto/free-threading-python.html"
              >free-threaded quruluşları</a
            >
            mövcuddur. Paket uyğunluğu və axın təhlükəsizliyi ayrıca nəzərə
            alınmalıdır; bütün proqramlar avtomatik sürətlənmir. Buna görə
            performans haqqında hökm verərkən versiya, quruluş və iş yükü
            göstərilməlidir.<PythonCitation source="threads" />
          </p>
        </section>

        <section id="icma">
          <h2>İcma, idarəetmə və lisenziya</h2>
          <p>
            Python bir nəfərin başladığı, çoxsaylı iştirakçının inkişaf
            etdirdiyi layihədir.
            <a href="https://www.python.org/psf-landing/"
              >Python Software Foundation</a
            >
            dil və icma ilə bağlı fəaliyyətləri dəstəkləyən qeyri-kommersiya
            təşkilatıdır.<PythonCitation source="psf" />
          </p>
          <p>
            Dilin idarəetmə modeli
            <a href="https://peps.python.org/pep-0013/">PEP 13</a>-də təsvir
            olunur. Beş nəfərlik Steering Council dilin və CPython-un
            keyfiyyəti, qərarvermə prosesi və inkişaf istiqaməti üzrə səlahiyyət
            daşıyır. PSF ilə texniki şuranın rolları bir-birindən
            fərqlidir.<PythonCitation source="governance" />
          </p>
          <p>
            <a href="https://peps.python.org/"
              >Python Enhancement Proposal — PEP</a
            >
            dəyişiklik, proses və ya məlumat xarakterli təklifi sənədləşdirir.
            Hər PEP qəbul edilmiş xüsusiyyət deyil; sənədin statusuna baxmaq
            lazımdır. Məsələn, PEP 8 üsluba, PEP 20 dizayn prinsiplərinə
            aiddir.<PythonCitation source="style" /><PythonCitation
              source="zen"
            />
          </p>
          <p>
            Python açıq mənbədir. İstifadə və yayma şərtləri
            <a href="https://docs.python.org/3/license.html"
              >rəsmi lisenziya mətnində</a
            >
            göstərilir. Python üçün verilən lisenziya üçüncü tərəf paketlərinin
            hamısına avtomatik aid deyil; onların lisenziyaları ayrıca
            yoxlanmalıdır.<PythonCitation source="history" />
          </p>
        </section>

        <section id="oyrenme">
          <h2>Nəzəriyyədən öyrənməyə</h2>
          <p>
            Başlamaq üçün bu ardıcıllıqla irəlilə: ifadələr və dəyişənlər → əsas
            tiplər → şərtlər və dövrlər → funksiyalar → məlumat strukturları →
            fayllar və xətalar → modullar → siniflər. Hər anlayışı kiçik nümunə
            ilə əlaqələndir.
          </p>
          <p>
            <a href="https://docs.python.org/3/tutorial/"
              >Rəsmi Python Tutorial</a
            >
            dilə giriş,
            <a href="https://docs.python.org/3/reference/"
              >Language Reference</a
            >
            dilin dəqiq qaydaları,
            <a href="https://docs.python.org/3/library/">Library Reference</a>
            isə modul və funksiyalar üçün nəzərdə tutulub. Termin axtaranda
            <a href="https://docs.python.org/3/glossary.html">rəsmi lüğətdən</a>
            istifadə edə bilərsən.
          </p>
          <NuxtLink class="primary-button" to="/python/ilk-proqram"
            >İlk dərsə keç →</NuxtLink
          >
        </section>

        <section
          id="menbeler"
          class="reference-bibliography"
          aria-labelledby="references-title"
        >
          <h2 id="references-title">İstinadlar və mənbələr</h2>
          <p>
            Məqalə Azərbaycan dilində hazırlanmış icmaldır. Aşağıdakı ilkin
            mənbələr tarixi və texniki məlumatları yoxlamaq, mövzunu
            genişləndirmək üçündür. Mənbələrin əksəriyyəti ingilis dilindədir.
          </p>
          <ol>
            <li
              v-for="source in pythonReferences"
              :id="`ref-${source.id}`"
              :key="source.id"
              tabindex="-1"
            >
              <a :href="source.url">{{ source.title }}</a
              ><span>{{ source.publisher }}</span>
            </li>
          </ol>
          <a class="text-link" href="#python-article-title"
            >Məqalənin əvvəlinə qayıt ↑</a
          >
        </section>
      </article>
      <aside class="article-toc">
        <nav aria-label="Məqalənin mündəricatı">
          <p class="menu-label">BU SƏHİFƏDƏ</p>
          <a
            v-for="item in pythonContents"
            :key="item.id"
            :href="`#${item.id}`"
            >{{ item.title }}</a
          >
        </nav>
      </aside>
    </main>
  </TechnologyWorkspace>
</template>
