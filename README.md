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
