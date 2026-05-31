/**
 * 郑祥涛 · 2026届全栈 / AI Agent 方向求职作品集
 * 内容已对照「全栈工程师（2026应届生）」JD 精准匹配
 */
window.SITE_CONFIG = {
  profile: {
    name: '郑祥涛',
    role: '人工智能 · 全栈 / Agent 方向',
    headline: '把 AI 能力做成用户用得懂的产品',
    taglines: [
      'LLM 微调 + Flask 后端 + 可交互前端',
      'Agent 记忆、规则引擎与工程化落地',
      'Three.js / Electron 复杂交互体验',
    ],
    location: '浙江杭州 · 2026届',
    email: '1061133830@qq.com',
    phone: '18868444604',
    availability: '2026届',
    highlights: [
      'Agent 落地：饮食智能体 LoRA 微调 + 多轮记忆',
      '全栈作品：旅迹 Electron + 3D 地球 + DeepSeek 行程规划',
      '电商相关：微拍堂数据采集 7 万+ · 合格率 96%',
    ],
    stats: [
      { label: '项目', value: 4, suffix: '个' },
      { label: '竞赛', value: 3, suffix: '项' },
      { label: 'LoRA 步数', value: 250, suffix: '+' },
    ],
    resumePdf: 'assets/resume.pdf',
    portraitImage: 'assets/images/portrait.png',
    heroStack: ['Qwen / LoRA', 'Flask', 'Three.js', 'Electron', 'DeepSeek', 'Cursor', 'Python'],
    heroFocus: [
      '求职：全栈 / Agent · 2026 届应届生',
      '可演示：旅迹桌面端 · 饮食智能体',
      '实习：微拍堂数据采集 · 杭州',
    ],
    heroIntro:
      '参数在涨，上下文在扩，模型却未必离人更近。发展的方向，或许不在更大，而在更懂。\n\n' +
      '当 Agent 能记住上一句话，当界面能指出下一步——AI 才真正开始长大。',
    heroIntroLabel: '絮语',
  },

  about: {
    title: '关于 · 与岗位匹配',
    text:
      '浙江树人学院人工智能专业 2026 届应届生，目标岗位为全栈工程师（AI Agent / 电商方向）。\n\n' +
      '我具备「前端交互 + 后端 API + LLM 应用」的完整交付经验：在饮食智能体项目中完成 Qwen2.5 LoRA 微调、Flask 服务封装与多轮记忆；在旅迹项目中独立实现 Electron 桌面端、Three.js 三维地球、DeepSeek 旅行规划 Agent 及本地代理架构。\n\n' +
      '日常开发深度使用 Cursor 等 AI 编程工具，习惯把复杂 AI 能力拆解为可测试、可迭代的工程模块，并注重界面表达清晰、交互反馈完整。',
    highlights: [
      {
        title: 'Agent / LLM（JD 核心）',
        desc: 'LoRA 微调、指令数据构建、外挂记忆、规则后处理；DeepSeek 接入与 Prompt 工程',
      },
      {
        title: '全栈工程（JD 要求）',
        desc: 'HTML/CSS/JS 复杂交互、Flask REST、Electron 桌面、本地代理与数据持久化',
      },
      {
        title: '电商 & 数据（JD 场景）',
        desc: '微拍堂图片采集与清洗 7 万+；旅迹用户数据隔离与可发布工程化实践',
      },
      {
        title: '协作 & 学习（JD 软技能）',
        desc: '机器人竞赛全国三等奖、跨角色沟通；快速定位 Windows/PyTorch 训练环境问题',
      },
    ],
  },

  skillGroups: [
    { id: 'all', label: '全部' },
    { id: 'ai', label: 'AI / Agent' },
    { id: 'frontend', label: '前端' },
    { id: 'backend', label: '后端' },
    { id: 'data', label: '数据' },
  ],

  skills: [
    {
      name: 'LLM 微调 & Agent',
      level: 82,
      note: 'Qwen2.5 + LoRA · LLaMA-Factory · 多轮记忆 · 规则引擎',
      group: 'ai',
    },
    {
      name: 'Python / Flask',
      level: 80,
      note: 'RESTful API · 推理服务 · 环境复现与部署',
      group: 'backend',
    },
    {
      name: 'HTML / CSS / JavaScript',
      level: 85,
      note: '响应式 · 动画 · 复杂交互 · 无框架原生实现',
      group: 'frontend',
    },
    {
      name: 'Three.js / Electron',
      level: 78,
      note: '3D 地球场景 · CSS2D 标注 · 桌面应用打包',
      group: 'frontend',
    },
    {
      name: 'PyTorch / 数据结构',
      level: 75,
      note: '竞赛调试 · 传感器数据分析 · 算法基础',
      group: 'ai',
    },
    {
      name: '数据采集 & 清洗',
      level: 88,
      note: '爬虫采集 · 去重质检 · 质量报告 · 标注协作',
      group: 'data',
    },
    {
      name: 'AI 辅助开发（Cursor）',
      level: 90,
      note: '高效迭代 · 代码审查 · 全栈联调',
      group: 'frontend',
    },
    {
      name: '团队协作 & 沟通',
      level: 86,
      note: '竞赛队长协调 · 实习跨组沟通 · 学生会活动组织',
      group: 'data',
    },
  ],

  experience: [
    {
      id: 'exp-weipaitang',
      company: '微拍堂文化有限公司',
      role: '数据采集实习生',
      period: '2026.01 — 2026.04',
      place: '杭州',
      summary:
        '负责平台图片数据采集与清洗，对接电商/内容业务的数据质量需求（与 JD「电商赛道」数据侧能力相关）。',
      highlights: [
        '每日运行爬虫采集约 1,000 张符合业务要求的图片，累计 7 万余张',
        '样本合格率稳定在 96% 以上，有效数据利用率提升约 20%',
        '定期输出质量报告，与标注组沟通优化筛选规则',
      ],
    },
    {
      id: 'exp-diet',
      company: '个人项目 · 饮食智能体',
      role: '全栈 / Agent 开发',
      period: '2026.04',
      place: '杭州',
      summary:
        '独立完成 LLM 微调至 Web 交付的全流程，对应 JD「Agent 应用 + MaaS 平台向产品化」能力。',
      highlights: [
        '200+ 条 Alpaca 指令数据 · Qwen2.5-1.5B LoRA · loss 2.5→0.5',
        '外挂记忆 + 规则引擎，数量准确率 60%→95%+',
        'Flask API + 多轮对话前端 · GitHub 可复现',
      ],
    },
    {
      id: 'exp-robot',
      company: '中国高校智能机器人创意大赛',
      role: '队员 / 数据与协调',
      period: '2025.04 — 2025.08',
      place: '团队',
      summary: '负责机器人运行数据记录、异常分析与团队分工协调，体现 JD 要求的逻辑分析与协作能力。',
      highlights: [
        '基于传感器与轨迹数据定位异常并推动优化方案',
        '协调 3 名队员阶段性计划，全国赛第三名',
        '省赛轮式格斗、智能家居方向多项二等奖 / 三等奖',
      ],
    },
    {
      id: 'exp-student',
      company: '浙江树人学院 · 学生会学习部',
      role: '干事',
      period: '2022.09 — 2023.06',
      place: '杭州',
      summary: '策划考研经验分享活动，锻炼信息整理、活动落地与公开表达能力。',
      highlights: [
        '采访 10+ 学长学姐，覆盖 150+ 新生',
        '内容被学校官方校园号采纳发布',
      ],
    },
  ],

  works: {
    sectionTitle: '作品集',
    sectionSubtitle: 'JD MATCHED PROJECTS',
    categories: [
      { id: 'all', label: '全部' },
      { id: 'agent', label: 'Agent / AI' },
      { id: 'fullstack', label: '全栈' },
      { id: 'competition', label: '竞赛' },
    ],
    items: [
      {
        id: 'work-travel',
        title: '旅迹 · 3D 旅行足迹 & AI 规划',
        category: 'fullstack',
        tags: ['Electron', 'Three.js', 'DeepSeek', 'Agent'],
        year: '2025—2026',
        role: '独立全栈开发',
        cover: 'assets/works/travel-home-launch.png',
        images: [
          'assets/works/travel-home-launch.png',
          'assets/works/travel-globe.png',
          'assets/works/travel-hangzhou-map.png',
          'assets/works/travel-plan-form.png',
          'assets/works/travel-footprint.png',
        ],
        description:
          '【匹配 JD：全栈 + Agent + 复杂前端交互】\n\n' +
          '桌面端旅行记录应用：Electron 打包为 Windows 可执行程序，无需 Node 环境即可运行。\n\n' +
          '• 前端：Three.js 三维地球、CSS2D 省市标注、启动页/地球页转场动画、触摸与响应式适配\n' +
          '• AI Agent：集成 DeepSeek 自动生成城市旅行行程；本地 deepseek-proxy 解决 CORS；API Key 本机隔离\n' +
          '• 工程：用户 data/ 目录持久化、发布前数据安全检查、全国地标 GeoJSON 构建脚本\n' +
          '• 产品思维：把「AI 规划能力」嵌入地图交互流程，降低用户使用门槛',
        featured: true,
      },
      {
        id: 'work-diet',
        title: '饮食智能体 · Qwen2.5 LoRA 微调',
        category: 'agent',
        tags: ['LoRA', 'Flask', 'Agent', 'Python'],
        year: '2026',
        role: '微调 & 后端 & 前端',
        cover: 'assets/works/diet-launch.png',
        images: [
          'assets/works/diet-launch.png',
          'assets/works/diet-home.png',
          'assets/works/diet-chat.png',
        ],
        description:
          '【匹配 JD：Agent 应用 + 后端 + LLM 实践】\n\n' +
          '面向个性化饮食推荐的对话 Agent，从数据到部署完整闭环。\n\n' +
          '• 数据：200+ Alpaca 格式指令，覆盖甜咸、忌口、时间、健身等场景\n' +
          '• 微调：LLaMA-Factory + Qwen2.5-1.5B-Instruct，RTX 3060 LoRA 250 步\n' +
          '• Agent 能力：外挂长期记忆（口味/忌口）、动态去重；规则引擎解析「X菜Y汤」数量要求\n' +
          '• 工程难点：Windows DataLoader 多进程卡死 → num_workers=0；中文输出兜底\n' +
          '• 交付：Flask RESTful API + 多轮对话 Web UI · GitHub 一键复现',
        featured: true,
      },
      {
        id: 'work-robot',
        title: '智能机器人创意大赛',
        category: 'competition',
        tags: ['算法', '嵌入式', '团队协作'],
        year: '2025',
        role: '队员 · 数据分析',
        cover: 'assets/works/robot-overview.svg',
        images: [
          'assets/works/robot-overview.svg',
          'assets/works/robot-data.svg',
          'assets/works/robot-debug.svg',
          'assets/works/robot-team.svg',
        ],
        description:
          '【匹配 JD：计算机基础 + 逻辑分析 + 团队协作】\n\n' +
          '第八届中国高校智能机器人创意大赛全国二等奖；浙江省赛轮式格斗、智能家居方向多项奖项。\n\n' +
          '• 负责运行数据记录：传感器参数、运动轨迹、指令响应时间戳\n' +
          '• 用对比曲线定位漂移 / 滞后区间，提出标定与 PID 优化建议\n' +
          '• 参与感知 → 控制 → 决策全链路调试，3 人团队分工明确\n' +
          '• 赛前 checklist 固化有效参数，保障联调与比赛稳定性',
        featured: false,
      },
      {
        id: 'work-portfolio',
        title: '本求职作品集网站',
        category: 'fullstack',
        tags: ['HTML/CSS/JS', '交互设计', '可配置'],
        year: '2026',
        role: '设计与开发',
        cover: 'assets/works/portfolio-overview.svg',
        images: [
          'assets/works/portfolio-overview.svg',
          'assets/works/portfolio-interaction.svg',
          'assets/works/portfolio-works.svg',
          'assets/works/portfolio-config.svg',
        ],
        description:
          '【匹配 JD：视觉审美 + 复杂交互 + 前端工程】\n\n' +
          '黑白线稿风求职站：纯 HTML/CSS/JS 静态部署，config.js 一处改内容全站生效。\n\n' +
          '• 纸飞机光标：弹簧飞控、航迹拖尾、情境准星与提示条\n' +
          '• 作品灯箱：多图轮播、等比缩放、各项目独立主题色\n' +
          '• 章节交互：阅读进度、reveal 入场、技能筛选、作品搜索\n' +
          '• 工程：main / sections / works / ui 模块化，零构建依赖',
        featured: false,
      },
    ],
  },

  contact: {
    title: '联系',
    note: '欢迎邮件或电话联系。可提供饮食智能体私有仓库授权、旅迹项目演示与个人简历 PDF。',
    status: [
      { label: '求职方向', value: '全栈工程师 · 2026届' },
      { label: '回复时效', value: '24 小时内' },
    ],
  },

  links: [
    { label: 'GitHub', url: 'https://github.com/S1LENCE-A' },
    { label: '下载 PDF 简历', url: 'assets/resume.pdf' },
  ],

  theme: {
    accent: '#e07a5f',
    accent2: '#3d8b8b',
    accent3: '#d4a054',
    pattern: 'grid',
  },

  /** 欢迎启动页 — 首次访问 / 每会话展示一次 */
  splash: {
    enabled: true,
    oncePerSession: true,
    storageKey: 'zxt-portfolio-splash',
    eyebrow: '全栈 / Agent 方向 · 求职作品集',
    welcomeLine1: '欢迎',
    welcomeLine2: '',
    welcomeFont: 'Ma Shan Zheng',
    subtitle: '即将进入项目、技能与工程实践展示',
    hints: [
      '作品与交互体验一览',
      '面向面试官快速浏览',
      '纸飞机已就绪，随时出发',
    ],
    enterLabel: '进入站点',
    returnLabel: '启动页',
    hint: 'Enter 进入',
    readyDelay: 2400,
    exitDuration: 1000,
    progressSteps: ['ROUTE', 'LOAD', 'READY'],
  },

  footer: '© 2026 郑祥涛 · 人工智能 · 求职作品集',
};
