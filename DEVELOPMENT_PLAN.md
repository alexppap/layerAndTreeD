# LayerAndTreeD 页面扩充开发计划

## 项目概述

基于现有首页（HomePage.vue）的工业数字孪生平台设计风格，规划并开发完整的网站页面体系。

---

## 一、现有首页分析

### 核心特点
- **设计风格**：深色科技风（暗色背景 + 青色/紫色渐变强调色）
- **技术栈**：Vue 3 + TypeScript + OpenLayers + Three.js + Element Plus
- **交互特性**：粒子背景动画、3D可视化、平滑滚动
- **内容模块**：
  1. Hero 区域（主标题 + 3D 立方体动画）
  2. 数据统计面板（4个关键指标）
  3. 功能特性展示（6个核心功能卡片）
  4. OpenLayers 地图展示（12个工厂位置标记）
  5. Three.js 3D 场景（工厂设备、管道系统、仓储物流）
  6. 项目意义与价值介绍
  7. 技术栈展示

### 设计语言规范
- **字体**：Orbitron（标题）+ Rajdhani（正文）
- **主色调**：`#00d4ff`（青色）、`#7c3aed`（紫色）
- **背景色**：`#0a0f19`（深色背景）、`#111827`（次级背景）
- **边框色**：`#1f2937`
- **动画**：fadeInUp、pulse、平滑过渡

---

## 二、页面扩充规划

### 2.1 文档中心页面 (DocsPage.vue)

**页面定位**：为开发者和用户提供完整的技术文档、API 参考和使用指南

**内容模块**：

1. **侧边导航栏**
   - 快速入门
   - 安装指南
   - OpenLayers 集成
   - Three.js 集成
   - API 参考
   - 常见问题
   - 更新日志

2. **文档内容区**
   - Markdown 渲染支持
   - 代码高亮展示
   - 可复制代码块
   - 实时示例演示
   - 图片/视频嵌入

3. **右侧目录导航**
   - 当前页面大纲
   - 锚点跳转
   - 阅读进度指示

4. **搜索功能**
   - 全文搜索
   - 关键词高亮
   - 搜索历史

**技术要点**：
- 使用 `vue-router` 实现文档路由
- 集成 `markdown-it` 或 `@vueuse/core` 的 Markdown 解析
- 使用 `highlight.js` 或 `prism.js` 实现代码高亮
- 实现响应式布局（移动端侧边栏折叠）

---

### 2.2 案例展示页面 (CasesPage.vue)

**页面定位**：展示平台在不同工业场景中的实际应用案例

**内容模块**：

1. **Hero 区域**
   - 标题："真实场景，数字孪生"
   - 副标题：案例总数统计
   - 筛选标签（按行业分类）

2. **案例卡片网格**
   - 案例缩略图（3D 场景截图）
   - 案例标题
   - 应用行业标签
   - 简短描述
   - 查看详情按钮
   - 悬停效果：放大 + 发光边框

3. **案例详情模态框**
   - 大图展示
   - 客户信息
   - 业务挑战
   - 解决方案
   - 技术亮点
   - 实施效果（数据对比）
   - 客户评价

4. **行业分类**
   - 智能制造
   - 能源电力
   - 石油化工
   - 物流仓储
   - 智慧园区
   - 其他

**技术要点**：
- 使用 `v-for` 渲染案例卡片
- 使用 `el-dialog` 实现详情弹窗
- 实现筛选功能（Composition API）
- 图片懒加载优化

---

### 2.3 产品功能页面 (FeaturesPage.vue)

**页面定位**：深度展示平台的技术能力和功能细节

**内容模块**：

1. **Hero 区域**
   - 标题："强大功能，触手可及"
   - 交互式功能切换展示

2. **功能详情区块**（分栏式设计）

   **2.3.1 GIS 地理信息系统**
   - 多源地图底图支持（OSM、高德、百度等）
   - 自定义图层管理
   - 矢量/栅格数据加载
   - 空间分析工具
   - 实时位置追踪
   - 地理围栏设置
   - 热力图渲染
   - 路径规划与导航

   **2.3.2 3D 可视化引擎**
   - glTF/FBX 模型加载
   - PBR 材质渲染
   - 实时阴影与光照
   - 后处理效果（辉光、景深）
   - 粒子系统
   - 骨骼动画
   - 相机轨道控制
   - VR/AR 支持

   **2.3.3 数据可视化**
   - 实时数据流接入
   - 图表组件集成（ECharts）
   - 仪表盘定制
   - 报警与通知
   - 历史数据回放
   - 数据导出功能

   **2.3.4 交互与协作**
   - 多人协同浏览
   - 标注与批注
   - 视角共享
   - 权限管理
   - 操作日志记录

