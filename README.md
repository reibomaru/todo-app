# todo-app

## Required

```
Docker >= 24.0.7 (動作確認済み)
```

## Quick Start
### 各種サーバー立ち上げ
1. backendディレクトリにて`.env`ファイルの作成
`.env.example`を参考に`.env`ファイルを作成してください(ローカル実行ではコピーして使用しても問題ありません)
2. サーバーを立ち上げる
```bash
make app
```
http://localhost:8000 にアクセス
### サンプルのユーザー
editor権限ユーザー
```
email: sample1@mail.com
password: Password-123
```

viewer権限ユーザー
```
email: sample2@mail.com
password: Password-123
```


## 開発者向け

### モックサーバーでの開発

```bash
make frontend-mock
```

http://localhost:8000 にアクセス

### DB のセットアップ

DDL と DML は[database](./database/)ディレクトリに格納されています。db のコンテナ起動で実行されるので初期設定は不要です。

- migration でのスキーム変更には対応していないので DDL 及び DML を変更する場合は適宜手動で db 操作を実行してください

### 開発時の注意

- [openapi](./design_files/openapi.yaml)のスキームに従って frontend/backend のインターフェースを実装しています。API 仕様を変更したい場合にはどうファイルを変更した後以下コマンドでインターフェースの自動生成を実行してください

```bsah
make openapi-gen
```

## 設計書

[design_files ディレクトリで管理](./design_files/)
