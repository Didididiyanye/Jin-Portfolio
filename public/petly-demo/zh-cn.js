import { DOC_EXACT } from './zh-cn-docs.js';
/* Petly 中文界面层。保留英文数据键和路由，仅翻译可见文案与无障碍标签。 */
(() => {
  const params = new URLSearchParams(location.search);
  const isEnglishDocument = document.documentElement.lang.toLowerCase().startsWith('en');
  if (isEnglishDocument || params.get('lang')?.toLowerCase() === 'en') {
    document.documentElement.lang = 'en';
    return;
  }

  const EXACT = new Map(Object.entries({
    "Skip to content": "跳到主要内容",
    "Primary navigation": "主导航",
    "Petly home": "Petly 首页",
    "Notifications": "通知",
    "Open Jina's profile": "打开林知夏的个人资料",
    "Go back": "返回",
    "Switch pet": "切换宠物",
    "Choose pet": "选择宠物",
    "Care for": "照护对象",
    "Walk with Milo": "和米洛散步",
    "Ready to track your route": "准备好记录路线了吗",
    "Start walk": "开始散步",
    "Sign in": "登录",
    "Sign in · Petly": "登录 · Petly",
    "Milo’s health, held together.": "米洛的健康，井井有条。",
    "Walks, vaccines, vet visits and advice live in one calm record that moves with you.": "散步、疫苗、就诊与兽医建议，都记录在同一份安心的健康档案里。",
    "Email": "邮箱",
    "Password": "密码",
    "Keep me signed in": "保持登录",
    "Forgot?": "忘记密码？",
    "or": "或",
    "Explore the demo": "体验演示",
    "New to Petly?": "初次使用 Petly？",
    "Create an account": "创建账户",
    "Home": "首页",
    "Home · Petly": "首页 · Petly",
    "Walks": "散步",
    "Walks · Petly": "散步 · Petly",
    "Care": "护理",
    "Care · Petly": "护理 · Petly",
    "Profile": "我的",
    "Profile · Petly": "我的 · Petly",
    "Milo has a calm": "米洛今天",
    "day ahead.": "节奏从容。",
    "Next vaccine in 12 days. One walk still to log.": "疫苗还有 12 天到期，还有 1 次散步待记录。",
    "One walk still to log": "还有 1 次散步待记录",
    "On track": "状态良好",
    "Care active": "照护进行中",
    "Walks today": "今日散步",
    "Next vaccine": "下次疫苗",
    "Medication": "用药",
    "None": "无",
    "No doses due": "暂无待服剂量",
    "Next up": "下一项照护",
    "Care hub": "护理中心",
    "Confirmed": "已确认",
    "View details": "查看详情",
    "Reschedule": "改期",
    "No upcoming appointments. Book care when you are ready.": "暂无预约。准备好后即可预约护理。",
    "Book a vet": "预约兽医",
    "Book a vet · Petly": "预约兽医 · Petly",
    "Today’s care trail": "今日护理轨迹",
    "Morning walk logged": "晨间散步已记录",
    "Morning walk not logged yet": "晨间散步尚未记录",
    "Start the timer when you head out.": "出门时开始计时。",
    "Logged": "已记录",
    "Due now": "现在待办",
    "Breakfast": "早餐",
    "Logged · 1 cup · Normal appetite": "已记录 · 1 杯 · 食欲正常",
    "Joint supplement": "关节营养补充",
    "Due at 12:30": "12:30 待办",
    "Next": "下一项",
    "Evening walk": "晚间散步",
    "Plan to log after dinner.": "计划晚饭后记录。",
    "Later": "稍后",
    "Quick actions": "快捷操作",
    "Record walk": "记录散步",
    "Live timer + route": "实时计时与路线",
    "Choose a time": "选择时间",
    "Book vaccine": "预约疫苗",
    "Rabies due soon": "狂犬疫苗即将到期",
    "Ask a vet": "咨询兽医",
    "Chat is included": "聊天咨询已包含",
    "24/7 with Plus": "Petly Plus 全天候咨询",
    "A veterinary clinic ready to welcome pets": "准备好接待宠物的兽医诊所",
    "Your vet chat is open.": "你的兽医对话已开放。",
    "A vet, whenever worry starts.": "担心出现时，兽医随时都在。",
    "Continue the conversation or start a new question.": "继续上次对话，或开始新的问题。",
    "24/7 messaging and video advice are included with Petly Plus.": "Petly Plus 包含全天候消息与视频咨询。",
    "Open vet chat": "打开兽医对话",
    "Explore Petly Plus": "了解 Petly Plus",
    "Walks that add up.": "每一步，都算数。",
    "Walk activity": "散步概览",
    "This week": "本周",
    "Time outside": "户外时长",
    "Daily distance": "每日距离",
    "No walks yet": "本周还没有散步",
    "Recent walks": "最近散步",
    "Photo credits": "图片来源",
    "See all": "查看全部",
    "Last walk": "最近散步",
    "No walks logged this week": "本周还没有记录散步",
    "Live walk": "实时散步",
    "Live walk · Petly": "实时散步 · Petly",
    "GPS ready": "GPS 就绪",
    "Live walk stats": "实时散步数据",
    "Time moving": "移动时间",
    "Distance": "距离",
    "Pace": "配速",
    "Recording: tap pause when you stop moving.": "记录中：停下时请点暂停。",
    "Paused: resume or save this walk.": "已暂停：继续或保存本次散步。",
    "Start when you leave the door.": "出门时开始记录。",
    "Recording": "记录中",
    "Paused": "已暂停",
    "Ready": "准备就绪",
    "Pause walk": "暂停散步",
    "Resume walk": "继续散步",
    "Stop and save walk": "停止并保存散步",
    "Not moving": "尚未移动",
    "Walk summary": "散步详情",
    "Walk summary · Petly": "散步详情 · Petly",
    "Share walk": "分享散步",
    "Route": "路线",
    "Average pace": "平均配速",
    "Duration": "时长",
    "Care note": "护理备注",
    "Back to walks": "返回散步",
    "Care that stays on track.": "护理节奏，始终在线。",
    "Care overview": "护理概览",
    "No visit booked": "暂无预约",
    "Next appointment": "下次预约",
    "No appointment booked": "暂无预约",
    "Choose care when you need it.": "需要时，随时选择护理。",
    "View appointment": "查看预约",
    "Book care": "预约护理",
    "Vaccines": "疫苗",
    "Book a vet visit": "预约兽医就诊",
    "Wellness, skin, mobility or a concern.": "体检、皮肤、行动能力或任何担忧。",
    "Book a vaccine": "预约疫苗",
    "Book a vaccine · Petly": "预约疫苗 · Petly",
    "24/7 vet advice": "全天候兽医建议",
    "Your chat is ready.": "兽医对话已准备好。",
    "Included with Petly Plus.": "Petly Plus 已包含。",
    "Care plan": "护理计划",
    "Full record": "完整档案",
    "Rabies booster": "狂犬疫苗加强针",
    "Dental cleaning": "洁牙",
    "Done": "已完成",
    "Past visits": "历史就诊",
    "No past visits yet.": "暂无历史就诊。",
    "Booking progress": "预约进度",
    "Date & time": "日期与时间",
    "Choose an appointment date": "选择预约日期",
    "Choose an appointment time": "选择预约时间",
    "Two-hour appointment ranges": "两小时预约时段",
    "What does Milo need?": "米洛今天需要什么？",
    "Choose the closest reason. You can add detail before confirming.": "选择最接近的原因，确认前可补充详情。",
    "Visit type": "就诊类型",
    "Annual wellness exam": "年度体检",
    "A full check, weight and prevention review.": "完整体检、体重与预防方案复核。",
    "Skin & allergy visit": "皮肤与过敏就诊",
    "Itching, ears, coat and flare-up support.": "瘙痒、耳部、皮毛与急性发作支持。",
    "Mobility & joints": "行动能力与关节",
    "Limping, stiffness and senior comfort.": "跛行、僵硬与老年宠物舒适护理。",
    "Vet": "兽医",
    "Who": "医生",
    "When": "时间",
    "Price": "价格",
    "Continue to confirm": "继续确认",
    "Anything to add?": "还有什么需要补充？",
    "A symptom, question or access need.": "症状、问题或就诊便利需求。",
    "The rabies booster is due in 12 days. Choose a time and we will prepare the record.": "狂犬疫苗还有 12 天到期。选择时间后，我们会准备健康记录。",
    "Vaccine": "疫苗",
    "Due soon": "即将到期",
    "Vaccine availability is sample data for this prototype. The clinic will confirm stock before your visit.": "此原型中的疫苗库存为示例数据。诊所会在就诊前确认库存。",
    "Confirm booking": "确认预约",
    "Confirm booking · Petly": "确认预约 · Petly",
    "You’re booked.": "预约成功。",
    "This is a prototype confirmation. No real appointment or payment has been created.": "这是原型中的确认页面，未创建真实预约或付款。",
    "Add to calendar": "添加到日历",
    "Appointment": "预约",
    "Appointment · Petly": "预约 · Petly",
    "Reschedule appointment": "更改预约时间",
    "Cancel appointment": "取消预约",
    "Visit price": "就诊价格",
    "Clinic": "诊所",
    "Note": "备注",
    "Petly Plus": "Petly Plus",
    "Petly Plus · Petly": "Petly Plus · Petly",
    "Choose a plan": "选择方案",
    "Annual": "年付",
    "Monthly": "月付",
    "Best value. One payment for the year.": "最划算，一次支付全年。",
    "Flexible, cancel anytime.": "灵活订阅，随时取消。",
    "Start 7-day trial": "开始 7 天试用",
    "Cancel anytime. Demo only; no payment is processed.": "随时取消。仅作演示，不会处理付款。",
    "What’s included": "包含内容",
    "Unlimited 24/7 chat and video advice from licensed veterinarians, with Milo’s care record already in view.": "持证兽医提供全天候不限次消息与视频咨询，并可直接查看米洛的健康档案。",
    "No per-question fee. A care record travels with each conversation.": "无需按次付费，每次咨询都带着完整健康档案。",
    "24/7 advice": "全天候建议",
    "24/7 advice · Petly": "全天候建议 · Petly",
    "A vet in your pocket.": "口袋里的兽医。",
    "Worry less between visits.": "两次就诊之间，也能少一点担心。",
    "24/7 advice is ready when you are.": "无论何时，需要就能咨询。",
    "Unlimited messages with a vet, day or night.": "白天或夜晚，都可与兽医不限次沟通。",
    "Video advice when a photo or clip is not enough.": "照片或视频不够时，可进行视频咨询。",
    "A licensed vet can see Milo’s weight, vaccine record and recent notes before replying.": "执业兽医回复前，可查看米洛的体重、疫苗记录与近期备注。",
    "Your plan is active on this prototype.": "此原型中的订阅已生效。",
    "Message your vet": "联系兽医",
    "Vet chat": "兽医对话",
    "Vet chat · Petly": "兽医对话 · Petly",
    "Open your secure care thread.": "打开你的安全护理对话。",
    "Example vet conversation": "兽医对话示例",
    "Send message": "发送消息",
    "Write a message…": "输入消息…",
    "Thanks. Keep him resting and check the pad for cuts. If the limp is still there tonight, send a short video and we will decide whether he needs an exam.": "谢谢。先让它休息，并检查脚垫是否有伤口。如果今晚仍然跛行，发一段短视频，我们会判断是否需要就诊。",
    "He is limping slightly after his morning walk. Still eating normally.": "它早晨散步后有点跛，进食仍然正常。",
    "Hi Jina. I can see Milo’s weight and vaccine record. What has changed today?": "你好，知夏。我能看到米洛的体重和疫苗记录。今天有什么变化？",
    "Hi Jina. I can see Milo’s record. What has changed today?": "你好，知夏。我能看到米洛的健康记录。今天有什么变化？",
    "He is limping slightly after his walk.": "它散步后有点跛。",
    "Open settings": "打开设置",
    "Your pets": "我的宠物",
    "Your pets · Petly": "我的宠物 · Petly",
    "Add a pet": "添加宠物",
    "Pet profile": "宠物档案",
    "Pet profile · Petly": "宠物档案 · Petly",
    "Edit pet profile": "编辑宠物档案",
    "Personal information": "个人信息",
    "Personal information · Petly": "个人信息 · Petly",
    "Name, contact and emergency details": "姓名、联系方式与紧急联系人",
    "Contact and emergency details": "联系与紧急信息",
    "Full name": "姓名",
    "Contact phone": "联系电话",
    "Mobile number": "手机号码",
    "Home address": "家庭住址",
    "Who can we reach?": "紧急联系人",
    "Emergency contact": "紧急联系人",
    "Sharing preferences": "共享偏好",
    "Share these details with my care circle.": "与我的共同照护人共享这些信息。",
    "This information is used for care coordination and appointment reminders.": "这些信息用于护理协同与预约提醒。",
    "Save changes": "保存更改",
    "Mark all as read": "全部标为已读",
    "Only care reminders and appointment updates appear here.": "这里只显示护理提醒与预约更新。",
    "That is everything for today.": "今天的内容都在这里了。",
    "Settings": "设置",
    "Settings · Petly": "设置 · Petly",
    "Make Petly fit your day.": "让 Petly 适应你的日常。",
    "Reminders stay quiet by default and only appear when care needs attention.": "提醒默认保持安静，只在需要关注时出现。",
    "Reminders": "提醒",
    "Appointment reminders": "预约提醒",
    "24 hours and 1 hour before.": "预约前 24 小时与 1 小时提醒。",
    "Walk reminders": "散步提醒",
    "Morning and evening nudges.": "早晨与傍晚轻提醒。",
    "Vaccine reminders": "疫苗提醒",
    "Two weeks before a due date.": "到期前两周提醒。",
    "Account": "账户",
    "Subscription": "订阅",
    "Privacy & data": "隐私与数据",
    "How health records and photos are stored.": "健康记录与照片的存储方式。",
    "About & credits": "关于与图片来源",
    "About & credits · Petly": "关于与图片来源 · Petly",
    "Sources and design system notes.": "资料来源与设计系统说明。",
    "App": "应用",
    "Version": "版本",
    "1.0.0 prototype": "1.0.0 原型",
    "Open credits": "查看图片来源",
    "Design system": "设计系统",
    "Open spec": "查看规范",
    "A small, honest studio.": "一个小而真诚的工作室。",
    "Petly is a mobile-first design project for pet health coordination. The photography below comes from open collections; each source is linked.": "Petly 是一个以移动端优先的宠物健康协同设计项目。以下照片来自开放图库，并已标注来源。",
    "Photography": "图片来源",
    "Source page": "来源页面",
    "Prototype note": "原型说明",
    "The full token and component spec lives in the project’s visual design-system page.": "完整的令牌与组件规范位于项目的视觉设计系统页面。",
    "Open design system": "打开设计系统",
    "Sample appointments, prices, vaccine dates and vitals are for design review. No real appointment, chat or payment is created.": "预约、价格、疫苗日期与生命体征均为设计评审用示例。不会创建真实预约、聊天或付款。",
    "Not found": "页面不存在",
    "That screen is not in this prototype yet.": "这个页面尚未加入当前原型。",
    "Return home": "返回首页",
    "Walk not found.": "未找到散步记录。",
    "Create a Petly account": "创建 Petly 账户",
    "The prototype keeps sign-up as a secondary flow. For review, use the demo login to explore the full app.": "原型将注册作为次要流程。评审时请使用演示账号体验完整应用。",
    "Continue demo": "继续体验演示",
    "Cancel this appointment?": "取消本次预约？",
    "The clinic will release the slot. You can rebook at any time from Care.": "诊所将释放该时段。你随时可以在护理页面重新预约。",
    "Understood": "知道了",
    "This prototype uses local sample data only. Health records, locations and photos would need a secure backend, consent model and audit trail before launch.": "此原型仅使用本地示例数据。正式上线前，健康记录、位置和照片需要安全后端、授权模型与审计机制。",
    "Signed in to the demo.": "已登录演示版。",
    "A reset link would be sent to your email.": "重置链接将发送到你的邮箱。",
    "Calendar export is ready for the real app.": "正式应用中将支持导出到日历。",
    "Appointment cancelled.": "预约已取消。",
    "Petly Plus trial started in this demo.": "已在演示中开始 Petly Plus 试用。",
    "All notifications marked as read.": "全部通知已标为已读。",
    "Signed out.": "已退出登录。",
    "Add-pet details are the next step in the pet profile flow.": "添加宠物详情将在宠物档案流程中完成。",
    "Pet profile editing is available when the real data source is connected.": "连接真实数据源后即可编辑宠物档案。",
    "Walk summary ready to share.": "散步详情已准备好分享。",
    "Start the timer before saving the walk.": "保存前请先开始计时。",
    "Walk saved to the care trail.": "散步已保存到护理轨迹。",
    "Appointment saved.": "预约已保存。",
    "Enter your email and password to continue.": "请输入邮箱和密码继续。",
    "Signed in to the Petly demo.": "已登录 Petly 演示版。",
    "Personal information saved.": "个人信息已保存。",
    "Message sent.": "消息已发送。",
    "Two lives, one record.": "两只宠物，一份健康记录。",
    "Milo, a golden retriever": "米洛，一只金毛寻回犬",
    "Golden retriever resting on green grass": "金毛寻回犬躺在绿色草地上",
    "Primary caregiver · San Francisco": "主要照护人 · 旧金山",
    "Milo’s week": "米洛的一周",
    "Milo’s walk": "米洛的散步",
    "Riverside loop": "河畔环线",
    "Riverside loop · Milo": "河畔环线 · 米洛",
    "Trent Park trail": "特伦特公园步道",
    "Quiet block": "安静街区",
    "Riverside path · San Francisco": "河畔步道 · 旧金山",
    "NORTH MEADOW": "北草坪",
    "RIVERSIDE PATH": "河畔步道",
    "Stylized park map with the live walk route": "带实时散步路线的风格化公园地图",
    "Full-screen park map with the live walk route": "带实时散步路线的全屏公园地图",
    "Sat 3.1 kilometers, Sun 1.8 kilometers": "周六 3.1 公里，周日 1.8 公里",
    "View Riverside loop walk details": "查看河畔环线散步详情",
    "Short sniff stop at the park.": "在公园短暂停留嗅闻。",
    "Long loop, lots of water.": "绕了长线，喝了很多水。",
    "Luna kept close to the hedges.": "露娜一直贴近绿篱走。",
    "Dog walking outdoors": "户外遛狗",
    "Photo: Wikimedia Commons": "摄影：维基共享资源",
    "Kutup veterinary Sisli": "希什利兽医诊所",
    "Dog Walking in Trent Park": "特伦特公园遛狗",
    "Sentral Bark Dog Park": "森特拉尔狗狗公园",
    "Domestic Cat Face Shot": "家猫正面照",
    "Portrait of a golden retriever on the grass": "草地上的金毛寻回犬肖像",
    "Annual wellness exam with Dr. Sarah Jenkins at Oak Valley Animal Hospital.": "年度体检，莎拉·詹金斯医生，橡谷动物医院。",
    "A confirmation is saved in Milo’s care trail.": "确认信息已保存到米洛的护理轨迹。",
    "Conversation notes stay in Milo’s care trail.": "对话备注会保留在米洛的护理轨迹中。",
    "Share notes and photos from one private thread.": "在同一私密对话中共享备注与照片。",
    "Message a vet any time, with replies usually under 15 minutes.": "随时给兽医发消息，通常 15 分钟内回复。",
    "Keep Milo protected.": "持续守护米洛。",
    "Active · Annual": "生效中 · 年付",
    "Plus active": "Plus 已生效",
    "Petly Plus active": "Petly Plus 已生效",
    "Petly Plus active · secure care thread": "Petly Plus 已生效 · 安全护理对话",
    "Petly Plus · Annual": "Petly Plus · 年付",
    "Not subscribed": "未订阅",
    "Verified": "已认证",
    "Official": "官方",
    "Online": "在线",
    "Primary vet": "主治兽医",
    "Medical record": "医疗档案",
    "Breed registry": "品种登记",
    "Chip": "芯片号",
    "Date of birth": "出生日期",
    "Weight": "体重",
    "Coat & color": "毛色与毛型",
    "Pet": "宠物",
    "Male, neutered": "雄性 · 已绝育",
    "Female, spayed": "雌性 · 已绝育",
    "Golden honey · Double coat": "蜜金色 · 双层被毛",
    "Black smoke · Short coat": "黑烟色 · 短毛",
    "Golden Retriever · 3 yrs 4 mos": "金毛寻回犬 · 3 岁 4 个月",
    "Golden Retriever · 3 yrs 4 mos · 31.4 kg": "金毛寻回犬 · 3 岁 4 个月 · 31.4 公斤",
    "Domestic Shorthair · 6 yrs": "家养短毛猫 · 6 岁",
    "Checkup": "复查",
    "Checkup Nov 02": "11月2日复查",
    "Vaccine due Nov 07": "疫苗 11月7日到期",
    "Due in 12 days": "12 天后到期",
    "Due Jan 12 · Due in 11 weeks": "1月12日到期 · 还有 11 周",
    "Due Nov 07 · Due in 12 days": "11月7日到期 · 还有 12 天",
    "Due Optional · Recommended for group walks": "可选 · 建议参加集体散步时接种",
    "Recommended for group walks": "建议参加集体散步时接种",
    "DHPP annual": "DHPP 年度加强",
    "Bordetella": "博德特氏菌疫苗",
    "Rabies booster is due Nov 07": "狂犬疫苗 11月7日到期",
    "Walk goal still open": "散步目标待完成",
    "Wellness exam confirmed": "体检预约已确认",
    "Rabies booster due Nov 07.": "狂犬疫苗 11月7日到期。",
    "One of Milo’s two daily walks is still unlogged.": "米洛今天两次散步中还有一次未记录。",
    "Milo is due for a rabies booster. A clinic slot is available this week.": "米洛需要接种狂犬疫苗加强针，本周诊所有可用时段。",
    "Completed Sep 18 · No extractions": "9月18日完成 · 无需拔牙",
    "Monthly plan": "月度方案",
    "Annual plan": "年度方案",
    "per month": "每月",
    "Pet photos are open-license placeholders. See": "宠物照片为开放许可占位图，请查看",
    "Pet photo: open-license placeholder ·": "宠物照片：开放许可占位图 ·",
    "Credits": "图片来源",
    "2 saved ·": "2 条已保存 ·",
    "1 record": "1 条记录",
    "SJ": "莎",
    "NK": "金",
    "JE": "林",
    "Where": "地点",
    "Back to care": "返回护理",
    "Bring the latest weight and mobility notes.": "请携带最新体重与行动能力记录。",
    "Always-on care": "全天候护理",
    "Cancel anytime": "随时取消",
    "Photo sources and design system": "图片来源与设计系统",
    "Sign out": "退出登录",
    "Return to the login screen": "返回登录页面",
    "Photo sources and design system notes.": "图片来源与设计系统说明。",
    "Notifications · Petly": "通知 · Petly",
    "What needs your attention.": "需要你关注的事。",
    "Preferences": "偏好设置",
    "Pets & care circle": "宠物与照护圈",
    "2 pets · Clara is a co-caregiver": "2 只宠物 · 克拉拉是共同照护人",
    "2 unread reminders": "2 条未读提醒",
    "Reminders, privacy and app preferences": "提醒、隐私与应用偏好",
    "Photo sources and design system notes.": "图片来源与设计系统说明。",
    "Care notes, walks and appointments stay separate for each pet.": "每只宠物的护理备注、散步与预约都独立保存。",
    "Book vet": "预约兽医",
    "Wellness · 4.9": "体检 · 4.9",
    "Mobility · 4.8": "行动能力 · 4.8",
    "San Francisco, CA · 1.8 km away": "加州旧金山 · 距此 1.8 公里",
    "Thu, Nov 12 at 10:20 with Dr. Sarah Jenkins.": "11月12日 周四 10:20，莎拉·詹金斯医生。",
    "km": "公里",
    "kg": "公斤",
    "credits": "图片来源",
    "credits.": "图片来源。",
    "Clara is a co-caregiver": "Clara 是共同照护人",
    "Photo sources and design system notes.": "图片来源与设计系统说明。"
  }));

  for (const [key, value] of Object.entries(DOC_EXACT)) EXACT.set(key, value);

  const PHRASES = [
    ["Dr. Sarah Jenkins", "莎拉·詹金斯医生"],
    ["Dr. Noah Kim", "金诺亚医生"],
    ["Sarah Jenkins", "莎拉·詹金斯"],
    ["Noah Kim", "金诺亚"],
    ["Oak Valley Animal Hospital", "橡谷动物医院"],
    ["Mission Pet Care", "使命宠物护理中心"],
    ["San Francisco, CA", "加州旧金山"],
    ["San Francisco", "旧金山"],
    ["Wikimedia Commons", "维基共享资源"],
    ["Golden Retriever", "金毛寻回犬"],
    ["Domestic Shorthair", "家养短毛猫"],
    ["Milo’s", "米洛的"],
    ["Luna’s", "露娜的"],
    ["Milo", "米洛"],
    ["Luna", "露娜"],
    ["Jina Evans", "林知夏"],
    ["Jina", "知夏"],
    ["Photo:", "摄影："],
    ["Today’s", "今日"],
    ["Today", "今天"],
    [" via ", "来自 "],
    ["Longest", "最长"],
    ["Next visit", "下次就诊"],
    ["Wellness", "体检"],
    ["Mobility", "行动能力"],
    ["Clara", "克拉拉"],
    ["Yesterday", "昨天"]
  ];

  const MONTHS = { Jan: "1月", Feb: "2月", Mar: "3月", Apr: "4月", May: "5月", Jun: "6月", Jul: "7月", Aug: "8月", Sep: "9月", Oct: "10月", Nov: "11月", Dec: "12月", January: "1月", February: "2月", March: "3月", April: "4月", May: "5月", June: "6月", July: "7月", August: "8月", September: "9月", October: "10月", November: "11月", December: "12月" };
  const WEEKDAYS = { Mon: "周一", Tue: "周二", Wed: "周三", Thu: "周四", Fri: "周五", Sat: "周六", Sun: "周日" };

  function translateString(input) {
    if (!input || (!/[A-Za-z]/.test(input) && !input.includes('$'))) return input;
    const leading = input.match(/^\s*/)[0];
    const trailing = input.match(/\s*$/)[0];
    const text = input.trim();
    if (!text) return input;
    let out = EXACT.get(text) || text;

    if (out === text) {
      const dynamic = [
        [/^What does (.+) need\?$/, (_m, pet) => `${translateString(pet)}今天需要什么？`],
        [/^(.+) has a calm$/, (_m, pet) => `${translateString(pet)}今天`],
        [/^(.+)’s week$/, (_m, pet) => `${translateString(pet)}的一周`],
        [/^(.+)’s walk$/, (_m, pet) => `${translateString(pet)}的散步`],
        [/^Walk with (.+)$/, (_m, pet) => `和${translateString(pet)}散步`],
        [/^Start a live walk with (.+)$/, (_m, pet) => `和${translateString(pet)}开始实时散步`],
        [/^Change pet, currently (.+)$/, (_m, pet) => `切换宠物，当前为${translateString(pet)}`],
        [/^View (.+) walk details$/, (_m, route) => `查看${translateString(route)}散步详情`],
        [/^(.+) selected\.$/, (_m, pet) => `已选择${translateString(pet)}。`],
        [/^Appointments, vaccines and records for (.+), in one place\.$/, (_m, pet) => `${translateString(pet)}的预约、疫苗与健康记录，都在这里。`],
        [/^(.+) with (.+) at (.+)\.$/, (_m, title, doctor, clinic) => `${translateString(title)}，${translateString(doctor)}，${translateString(clinic)}。`],
        [/^(\d+) of (\d+)$/, (_m, current, total) => `第 ${current} 步，共 ${total} 步`],
        [/^(\d+) walks? · ([\d.]+) km this week$/, (_m, count, distance) => `本周 ${count} 次散步 · ${distance} 公里`],
        [/^(.+) at (\d{2}:\d{2})(.*)$/, (_m, prefix, time, suffix) => `${translateString(prefix)} ${time}${translateString(suffix)}`],
        [/^Due (.+)$/, (_m, rest) => `到期 ${translateString(rest)}`],
        [/^(.+) enabled\.$/, (_m, label) => `${translateString(label)}已开启。`],
        [/^(.+) disabled\.$/, (_m, label) => `${translateString(label)}已关闭。`]
      ];
      for (const [pattern, fn] of dynamic) {
        if (pattern.test(out)) { out = out.replace(pattern, fn); break; }
      }
    }

    if (out === text) {
      out = out
        .replace(/\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2})\b/g, (_m, day, month, number) => `${MONTHS[month]}${Number(number)}日 ${WEEKDAYS[day]}`)
        .replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2})\b/g, (_m, month, number) => `${MONTHS[month]}${Number(number)}日`)
        .replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s*(\d{4})\b/g, (_m, month, number, year) => `${year}年${MONTHS[month]}${Number(number)}日`)
        .replace(/\$(\d+(?:\.\d+)?)/g, '¥$1')
        .replace(/\/\s*mo\b/g, ' / 月')
        .replace(/\b(\d{1,2}):(\d{2})\s*(AM|PM)\b/g, (_m, hour, minute, period) => `${period === 'AM' ? '上午' : '下午'} ${hour}:${minute}`)
        .replace(/\b(\d+(?:\.\d+)?)\s*(km\/h|km|kg|mins?|hrs?|days?|weeks?|years?|yrs?|mos?)\b/g, (_m, value, unit) => {
          const units = { 'km/h': '公里/小时', km: '公里', kg: '公斤', min: '分钟', mins: '分钟', hr: '小时', hrs: '小时', day: '天', days: '天', week: '周', weeks: '周', year: '年', years: '年', yr: '岁', yrs: '岁', mo: '个月', mos: '个月' };
          return `${value} ${units[unit]}`;
        });

      for (const [from, to] of PHRASES) out = out.split(from).join(to);
      out = out
        .replace(/\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/g, (_m, day) => WEEKDAYS[day])
        .replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, (_m, month) => MONTHS[month]);
    }

    return leading + out + trailing;
  }

  const ATTRS = ['aria-label', 'placeholder', 'title', 'alt'];
  let observer = null;
  let applying = false;

  function translateAttributes(element) {
    for (const attr of ATTRS) {
      const value = element.getAttribute(attr);
      if (!value) continue;
      const next = translateString(value);
      if (next !== value) element.setAttribute(attr, next);
    }
  }

  function scan(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      if (root.parentElement?.closest('script,style,code,pre')) return;
      const next = translateString(root.nodeValue);
      if (next !== root.nodeValue) root.nodeValue = next;
      return;
    }
    if (root.nodeType === Node.ELEMENT_NODE) translateAttributes(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE && node.matches('script,style,code,pre')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.ELEMENT_NODE) translateAttributes(node);
      else {
        const next = translateString(node.nodeValue);
        if (next !== node.nodeValue) node.nodeValue = next;
      }
    }
  }

  function run(records) {
    if (applying) return;
    applying = true;
    observer?.disconnect();
    try {
      for (const record of records) {
        if (record.type === 'characterData') scan(record.target);
        else if (record.type === 'attributes') translateAttributes(record.target);
        else for (const node of record.addedNodes) scan(node);
      }
    } finally {
      applying = false;
      observer?.observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    }
  }

  function start() {
    document.documentElement.lang = 'zh-CN';
    const localizedTitle = translateString(document.title);
    if (localizedTitle !== document.title) document.title = localizedTitle;
    observer = new MutationObserver(run);
    observer.observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    applying = true;
    scan(document.head);
    scan(document.body);
    applying = false;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();