3. **技术对比表格**
   - 与竞品对比
   - 功能覆盖度
   - 性能指标

4. **在线演示区**
   - 嵌入式 3D 场景
   - 实时交互体验

**技术要点**：
- 分模块展示，每个模块一个子组件
- 使用 `Intersection Observer` 实现滚动动画
- 集成 Three.js 实时演示场景
- 表格使用 `el-table` 组件

---

### 2.4 关于我们页面 (AboutPage.vue)

**页面定位**：介绍团队、愿景、发展历程

**内容模块**：

1. **Hero 区域**
   - 标题："构建未来工业的数字基石"
   - 团队照片或抽象图形
   - 核心价值观

2. **公司介绍**
   - 成立背景
   - 发展历程（时间线组件）
   - 里程碑事件
   - 荣誉资质

3. **团队成员**
   - 核心团队卡片
   - 头像、姓名、职位
   - 专业领域
   - 个人简介

4. **企业文化**
   - 使命 Mission
   - 愿景 Vision
   - 价值观 Values
   - 工作氛围展示

5. **合作伙伴**
   - 合作企业 Logo 墙
   - 合作类型分类

**技术要点**：
- 使用 `el-timeline` 实现发展历程
- 团队成员卡片使用 Grid 布局
- Logo 墙使用无限滚动效果

---

### 2.5 联系我们页面 (ContactPage.vue)

**页面定位**：提供多种联系方式和咨询表单

**内容模块**：

1. **Hero 区域**
   - 标题："与我们取得联系"
   - 副标题："专业团队随时为您服务"

2. **联系方式卡片**
   - 电话热线
   - 电子邮箱
   - 公司地址
   - 工作时间
   - 社交媒体链接

3. **在线咨询表单**
   - 姓名
   - 公司/组织
   - 联系电话
   - 电子邮箱
   - 咨询类型（下拉选择）
   - 留言内容
   - 提交按钮
   - 表单验证

4. **地图定位**
   - OpenLayers 地图嵌入
   - 公司位置标记
   - 周边交通信息

5. **常见问题快捷入口**
   - FAQ 链接
   - 文档中心链接
   - 在线客服（可选）

**技术要点**：
- 使用 `el-form` 实现表单
- 表单验证规则配置
- 集成 OpenLayers 地图
- 提交表单后端接口对接（预留）

---

### 2.6 下载中心页面 (DownloadsPage.vue)

**页面定位**：提供 SDK、工具、文档等资源下载

**内容模块**：

1. **Hero 区域**
   - 标题："开发资源下载"
   - 最新版本号显示
   - 快速下载按钮

2. **SDK 下载区**
   - JavaScript SDK
   - Python SDK
   - Java SDK
   - .NET SDK
   - 版本选择
   - 发布日期
   - 文件大小
   - 下载次数统计
   - 更新日志链接

3. **开发工具**
   - 可视化配置工具
   - 模型转换工具
   - 调试工具
   - 插件/扩展

4. **文档与示例**
   - API 文档 PDF
   - 快速入门指南 PDF
   - 示例代码包
   - 视频教程

5. **系统要求说明**
   - 浏览器兼容性
   - 硬件建议配置
   - 依赖项说明

**技术要点**：
- 使用 `el-table` 展示下载列表
- 版本选择下拉框
- 文件下载进度提示（可选）
- 统计下载次数（预留后端接口）

---

### 2.7 博客/新闻页面 (BlogPage.vue)

**页面定位**：发布技术文章、产品更新、行业资讯

**内容模块**：

1. **Hero 区域**
   - 标题："技术洞察与行业动态"
   - 搜索框
   - 分类标签

2. **文章列表**
   - 文章卡片（标题、摘要、封面图、发布日期、作者、分类标签、阅读量）
   - 分页组件
   - 列表/网格视图切换

