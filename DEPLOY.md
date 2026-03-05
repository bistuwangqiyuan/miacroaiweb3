# 部署到 Netlify

**若要让 `node scripts/test-site.js` 全部通过，必须用下面的「Git 连接」方式部署。**  
用 CLI（`npm run deploy`）部署后页面会 404，需在 Netlify 后台把站点与 Git 仓库关联后重新从 Git 部署，测试才会通过。

## 推荐：通过 Netlify 网站（Git 连接）

1. **推送代码到 Git**  
   将本项目推送到 GitHub / GitLab / Bitbucket。

2. **在 Netlify 创建站点**  
   - 打开 [Netlify](https://app.netlify.com) → Add new site → Import an existing project  
   - 选择你的仓库，分支选 `main`（或当前使用分支）  
   - Build command: `npm run build`（或留空，由 Netlify 自动识别 Next.js）  
   - Publish directory 留空（由 @netlify/plugin-nextjs 自动设置）  
   - 点击 Deploy site  
   - 等待构建与部署完成

3. **环境变量（可选）**  
   在 Site settings → Environment variables 中添加：  
   - `DATABASE_URL`：Neon 数据库连接串  
   - `DEEPSEEK_API_KEY`、`ANTHROPIC_API_KEY`、`GEMINI_API_KEY` 等：AI 客服  
   - `NEXT_PUBLIC_SITE_URL`：站点根 URL（如 `https://xxx.netlify.app`），用于 sitemap

4. **数据库**  
   - 在 Neon 控制台执行 `scripts/schema.sql` 建表  
   - 可选：运行 `DATABASE_URL=... npx tsx scripts/seed.ts` 填充案例与市场数据

5. **Identity（登录/注册）**  
   在 Netlify 站点 → Identity → Enable Identity，即可使用邮箱注册/登录。

---

## 方式二：通过 Netlify CLI

1. **登录**  
   ```bash
   npx netlify-cli login
   ```
   按提示在浏览器中完成登录。

2. **初始化站点（首次）**  
   ```bash
   npx netlify-cli init
   ```
   选择 Create & configure a new site，按提示选择团队和站点名称。

3. **部署**  
   ```bash
   npm run deploy
   ```
   或：
   ```bash
   npx netlify-cli deploy --build --prod
   ```

---

## 部署后测试

在项目根目录执行（将 `https://你的站点.netlify.app` 换成实际地址）：

```bash
SITE_URL=https://你的站点.netlify.app node scripts/test-site.js
```

或：

```bash
node scripts/test-site.js https://你的站点.netlify.app
```

全部返回 `OK` 即表示主要页面可访问正常。

---

## 若部署后所有页面 404

若通过 **CLI** 部署后访问首页或任意路由均为 404（而 `/_next/static/...` 可访问），多半是请求未正确进入 Next.js 服务端。建议：

1. **改用 Git 部署**  
   在 Netlify 中连接仓库，用 “Deploy from Git” 部署。构建在 Netlify 上执行时，`@netlify/plugin-nextjs` 会正确配置发布目录与路由，通常可消除此类 404。

2. **确认配置**  
   - `netlify.toml` 中不要写 `publish`（由插件控制）。  
   - 不要添加根路径重写（如 `from = "/"`），以免覆盖插件生成的路由。

3. **若站点是 CLI 创建的**  
   在 Netlify 打开该站点 → Site configuration → Build & deploy → **Link repository**，选择本项目的 Git 仓库并保存。然后 **Trigger deploy** → **Deploy site** 触发一次从 Git 的构建。完成后再跑下面测试。

4. **部署后再次跑测试**  
   ```bash
   node scripts/test-site.js https://你的站点.netlify.app
   ```
