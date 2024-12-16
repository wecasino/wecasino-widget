# wecasino-widget


### pull weroadmap & wewidget packages from ghr

```sh

vi .npmrc

registry=https://registry.npmjs.org/
@wecasino:registry=https://npm.pkg.github.com

```

in package.json

add dependencies

```json

"dependencies": {
    "@wecasino/weroadmap": "^0.8.2",
    "@wecasino/wewidget": "^0.4.0",
}

```


### publish weroadmap & wewidget packages to ghr

```sh

pnpm publish packages/weroadmap --access public --no-git-checks
pnpm publish packages/wewidget --access public --no-git-checks

```