3. **侧边栏**
   - 热门文章
   - 分类导航
   - 标签云
   - 最新评论

4. **文章详情页**（子路由）
   - 标题
   - 作者信息
   - 发布时间
   - Markdown 内容渲染
   - 代码高亮
   - 图片放大查看
   - 相关文章推荐
   - 分享按钮
   - 评论区（可选）

**技术要点**：
- 使用 `vue-router` 实现列表和详情路由
- Markdown 渲染
- 分页逻辑
- 搜索和筛选功能
- 使用 `el-pagination` 组件

---

### 2.8 在线演示页面 (DemoPage.vue)

**页面定位**：提供可交互的在线 Demo 体验

**内容模块**：

1. **Hero 区域**
   - 标题："立即体验 LayerAndTreeD"
   - Demo 场景选择

2. **全屏交互区**
   - 地图 + 3D 融合场景
   - 功能控制面板
   - 数据实时更新
   - 场景切换按钮
   - 重置视图按钮

3. **功能演示**
   - 设备点击查看详情
   - 数据流动画演示
   - 路径规划演示
   - 告警模拟
   - 时间轴回放

4. **代码示例对照**
   - 左侧 Demo 效果
   - 右侧对应代码
   - 一键复制

**技术要点**：
- 复用首页的 OpenLayers 和 Three.js 代码
- 增强交互功能
- 实现分屏布局（Demo + 代码）
- 使用 Web Workers 优化性能

---

### 2.9 定价页面 (PricingPage.vue)

**页面定位**：展示产品定价方案和套餐

**内容模块**：

1. **Hero 区域**
   - 标题："灵活的定价方案"
   - 副标题："满足不同规模企业需求"

2. **定价卡片**
   - 免费版
     - 功能列表
     - 使用限制
     - 适用场景
   - 专业版
     - 功能列表
     - 价格
     - 试用按钮
   - 企业版
     - 功能列表
     - 定制服务
     - 联系销售按钮

3. **功能对比表格**
   - 横向对比三个版本
   - 功能项逐条标注

4. **FAQ**
   - 常见定价问题
   - 折扣政策
   - 退款说明

**技术要点**：
- 卡片式布局
- 高亮推荐套餐
- 表格对比功能
- 响应式设计

---

### 2.10 用户登录/注册页面 (AuthPage.vue)

**页面定位**：用户认证入口

**内容模块**：

1. **登录表单**
   - 用户名/邮箱
   - 密码
   - 记住我
   - 忘记密码链接
   - 登录按钮
   - 第三方登录（GitHub、Google）

2. **注册表单**
   - 用户名
   - 邮箱
   - 密码
   - 确认密码
   - 验证码
   - 同意条款
   - 注册按钮

3. **背景装饰**
   - 复用首页粒子背景
   - 3D 装饰元素

**技术要点**：
- 使用 `el-form` 表单组件
- 表单验证
- 密码强度检测
- 验证码组件
- 登录状态管理（Pinia/Vuex）

---

## 三、路由规划

### 路由结构

```typescript
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/docs',
    name: 'Docs',
    component: DocsPage,
    children: [
      {
        path: ':section',
        component: DocSection,
      },
    ],
  },
  {
    path: '/cases',
    name: 'Cases',
    component: CasesPage,
  },
  {
    path: '/features',
    name: 'Features',
    component: FeaturesPage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
  },
  {
    path: '/downloads',
    name: 'Downloads',
    component: DownloadsPage,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage,
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: BlogDetailPage,
  },
  {
    path: '/demo',
    name: 'Demo',
    component: DemoPage,
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: PricingPage,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
  },
];
```

---

## 四、全局组件规划

### 4.1 导航栏组件 (NavBar.vue)

**功能**：
- 响应式导航菜单
- 路由高亮显示
- 移动端汉堡菜单
- 搜索框（可选）
- 用户登录状态显示

**位置**：
- 固定在页面顶部
- 滚动时背景模糊效果

---

### 4.2 页脚组件 (Footer.vue)

**功能**：
- 友情链接
- 网站地图
- 社交媒体图标
- 版权信息
- ICP 备案号

**位置**：
- 所有页面底部

---

