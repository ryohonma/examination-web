## 環境設定

- yarn version v1.22.22
- node.js version v20.14.0

## ディレクトリ構成

```
luna-examination-web-main/
│
├── .github/              # GitHubに関連する設定ファイル
│   └── workflows/        # CI/CDワークフロー（例：Lintの設定）
│
├── public/               # 公開用の静的アセット
│   └── images/           # 画像ファイル（例：ロゴ）
│
├── src/                  # プロジェクトのメインソースコード
│   ├── app/              # アプリケーションのロジックやコンポーネント
│   │   ├── _components/  # 再利用可能なコンポーネント（atoms, molecules,templates）
│   │   ├── profile/      # プロフィールページ関連のファイル
│   │   └── timelines/    # タイムラインページ関連のファイル
│   │
│   ├── constants/        # 定数やルート定義
│   ├── context/          # Reactの状態管理に使用するコンテキスト
│   ├── lib/              # ユーティリティライブラリやヘルパー関数
│   ├── repository/       # Firestoreやストレージのリポジトリロジック
│   └── utils/            # その他のユーティリティ関数
│
├── .eslintrc.json        # ESLintの設定ファイル
├── firebase.json         # Firebaseの設定ファイル
├── firestore.rules       # Firestoreのセキュリティルール
├── jest.config.js        # Jestテストの設定ファイル
├── next.config.mjs       # Next.jsの設定ファイル
├── package.json          # プロジェクトの依存関係とスクリプト
├── tsconfig.json         # TypeScriptの設定ファイル
└── yarn.lock             # Yarnの依存関係ロックファイル
```

### app/\_components/templateについて

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

### 自動テスト

jestを導入済み。最低限のvalidation-schema関連のテストコードまで作成済み。
今後は以下についてもテストを追加していけると良さそう

- **ユニットテスト**: 各コンポーネントやカスタムフックの機能単位のテスト。
- **エンドツーエンドテスト（E2E）**: 認証や投稿機能の統合テストを通して、ユーザーが期待する動作を確認。
- **テストカバレッジの向上**: プロジェクト全体のテストカバレッジを高めることで、バグの防止や機能の信頼性を強化。
