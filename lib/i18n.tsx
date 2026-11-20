"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import zhExtraMap from "./i18n-extra.json";
import zhOverrides from "./i18n-zh-overrides.json";

export type Language = "en" | "zh";

const zh: Record<string, string> = {
  "Skip to content": "跳到主要内容",
  "Visual UI · Product · Motion": "视觉 UI · 产品 · 动效",
  "Visual UI, Product & Creative Designer": "视觉 UI、产品与创意设计师",
  "Independent portfolio / 2022—2026": "独立作品集 / 2022—2026",
  "Independent / Design portfolio": "独立作品集 / 设计",
  "Designing clarity with character.": "让清晰成为风格。",
  "Designing clarity": "让清晰",
  "with character.": "成为风格。",
  "Design approach": "设计方法",
  "I'm a visual UI, product and creative designer shaping clear systems, tactile identities and motion with a reason to exist.":
    "我是一名视觉 UI、产品与创意设计师，关注清晰的系统、有触感的视觉身份，以及有理由存在的动效。",
  "Explore selected work": "查看精选作品",
  "Scroll to the project stage": "前往项目展示",
  "Selected work": "精选作品",
  "Selected projects": "精选项目",
  "Project preview": "项目预览",
  "Selected work / single project focus": "精选作品 / 单项目聚焦",
  "Case study online": "案例已上线",
  "Case study in development": "案例制作中",
  "Discipline": "领域",
  "Evidence": "依据",
  "Project switcher": "项目切换",
  "Choose a project": "选择项目",
  "Previous project": "上一个项目",
  "Next project": "下一个项目",
  "Current project:": "当前项目：",
  "Open project ↗": "查看项目 ↗",
  "View project ↗": "查看项目 ↗",
  "Open case study": "查看案例",
  "Open app case": "查看应用案例",
  "Open interface case": "查看界面案例",
  "Click to try": "点击体验",
  "Click to open": "点击打开",
  "Pet profiles": "宠物档案",
  "Shared appointments": "共享预约",
  "Live walk": "实时散步",
  "Home dashboard": "首页仪表盘",
  "Pet profile": "宠物档案",
  "Health directions": "健康方向",
  "App design / 05": "应用设计 / 05",
  "App design / 03": "应用设计 / 03",
  "10 screens / Figma": "10 个界面 / Figma",
  "Open the PETLY app design and user flow case study": "打开 PETLY 应用设计与页面流程案例",
  "Open the PETLY pet care app interface case study": "打开 PETLY 宠物护理应用界面案例",
  "Home": "首页",
  "Work": "作品",
  "Works": "作品",
  "HAPE": "HAPE",
  "Approach": "方法",
  "About": "关于",
  "Contact": "联系",
  "Long-form": "长页作品集",
  "Introduction and selected work": "介绍与精选作品",
  "One project at a time": "逐个项目浏览",
  "Open the first full case study": "打开首个完整案例",
  "Process and working principles": "过程与工作原则",
  "Practice, background and point of view": "实践、背景与观点",
  "Start a conversation": "开始交流",
  "Read the scroll-based portfolio edition": "阅读长页作品集",
  "Case index": "案例索引",
  "Portfolio index": "作品集索引",
  "Explore another case.": "继续浏览其他案例。",
  "Navigate the work.": "浏览作品。",
  "Menu links": "菜单链接",
  "Close navigation": "关闭导航",
  "Open navigation": "打开导航",
  "Switch to night": "切换到夜间模式",
  "Switch to day": "切换到日间模式",
  "Back to Jin Fanhao homepage": "返回 Jin Fanhao 首页",
  "Jin Fanhao, home": "Jin Fanhao，首页",
  "Portfolio navigation": "作品集导航",
  "Portfolio sections": "作品集栏目",
  "Contact / 2026": "联系 / 2026",
  "Open to product, interface and motion conversations": "开放产品、界面与动效方向的合作交流",
  "Have a project in mind?": "有项目想聊？",
  "Let's make it": "一起做点",
  "memorable.": "记得住的。",
  "Jin Fanhao / Visual UI, Product & Creative Designer": "Jin Fanhao / 视觉 UI、产品与创意设计师",
  "Footer navigation": "页脚导航",
  "Open the": "打开",
  "case study": "案例",
  "live project": "在线作品",
  "Opens in a new tab": "在新标签页打开",
  "The full chapter is being prepared. Use the project switcher to preview the next direction.":
    "完整章节正在准备中。可以通过项目切换器预览下一个方向。",
  "View selected work": "查看精选作品",
  "Read the approach": "阅读方法",
  "Read about the practice": "了解我的实践",
  "More about the practice": "进一步了解实践",
  "Return to the monument": "返回纪念碑",
  "Back to monument": "返回纪念碑",
  "Works / Selected projects": "作品 / 精选项目",
  "About / Resume and practice": "关于 / 经历与实践",
  "Approach / Process and principles": "方法 / 过程与原则",
  "Contact / Start a conversation": "联系 / 开始交流",
  "Selected work.": "精选作品。",
  "Six projects across product systems, visual UI, editorial commerce and motion-led web experiences.":
    "六个项目，涵盖产品系统、视觉 UI、编辑式电商与以动效驱动的网页体验。",
  "UI designer with a hands-on making practice.": "既做界面，也动手把东西做出来。",
  "I work across interface design, 3D modeling and AI-assisted animation. My background includes toy product development and project-led motion work.":
    "我的工作涉及界面设计、3D 建模和 AI 辅助动画，也做过玩具产品开发与项目动效。",
  "Clarity first.": "先讲清楚。",
  "Character second.": "再做出性格。",
  "A flexible process for turning complex product and brand needs into a coherent digital system.":
    "用灵活的过程，把复杂的产品与品牌需求整理成连贯的数字系统。",
  "Let's make it memorable.": "一起做点记得住的。",
  "For product, interface, visual system or motion-led design conversations, use the address below.":
    "如果你在考虑产品、界面、视觉系统或以动效为主的设计，可以通过下面的邮箱联系我。",
  "Profile": "个人简介",
  "Interface design, 3D and AI-assisted production.": "界面设计、3D 与 AI 辅助制作。",
  "I am Jin Fanhao, a UI designer based in Taizhou, Zhejiang. I am completing a bachelor's degree in Art and Technology at Zhejiang Wanli University.":
    "我是 Jin Fanhao，一名位于浙江台州的 UI 设计师，正在浙江万里学院完成艺术与科技专业本科学业。",
  "My experience covers UI design, 3D modeling, visual design and AI-assisted animation. I have worked on toy product development and AI-generated motion for project-led content.":
    "我的经历包括 UI 设计、3D 建模、视觉设计和 AI 辅助动画，参与过玩具产品开发，也做过项目内容中的 AI 生成动效。",
  "Target role": "目标岗位",
  "UI Designer": "UI 设计师",
  "Hometown": "家乡",
  "Taizhou, Zhejiang, China": "中国浙江台州",
  "Gender": "性别",
  "Male": "男",
  "Education": "教育经历",
  "Zhejiang Wanli University": "浙江万里学院",
  "Bachelor's degree in Art and Technology / Sep 2022 to Jun 2026": "艺术与科技专业本科 / 2022 年 9 月至 2026 年 6 月",
  "Relevant coursework included AI generation, interactive prototype design, fundamentals of brand design, motion image design and cross-media integration.":
    "相关课程包括 AI 生成、交互原型设计、品牌设计基础、动态影像设计和跨媒介整合。",
  "Relevant coursework": "相关课程",
  "AI generation": "AI 生成",
  "Interactive prototype design": "交互原型设计",
  "Brand design fundamentals": "品牌设计基础",
  "Motion image design": "动态影像设计",
  "Cross-media integration": "跨媒介整合",
  "Skills": "技能",
  "Tools and capabilities.": "工具与能力。",
  "Skill groups": "技能分组",
  "Design tools": "设计工具",
  "Software I use.": "常用软件。",
  "Core skills": "核心能力",
  "What I make.": "主要产出。",
  "Additional tools": "其他工具",
  "AI and 3D.": "AI 与 3D。",
  "UI design": "UI 设计",
  "3D modeling": "3D 建模",
  "Poster design": "海报设计",
  "Brand visual design": "品牌视觉设计",
  "ChatGPT for prompt writing": "使用 ChatGPT 撰写提示词",
  "Experience": "工作经历",
  "Product development and AI animation.": "产品开发与 AI 动画。",
  "Oct 2025 to Jan 2026": "2025 年 10 月至 2026 年 1 月",
  "Ningbo, China": "中国宁波",
  "Ningbo Yiren Toy Co., Ltd.": "宁波怡人玩具股份有限公司",
  "3D Modeling Design Intern": "3D 建模设计实习生",
  "Designed and developed 3D models for the furniture role-play product series.":
    "为家具角色扮演产品系列设计和制作 3D 模型。",
  "Designed and optimized models for the ride-on toy series.": "为骑乘玩具系列设计和优化模型。",
  "Completed sticker artwork for the crayon series.": "完成蜡笔系列的贴纸画面。",
  "Supported the team with UI interface improvements, manual layout and proofreading.":
    "协助团队改进 UI 界面，并参与说明书排版和校对。",
  "Produced and edited introduction videos for product play proposals.":
    "为产品玩法提案制作和剪辑介绍视频。",
  "Mar 2026 to May 2026": "2026 年 3 月至 2026 年 5 月",
  "Hangzhou, China": "中国杭州",
  "Hangzhou Network Technology Co., Ltd.": "杭州网络科技有限公司",
  "AI Animator": "AI 动画师",
  "Used generative AI tools to create animation, short video and visual assets, covering ideation, prompt design, image generation, animation and post-production.":
    "使用生成式 AI 工具制作动画、短视频和视觉素材，工作涵盖构思、提示词设计、图像生成、动画和后期。",
  "Wrote and iterated prompts from scripts, storyboards and visual requirements, with attention to consistency in characters, scenes, camera movement, lighting and visual style.":
    "根据脚本、分镜和视觉需求撰写并迭代提示词，注意人物、场景、镜头运动、光线和视觉风格的一致性。",
  "Used Midjourney, Kling, Dreamina and Lovart to generate characters, scenes and motion assets, then edited, composited and refined them in post-production.":
    "使用 Midjourney、可灵、即梦和 Lovart 生成人物、场景与动态素材，再在后期完成剪辑、合成和细化。",
  "Campus experience": "校园经历",
  "Youth Volunteer Association.": "青年志愿者协会。",
  "I was a member of the Youth Volunteer Association and took part in and organized several volunteer activities.":
    "我曾是青年志愿者协会成员，参与并组织过多次志愿活动。",
  "From 2022 to 2024, I planned and organized the Mantianxing (A Sky Full of Stars) activity. It was intended to enrich daily life for the special groups it served.":
    "2022 年至 2024 年，我策划并组织了“满天星”活动，希望丰富服务对象的日常生活。",
  "Self-evaluation": "自我评价",
  "Visual judgment, fast learning and practical AI use.": "视觉判断、快速学习与务实的 AI 应用。",
  "I have a foundation in visual aesthetics and learn quickly. I use AI technologies to support and improve content production efficiency.":
    "我具备视觉审美基础，学习速度较快，也会用 AI 技术辅助并提升内容制作效率。",
  "A connected way of working.": "把工作连成一条线。",
  "Good digital work is not a pile of isolated screens. It is a connected system of information, behaviours and visual signals that helps people understand where they are and what comes next.":
    "好的数字产品不是一堆互不相干的页面，而是由信息、行为和视觉信号组成的系统，帮助人知道自己在哪里、接下来能做什么。",
  "I work from structure toward expression: define the task, map the content, establish reusable rules, then use type, colour, material and motion to give the system a distinct point of view.":
    "我通常从结构走向表达：先明确任务、梳理内容、建立可复用的规则，再用字体、颜色、材质和动效让系统形成自己的观点。",
  "A relay, not a checklist.": "像接力，不像打勾清单。",
  "Each stage resolves one kind of uncertainty before the next begins. Decisions stay visible instead of disappearing between screens.":
    "每个阶段先解决一类不确定，再进入下一阶段。决策会留在过程里，而不是消失在不同页面之间。",
  "Frame the problem": "界定问题",
  "Audience, content, constraints and the decisions the interface needs to support.":
    "明确受众、内容、限制条件，以及界面需要支持哪些决策。",
  "Build the system": "搭建系统",
  "Flows, layouts, type, colour, components and responsive behaviour.":
    "梳理流程、版式、字体、颜色、组件和响应式行为。",
  "Prove the experience": "验证体验",
  "Working interactions, edge states and the details that make the system hold together.":
    "把交互、边界状态和让系统成立的细节做出来。",
  "Three principles keep the work coherent.": "三条原则让工作保持连贯。",
  "Structure before surface": "先结构，后表面",
  "Define the information architecture, the task and the context before styling the screen. A strong system makes every visual decision easier.":
    "先确定信息架构、任务和语境，再处理页面样式。底层系统清楚，视觉判断也会更有依据。",
  "Systems over screens": "做系统，不只做单页",
  "Build reusable type, spacing, colour and component rules so each screen feels specific without becoming disconnected from the whole.":
    "建立可复用的字体、间距、颜色和组件规则，让每个界面有自己的重点，又不脱离整体。",
  "Motion with a reason": "动效要有理由",
  "Use movement to reveal hierarchy, explain a state change and reward exploration. Precision matters more than the number of effects.":
    "用动效提示层级、解释状态变化，并回应探索。做得准比做得多更重要。",
  "What to include.": "可以写些什么。",
  "A few clear lines are enough to begin.": "先把几件关键的事说清楚就够了。",
  "Useful details to include": "可以包含的信息",
  "The project context": "项目背景",
  "What needs to change": "需要改变的地方",
  "The experience you want to create": "希望创造的使用体验",
  "I'm open to product design, interface systems, visual identities for digital products and motion-led portfolio or campaign experiences.":
    "我可以参与产品设计、界面系统、数字产品视觉身份，以及以动效为主的作品集或活动体验。",
  "Product": "产品",
  "Product systems": "产品系统",
  "Flows, information architecture, UI systems and interactive prototypes.":
    "流程、信息架构、UI 系统和交互原型。",
  "Visual": "视觉",
  "Digital art direction": "数字艺术指导",
  "Visual languages, editorial interfaces and responsive component systems.":
    "视觉语言、编辑式界面和响应式组件系统。",
  "Motion": "动效",
  "Interaction and motion": "交互与动效",
  "State transitions, spatial interaction and motion-led web experiences.":
    "状态过渡、空间交互和以动效驱动的网页体验。",
  "Close reader and return to the monument": "关闭阅读器并返回纪念碑",
  "Return to Jin Fanhao home": "返回 Jin Fanhao 首页",
  "Jin Fanhao / Visual UI, Product & Motion": "Jin Fanhao / 视觉 UI、产品与动效",
  "Back to the monument": "返回纪念碑",
  "Practice / How I work": "实践 / 我的工作方式",
  "Three working principles.": "三条工作原则。",
  "A flexible process for visual systems, digital products and motion-led experiences. Each project uses the parts it genuinely needs.":
    "一套灵活的过程，适用于视觉系统、数字产品和以动效为主的体验。每个项目只使用真正需要的部分。",
  "Structure first": "先理结构",
  "Start with the information, the task and the context. Visual decisions should make the system easier to understand, not just more expressive.":
    "从信息、任务和语境开始。视觉判断首先要让系统更容易理解，而不只是更有表现力。",
  "Atmosphere with intent": "让氛围有目的",
  "Colour, type, material and motion are used to build a recognisable world around the work while preserving reading comfort.":
    "用颜色、字体、材质和动效为作品建立可识别的氛围，同时保证阅读舒适。",
  "Evidence over theatre": "拿依据说话",
  "Finished screens, working interactions and technical checks are presented for what they are. Research and testing are never inferred.":
    "完成的界面、可运行的交互和技术检查都按实际状态呈现。不会把研究或测试写成没有发生过的事。",
  "Visual UI": "视觉 UI",
  "Product thinking": "产品思考",
  "Design systems": "设计系统",
  "Typography": "字体设计",
  "Motion direction": "动效指导",
  "Responsive behaviour": "响应式表现",
  "Interaction prototyping": "交互原型",
  "Creative development": "创意开发",
  "Visual identity": "视觉身份",
  "Editorial interfaces": "编辑式界面",
  "Motion-led experiences": "动效体验",
  "Responsive craft": "响应式细节",
  "About / Jin Fanhao": "关于 / Jin Fanhao",
  "Independent designer / 2026": "独立设计师 / 2026",
  "A practice between systems and expression": "在系统与表达之间工作",
  "Structure, atmosphere and": "结构、氛围，还有",
  "motion.": "动效。",
  "I'm Jin Fanhao, a visual UI, product and creative designer with a background in Art and Technology, 3D modelling and AI-assisted motion. I studied at Zhejiang Wanli University from 2022 to 2026.":
    "我是 Jin Fanhao，一名视觉 UI、产品与创意设计师，背景涉及艺术与科技、3D 建模和 AI 辅助动效。2022 年至 2026 年就读于浙江万里学院。",
  "My work connects interface systems, editorial composition and spatial thinking. I care about clear information architecture, reusable patterns, multilingual behaviour and the small details that make a digital product feel coherent.":
    "我的工作连接界面系统、编辑式构图和空间思维。我关注清晰的信息架构、可复用模式、多语言表现，以及那些让数字产品显得完整的细节。",
  "Explore the work index": "浏览全部作品",
  "Education / 2022—2026": "教育经历 / 2022—2026",
  "Art and Technology": "艺术与科技",
  "Selected capabilities": "主要能力",
  "Project boundary": "项目边界",
  "All six projects were independently completed. HAPE began as an internship assignment and is presented as a concept proposal. Browser checks are technical evidence, not user testing.":
    "六个项目均由我独立完成。HAPE 起初是实习任务，这里作为概念方案呈现。浏览器检查属于技术依据，不是用户测试。",
  "All six portfolio projects were independently completed. HAPE originated as an internship assignment and is presented as a concept proposal.":
    "六个作品集项目均由我独立完成。HAPE 起初是实习任务，这里作为概念方案呈现。",
  "UI / Product": "UI / 产品",
  "Visual Systems": "视觉系统",
  "Information Architecture": "信息架构",
  "Interaction Prototyping": "交互原型",
  "Motion / 3D": "动效 / 3D",
  "Localization / Quality": "本地化 / 质量",
  "My work moves between product interfaces, visual systems and motion-led prototypes, with a focus on making complex information feel calm and intentional.":
    "我的工作在产品界面、视觉系统和动效原型之间展开，重点是让复杂信息显得平静、有意图。",
  "Designing the system behind the screen.": "设计屏幕背后的系统。",
  "I'm Jin Fanhao, a UI designer with a background in Art and Technology, 3D modelling and AI-assisted motion. I studied at Zhejiang Wanli University from 2022 to 2026.":
    "我是 Jin Fanhao，一名 UI 设计师，背景涉及艺术与科技、3D 建模和 AI 辅助动效。2022 年至 2026 年就读于浙江万里学院。",
  "My practice connects interface design, visual systems and spatial thinking. I care about information architecture, reusable patterns, typography, multilingual behaviour and the small interactions that make a product feel coherent.":
    "我的工作连接界面设计、视觉系统和空间思维。我关注信息架构、可复用模式、字体、多语言表现，以及让产品显得连贯的小交互。",
  "A practice that connects product structure, visual systems and motion-led interaction — with clarity as the constant.":
    "把产品结构、视觉系统和动效交互连在一起，始终以清晰为基准。",
  "Systems over isolated screens": "做系统，不只做单页",
  "Build reusable type, colour, spacing and component rules so that every screen can feel specific without becoming disconnected.":
    "建立可复用的字体、颜色、间距和组件规则，让每个界面有自己的重点，又不脱离整体。",
  "Start with the information architecture, the task and the context. Visual decisions become stronger when the system underneath them is clear.":
    "先确定信息架构、任务和语境。底层系统清楚，视觉判断也会更有依据。",
  "Let's make something clear.": "把事情做清楚。",
  "Copied": "已复制",
  "Copy email": "复制邮箱",
  "Email address copied to clipboard.": "邮箱地址已复制到剪贴板。",
  "Also reach me at": "也可通过以下邮箱联系",
  "Continue browsing": "继续浏览",
  "Loading portfolio": "作品集加载中",
  "Building the monument": "正在搭建作品集",
  "Scene ready": "场景已准备",
  "Loading scene": "正在加载场景",
  "Select a module to enter a chapter": "选择一个模块进入章节",
  "Three archive records": "三条档案记录",
  "How the archive becomes an interface": "档案如何成为界面",
  "Retro archive, modern interface.": "复古档案，现代界面",
  "The core attempt behind CYBERGLOSS is not to reproduce a past decade, but to translate the language of 2000-era desktop archives into a modern website structure. Window frames, folders, paths, status bars and terminal interfaces become an information system, then are reorganised through contemporary product browsing, editorial layout and interaction logic. Period character, brand attitude and usability hold together.": "CYBERGLOSS 的核心尝试不是还原某个年代，而是把 2000 年代桌面档案的语言——窗口、文件夹、路径、状态栏和终端界面——提取成一套信息结构，再用现代商品浏览、编辑排版和交互逻辑重新组织。年代感、品牌态度和可用性因此同时成立。",
  "Archive structure": "档案结构",
  "Window frames, file paths, folders and status bars do more than create a retro atmosphere. They divide content, signal hierarchy and orient the reader. Every page feels like a directory within the same brand archive, so users can read the visual identity and understand what they are browsing at the same time.": "窗口、文件路径、文件夹和状态栏不只负责营造复古氛围，也承担内容分区、层级与位置提示。每个页面都像同一套品牌档案系统中的不同目录，用户能感受到 CYBERGLOSS 的视觉个性，也能判断自己正在浏览什么。",
  "Modern logic": "现代逻辑",
  "Product pages keep prices, materials, sizing and purchase paths; the lookbook uses contemporary editorial pacing; music and community interfaces provide clear states and actions. Beneath the retro surface, the shopping, browsing and communication logic remains familiar, so the visual language does not replace function.": "商品页保留价格、材质、尺码和购买路径；Lookbook 使用现代编辑排版；音乐和社区提供清楚的状态与操作反馈。复古外观之下仍然是用户熟悉的购物、浏览和交流逻辑，因此视觉语言不会覆盖实际功能。",
  "Typographic rhythm": "排版节奏",
  "Long pages create rhythm between dense imagery, archive metadata, short labels and product information. Large images carry emotion, while modern grids, spacing and clear pauses support readability. High-density content keeps its visual impact without losing browsing order.": "长页面在密集图像、档案元数据、短标签和商品信息之间建立节奏。大图负责情绪，现代网格、留白和明确停顿负责可读性，使高密度内容保留视觉冲击，也不会破坏浏览秩序。",
  "How care stays understandable": "如何让照护更易理解",
  "From pet identity to care action.": "从宠物身份到照护行动",
  "PETLY is not about showing more health data. It is about keeping the owner clear through recording, judgement and action. The ten screens are organised around pet identity, information priority and the next action, so health management feels personal and supports real decisions.": "PETLY 要解决的不是如何展示更多健康数据，而是如何让主人在记录、判断和行动之间保持清楚。设计围绕宠物身份、信息优先级和下一步行动组织十个页面，使健康管理既有温度，也能支持实际决策。",
  "Establish identity context": "建立身份语境",
  "Health values can feel distant when they have no clear subject. Pet photography, name, identity labels and health summaries share the same screen context, so users always know which pet the record belongs to. Emotional connection and decision-making information are present at the same time.": "健康数值容易脱离具体对象，让记录读起来像一份抽象病历。设计把宠物照片、名字、身份标签和健康摘要放在同一语境中，让用户始终知道记录属于哪只宠物。情感关系与判断信息因此同时成立。",
  "Prioritise information": "信息优先级",
  "Weight, vaccination and care screens contain multiple values and history. Each screen has one primary health theme, organised as current status, key value, historical change and next-step prompt. A/B/C changes the health priority being emphasised, not the reading structure, so users do not have to relearn how to read each screen.": "体重、疫苗和护理页面都包含多个数值与历史记录。每个页面只设置一个主要健康主题，并按照“当前状态、关键数值、历史变化、下一步提示”组织内容。A/B/C 方向变化的是被强调的健康重点，而不是阅读结构，因此用户不需要在每页重新学习如何查看信息。",
  "Make the next action clear": "明确行动",
  "Viewing a record is only one part of care. Every screen ends with a clear action such as recording weight, checking a vaccination, starting a walk or choosing a care plan. Walks, login and pet creation reuse the same cards, labels and spacing, connecting health management with everyday care.": "查看记录只是照护的一部分。每个页面最终都落到一个明确动作，例如记录体重、查看疫苗、开始散步或选择护理计划。散步、登录和宠物建档继续沿用同一套卡片、标签与间距规则，让健康管理和日常照护形成连续路径。",
  "From identifying insects to understanding ecology.": "从识别昆虫到理解生态",
  "Micro World's goal is not to present as much knowledge as possible, but to give general readers a clear path from recognising a specimen to understanding its life and why it matters. The page architecture follows that path, using information placement, text length and diagrams to control reading depth.": "Micro World 的科普重点不是覆盖尽可能多的知识，而是让普通读者形成一条清楚的认识路径：先认出对象，再理解它怎样生活，最后知道它为什么重要。网站架构围绕这条路径展开，并通过信息位置、文本长度和图解方式控制不同页面的阅读深度。",
  "Start with understanding": "以理解组织内容",
  "The website does not present taxonomy, anatomy, ecology and conservation all at once. It first answers three questions: what it is, how it lives and why it matters. The page structure follows that order: identify the subject, understand its structure and behaviour, then move into habitat and conservation.": "网站没有把分类、解剖、生态和保护信息一次性堆给读者，而是先回答“它是什么、它怎样生活、它为什么重要”。页面结构也按这条顺序展开：识别对象、理解习性与结构、进入栖息地和保护语境。",
  "Keep information with the object": "以对象组织信息",
  "Taxonomy, measurements, habitat and behaviour information sit beside the corresponding image or diagram. Short text and local labels explain what the reader is already looking at, so facts do not require a separate lookup and scientific content is easier to understand and remember.": "分类、尺寸、栖息地和行为信息紧邻对应图像与图解，短文本和局部标注直接解释读者正在看的部分。数据不需要离开对象去查，科学内容也因此更容易被理解和记住。",
  "Use the archive to control depth": "以档案组织深度",
  "Species, anatomy, soil and conservation pages share one archive language: numbering, titles, images, labels and short explanatory sections. Each topic changes the depth and diagram type, while the reading order remains stable.": "物种、解剖、土壤和保护页面共享同一套档案语言：编号、标题、图像、标注和短段说明。页面根据主题改变深度与图解方式，但阅读顺序保持稳定。",
  "From product browsing to brand understanding.": "从商品浏览到品牌理解",
  "The HAPE website needs to connect browsing, choosing and understanding. The design starts with the original site's content hierarchy, then reorganises entry points and information order through browsing logic, visual presentation and a shared page system.": "HAPE 的网站需要把浏览、选择和理解连在一起。设计以原站的内容层级为起点，重新梳理入口与信息顺序，再通过浏览逻辑、视觉呈现和页面系统，让用户从看场景走到做选择，并最终理解品牌。",
  "Original hierarchy": "原站层级",
  "Reference the original hierarchy": "参考原站层级",
  "Keep the original relationship between the homepage, shop, age development, product detail and brand content instead of introducing an unfamiliar information architecture. The redesign focuses on entry order and content continuity: users can enter through category, age or skill, and all paths lead back to the same product information and learning content.": "保留原站首页、商店、年龄发展、产品详情和品牌内容之间的层级关系，不另起一套陌生的信息架构。重设计重点放在入口顺序与内容衔接：用户可以从品类、年龄或能力进入，最后都能回到同一套商品信息与学习内容。",
  "Browsing + visual": "浏览与视觉",
  "Improve browsing and visual clarity": "优化浏览与视觉",
  "The browsing sequence becomes: see a play scenario first, narrow by age, play type and skill, then move into product detail. Visually, large scene photography sets the mood, while shared product cards, labels and spacing control information density, so the pages feel more branded and easier to judge.": "浏览顺序调整为：先看玩耍场景，再按年龄、玩法和能力缩小范围，最后进入产品细节。视觉上以大幅场景图建立情绪，用统一的产品卡、标签和留白控制信息密度，让页面更有品牌感，也更容易判断。",
  "Content + system": "内容与系统",
  "Build trust through content and system": "内容与系统共建信任",
  "About, Sustainability and product detail share one information structure. Material, design philosophy and learning-through-play content appear where users need to make a decision. Consistent headers, image ratios, product cards, skill labels and closing prompts make the eight pages feel like one continuous brand system rather than separate templates.": "About、Sustainability 与产品详情共享同一套信息结构，材料、设计理念和“玩中学”内容出现在用户需要判断的位置。页头、图像比例、商品卡、能力标签和页尾引导保持一致，使八个页面形成连续的品牌系统，而不是各自独立的模板。",
  "Email me": "邮件联系",
};

