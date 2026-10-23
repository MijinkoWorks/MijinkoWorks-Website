# assets

サイトで使用する画像類。

## logo/

- `Mijinko_Works_logo_transparent.png` … Hero のロゴ（960x171・配置済み）
- `Mijinko_Works_Logo_Animation.gif` … ページ表示前のイントロアニメーション（1021x198・約5.0秒・配置済み）
- `Mijinko_Works_Logo_Animation_end.png` … 上のGIFの最終フレームを書き出した静止画。フェードアウト中にGIFのループが見えないよう、切り替え用に使う（GIFを差し替えたら作り直す）
- `og-image.jpg` … SNSシェア時のサムネイル（1200x630・`og:image`）。段ボールの帯＋しわ紙の上にロゴとキャッチコピー。既存素材（bg/cardboard-*, bg/paper-light, Mijinko_Works_logo_transparent.png, Kiwi Maru）から合成したもの

## games/<game-id>/

ゲームごとにフォルダを分ける。

- `icon.png` … カード用アイコン（800x800）。`<picture>` の PNG フォールバック
- `icon.webp` … 同じ画像の WebP 版（約50KB・実際にはこちらが配信される）
- `hero.png` … 将来のゲーム個別ページ用（未配置）
- `screenshot-01.png` … スクリーンショット（連番・未配置）

配置済み（元素材は 1254x1254 の PNG。Unity 側の `_MijinameShared` / `_MijinkoWorksShared` の `Material\logo` から縮小してコピー）:

- `mijiname-pond-frontier/` … ミジナメの池開拓記（元: mijiname_pond_frontier_logo.png。2026-10-11 に差し替え。旧 mijiname_pond_frontier_icon.png は使用しない）
- `neko-narabe-gomoku/` … ねこならべ五目（元: nekonarabe_gomoku_icon_.png）
- `neko-narabe-reversi/` … ねこならべリバーシ（元: nekonarabe_reversi_icon_.png・角が透過のため RGBA のまま）

## bg/

ヘッダー・フッターの段ボール素材。元素材は `(Unity 共有素材) _MijinkoWorksShared\Material\web\cardboard_header.png / cardboard_footer.png`（2172x724・RGBA）。
透明部分を切り落とし、左右の継ぎ目が目立たないよう端をクロスフェードしてから半分サイズに縮小したもの。CSS（style.css の 4. Header / 10. Footer）で横方向にタイル表示する。

- `cardboard-header.png` / `.webp` … 1006x243。上が段ボール板、下端 約14px が波形の切断面（下は透明）
- `cardboard-footer.png` / `.webp` … 1006x187。上端 約16px が波形の切断面（上は透明）、下が段ボール板

ページ背景の紙素材。元素材は同じフォルダの `crinkled_paper.png`（白い紙）と `dark-toned_crumpled_paper.png`（少し暗い色味の紙）（いずれも 1535x1025）。
上下左右の端をクロスフェードして継ぎ目を消し、幅 1024px に縮小した JPG + WebP。CSS で全方向にタイル表示する。

- `paper-light.jpg` / `.webp` … 1024x663。`body` の背景（Hero / Games / Social / Privacy ページなど、About・Contact 以外すべて）
- `paper-dark.jpg` / `.webp` … 1024x663。以前 About / Contact の背景に使っていたが、現在はガムテープ背景（deco/packing-tape-*）に置き換えたため未使用
- `paper-privacy.jpg` / `.webp` … 1024x1024。Privacy Policy ページだけの紙背景（`body.page-privacy`）。元素材は `web\img\privacy_policy.png`（1254x1254）を同様に継ぎ目処理して縮小

## deco/