### 4.3 返回顶部按钮 (BackToTop.vue)

**功能**：
- 滚动一定距离后显示
- 点击平滑滚动到顶部
- 科技感图标

---

### 4.4 加载动画组件 (Loading.vue)

**功能**：
- 全局 Loading 状态
- 3D 加载动画
- 进度条显示

---

### 4.5 面包屑导航 (Breadcrumb.vue)

**功能**：
- 显示当前页面路径
- 可点击跳转

---

## 五、数据管理规划

### 5.1 State Management (Pinia)

**Store 模块**：
- `userStore`：用户信息、登录状态
- `appStore`：全局配置、主题设置
- `docsStore`：文档数据缓存
- `casesStore`：案例数据
- `blogStore`：博客文章数据

---

### 5.2 API 接口设计

**接口列表**：
- `/api/docs` - 获取文档列表
- `/api/docs/:id` - 获取文档详情
- `/api/cases` - 获取案例列表
- `/api/cases/:id` - 获取案例详情
- `/api/blog` - 获取博客列表
- `/api/blog/:id` - 获取博客详情
- `/api/downloads` - 获取下载资源
- `/api/contact` - 提交联系表单
- `/api/auth/login` - 用户登录
- `/api/auth/register` - 用户注册

**API 封装**：
- 使用 `axios` 封装请求
- 统一错误处理
- 请求/响应拦截器
- Token 管理

---

## 六、开发阶段划分

### 第一阶段：基础框架搭建（1-2 周）

**任务**：
1. 安装配置 `vue-router`
2. 创建路由配置文件
3. 开发全局组件（NavBar、Footer、BackToTop）
4. 配置 Pinia 状态管理
5. 封装 Axios API 请求
6. 创建页面模板文件

**交付物**：
- 完整的路由系统
- 全局组件库
- API 封装工具

---

### 第二阶段：核心页面开发（3-4 周）

**任务**：
1. **Week 1**：文档中心页面 + 案例展示页面
2. **Week 2**：产品功能页面 + 在线演示页面
3. **Week 3**：关于我们页面 + 联系我们页面
4. **Week 4**：下载中心页面 + 定价页面

**交付物**：
- 8 个完整页面
- 配套的组件和样式

---

### 第三阶段：博客系统开发（1-2 周）

**任务**：
1. 博客列表页开发
2. 博客详情页开发
3. Markdown 渲染配置
4. 搜索和分类功能
5. 评论系统（可选）

**交付物**：
- 完整博客系统
- Markdown 编辑器集成

---

### 第四阶段：用户系统开发（1 周）

**任务**：
1. 登录/注册页面
2. JWT Token 管理
3. 权限控制
4. 用户信息页面

**交付物**：
- 用户认证系统
- 权限管理模块

---

### 第五阶段：优化与测试（1-2 周）

**任务**：
1. 性能优化（懒加载、代码分割）
2. SEO 优化（Meta 标签、SSR 考虑）
3. 响应式适配测试
4. 浏览器兼容性测试
5. 无障碍访问优化
6. 单元测试编写

**交付物**：
- 性能优化报告
- 测试覆盖报告

---

## 七、技术选型补充

### 新增依赖

```json
{
  "dependencies": {
    "vue-router": "^4.2.0",
    "pinia": "^2.1.0",
    "axios": "^1.6.0",
    "markdown-it": "^14.0.0",
    "highlight.js": "^11.9.0",
    "echarts": "^5.4.0",
    "vue-echarts": "^6.6.0",
    "dayjs": "^1.11.0",
    "vueuse/core": "^10.7.0"
  },
  "devDependencies": {
    "@types/markdown-it": "^13.0.0",
    "vitest": "^1.0.0",
    "@vue/test-utils": "^2.4.0"
  }
}
```

---

## 八、设计规范

### 8.1 颜色系统

```css
:root {
  --color-primary: #00d4ff;
  --color-secondary: #7c3aed;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-info: #3b82f6;

  --color-bg-primary: #0a0f19;
  --color-bg-secondary: #111827;
  --color-bg-tertiary: #1f2937;

  --color-text-primary: #e5e7eb;
  --color-text-secondary: #9ca3af;
  --color-text-tertiary: #6b7280;

  --color-border: #1f2937;
  --color-border-light: #374151;
}
```