const zhExtra: Record<string, string> = zhExtraMap;
const zhOverrideMap: Record<string, string> = zhOverrides;

const pageTitles: Record<string, { en: string; zh: string }> = {
  "/": { en: "Jin Fanhao — Visual UI, Product & Creative Designer", zh: "Jin Fanhao — 视觉 UI、产品与创意设计师" },
  "/about": { en: "About — Jin Fanhao", zh: "关于 — Jin Fanhao" },
  "/approach": { en: "Approach — Jin Fanhao", zh: "方法 — Jin Fanhao" },
  "/contact": { en: "Contact — Jin Fanhao", zh: "联系 — Jin Fanhao" },
  "/longform": { en: "Long-form portfolio — Jin Fanhao", zh: "长页作品集 — Jin Fanhao" },
  "/work/hape": { en: "HAPE: Brand Website Redesign — Jin Fanhao", zh: "HAPE：品牌官网重设计 — Jin Fanhao" },
  "/work/micro-world": { en: "Micro World: Insect Science Website — Jin Fanhao", zh: "Micro World：昆虫科普网站 — Jin Fanhao" },
  "/work/petly-interface": { en: "PETLY: Pet Care App Design — Jin Fanhao", zh: "PETLY：宠物护理应用设计 — Jin Fanhao" },
  "/work/petly-product": { en: "PETLY: App Design and User Flow — Jin Fanhao", zh: "PETLY：应用设计与页面流程 — Jin Fanhao" },
  "/work/y2k": { en: "Y2K: CYBERGLOSS Fashion Website — Jin Fanhao", zh: "Y2K：CYBERGLOSS 时尚品牌网站 — Jin Fanhao" },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (text: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [language, setLanguageState] = useState<Language>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let nextLanguage: Language = "en";
    try {
      const stored = window.localStorage.getItem("portfolio-language");
      if (stored === "zh" || stored === "en") nextLanguage = stored;
      else if (navigator.language.toLowerCase().startsWith("zh")) nextLanguage = "zh";
    } catch {
      // Keep English when storage is unavailable.
    }
    setLanguageState(nextLanguage);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const html = document.documentElement;
    html.lang = language === "zh" ? "zh-CN" : "en";
    html.dataset.language = language;
    try {
      window.localStorage.setItem("portfolio-language", language);
    } catch {
      // The language still works for the current visit.
    }

    const routeTitle = pageTitles[pathname];
    const fallbackTitle = pageTitles["/"];
    const desiredTitle = routeTitle?.[language] ?? fallbackTitle?.[language];
    if (!desiredTitle) return;
    const applyTitle = () => {
      if (document.title !== desiredTitle) document.title = desiredTitle;
    };
    applyTitle();
    const titleObserver = new MutationObserver(applyTitle);
    titleObserver.observe(document.head, { subtree: true, childList: true, characterData: true });
    const titleTimeout = window.setTimeout(applyTitle, 250);
    return () => {
      titleObserver.disconnect();
      window.clearTimeout(titleTimeout);
    };
  }, [language, pathname, ready]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((current) => (current === "en" ? "zh" : "en"));
  }, []);

  const t = useCallback((text: string) => (language === "zh" ? zhOverrideMap[text] ?? zh[text] ?? zhExtra[text] ?? text : text), [language]);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, setLanguage, t, toggleLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