装飾用のテープ素材（PNG + WebP）。元素材は `(Unity 共有素材) _MijinkoWorksShared\Material\web\img\` の `masking_tape.png`（複数片が並んだシート・1536x1024）と `packing_tape_01.png` / `packing_tape_02.png`（2172x724）。元画像は未変更。

- `masking-tape-a〜d.png` / `.webp` … シートから切り出した水色マスキングテープ4片（350〜390 x 114〜134）。Games の各カード左上・右上に `.game-card__tape` の CSS 背景として貼る。絵柄と角度は `:nth-child` の固定パターン
- `packing-tape-01.png` / `.webp` … About セクションの背景になるガムテープ（透明部分を切り落とし 1400x290 に縮小）。`.section--tape-01`
- `packing-tape-02.png` / `.webp` … Contact セクションの背景（1400x284）。`.section--tape-02`

マスキングテープは `aria-hidden` の空要素に `background-size: 100% 100%` + `aspect-ratio` で縦横比を保って表示し、`pointer-events: none` でクリックを透過する。ガムテープは `background-size: max(100%, 1400px) auto` で上下中央に1本置き、上下にはみ出た部分には body の白い紙（paper-light）が見える。画像の実寸より狭い画面では左右（切断面側）が切れ、高さ約290pxを保って見出し〜本文がテープ上に収まる。

## icons/

- `Mijinko Works Icon.png` … favicon（ブラウザのタブ）兼、下の `app/` の元画像（355x392・白背景）。HTMLではスペースを `%20` にして参照している
- `app/icon-192.png`, `icon-512.png`, `apple-touch-icon.png`（180） … ホーム画面・デスクトップ用アイコン。元アイコンを正方形（余白12%・白地）にして各サイズに書き出したもの。`site.webmanifest`（src 直下）と各 HTML の `<link rel="apple-touch-icon" / manifest>` から参照
- `mijinko-works-icon-transparent.png` … Header 左上のアイコン。上の画像の白背景を透明にしたもの（段ボール背景の上に置くため）
- `brand-*-white.png` … Social セクションのSNSアイコン（Tabler Icons の brand-x / brand-youtube / brand-instagram / brand-tiktok / brand-threads / brand-bluesky を白抜きにしたもの。元素材: (Unity 共有素材) _MijinameShared\Icons\Tabler\SNS）
- `mail-white.png` … Contact のメールアイコン（Tabler Icons の mail を白抜きにしたもの）

## flags/

言語切り替え（ヘッダー右端）の国旗。[flag-icons](https://github.com/lipis/flag-icons)（MIT License）の SVG をそのままコピーしたもの。元: `(Unity 共有素材) _MijinkoWorksShared\Localization\Flags\svg\`

- `jp.svg` … 日本語
- `us.svg` … English（英語＝米国旗で割り切っている）
- `cn.svg` … 简体中文
- `tw.svg` … 繁體中文（ゲーム本体と同じ割り当て。地域によっては敏感な話題なので、ヘッダーには現在の言語だけを出し、一覧は押したときだけ開く）
- `kr.svg` … 한국어
- `flag-icons-LICENSE.txt` … ライセンス全文（MIT。同梱が必要なので削除しない）

国旗は言語と 1 対 1 ではないので、HTML では必ず言語名を文字で併記する（`_MijinkoWorksShared\Localization\README.md` の方針どおり）。

## fonts/

Webフォント（WOFF2・サブセット済み）。ローカルの `tools/build-fonts.py`（公開リポジトリには含めない）が生成する。`css/fonts.css` の @font-face から参照。

- `kiwi-maru-*.woff2` … Kiwi Maru Medium（日本語サイト全体）。元: `(Unity 共有素材) _MijinkoWorksShared\Material\web\font\KiwiMaru\KiwiMaru-Medium.ttf`
- `noto-sans-jp-*.woff2` … Noto Sans JP 可変フォント（wght 400〜700 に制限・日本語 Privacy Policy ページのみ）。元: `...\font\Noto_Sans_JP\NotoSansJP-VariableFont_wght.ttf`
- `nunito-sans-core.woff2` / `nunito-sans-latin.woff2` … Nunito Sans Regular（英語ページ `/en/` 以下すべて）。元: `(Unity 共有素材) _MijinkoWorksShared\Localization\Fonts\NunitoSans.ttf`。ラテン文字だけなので core（ページ内の文字・約15KB）と latin（Latin-1 / 拡張A・約24KB）の2ファイル
- `noto-sans-sc-*.woff2` … Noto Sans SC Regular（简体中文ページ `/zh-cn/`）。元: `...\Localization\Fonts\NotoSansSC.ttf`
- `noto-sans-tc-*.woff2` … Noto Sans TC Regular（繁體中文ページ `/zh-tw/`）。元: `...\Localization\Fonts\NotoSansTC.ttf`
- `noto-sans-kr-*.woff2` … Noto Sans KR Regular（한국어ページ `/ko/`）。元: `...\Localization\Fonts\NotoSansKR.ttf`
  - 中国語・韓国語は `-names`（言語切り替えに出す言語名の文字だけ・数KB。全ページで読まれる）、`-core`（ページ内の文字・50〜110KB）、`-symbols`（記号類）、`-common-NN`（よく使う漢字・ハングルを400字ずつ。文章を足したときの保険）に分かれる
- `*-OFL.txt` … 各フォントのライセンス（SIL Open Font License）。配布時に同梱が必要なので削除しない。`NotoSansCJK-OFL.txt` は SC / TC / KR 共通

分割の考え方: `-core` は HTML に実際にある文字だけ（約50〜140KB）、`-kana` はかな・記号、`-jis1-NN` / `-jis2-NN` は JIS 第1・第2水準漢字を約400字ずつ。
ブラウザは unicode-range によりページ内の文字に必要なファイルだけを取得するので、通常は `-core` だけが読まれる。
HTML の文章を変えて `-core` に無い文字が出ても、該当する `-kana` / `-jis*` が自動で読み込まれるので表示は崩れない（ローカルの `tools/build-fonts.py` を再実行すると `-core` が更新され、初期表示が最速に戻る）。

## screenshots/

必要になった時点で使用する。
