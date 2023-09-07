# 店小二

# 微信公众号移动端页面

+ [生产环境](http://www.x2yun.cn/dxemobile)
+ [开发环境](http://192.168.0.198/dxemobile)

### 开发工具

> * [Vue3](https://cn.vuejs.org/)
> * [Vant4](https://vant-contrib.gitee.io/vant)
> * [Typescript](https://www.typescriptlang.org/zh/docs/)
> * [Vite4](https://cn.vitejs.dev/)
> * [yarn](https://yarnpkg.com/)

## 推荐的IDE设置

- [VSCode](https://code.visualstudio.com/)
    + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- [WebStorm](https://www.jetbrains.com.cn/webstorm/promo/)
## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type
by default. In most cases this is fine if you don't really care about component prop types outside of templates.
However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using
manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off`
from VSCode command palette.
> > > > > > > ac05749 (vantTS)