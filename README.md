# Bison

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
