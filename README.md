# Bison

## shared-ui

### Storybook

下記コマンドで Storybook を起動する。

```
> npx nx run shared-ui:storybook
```

## Theme の利用方法

- theme/${theme 名}/variables.scss を利用したいプロジェクトで import することで、theme 変数が利用できるようになる。
- theme/${theme 名}/variables.scss を利用したいプロジェクトで import すると、Taiga UI の theme も更新される。
- theme/${theme 名}/tailwind.config.js を利用したいプロジェクトの webpack.config で設定することで、theme に沿った style で Tailwind CSS が利用できるようになる。
