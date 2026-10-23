# Mijinko Works Website

Official website for Mijinko Works — an indie game development project from Japan.

https://mijinkoworks.com/

## Structure

- `src/` … サイト本体（静的 HTML / CSS / JavaScript / 画像 / Webフォント）。ここがそのままドキュメントルート
  - `src/index.html`, `src/privacy/` … 日本語（既定・正本）
  - `src/en/`, `src/zh-cn/`, `src/zh-tw/`, `src/ko/` … English / 简体中文 / 繁體中文 / 한국어（各 `index.html` と `privacy/index.html`）。文章を直すときは5言語すべてを直す（プライバシーポリシーは日本語版が正式で、各翻訳に「日本語版が優先」の注記がある）
  - `src/assets/README.md` … 画像・フォント・国旗素材の説明とライセンス
- `.github/workflows/pages.yml` … `main` に push すると `src/` の中身を GitHub Pages に公開する

フレームワーク・CMS・ビルド工程はなく、サーバー側のプログラム（PHP 等）も使っていない。

## Local preview

`src/index.html` をブラウザで直接開けば表示できる（相対パスのみ使用）。
ローカルサーバーを使う場合の例（Python 3）:

```text
cd src
python -m http.server 8000
```

http://localhost:8000/ 、/privacy/ 、/en/ 、/zh-cn/ 、/zh-tw/ 、/ko/ で各ページを確認できる。

## Deploy

GitHub Pages（GitHub Actions 経由）。`main` ブランチへ push すると自動で公開される。独自ドメイン `mijinkoworks.com` は GitHub の Settings → Pages で設定する。

## Licenses

- Kiwi Maru / Noto Sans JP / Noto Sans SC / TC / KR / Nunito Sans … SIL Open Font License 1.1（`src/assets/fonts/*-OFL.txt`）
- 国旗 SVG … [flag-icons](https://github.com/lipis/flag-icons)（MIT License、`src/assets/flags/flag-icons-LICENSE.txt`）
- SNS・メールのアイコン … [Tabler Icons](https://tabler.io/icons)（MIT License）