### 8.2 排版规范

- **标题字体**：Orbitron（科技感强）
- **正文字体**：Rajdhani（清晰易读）
- **代码字体**：Fira Code / JetBrains Mono

- **标题层级**：
  - H1: 3.5rem / 56px
  - H2: 2.5rem / 40px
  - H3: 1.5rem / 24px
  - H4: 1.25rem / 20px
  - 正文: 1rem / 16px

### 8.3 间距系统

- 基础单位：0.25rem (4px)
- 常用间距：
  - xs: 0.5rem
  - sm: 1rem
  - md: 1.5rem
  - lg: 2rem
  - xl: 3rem
  - 2xl: 4rem

### 8.4 圆角规范

- 小圆角：4px
- 中圆角：8px
- 大圆角：12px
- 卡片圆角：16px
- 按钮圆角：8px

---

## 九、性能优化策略

### 9.1 代码分割

- 路由懒加载
- 组件异步加载
- 第三方库按需引入

### 9.2 资源优化

- 图片懒加载
- WebP 格式支持
- CDN 加载静态资源
- Gzip 压缩

### 9.3 渲染优化

- 虚拟列表（长列表）
- 防抖/节流
- `v-memo` 优化
- `shallowRef` 避免深度响应

---

## 十、部署与运维

### 10.1 构建配置

```bash
# 开发环境
bun run dev

# 生产构建
bun run build

# 预览构建结果
bun run preview
```

### 10.2 环境变量

```env
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=LayerAndTreeD Dev

# .env.production
VITE_API_BASE_URL=https://api.layerandtreed.com/api
VITE_APP_TITLE=LayerAndTreeD
```

### 10.3 CI/CD

- GitHub Actions 自动构建
- 自动化测试
- 部署到 Vercel/Netlify

---

## 十一、里程碑时间表

| 阶段 | 任务 | 预计时间 | 交付物 |
|------|------|----------|--------|
| 第一阶段 | 基础框架搭建 | 1-2 周 | 路由系统、全局组件、API 封装 |
| 第二阶段 | 核心页面开发 | 3-4 周 | 8 个完整页面 |
| 第三阶段 | 博客系统开发 | 1-2 周 | 博客列表/详情、Markdown 渲染 |
| 第四阶段 | 用户系统开发 | 1 周 | 登录注册、权限管理 |
| 第五阶段 | 优化与测试 | 1-2 周 | 性能优化、测试报告 |
| **总计** | - | **7-11 周** | 完整网站系统 |

---

## 十二、风险评估与应对

### 风险点

1. **Three.js 性能瓶颈**
   - 应对：模型 LOD、视锥体剔除、实例化渲染

2. **OpenLayers 地图加载慢**
   - 应对：瓦片缓存、CDN 加速

3. **大量动画导致卡顿**
   - 应对：使用 CSS3 动画、requestAnimationFrame 优化

4. **移动端适配复杂**
   - 应对：响应式断点设计、触摸事件优化

---

## 十三、后续扩展方向

1. **多语言支持（i18n）**
   - 中文/英文切换
   - 使用 `vue-i18n`

2. **暗黑/明亮主题切换**
   - CSS 变量动态切换
   - 用户偏好保存

3. **数据可视化大屏**
   - 全屏数据展示
   - 实时数据更新

4. **移动端 App（可选）**
   - 使用 Capacitor 打包
   - 原生功能集成

5. **管理后台（CMS）**
   - 内容管理系统
   - 案例/博客在线编辑

---

## 附录：参考资源

### 设计参考
- Dribbble: 搜索 "Industrial Dashboard" "3D Visualization"
- Awwwards: 科技类网站设计

### 技术文档
- [Vue 3 官方文档](https://vuejs.org/)
- [OpenLayers 文档](https://openlayers.org/en/latest/apidoc/)
- [Three.js 文档](https://threejs.org/docs/)
- [Element Plus 文档](https://element-plus.org/)

### 开源项目
- [Vue Admin Beautiful](https://github.com/chuzhixin/vue-admin-beautiful)
- [Naive UI Admin](https://github.com/jekip/naive-ui-admin)

---

**文档版本**：v1.0
**编写日期**：2025-02-04
**最后更新**：2025-02-04
