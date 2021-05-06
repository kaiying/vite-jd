# project-base
隨手可用的空 project 建置中。

## style
### bootstrap (global scope)
* 直接在 `main.js` 中引入 bootstrap 即可，我這邊因為有挑揀掉部分，所以我以一支 `scss` file 為入口。
```js
import '@/src/assets/base-style.scss';
```

### global scss variable / mixins
* 建立一個 style entry point
* 再將 `vite.config.js` 檔，補上對應的設定。（如下）
```js
export default defineConfig({
  //...others
  // global style import
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/src/assets/global-import";`,
      },
    },
  },
});
```
> 防踩雷：
sass-loader v8-，這個選項名是 "data"
sass-loader v8 中，這個選項名是 "prependData"
sass-loader v10+，這個選項名是 "additionalData"
 