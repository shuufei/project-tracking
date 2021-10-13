# Bison

## 開発環境構築

### Node.js 環境のセットアップ

1. 下記を参考に nvm をインストール  
   https://github.com/nvm-sh/nvm#installing-and-updating
1. 下記コマンドを実行し、nvm で 14.16.0 を install
   ```
   > nvm install 14.16.0
   ```
1. bison リポジトリのルートディレクトリ直下で下記コマンドを実行し、node の version を 14.16.0 にする
   ```
   > nvm use
   ```

### 依存 package のインストール

下記コマンドで依存 package をインストールする。

```
> npm install
```

### DynamoDB Local のセットアップ

1. 下記を参考に DynamoDB Local をダウンロードし、ローカルにて DynamoDB Local を実行する  
   https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html
1. 下記コマンドを実行し、ローカルで起動している DynamoDB Local にテーブルの作成とテストデータの登録を行う
   ```
   > npm run db:init
   ```

#### Docker 上で DynamoDB Local を起動する場合

1. bison リポジトリのルートディレクトリ直下で下記コマンドを実行し、Docker イメージをビルドする
   ```
   > docker build -t dynamodb-local ./construction/dynamodb/local
   ```
1. 下記コマンドを実行し、dynamodb-local コンテナを起動する
   ```
   > docker run -p 8000:8000 -d dynamodb-local:latest
   ```
1. 下記コマンドを実行し、ローカルで起動している DynamoDB Local にテーブルの作成とテストデータの登録を行う
   ```
   > npm run db:init
   ```

#### DynamoDB Local のデータを GUI で確認する

下記コマンドを実行し、ブラウザで localhost:8001 にアクセスすると、DynamoDB Local に作成されているテーブルやデータを確認することができる。

```
> npm run dynamodb-admin
```

## Frontend Desktop App

### Serve

下記コマンドで build とローカルでのホスティングを行う。

```
> npx nx run frontend-desktop-app:serve
```

## Backend GraphQL API

### Serve

下記コマンドでローカルにて API Server を起動する。

```
> npx nx run backend-graphql-api:serve
```

### Test

下記コマンドで Test を実行する。

```
> npx nx run backend-graphql-api:test
```

ファイル変更時にテストを自動実行する場合は watch option を指定。

```
> npx nx run backend-graphql-api:test -- --watch
```

## Fronend Component Library

### Storybook

下記コマンドで Storybook を起動する。

```
> npx nx run frontend-ui:storybook
```

## Affected

修正ファイルの影響を受ける application、library に対して、Test や Lint を実行することができる。
https://nx.dev/latest/angular/cli/affected#affected

### Test

下記コマンドで、修正したファイルの影響を受ける application や library の Test を実行する。

```
> npx nx affected:test
```

## Theme の利用方法

- theme/${theme 名}/variables.scss を利用したいプロジェクトで import することで、theme 変数が利用できるようになる。
- theme/${theme 名}/variables.scss を利用したいプロジェクトで import すると、Taiga UI の theme も更新される。
- theme/${theme 名}/tailwind.config.js を利用したいプロジェクトの webpack.config で設定することで、theme に沿った style で Tailwind CSS が利用できるようになる。

## Schema から型定義生成

下記コマンドで `libs/shared/schema/src/lib/schema-types.ts` に型定義を生成する。

```
> npx nx run shared-schema:generate-typings
```
