# 運作前準備

此專案為server-client端程式，運行前須開啟伺服器

1. 開啟main.py伺服器端程式(F5執行)
2. 開啟ngrok端口對應
   - 開啟cmd
   - 輸入指令ngrok http 1202 (將本地的PORT 1202映射到ngrok配置的網址)
3. 更新 program01\src\utils\http.js 的 BASE_URL 為ngrok的Forwarding網址
   例如：Forwarding https://3cd2-202-39-151-187.ngrok-free.app
   - 此網址每次執行ngrok http 1202時都不一樣
   - 可執行https://3cd2-202-39-151-187.ngrok-free.app 或 https://3cd2-202-39-151-187.ngrok-free.app/docs 來查看SERVER是否啟動成功
4. 執行
   ```
   npm run dev
   ```
5. 右上角可登入帳號即代表Server啟動成功

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
