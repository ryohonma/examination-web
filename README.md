## 環境設定

- yarn version v1.22.22
- node.js version v20.14.0

## ディレクトリ構成

### templateについて

\_components/template配下には、View＋ロジックのソースコードが格納されている (可読性観点であえてディレクトリ分割はしない)

## 初期設定

### firebase toolのインストール

```
npm install -g firebase-tools
```

### indexes rulesのdeploy

```
firebase use --project <your-project-id>
firebase deploy --only firestore:rules --project ryohonma-dev
firebase deploy --only firestore:indexes --project ryohonma-dev
```

### firebase bucketの設定

```
firebase storage:bucket:set-cors ./cors.json --project dev-ryohonma
gcloud config set project dev-ryohonma
gsutil cors set ./cors.json gs://dev-ryohonma.appspot.com
```

## 制限事項および、今後の課題

### SSR対応について

- コンテンツ領域（ヘッダー／フッター以外）のSSRは対応していない
  　- パフォーマンスへの影響：扱うコンテンツの量が少ない
  - 実装コストの観点：情報量がまだ少なく時間がかかりそうだった
  - 可読性の観点：SPIでauthStateChangedやonSnapshotなどFirebaseSDKを使うメリットのほうが高そうだった

### SEO対応

- metaデータの生成は行っているが、他は未対応
  - サイトマップ
  - faq構造化マークアップ
    あたり対応しても良いかも
