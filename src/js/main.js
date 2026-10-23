/*
 * Mijinko Works Official Website - main.js
 *
 * MVPではJavaScriptの役割を最小限にする。
 * - フッターの年表示を現在年に更新する
 * - file:// で開いたときにフォルダ宛てリンク（privacy/ や en/）へ index.html を補う
 * - 言語切り替えのプルダウンを外側クリック / Esc で閉じる
 * - イントロ（ロゴGIFアニメーション）の表示制御
 *
 * スムーズスクロールはCSS（scroll-behavior: smooth）で実現しているため、
 * ここでは扱わない。JavaScriptが無効でもHTMLに書かれた年がそのまま表示され、
 * イントロは noscript のCSSで非表示になる。
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     フッターの年表示
     ------------------------------------------------------------------ */
  var yearElements = document.querySelectorAll('.js-year');
  var currentYear = String(new Date().getFullYear());

  for (var i = 0; i < yearElements.length; i++) {
    yearElements[i].textContent = currentYear;
  }

  /* ------------------------------------------------------------------
     file:// で開いたとき（index.html をダブルクリックしたとき）の補正
     - 「privacy/」「en/」のようなフォルダ宛てのリンクは、サーバー上では index.html が
       自動的に開くが、file:// ではフォルダ一覧になってしまう
     - そこで file:// のときだけ、リンク先の末尾に index.html を補う
       （サーバー上では何もしないので公開時のURLは変わらない）
     ------------------------------------------------------------------ */
  if (window.location.protocol === 'file:') {
    var links = document.querySelectorAll('a[href]');
    for (var j = 0; j < links.length; j++) {
      var href = links[j].getAttribute('href');
      if (!href || /^(https?:|mailto:|#)/.test(href)) {
        continue;
      }
      var hashIndex = href.indexOf('#');
      var path = hashIndex === -1 ? href : href.slice(0, hashIndex);
      var hash = hashIndex === -1 ? '' : href.slice(hashIndex);
      if (path.length > 0 && path.charAt(path.length - 1) === '/') {
        links[j].setAttribute('href', path + 'index.html' + hash);
      }
    }
  }

  /* ------------------------------------------------------------------
     言語切り替え（ヘッダーの <details class="lang-switch">）
     - 開閉自体は <details> がやるので JavaScript 無しでも動く
     - ここでは「外側をクリック」「Esc キー」で閉じる補助だけを足す
     ------------------------------------------------------------------ */
  var langSwitch = document.querySelector('.lang-switch');
  if (langSwitch) {
    document.addEventListener('click', function (event) {
      if (langSwitch.open && !langSwitch.contains(event.target)) {
        langSwitch.open = false;
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && langSwitch.open) {
        langSwitch.open = false;
        langSwitch.querySelector('summary').focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     イントロ（ロゴGIFアニメーション）
     - GIFを最後まで再生 → 最終フレームで静止 → ロゴだけがゆっくり薄くなって消える
       → 白い画面になってから、ホームページが現れる（.is-hiding → .is-done の2段階）
     - GIFはループ再生されるため、静止のタイミングで最終フレームと同じ静止画に
       切り替える（.is-frozen）。見た目は変わらず、ループの再開も見えない
     - クリック / タップ / Escキー / スキップボタンで即スキップ（短いフェード）
     - 同一セッション中は1回だけ表示（初回判定は index.html 側のインラインスクリプト）
     ------------------------------------------------------------------ */
  var intro = document.getElementById('intro');
  if (!intro) {
    return;
  }

  var GIF_END_MS = 4140;    // Mijinko_Works_Logo_Animation.gif の最終フレームが表示される時刻
  var HOLD_MS = 500;        // 完成したロゴを静止して見せる時間
  var FADE_MS = 1800;       // ロゴがゆっくり消えていく時間（この間、背景は白のまま）
  var REVEAL_MS = 500;      // ロゴが完全に消えたあと、白からホームページが現れる時間（0 で即表示）
  var SKIP_FADE_MS = 300;   // スキップ時：ロゴが消える時間
  var SKIP_REVEAL_MS = 300; // スキップ時：ホームページが現れる時間
  var closed = false;
  var timer = null;
  var stage = intro.querySelector('.intro__stage');

  function closeIntro(fadeMs, revealMs) {
    if (closed) {
      return;
    }
    closed = true;
    if (timer) {
      clearTimeout(timer);
    }
    try {
      sessionStorage.setItem('mw-intro-seen', '1');
    } catch (e) {
      /* プライベートモード等で保存できない場合は無視する */
    }
    document.removeEventListener('keydown', onKeydown);

    // 1) ロゴを静止画に切り替え、ロゴだけをフェードアウト（背景の白はそのまま）
    intro.classList.add('is-frozen');
    stage.style.transitionDuration = fadeMs + 'ms';
    intro.style.transitionDuration = revealMs + 'ms';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        intro.classList.add('is-hiding');
      });
    });

    // 2) ロゴが完全に消えてから、白い画面を外してホームページを表示する
    setTimeout(function () {
      intro.classList.add('is-done');
      document.documentElement.classList.remove('is-intro');
      setTimeout(function () {
        if (intro.parentNode) {
          intro.parentNode.removeChild(intro);
        }
      }, revealMs + 100);
    }, fadeMs);
  }

  function finish() {
    closeIntro(FADE_MS, REVEAL_MS);
  }

  function skip() {
    closeIntro(SKIP_FADE_MS, SKIP_REVEAL_MS);
  }

  function onKeydown(event) {
    if (event.key === 'Escape') {
      skip();
    }
  }

  function startTimer() {
    timer = setTimeout(finish, GIF_END_MS + HOLD_MS);
  }

  intro.addEventListener('click', skip);
  document.addEventListener('keydown', onKeydown);

  var gif = intro.querySelector('.intro__logo--gif');
  if (gif && !gif.complete) {
    gif.addEventListener('load', startTimer);
    gif.addEventListener('error', skip);
  } else {
    startTimer();
  }

  // 万一 load イベントが発火しなくても、8秒で必ず閉じ始める
  setTimeout(finish, 8000);
})();
