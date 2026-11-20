const IS_ZH = new URLSearchParams(location.search).get('lang')?.toLowerCase() !== 'en';
const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
import './zh-cn.js';
const PHOTO = {
  milo: 'assets/portrait-of-a-golden-retriever-on-the.jpg',
  luna: 'assets/domestic-cat-face-shot.jpg',
  walk: 'assets/dog-walking-in-trent-park.jpg',
  park: 'assets/sentral-bark-dog-park.jpg',
  clinic: 'assets/vet-clinic.jpg',
  logo: 'assets/petly-logo.png'
};

const PETS = [
  {
    id: 'milo', name: 'Milo', species: 'Dog', breed: 'Golden Retriever',
    age: '3 yrs 4 mos', sex: 'Male, neutered', weight: '31.4 kg',
    chip: '985141002934812', dob: 'June 14, 2021',
    coat: 'Golden honey · Double coat', registry: 'AKC #DN65432101',
    photo: PHOTO.milo, tint: 'sage', next: 'Vaccine due Nov 07'
  },
  {
    id: 'luna', name: 'Luna', species: 'Cat', breed: 'Domestic Shorthair',
    age: '6 yrs', sex: 'Female, spayed', weight: '4.2 kg',
    chip: '981020004718223', dob: 'March 03, 2020',
    coat: 'Black smoke · Short coat', registry: 'TICA #L-20491',
    photo: PHOTO.luna, tint: 'warm', next: 'Checkup Nov 02'
  }
];

const INITIAL_WALKS = [
  {
    id: 'river-loop', petId: 'milo', date: 'Yesterday', weekday: 0, time: '07:10',
    durationMin: 32, distanceKm: 1.8, pace: '3.4 km/h', route: 'Riverside loop',
    photo: PHOTO.walk, note: 'Short sniff stop at the park.'
  },
  {
    id: 'trent-park', petId: 'milo', date: 'Sat, Oct 24', weekday: 6, time: '08:05',
    durationMin: 52, distanceKm: 3.1, pace: '3.6 km/h', route: 'Trent Park trail',
    photo: PHOTO.park, note: 'Long loop, lots of water.'
  },
  {
    id: 'morning-block', petId: 'luna', date: 'Fri, Oct 23', weekday: 5, time: '07:45',
    durationMin: 22, distanceKm: 1.1, pace: '3.0 km/h', route: 'Quiet block',
    photo: PHOTO.walk, note: 'Luna kept close to the hedges.'
  }
];

const INITIAL_APPOINTMENTS = [
  {
    id: 'vet-wellness', petId: 'milo', kind: 'vet', title: 'Annual wellness exam',
    doctor: 'Dr. Sarah Jenkins', date: 'Thu, Nov 12', time: '10:20',
    clinic: 'Oak Valley Animal Hospital', address: 'San Francisco, CA',
    price: 65, status: 'upcoming', note: 'Bring the latest weight and mobility notes.'
  },
  {
    id: 'dental-clean', petId: 'milo', kind: 'vet', title: 'Dental cleaning',
    doctor: 'Dr. Noah Kim', date: 'Fri, Sep 18', time: '09:10',
    clinic: 'Oak Valley Animal Hospital', address: 'San Francisco, CA',
    price: 140, status: 'past', note: 'Completed. No extractions needed.'
  }
];

const VACCINES = [
  { id: 'rabies', name: 'Rabies booster', due: 'Nov 07', note: 'Due in 12 days', required: true, price: 32 },
  { id: 'dhpp', name: 'DHPP annual', due: 'Jan 12', note: 'Due in 11 weeks', required: true, price: 46 },
  { id: 'bordetella', name: 'Bordetella', due: 'Optional', note: 'Recommended for group walks', required: false, price: 28 }
];

const VACCINE_DATES = [
  { day: 'Fri', month: 'Nov', number: '06', value: 'Fri, Nov 06' }, /* taste-skill-ignore: calendar date */
  { day: 'Sat', month: 'Nov', number: '07', value: 'Sat, Nov 07' }, /* taste-skill-ignore: calendar date */
  { day: 'Mon', month: 'Nov', number: '09', value: 'Mon, Nov 09' }, /* taste-skill-ignore: calendar date */
  { day: 'Tue', month: 'Nov', number: '10', value: 'Tue, Nov 10' }
];

const VACCINE_TIME_RANGES = ['09:00 – 11:00', '11:00 – 13:00', '13:00 – 15:00', '15:00 – 17:00'];
const VET_DATES = [
  { day: 'Thu', month: 'Nov', number: '12', value: 'Thu, Nov 12' },
  { day: 'Fri', month: 'Nov', number: '13', value: 'Fri, Nov 13' },
  { day: 'Sat', month: 'Nov', number: '14', value: 'Sat, Nov 14' },
  { day: 'Mon', month: 'Nov', number: '16', value: 'Mon, Nov 16' }
];
const VET_TIMES = ['09:40', '10:20', '11:00', '14:20', '15:00', '16:40'];

const NOTIFICATIONS = [
  { id: 'n1', title: 'Rabies booster is due Nov 07', body: 'Milo is due for a rabies booster. A clinic slot is available this week.', time: '8 min', unread: true, route: '#/book-vaccine' },
  { id: 'n2', title: 'Walk goal still open', body: 'One of Milo’s two daily walks is still unlogged.', time: '1 hr', unread: true, route: '#/walk-live' },
  { id: 'n3', title: 'Wellness exam confirmed', body: 'Thu, Nov 12 at 10:20 with Dr. Sarah Jenkins.', time: 'Yesterday', unread: false, route: '#/appointment/vet-wellness' }
];

const CHAT_INITIAL = [
  { from: 'vet', text: 'Hi Jina. I can see Milo’s weight and vaccine record. What has changed today?', time: '10:02' },
  { from: 'owner', text: 'He is limping slightly after his morning walk. Still eating normally.', time: '10:04' },
  { from: 'vet', text: 'Thanks. Keep him resting and check the pad for cuts. If the limp is still there tonight, send a short video and we will decide whether he needs an exam.', time: '10:05' }
];

const ICONS = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
  paw: '<circle cx="7.2" cy="8.2" r="1.7"/><circle cx="12" cy="6.2" r="1.8"/><circle cx="16.8" cy="8.2" r="1.7"/><path d="M7 14.2c0-2.4 2.2-4.1 5-4.1s5 1.7 5 4.1c0 2-1.5 3.2-3.2 3.2-.8 0-1.2.5-1.8.5s-1-.5-1.8-.5C8.5 17.4 7 16.2 7 14.2Z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
  arrowLeft: '<path d="M19 12H5"/><path d="m11 18-6-6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  walk: '<path d="M13.5 4.8a1.7 1.7 0 1 0 0-.01"/><path d="M11.1 10.2 9.4 14l2.1 1.4.7 4.1"/><path d="m12.3 11 2 1.9 3.2.8"/><path d="M7 9.5c1.5-1.3 3-1.8 4.1-2.1"/>',
  stethoscope: '<path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M10 12v3a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="10" r="2"/>',
  syringe: '<path d="m18 3 3 3M16 5l3 3M14 7l3 3M4 20l6-6M8 10l6 6M6 12l6 6M13 7l4 4"/>',
  chat: '<path d="M21 12a8 8 0 0 1-8 8H5l-2 2V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
  play: '<path d="m8 5 11 7-11 7V5Z"/>',
  pause: '<path d="M9 5v14M15 5v14"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  shield: '<path d="M12 3 5 6v5c0 5 3.5 8 7 10 3.5-2 7-5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  camera: '<path d="M4 7h3l1.5-2h7L17 7h3v12H4V7Z"/><circle cx="12" cy="13" r="3.2"/>',
  edit: '<path d="M4 20h4L20 8l-4-4L4 16v4Z"/><path d="m14 6 4 4"/>',
  logout: '<path d="M10 4H5v16h5"/><path d="M14 8l4 4-4 4M8 12h10"/>',
  heart: '<path d="M20.8 8.6a5.2 5.2 0 0 0-8.8-3.7A5.2 5.2 0 0 0 3.2 8.6c0 6.1 8.8 11.4 8.8 11.4s8.8-5.3 8.8-11.4Z"/>',
  alert: '<path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v5M12 17h.01"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  send: '<path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/>',
  map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'
};

function icon(name, cls = '') {
  const body = ICONS[name] || ICONS.info;
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${body}</svg>`;
}

function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function petById(id) { return PETS.find((p) => p.id === id) || PETS[0]; }
function money(value) { return `$${Number(value).toFixed(value % 1 ? 2 : 0)}`; }
function minutesLabel(min) { return `${Math.floor(min / 60) ? `${Math.floor(min / 60)} hr ` : ''}${min % 60 ? `${min % 60} min` : ''}`.trim(); }
function initials(name) { return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase(); }
const WEEK_DAYS = [
  { label: 'Mon', day: 1 }, { label: 'Tue', day: 2 }, { label: 'Wed', day: 3 },
  { label: 'Thu', day: 4 }, { label: 'Fri', day: 5 }, { label: 'Sat', day: 6 },
  { label: 'Sun', day: 0 }
];
function walkWeekday(walk) {
  if (Number.isInteger(walk.weekday)) return walk.weekday;
  if (walk.date === 'Yesterday') return 0;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].findIndex((label) => walk.date.startsWith(label));
  return day >= 0 ? day : null;
}
function walkDayLabel(walk) {
  if (walk.date === 'Today') return 'Today';
  const weekday = walkWeekday(walk);
  return WEEK_DAYS.find((day) => day.day === weekday)?.label || walk.date.split(',')[0];
}

const state = {
  loggedIn: true,
  activePetId: 'milo',
  walks: INITIAL_WALKS.map((walk) => ({ ...walk })),
  appointments: INITIAL_APPOINTMENTS.map((appointment) => ({ ...appointment })),
  notifications: NOTIFICATIONS.map((item) => ({ ...item })),
  subscribed: false,
  chat: CHAT_INITIAL.map((message) => ({ ...message })),
  liveWalk: { seconds: 0, running: false, started: false },
  booking: {
    kind: 'vet', service: 'Annual wellness exam', price: 65, vet: 'Dr. Sarah Jenkins',
    date: 'Thu, Nov 12', time: '10:20', petId: 'milo', vaccine: 'Rabies booster', notes: ''
  },
  plan: 'annual',
  pendingScreen: null,
  notificationsReturnTo: '#/home',
};

const initialQuery = new URLSearchParams(location.search);
if (initialQuery.get('subscribed') === '1') state.subscribed = true;

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: 'home', href: '#/home' },
  { id: 'walks', label: 'Walks', icon: 'walk', href: '#/walks' },
  { id: 'care', label: 'Care', icon: 'calendar', href: '#/care' },
  { id: 'profile', label: 'Profile', icon: 'user', href: '#/profile' }
];

const app = document.getElementById('app');
const screenEl = document.getElementById('screen');
const navEl = document.getElementById('bottom-nav');
const walkLaunchRoot = document.getElementById('walk-launch-root');
const toastEl = document.getElementById('toast');
const modalRoot = document.getElementById('modal-root');
const loginLoaderRoot = document.getElementById('login-loader-root');
let loginTransitionActive = false;
let toastTimer = null;
let renderToken = 0;
let currentHash = location.hash || '#/home';
let navigationStack = [];
let suppressStackPush = false;

function brandBar(screenName = '') {
  return `
    <header class="appbar sticky">
      <a class="brand-lockup" href="#/home" aria-label="Petly home">
        <img class="brand-mark" src="${PHOTO.logo}" alt="" width="28" height="28">
        <span><span class="brand-name">Petly</span>${screenName ? `<span class="brand-screen">${esc(screenName)}</span>` : ''}</span>
      </a>
      <div class="appbar-actions">
        <a class="icon-button" href="#/notifications" aria-label="Notifications">${icon('bell')}</a>
        <a class="owner-avatar" href="#/profile" aria-label="Open Jina's profile">JE</a>
      </div>
    </header>`;
}

function backBar(title, options = {}) {
  const action = options.action || '';
  const fallback = options.back || '#/home';
  return `
    <header class="backbar">
      <button class="icon-button" type="button" data-action="navigate-back" data-fallback="${esc(fallback)}" aria-label="Go back">${icon('arrowLeft')}</button>
      ${options.h1 ? `<h1 class="backbar-title">${esc(title)}</h1>` : `<span class="backbar-title">${esc(title)}</span>`}
      ${action || '<span class="spacer" aria-hidden="true"></span>'}
    </header>`;
}

function petSwitcher(activeId = state.activePetId) {
  return `<div class="pet-switcher" aria-label="Switch pet">${PETS.map((pet) => `
    <button class="pet-chip" type="button" data-choice="pet" data-value="${pet.id}" aria-pressed="${pet.id === activeId}">
      <img src="${pet.photo}" alt="" width="30" height="30">
      <span><strong>${pet.name}</strong><small>${pet.species}</small></span>
    </button>`).join('')}</div>`;
}
function petContextSwitcher(activeId = state.activePetId, title = 'Walk activity', summary = '') {
  const pet = petById(activeId);
  const contextClass = title === 'Care overview' ? 'care-pet-context' : 'walks-pet-context';
  return `<section class="pet-context-bar ${contextClass}" aria-label="${esc(title)}">
    <div class="pet-context-copy"><strong>${esc(title)}</strong><span>${esc(summary)}</span></div>
    <div class="walks-pet-control">
      <button class="walks-pet-trigger" type="button" data-action="toggle-pet-popover" aria-haspopup="menu" aria-expanded="false" aria-controls="walksPetMenu" aria-label="Change pet, currently ${esc(pet.name)}">
        <img src="${pet.photo}" alt="" width="30" height="30">
        <span>${esc(pet.name)}</span>
        ${icon('chevronDown', 'sm')}
      </button>
      <div class="walks-pet-popover" id="walksPetMenu" role="menu" aria-label="Choose pet" hidden>
        ${PETS.map((option) => `
        <button class="walks-pet-option" type="button" role="menuitemradio" aria-checked="${option.id === activeId}" data-action="select-walks-pet" data-value="${option.id}">
          <img src="${option.photo}" alt="" width="28" height="28">
          <span>${esc(option.name)}</span>
          <span class="walks-pet-check" aria-hidden="true">${option.id === activeId ? icon('check', 'sm') : ''}</span>
        </button>`).join('')}
      </div>
    </div>
  </section>`;
}
function homePetSwitcher(activeId = state.activePetId) {
  const pet = petById(activeId);
  return `<div class="home-pet-control">
    <button class="home-pet-picker" type="button" data-action="toggle-pet-popover" aria-haspopup="menu" aria-expanded="false" aria-controls="walksPetMenu" aria-label="Change pet, currently ${esc(pet.name)}">
      <span class="home-pet-picker-label">Care for</span>
      <span class="home-pet-current">
        <img src="${pet.photo}" alt="" width="30" height="30">
        <span>${esc(pet.name)}</span>
        ${icon('chevronDown', 'sm')}
      </span>
    </button>
    <div class="walks-pet-popover home-pet-popover" id="walksPetMenu" role="menu" aria-label="Choose pet" hidden>
      ${PETS.map((option) => `
      <button class="walks-pet-option" type="button" role="menuitemradio" aria-checked="${option.id === activeId}" data-action="select-walks-pet" data-value="${option.id}">
        <img src="${option.photo}" alt="" width="28" height="28">
        <span>${esc(option.name)}</span>
        <span class="walks-pet-check" aria-hidden="true">${option.id === activeId ? icon('check', 'sm') : ''}</span>
      </button>`).join('')}
    </div>
  </div>`;
}
function walkLaunchMarkup() {
  const pet = petById(state.activePetId);
  return `
    <button class="walk-entry-bar" type="button" data-walk-launch aria-label="Start a live walk with ${esc(pet.name)}">
      <span class="walk-entry-context">
        <img src="${pet.photo}" alt="" width="38" height="38">
        <span><strong>Walk with ${esc(pet.name)}</strong><small>Ready to track your route</small></span>
      </span>
      <span class="walk-entry-action">Start walk ${icon('chevronRight', 'sm')}</span>
    </button>`;
}
function navMarkup(active) {
  return NAV_ITEMS.map((item) => `
    <a class="nav-item" href="${item.href}" ${item.id === active ? 'aria-current="page"' : ''}>
      ${icon(item.icon)}<span>${item.label}</span>
    </a>`).join('');
}

function photoCaption(text) {
  return `<figcaption>${text} · <a class="link" href="#/credits">Credits</a></figcaption>`;
}

function loginScreen() {
  const title = IS_ZH ? '欢迎回来' : 'Welcome back.';
  const copy = IS_ZH ? '登录后继续查看米洛的今日照护、预约和健康记录。' : 'Pick up Milo’s walks, appointments and health record where you left off.';
  return `
    <section class="login-screen">
      <figure class="login-photo">
        <img src="${PHOTO.milo}" alt="Golden retriever resting on green grass" width="350" height="258">
        <div class="login-photo-brand">
          <img class="brand-mark" src="${PHOTO.logo}" alt="" width="28" height="28">
          <span class="brand-name">Petly</span>
        </div>
        <figcaption class="login-photo-credit">Photo: Shixart1985 · CC BY 2.0 · <a class="link" href="#/credits">Credits</a></figcaption>
      </figure>
      <div class="login-panel">
        <div class="page-intro login-head">
          <h1 class="display">${title}</h1>
          <p class="login-copy" id="loginCopy">${copy}</p>
        </div>
        <form class="login-form" data-login-form aria-describedby="loginCopy">
          <div class="field">
            <label for="email">Email</label>
            <input class="input" id="email" name="email" type="email" autocomplete="email" value="${IS_ZH ? 'zhixia.lin@petlymail.com' : 'jina.evans@petlymail.com'}" required>
          </div>
          <div class="field">
            <label for="password">Password</label>
            <input class="input" id="password" name="password" type="password" autocomplete="current-password" value="petlydemo" minlength="6" required>
          </div>
          <div class="row between">
            <label class="checkline"><input type="checkbox" name="remember" checked> Keep me signed in</label>
            <button class="text-button small" type="button" data-action="forgot-password">Forgot?</button>
          </div>
          <button class="btn primary full" type="submit">${icon('lock', 'sm')}Sign in</button>
        </form>
        <div class="login-divider">or</div>
        <div class="login-alt">
          <button class="btn secondary full" type="button" data-action="demo-login">${icon('paw', 'sm')}Explore the demo</button>
        </div>
        <p class="login-foot">New to Petly? <a href="#/login" data-action="signup-note">Create an account</a></p>
      </div>
    </section>`;
}

function homeScreen() {
  const pet = petById(state.activePetId);
  const petWalks = state.walks.filter((walk) => walk.petId === pet.id);
  const todayWalks = petWalks.filter((walk) => walk.date === 'Today');
  const nextAppointment = state.appointments.find((item) => item.status === 'upcoming' && item.petId === pet.id);
  const photoCredit = pet.id === 'milo' ? 'Shixart1985 · CC BY 2.0' : 'Augustus Binu · CC BY-SA 3.0';
  const nextVaccine = VACCINES.find((vaccine) => vaccine.id === 'rabies');
  const walkState = todayWalks.length ? 'On track' : 'One walk still to log';
  const homeWalkState = IS_ZH && !todayWalks.length ? '' : (IS_ZH ? '已完成' : walkState);
  const homeVaccineNote = IS_ZH ? '还有 12 天' : nextVaccine.note;
  const homeMedicationNote = IS_ZH ? '暂无待服' : 'No doses due';
  const homeTitle = IS_ZH ? `${esc(pet.name)}的今日照护` : `${esc(pet.name)} has a calm<br>day ahead.`;
  const homeLede = IS_ZH
    ? `疫苗还有 12 天到期 · ${todayWalks.length ? `今天已记录 ${todayWalks.length} 次散步` : '还有 1 次散步待记录'}`
    : `Next vaccine in 12 days. ${todayWalks.length ? `${todayWalks.length} walk logged today.` : 'One walk still to log.'}`;
  const careTrail = [
    {
      time: '06:40',
      title: todayWalks.length ? 'Morning walk logged' : 'Morning walk not logged yet',
      note: todayWalks.length ? `${todayWalks[0].distanceKm.toFixed(1)} km · ${minutesLabel(todayWalks[0].durationMin)}` : 'Start the timer when you head out.',
      status: todayWalks.length ? 'Logged' : 'Due now',
      tone: todayWalks.length ? 'done' : 'now'
    },
    { time: '08:00', title: 'Breakfast', note: 'Logged · 1 cup · Normal appetite', status: 'Logged', tone: 'done' },
    { time: '12:30', title: 'Joint supplement', note: 'Due at 12:30', status: 'Next', tone: 'next' },
    { time: '18:30', title: 'Evening walk', note: 'Plan to log after dinner.', status: 'Later', tone: 'later' }
  ];

  return `
    ${brandBar('')}
    <section class="home-hero-head">
      <h1 class="home-title">${homeTitle}</h1>
      <p class="home-lede">${homeLede}</p>
    </section>

    ${homePetSwitcher(pet.id)}

    <article class="home-pet-card" aria-labelledby="home-pet-name">
      <figure class="home-pet-photo">
        <img src="${pet.photo}" alt="${esc(pet.name)}, a ${esc(pet.breed.toLowerCase())}" width="350" height="250">
        <span class="home-photo-status"><span aria-hidden="true"></span>Care active</span>
        ${IS_ZH ? `<a class="home-photo-credit" href="#/credits">Photo: ${esc(photoCredit)}</a>` : ''}
      </figure>
      <div class="home-pet-summary">
        <div class="home-pet-summary-head">
          <div class="home-pet-identity">
            <h2 id="home-pet-name">${esc(pet.name)}</h2>
            <p>${esc(pet.breed)} · ${esc(pet.age)} · ${esc(pet.weight)}</p>
          </div>
          ${IS_ZH ? '' : `<a class="home-photo-credit" href="#/credits">Photo: ${esc(photoCredit)}</a>`}
        </div>
        <div class="home-pet-metrics">
          <div class="home-metric">
            <span class="home-metric-label">Walks today</span>
            <strong>${todayWalks.length}<span>/2</span></strong>
            <div class="home-walk-bars" aria-hidden="true">
              <span class="${todayWalks.length >= 1 ? 'is-filled' : ''}"></span>
              <span class="${todayWalks.length >= 2 ? 'is-filled' : ''}"></span>
            </div>
            ${homeWalkState ? `<small>${homeWalkState}</small>` : ''}
          </div>
          <div class="home-metric">
            <span class="home-metric-label">Next vaccine</span>
            <strong>${esc(nextVaccine.due)}</strong>
            <small>${esc(homeVaccineNote)}</small>
          </div>
          <div class="home-metric ${IS_ZH ? '' : 'home-metric-wide'}">
            <span class="home-metric-label">Medication</span>
            <strong>None</strong>
            <small>${homeMedicationNote}</small>
          </div>
        </div>
      </div>
    </article>

    <section class="home-section">
      <div class="home-section-head"><h2>Next up</h2><a href="#/care">Care hub</a></div>
      ${nextAppointment ? `
      <article class="home-appointment-card">
        <div class="home-appointment-meta">
          <span class="home-status"><span aria-hidden="true"></span>Confirmed</span>
          <span>${esc(nextAppointment.date)} · ${esc(nextAppointment.time)}</span>
        </div>
        <h3>${esc(nextAppointment.title)}</h3>
        <p>${esc(nextAppointment.doctor)} · ${esc(nextAppointment.clinic)}</p>
        <div class="home-appointment-actions">
          <a class="home-btn-primary" href="#/appointment/${nextAppointment.id}">View details</a>
          <a class="home-text-action" href="#/book-vet">Reschedule</a>
        </div>
      </article>` : `<div class="home-empty"><p>No upcoming appointments. Book care when you are ready.</p><a class="home-text-action" href="#/book-vet">Book a vet</a></div>`}
    </section>

    <section class="home-section">
      <div class="home-section-head"><h2>Today’s care trail</h2><span>Mon, Oct 26</span></div>
      <ol class="home-care-trail">
        ${careTrail.map((item) => `
        <li class="home-trail-item is-${item.tone}">
          <time>${item.time}</time>
          <span class="home-trail-mark" aria-hidden="true">${icon(item.tone === 'done' ? 'check' : item.tone === 'now' ? 'walk' : 'clock', 'sm')}</span>
          <div class="home-trail-copy">
            <div class="home-trail-title"><strong>${esc(item.title)}</strong><span>${esc(item.status)}</span></div>
            <small>${esc(item.note)}</small>
          </div>
        </li>`).join('')}
      </ol>
    </section>

    <section class="home-section">
      <div class="home-section-head"><h2>Quick actions</h2></div>
      ${IS_ZH ? `
        <div class="home-quick-actions">
          <a class="home-action home-quick-primary" href="#/walk-live">${icon('walk')}<strong>Record walk</strong>${icon('chevronRight', 'sm')}</a>
          <div class="home-quick-secondary">
            <a class="home-action" href="#/book-vet">${icon('stethoscope')}<strong>Book a vet</strong></a>
            <a class="home-action" href="#/book-vaccine">${icon('syringe')}<strong>Book vaccine</strong></a>
            <a class="home-action" href="${state.subscribed ? '#/consult-chat' : '#/subscription'}">${icon('chat')}<strong>Ask a vet</strong></a>
          </div>
        </div>` : `
        <div class="home-action-sheet">
          <a class="home-action is-primary" href="#/walk-live">${icon('walk')}<span><strong>Record walk</strong><small>Live timer + route</small></span></a>
          <a class="home-action" href="#/book-vet">${icon('stethoscope')}<span><strong>Book a vet</strong><small>Choose a time</small></span></a>
          <a class="home-action" href="#/book-vaccine">${icon('syringe')}<span><strong>Book vaccine</strong><small>Rabies due soon</small></span></a>
          <a class="home-action" href="${state.subscribed ? '#/consult-chat' : '#/subscription'}">${icon('chat')}<span><strong>Ask a vet</strong><small>${state.subscribed ? 'Chat is included' : '24/7 with Plus'}</small></span></a>
        </div>`}
    </section>

    <section class="home-section home-section-last">
      <a class="home-vet-card" href="${state.subscribed ? '#/consult-chat' : '#/subscription'}">
        <img src="${PHOTO.clinic}" alt="A veterinary clinic ready to welcome pets" width="350" height="210">
        <div class="home-vet-copy">
          <h2>${state.subscribed ? 'Your vet chat is open.' : 'A vet, whenever worry starts.'}</h2>
          <p>${state.subscribed ? 'Continue the conversation or start a new question.' : '24/7 messaging and video advice are included with Petly Plus.'}</p>
          <span>${state.subscribed ? 'Open vet chat' : 'Explore Petly Plus'} ${icon('chevronRight', 'sm')}</span>
        </div>
      </a>
    </section>`;
}

function walksScreen() {
  const pet = petById(state.activePetId);
  const petWalks = state.walks.filter((walk) => walk.petId === pet.id);
  const totalKm = petWalks.reduce((sum, walk) => sum + walk.distanceKm, 0);
  const totalMin = petWalks.reduce((sum, walk) => sum + walk.durationMin, 0);
  const latestWalk = petWalks[0];
  const otherWalks = petWalks.slice(1, 4);
  const daily = WEEK_DAYS.map((day) => ({
    ...day,
    distance: petWalks.filter((walk) => walkWeekday(walk) === day.day).reduce((sum, walk) => sum + walk.distanceKm, 0)
  }));
  const walkSummary = petWalks.length ? `${petWalks.length} ${petWalks.length === 1 ? 'walk' : 'walks'} · ${totalKm.toFixed(1)} km this week` : 'No walks logged this week';  const longestDistance = Math.max(...daily.map((day) => day.distance), 0);
  const longestDay = daily.find((day) => day.distance === longestDistance && longestDistance > 0);
  const chartDescription = daily
    .filter((day) => day.distance > 0)
    .map((day) => `${day.label} ${day.distance.toFixed(1)} kilometers`)
    .join(', ') || 'No walks logged this week.';
  const contextTitle = IS_ZH ? '本周散步' : 'Walk activity';
  const contextSummary = IS_ZH
    ? (petWalks.length ? `${petWalks.length} 次 · ${totalKm.toFixed(1)} 公里` : '本周还没有记录')
    : walkSummary;
  return `
    ${brandBar()}
    ${IS_ZH ? '<h1 class="sr-only">散步记录</h1>' : `<section class="page-intro screen-heading"><h1 class="page-title">Walks that add up.</h1><span class="small">${pet.name}’s week</span></section>`}
    ${petContextSwitcher(pet.id, contextTitle, contextSummary)}
    <section class="walk-week-card" aria-labelledby="walk-week-title">
      <div class="walk-week-top">
        <div class="walk-week-copy">
          <h2 class="walk-week-title" id="walk-week-title">This week</h2>
          <div class="walk-week-value"><strong>${totalKm.toFixed(1)}</strong><span>km</span></div>
        </div>
        <dl class="walk-week-meta">
          <div><dt>Time outside</dt><dd>${totalMin ? minutesLabel(totalMin) : '0 min'}</dd></div>
          <div><dt>Walks</dt><dd>${petWalks.length}</dd></div>
        </dl>
      </div>
      <div class="walk-week-rhythm">
        <div class="walk-week-rhythm-head">
          <h3 id="walk-rhythm-title">Daily distance</h3>
          <span>${longestDay ? `Longest · ${longestDay.label}` : 'No walks yet'}</span>
        </div>
        <div class="walk-week-bars" role="img" aria-label="${esc(chartDescription)}">
          ${daily.map((day) => {
            const ratio = longestDistance ? day.distance / longestDistance : 0;
            return `<div class="walk-bar-cell">
              <span class="walk-bar-value" aria-hidden="true">${day.distance ? day.distance.toFixed(1) : ''}</span>
              <span class="walk-bar-track" aria-hidden="true"><span class="walk-bar-fill ${day.distance > 0 && day.distance === longestDistance ? 'is-longest' : ''}" style="height:${day.distance ? Math.max(8, ratio * 100) : 0}%"></span></span>
              <span class="walk-bar-label" aria-hidden="true">${day.label}</span>
            </div>`;
          }).join('')}
        </div>
      </div>
    </section>
    <section class="section-block">
      <div class="section-head"><h2 class="section-title">Recent walks</h2><span class="small">${petWalks.length} saved · <a class="link" href="#/credits">Photo credits</a></span></div>
      ${latestWalk ? `
        <a class="walk-feature" href="#/walk-detail/${latestWalk.id}" aria-label="View ${esc(latestWalk.route)} walk details">
          <img src="${latestWalk.photo}" alt="" width="350" height="160">
          <span class="walk-feature-copy">
            <span class="walk-feature-date">${latestWalk.date} · ${latestWalk.time}</span>
            <span class="walk-feature-title">${latestWalk.route}</span>
            <span class="walk-feature-stats">${latestWalk.distanceKm.toFixed(1)} km · ${minutesLabel(latestWalk.durationMin)} · ${latestWalk.pace}</span>
          </span>
        </a>
        ${otherWalks.length ? `<div class="walk-trail-list">${otherWalks.map((walk) => `
          <a class="walk-trail-row" href="#/walk-detail/${walk.id}">
            <span class="walk-trail-day">${walkDayLabel(walk)}</span>
            <span class="walk-trail-copy"><span class="walk-trail-title">${walk.route}</span><span class="walk-trail-meta">${walk.date} · ${walk.time} · ${minutesLabel(walk.durationMin)}</span></span>
            <span class="walk-trail-distance">${walk.distanceKm.toFixed(1)}<small> km</small></span>
          </a>`).join('')}</div>` : ''}
      ` : `<div class="empty-note">No walks logged for ${pet.name} yet. Start a live walk whenever you head out.</div>`}
    </section>`;
}

function mapSvg(recording = false) {
  return `
    <svg class="map-vector" viewBox="0 0 390 330" role="img" aria-label="Stylized park map with the live walk route"><defs><linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f7559"/><stop offset="1" stop-color="#d6a24d"/></linearGradient></defs>
      <rect width="390" height="330" fill="#e6e1d4"/>
      <path class="map-green" d="M0 42C70 30 96 72 156 60s92-47 150-34 70 2 84 16v172c-35-7-67 7-102 25s-82 20-126 2-82-14-118 5S31 267 0 250V42Z"/>
      <path class="map-water" d="M0 236c64-8 100 15 145 34s95 18 142 2 72-18 103-3v61H0v-94Z"/>
      <path class="map-path" d="M-20 115c65-2 103 21 145 49s73 42 126 3 79-59 149-55"/>
      <path class="map-path-thin" d="M20 28c31 53 62 66 94 105s45 92 95 143"/>
      <path class="map-path-thin" d="M265 40c-9 56-51 79-72 119s-49 93-33 153"/>
      <path class="map-route" style="stroke:url(#routeGradient)" d="M78 221c14-28 35-42 55-26 18 14 1 38 24 47 25 9 38-34 66-32 26 2 12 35 33 42 20 7 39-10 44-35"/>
      <circle class="live-pulse" cx="78" cy="221" r="11"/>
      <circle class="live-marker" cx="78" cy="221" r="7"/>
      <text class="map-park-label" x="24" y="30">NORTH MEADOW</text>
      <text class="map-park-label" x="248" y="310">RIVERSIDE PATH</text>
    </svg>`;
}

function liveMapSvg() {
  return `
    <svg class="map-vector live-map-vector" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Full-screen park map with the live walk route">
      <defs>
        <linearGradient id="liveMapGround" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f0ece2"/><stop offset="1" stop-color="#dcd8ca"/></linearGradient>
        <linearGradient id="liveRouteGradient" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#2f7559"/><stop offset="1" stop-color="#d6a24d"/></linearGradient>
      </defs>
      <rect width="390" height="844" fill="url(#liveMapGround)"/>
      <path class="map-green" d="M0 82C52 48 105 74 151 56s79-38 141-12 72 30 98 6v470c-46-12-86 10-130 28-57 23-110-8-157-32-43-22-75-4-103 12V82Z"/>
      <path class="map-water" d="M0 690c66-24 120 6 178 34 58 28 124 9 212-36v156H0V690Z"/>
      <path class="map-path" d="M-24 260c90-16 132 22 184 64s100 58 258 8"/>
      <path class="map-path-thin" d="M42 110c32 148 88 262 168 372s108 178 152 374"/>
      <path class="map-path-thin" d="M338 90c-38 130-62 210-88 300s-50 210-108 410"/>
      <path class="map-route" style="stroke:url(#liveRouteGradient)" d="M68 520c36-38 12-92 58-122 38-24 62 16 90-14 30-32-6-76 30-108 34-30 72-14 88-48"/>
      <circle class="live-pulse" cx="68" cy="520" r="11"/>
      <circle class="live-marker" cx="68" cy="520" r="7"/>
      <text class="map-park-label" x="22" y="160">NORTH MEADOW</text>
      <text class="map-park-label" x="246" y="646">RIVERSIDE PATH</text>
    </svg>`;
}

function walkLiveScreen() {
  const pet = petById(state.activePetId);
  return `
    <section class="live-walk-screen">
      <div class="live-map live-map-full ${state.liveWalk.running ? 'is-recording' : ''}" data-live-map>
        ${liveMapSvg()}
      </div>
      <div class="live-top">
        ${backBar('Live walk', { back: '#/walks', action: '<span class="pill pos">GPS ready</span>' })}
        <section class="live-intro">
          <h1 class="display">${pet.name}’s walk</h1>
          <p class="section-copy">Riverside path · San Francisco</p>
        </section>
      </div>
      <section class="live-controls">
        <div class="live-card live-card-entry">
          <section class="live-telemetry" aria-label="Live walk stats">
            <div class="live-telemetry-head">
              <span class="live-route-name">Riverside loop · ${pet.name}</span>
              <span class="live-mode ${state.liveWalk.running ? 'is-running' : state.liveWalk.started ? 'is-paused' : ''}" id="liveMode"><span class="live-mode-dot" aria-hidden="true"></span><span id="liveModeText">${state.liveWalk.running ? 'Recording' : state.liveWalk.started ? 'Paused' : 'Ready'}</span></span>
            </div>
            <div class="live-telemetry-body">
              <div class="live-clock-block">
                <span class="live-stat-label">Time moving</span>
                <div class="live-clock" id="liveTimer">${formatSeconds(state.liveWalk.seconds)}</div>
              </div>
              <div class="live-secondary-metrics">
                <div class="live-secondary-metric"><span class="live-stat-label">Distance</span><strong id="liveDistance">${liveDistance(state.liveWalk.seconds)} km</strong></div>
                <div class="live-secondary-metric"><span class="live-stat-label">Pace</span><strong id="livePace">${livePace(state.liveWalk.seconds)}</strong></div>
              </div>
            </div>
          </section>
          <div class="live-start-zone">
            <span class="live-orbit-ring" aria-hidden="true"></span>
            <div class="live-orbit-label">
              <p class="record-label" id="liveLabel" aria-live="polite">${state.liveWalk.running ? 'Recording: tap pause when you stop moving.' : state.liveWalk.started ? 'Paused: resume or save this walk.' : 'Start when you leave the door.'}</p>
            </div>
            <div class="live-action-row">
              <button class="record-button ${state.liveWalk.running ? 'is-running' : ''}" type="button" data-action="toggle-walk" aria-label="${state.liveWalk.running ? 'Pause walk' : state.liveWalk.started ? 'Resume walk' : 'Start walk'}">
                ${icon(state.liveWalk.running ? 'pause' : 'play', 'lg')}
              </button>
              <button class="record-button stop" type="button" data-action="stop-walk" aria-label="Stop and save walk" ${state.liveWalk.started ? '' : 'hidden'}>
                ${icon('stop', 'lg')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>`;
}

function formatSeconds(seconds) {
  const min = Math.floor(seconds / 60).toString().padStart(2, '0'); // taste-skill-ignore: live clock
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0'); // taste-skill-ignore: live clock
  return `${min}:${sec}`;
}
function liveDistance(seconds) { return (seconds * 0.0011).toFixed(1); }
function livePace(seconds) {
  if (!seconds) return 'Not moving';
  const kmh = (seconds * 0.0011) / (seconds / 3600);
  return `${kmh.toFixed(1)} km/h`;
}

function walkDetailScreen(id) {
  const walk = state.walks.find((item) => item.id === id) || state.walks[0];
  if (!walk) return `<div class="boot-screen">Walk not found.</div>`;
  const pet = petById(walk.petId);
  return `
    ${backBar('Walk summary', { back: '#/walks', action: `<button class="icon-button" type="button" data-action="share-walk" aria-label="Share walk">${icon('share')}</button>` })}
    <section class="page-intro walk-detail-head">
      <div><h1 class="display">${walk.route}</h1><p class="section-copy">${walk.date} at ${walk.time} · ${pet.name}</p></div>
      <img src="${pet.photo}" alt="" width="44" height="44" style="border-radius:50%;object-fit:cover">
    </section>
    <figure>
      <img class="walk-detail-photo" src="${walk.photo}" alt="Dog walking outdoors" width="350" height="180">
      ${photoCaption('Photo: Wikimedia Commons')}
    </figure>
    <section class="walk-detail-stats">
      <div class="cell"><div class="label">Distance</div><div class="value">${walk.distanceKm.toFixed(1)} km</div></div>
      <div class="cell"><div class="label">Duration</div><div class="value">${minutesLabel(walk.durationMin)}</div></div>
      <div class="cell"><div class="label">Average pace</div><div class="value">${walk.pace}</div></div>
    </section>
    <section class="section-block">
      <h2 class="section-title">Route</h2>
      <div class="map-mini" style="margin-top:10px">${mapSvg()}</div>
    </section>
    <section class="section-block">
      <h2 class="section-title">Care note</h2>
      <p class="section-copy">${walk.note}</p>
    </section>
    <div class="row" style="margin-top:24px"><a class="btn primary full" href="#/walks">Back to walks</a></div>`;
}

function careScreen() {
  const pet = petById(state.activePetId);
  const upcoming = state.appointments.filter((item) => item.status === 'upcoming' && item.petId === pet.id);
  const past = state.appointments.filter((item) => item.status === 'past' && item.petId === pet.id);
  const nextVisit = upcoming[0];
  const nextVisitDate = nextVisit?.date.split(', ').pop();
  const careSummary = nextVisit ? `Next visit · ${nextVisitDate} · ${nextVisit.time}` : 'No visit booked';
  return `
    ${brandBar()}
    ${IS_ZH ? '<h1 class="sr-only">护理</h1>' : `<section class="page-intro"><h1 class="page-title">Care that stays on track.</h1><p class="section-copy">Appointments, vaccines and records for ${pet.name}, in one place.</p></section>`}
    ${petContextSwitcher(pet.id, IS_ZH ? '护理安排' : 'Care overview', IS_ZH ? (nextVisit ? `下次就诊 · ${nextVisitDate} · ${nextVisit.time}` : '暂无预约') : careSummary)}
    <section class="care-hero airbnb-photo-hero">
      <img class="airbnb-photo-hero-media" src="${PHOTO.clinic}" alt="A veterinary clinic ready to welcome pets" width="350" height="197">
      <div class="airbnb-photo-hero-copy">
        <div class="next-label">${upcoming.length ? 'Next appointment' : 'No appointment booked'}</div>
        <h2 class="display" style="font-size:26px;margin-top:8px">${upcoming.length ? `${upcoming[0].date} · ${upcoming[0].time}` : 'Choose care when you need it.'}</h2>
        <p class="section-copy">${upcoming.length ? `${upcoming[0].title} with ${upcoming[0].doctor} at ${upcoming[0].clinic}.` : 'Start with a wellness exam or book the next vaccine.'}</p>
        <div class="row" style="margin-top:16px;gap:8px">
          ${upcoming.length ? `<a class="btn small primary" href="#/appointment/${upcoming[0].id}">View appointment</a>` : `<a class="btn small primary" href="#/book-vet">Book care</a>`}
          <a class="btn small secondary" href="#/book-vaccine">Vaccines</a>
        </div>
      </div>
    </section>
    <section class="section-block">
      <div class="section-head"><h2 class="section-title">Book care</h2></div>
      <div class="service-list">
        <a class="service-row" href="#/book-vet"><span class="row-icon sage">${icon('stethoscope')}</span><span class="service-copy"><strong>Book a vet visit</strong><small>Wellness, skin, mobility or a concern.</small></span>${icon('chevronRight', 'sm')}</a>
        <a class="service-row" href="#/book-vaccine"><span class="row-icon warm">${icon('syringe')}</span><span class="service-copy"><strong>Book a vaccine</strong><small>Rabies booster due Nov 07.</small></span>${icon('chevronRight', 'sm')}</a>
        <a class="service-row" href="${state.subscribed ? '#/consult-chat' : '#/subscription'}"><span class="row-icon">${icon('chat')}</span><span class="service-copy"><strong>24/7 vet advice</strong><small>${state.subscribed ? 'Your chat is ready.' : 'Included with Petly Plus.'}</small></span>${icon('chevronRight', 'sm')}</a>
      </div>
    </section>
    <section class="section-block">
      <div class="section-head"><h2 class="section-title">Care plan</h2><a class="small link" href="#/pet/${pet.id}">Full record</a></div>
      <div class="row-list panel" style="padding-top:4px;padding-bottom:4px">
        <div class="row-item"><span class="row-icon warm">${icon('syringe')}</span><span class="row-copy"><span class="row-title">Rabies booster</span><span class="row-meta">Due Nov 07 · ${pet.name}</span></span><span class="pill warn">12 days</span></div>
        <div class="row-item"><span class="row-icon sage">${icon('heart')}</span><span class="row-copy"><span class="row-title">Dental cleaning</span><span class="row-meta">Completed Sep 18 · No extractions</span></span><span class="pill pos">Done</span></div>
      </div>
    </section>
    <section class="section-block">
      <div class="section-head"><h2 class="section-title">Past visits</h2><span class="small">${past.length} record${past.length === 1 ? '' : 's'}</span></div>
      ${past.length ? past.map((item) => `<a class="row-item" href="#/appointment/${item.id}"><span class="row-icon">${icon('calendar')}</span><span class="row-copy"><span class="row-title">${item.title}</span><span class="row-meta">${item.date} · ${item.doctor}</span></span>${icon('chevronRight', 'sm')}</a>`).join('') : '<div class="empty-note">No past visits yet.</div>'}
    </section>`;
}

function bookingProgress(activeStep = 1) {
  return `<div class="booking-progress" aria-label="Booking progress">
    <span>${activeStep} of 3</span>
    <span class="step-dot ${activeStep >= 1 ? 'done' : ''}"></span>
    <span class="step-dot ${activeStep >= 2 ? 'done' : activeStep === 1 ? 'active' : ''}"></span>
    <span class="step-dot ${activeStep >= 3 ? 'done' : activeStep === 2 ? 'active' : ''}"></span>
  </div>`;
}

function bookingSchedule({ dates, times, selectedDate, selectedTime, timeLabel = 'Choose an appointment time' }) {
  return `<section class="section-block">
    <div class="section-head booking-schedule-head">
      <h2 class="section-title">Date & time</h2>
      <span class="booking-schedule-selected">${esc(selectedDate)} · ${esc(selectedTime)}</span>
    </div>
    <div class="booking-schedule-card">
      <div class="booking-date-rail" role="group" aria-label="Choose an appointment date">
        ${dates.map((date) => `<button class="booking-date" type="button" data-choice="date" data-value="${esc(date.value)}" aria-label="${esc(date.day)}, ${esc(date.month)} ${esc(date.number)}" aria-pressed="${selectedDate === date.value}">
          <span class="booking-date-dot" aria-hidden="true"></span>
          <span class="booking-date-day">${esc(date.day)}</span>
          <span class="booking-date-number">${esc(date.number)}</span>
          <span class="booking-date-month">${esc(date.month)}</span>
        </button>`).join('')}
      </div>
      <div class="booking-time-grid" role="group" aria-label="${esc(timeLabel)}">
        ${times.map((time) => `<button class="booking-time" type="button" data-choice="time" data-value="${esc(time)}" aria-pressed="${selectedTime === time}">${esc(time)}</button>`).join('')}
      </div>
    </div>
  </section>`;
}
function bookVetScreen() {
  const pet = petById(state.booking.petId);
  if (!VET_DATES.some((date) => date.value === state.booking.date)) state.booking.date = VET_DATES[0].value;
  if (!VET_TIMES.includes(state.booking.time)) state.booking.time = VET_TIMES[0];
  const services = [
    { name: 'Annual wellness exam', price: 65, copy: 'A full check, weight and prevention review.' },
    { name: 'Skin & allergy visit', price: 95, copy: 'Itching, ears, coat and flare-up support.' },
    { name: 'Mobility & joints', price: 85, copy: 'Limping, stiffness and senior comfort.' }
  ];
  const vets = [
    { name: 'Dr. Sarah Jenkins', clinic: 'Oak Valley Animal Hospital', meta: 'Wellness · 4.9' },
    { name: 'Dr. Noah Kim', clinic: 'Mission Pet Care', meta: 'Mobility · 4.8' }
  ];
  return `
    ${backBar('Book a vet', { back: '#/care', action: `<span class="pill">${pet.name}</span>` })}
    <section class="page-intro">
      <h1 class="page-title">What does ${pet.name} need?</h1>
      <p class="section-copy">Choose the closest reason. You can add detail before confirming.</p>
    </section>
    ${bookingProgress(1)}
    <section class="section-block">
      <h2 class="section-title">Visit type</h2>
      <div class="option-list" style="margin-top:10px">
        ${services.map((service) => `<button class="option-card" type="button" data-choice="service" data-value="${service.name}" aria-pressed="${state.booking.service === service.name}"><span class="option-copy"><strong>${service.name}</strong><small>${service.copy}</small></span><span class="plan-price">${money(service.price)}</span><span class="radio"></span></button>`).join('')}
      </div>
    </section>
    <section class="section-block">
      <h2 class="section-title">Vet</h2>
      <div class="option-list" style="margin-top:10px">
        ${vets.map((vet) => `<button class="option-card" type="button" data-choice="vet" data-value="${vet.name}" aria-pressed="${state.booking.vet === vet.name}"><span class="avatar sage">${initials(vet.name.replace('Dr. ', ''))}</span><span class="option-copy"><strong>${vet.name}</strong><small>${vet.clinic} · ${vet.meta}</small></span><span class="radio"></span></button>`).join('')}
      </div>
    </section>
    ${bookingSchedule({ dates: VET_DATES, times: VET_TIMES, selectedDate: state.booking.date, selectedTime: state.booking.time })}
    <section class="section-block">
      <h2 class="section-title">Anything to add?</h2>
      <textarea class="textarea" id="bookingNotes" style="margin-top:9px" placeholder="A symptom, question or access need." data-booking-notes>${esc(state.booking.notes)}</textarea>
    </section>
    <div class="row" style="margin-top:24px"><button class="btn primary full" type="button" data-action="confirm-vet-booking">Continue to confirm ${icon('chevronRight', 'sm')}</button></div>`;
}

function bookVaccineScreen() {
  const pet = petById(state.booking.petId);
  if (!VACCINE_DATES.some((date) => date.value === state.booking.date)) state.booking.date = VACCINE_DATES[0].value;
  if (!VACCINE_TIME_RANGES.includes(state.booking.time)) state.booking.time = VACCINE_TIME_RANGES[0];
  return `
    ${backBar('Book a vaccine', { back: '#/care', action: `<span class="pill warn">Due soon</span>` })}
    <section class="page-intro">
      <h1 class="page-title">Keep ${pet.name} protected.</h1>
      <p class="section-copy">The rabies booster is due in 12 days. Choose a time and we will prepare the record.</p>
    </section>
    ${bookingProgress(1)}
    <section class="section-block">
      <h2 class="section-title">Vaccine</h2>
      <div class="option-list" style="margin-top:10px">
        ${VACCINES.map((vaccine) => `<button class="option-card" type="button" data-choice="vaccine" data-value="${vaccine.name}" aria-pressed="${state.booking.vaccine === vaccine.name}"><span class="option-copy"><strong>${vaccine.name}</strong><small>Due ${vaccine.due} · ${vaccine.note}</small></span><span class="plan-price">${money(vaccine.price)}</span><span class="radio"></span></button>`).join('')}
      </div>
    </section>
    <section class="section-block">
      <h2 class="section-title">Clinic</h2>
      <div class="panel" style="margin-top:10px">
        <div class="row top"><span class="row-icon sage">${icon('pin')}</span><div class="grow"><div class="section-title">Oak Valley Animal Hospital</div><p class="section-copy" style="margin-top:3px">San Francisco, CA · 1.8 km away</p></div><span class="pill pos">Verified</span></div>
      </div>
    </section>
    ${bookingSchedule({ dates: VACCINE_DATES, times: VACCINE_TIME_RANGES, selectedDate: state.booking.date, selectedTime: state.booking.time, timeLabel: 'Two-hour appointment ranges' })}
    <div class="demo-banner" style="margin-top:20px">Vaccine availability is sample data for this prototype. The clinic will confirm stock before your visit.</div>
    <div class="row" style="margin-top:16px"><button class="btn primary full" type="button" data-action="confirm-vaccine-booking">Continue to confirm ${icon('chevronRight', 'sm')}</button></div>`;
}

function lastBookingOrDefault() {
  return state.booking;
}

function appointmentConfirmScreen() {
  const booking = lastBookingOrDefault();
  return `
    ${backBar('Confirm booking', { back: booking.kind === 'vaccine' ? '#/book-vaccine' : '#/book-vet' })}
    <section class="page-intro confirm-intro">
      <div class="confirm-heading">
        <h1 class="display">You’re booked.</h1>
        <div class="confirm-mark">${icon('check', 'lg')}</div>
      </div>
      <p class="section-copy">A confirmation is saved in ${petById(booking.petId).name}’s care trail.</p>
    </section>
    <section class="panel" style="margin-top:22px">
      <div class="summary-list">
        <div class="summary-row"><span class="summary-label">Care</span><span class="summary-value">${esc(booking.title || booking.service || booking.vaccine)}</span></div>
        <div class="summary-row"><span class="summary-label">Pet</span><span class="summary-value">${petById(booking.petId).name}</span></div>
        <div class="summary-row"><span class="summary-label">When</span><span class="summary-value">${esc(booking.date)} · ${esc(booking.time)}</span></div>
        <div class="summary-row"><span class="summary-label">Where</span><span class="summary-value">${esc(booking.clinic || 'Oak Valley Animal Hospital')}<br>${esc(booking.address || 'San Francisco, CA')}</span></div>
        <div class="summary-row"><span class="summary-label">Price</span><span class="summary-value">${money(booking.price || 65)}</span></div>
      </div>
    </section>
    <div class="stack-2" style="margin-top:20px">
      <button class="btn primary full" type="button" data-action="booking-done">Back to care</button>
      <button class="btn secondary full" type="button" data-action="add-calendar">${icon('calendar', 'sm')}Add to calendar</button>
    </div>
    <p class="small muted" style="margin-top:16px">This is a prototype confirmation. No real appointment or payment has been created.</p>`;
}

function appointmentDetailScreen(id) {
  const item = state.appointments.find((appointment) => appointment.id === id) || state.appointments[0];
  const pet = petById(item.petId);
  const isUpcoming = item.status === 'upcoming';
  return `
    ${backBar('Appointment', { back: '#/care', action: `<span class="pill ${isUpcoming ? 'pos' : ''}">${isUpcoming ? 'Confirmed' : 'Completed'}</span>` })}
    <section class="page-intro">
      <h1 class="display">${item.title}</h1>
      <p class="section-copy">${pet.name} · ${item.date} at ${item.time}</p>
    </section>
    <section class="panel" style="margin-top:22px">
      <div class="summary-list">
        <div class="summary-row"><span class="summary-label">Vet</span><span class="summary-value">${item.doctor}</span></div>
        <div class="summary-row"><span class="summary-label">Clinic</span><span class="summary-value">${item.clinic}<br>${item.address}</span></div>
        <div class="summary-row"><span class="summary-label">Visit price</span><span class="summary-value">${money(item.price)}</span></div>
        <div class="summary-row"><span class="summary-label">Note</span><span class="summary-value">${item.note}</span></div>
      </div>
    </section>
    <div class="stack-2" style="margin-top:20px">
      ${isUpcoming ? `<button class="btn primary full" type="button" data-action="reschedule-appointment">Reschedule appointment</button><button class="btn secondary full danger" type="button" data-action="cancel-appointment">Cancel appointment</button>` : `<button class="btn primary full" type="button" data-action="book-again">Book a follow-up</button>`}
    </div>`;
}

function subscriptionScreen() {
  return `
    ${backBar('Petly Plus', { back: '#/profile' })}
    <section class="subscription-hero plus-hero airbnb-photo-hero airbnb-photo-hero-dark">
      <img class="airbnb-photo-hero-media" src="${PHOTO.clinic}" alt="A veterinary clinic ready to welcome pets" width="350" height="197">
      <div class="airbnb-photo-hero-copy">
        <h1 class="display">A vet in your pocket.</h1>
        <p class="section-copy">Unlimited 24/7 chat and video advice from licensed veterinarians, with Milo’s care record already in view.</p>
      </div>
    </section>
    <section class="section-block plus-benefits">
      <div class="section-head plus-section-head">
        <h2 class="section-title">What’s included</h2>
        <span class="small">Always-on care</span>
      </div>
      <div class="benefit-list">
        <div class="benefit">${icon('chat', 'sm')}<span>Unlimited messages with a vet, day or night.</span></div>
        <div class="benefit">${icon('shield', 'sm')}<span>No per-question fee. A care record travels with each conversation.</span></div>
        <div class="benefit">${icon('heart', 'sm')}<span>Share notes and photos from one private thread.</span></div>
      </div>
    </section>
    <section class="section-block plus-plans">
      <div class="section-head plus-section-head">
        <h2 class="section-title">Choose a plan</h2>
        <span class="small">Cancel anytime</span>
      </div>
      <div class="plan-list">
        <button class="plan-card" type="button" data-choice="plan" data-value="annual" aria-pressed="${state.plan === 'annual'}"><span class="radio"></span><span class="plan-copy"><strong>Annual</strong><small>Best value. One payment for the year.</small></span><span class="plan-price">$79.99<span>$6.67 / mo</span></span></button>
        <button class="plan-card" type="button" data-choice="plan" data-value="monthly" aria-pressed="${state.plan === 'monthly'}"><span class="radio"></span><span class="plan-copy"><strong>Monthly</strong><small>Flexible, cancel anytime.</small></span><span class="plan-price">$9.99<span>per month</span></span></button>
      </div>
    </section>
    <div class="plus-cta">
      <button class="btn primary full" type="button" data-action="start-trial">Start 7-day trial</button>
      <p class="small muted plus-fineprint">Cancel anytime. Demo only; no payment is processed.</p>
    </div>`;
}

function consultScreen() {
  return `
    ${backBar('24/7 advice', { back: '#/care', action: state.subscribed ? '<span class="pill pos">Plus active</span>' : '<span class="pill">Plus</span>' })}
    <section class="page-intro">
      <h1 class="display">Worry less between visits.</h1>
      <p class="section-copy">A licensed vet can see Milo’s weight, vaccine record and recent notes before replying.</p>
    </section>
    <section class="section-block">
      <div class="chat-preview" aria-label="Example vet conversation">
        <div class="bubble">Hi Jina. I can see Milo’s record. What has changed today?</div>
        <div class="bubble out">He is limping slightly after his walk.</div>
      </div>
    </section>
    <section class="section-block">
      <div class="benefit-list">
        <div class="benefit">${icon('check', 'sm')}<span>Message a vet any time, with replies usually under 15 minutes.</span></div>
        <div class="benefit">${icon('check', 'sm')}<span>Video advice when a photo or clip is not enough.</span></div>
        <div class="benefit">${icon('check', 'sm')}<span>Conversation notes stay in ${petById(state.activePetId).name}’s care trail.</span></div>
      </div>
    </section>
    ${state.subscribed ? `<a class="btn primary full" href="#/consult-chat" style="margin-top:22px">${icon('chat', 'sm')}Open vet chat</a>` : `<a class="btn primary full" href="#/subscription" style="margin-top:22px">See Petly Plus</a>`}
    <p class="small muted" style="margin-top:12px;text-align:center">${state.subscribed ? 'Your plan is active on this prototype.' : 'Subscription is required for 24/7 advice.'}</p>`;
}

function consultChatScreen() {
  if (!state.subscribed) return consultScreen();
  return `
    ${backBar('Vet chat', { back: '#/consult', action: `<span class="pill pos">Online</span>` })}
    <section class="page-intro chat-intro">
      <h1 class="display">Dr. Sarah Jenkins</h1>
      <p class="section-copy">Petly Plus active · secure care thread</p>
    </section>
    <section class="chat-thread" style="margin-top:18px">
      <div class="chat-time">Today</div>
      ${state.chat.map((message) => `<div class="chat-row ${message.from === 'owner' ? 'out' : ''}"><span class="chat-avatar">${message.from === 'vet' ? 'SJ' : 'JE'}</span><div><div class="chat-message">${esc(message.text)}</div><div class="chat-time" style="text-align:${message.from === 'owner' ? 'right' : 'left'}">${message.time}</div></div></div>`).join('')}
    </section>
    <form class="chat-composer" data-chat-form>
      <label class="sr-only" for="chatInput">Message your vet</label>
      <input class="input" id="chatInput" name="message" placeholder="Write a message…" autocomplete="off" required>
      <button class="send" type="submit" aria-label="Send message">${icon('send', 'sm')}</button>
    </form>`;
}

function profileScreen() {
  const activePet = petById(state.activePetId);
  const menuMeta = (text) => IS_ZH ? '' : `<small>${esc(text)}</small>`;
  const plusLabel = IS_ZH ? (state.subscribed ? 'Petly Plus 已生效' : 'Petly Plus 会员') : (state.subscribed ? 'Petly Plus active' : 'Petly Plus');
  const plusTitle = IS_ZH ? (state.subscribed ? '全天候兽医建议，随时为你待命。' : '口袋里的兽医。') : (state.subscribed ? '24/7 advice is ready when you are.' : 'A vet in your pocket.');
  const plusCopy = IS_ZH ? (state.subscribed ? '打开你的安全护理对话。' : '每年 79.99 元，享不限次兽医文字与视频咨询。') : (state.subscribed ? 'Open your secure care thread.' : 'Unlimited vet chat and video advice for $79.99 / year.');
  return `
    ${brandBar()}
    <section class="page-intro profile-head">
      <span class="avatar sage">JE</span>
      <div class="grow"><h1 class="display">Jina Evans</h1><p class="eyeline">Primary caregiver · San Francisco</p></div>
      <a class="icon-button soft" href="#/settings" aria-label="Open settings">${icon('settings')}</a>
    </section>
    <section class="section-block">
      <div class="section-head"><h2 class="section-title">Your pets</h2><a class="small link" href="#/pets">See all</a></div>
      <div class="pet-switcher">${PETS.map((pet) => `<button class="pet-chip" type="button" data-choice="pet" data-value="${pet.id}" aria-pressed="${pet.id === activePet.id}"><img src="${pet.photo}" alt="" width="30" height="30"><span><strong>${pet.name}</strong><small>${pet.next}</small></span></button>`).join('')}</div>
    </section>
    <section class="section-block">
      <a class="panel ${state.subscribed ? '' : 'dark'}" href="${state.subscribed ? '#/consult-chat' : '#/subscription'}" style="display:block">
        <div class="row between">
          <div class="stack-1"><div class="row" style="gap:7px">${icon(state.subscribed ? 'shield' : 'chat', 'sm')}<span class="small">${plusLabel}</span></div><h2 class="section-title" style="margin-top:5px">${plusTitle}</h2><p class="section-copy">${plusCopy}</p></div>
          ${icon('chevronRight')}
        </div>
      </a>
    </section>
    <section class="section-block">
      <h2 class="section-title">Account</h2>
      <div class="menu-group" style="margin-top:7px">
        <a class="menu-item" href="#/personal-info"><span class="row-icon">${icon('user')}</span><span class="menu-copy"><strong>Personal information</strong>${menuMeta('Name, contact and emergency details')}</span>${icon('chevronRight', 'sm chev')}</a>
        <a class="menu-item" href="#/pets"><span class="row-icon sage">${icon('paw')}</span><span class="menu-copy"><strong>Pets & care circle</strong>${menuMeta('2 pets · Clara is a co-caregiver')}</span>${icon('chevronRight', 'sm chev')}</a>
        <a class="menu-item" href="#/notifications"><span class="row-icon warm">${icon('bell')}</span><span class="menu-copy"><strong>Notifications</strong>${menuMeta('2 unread reminders')}</span>${icon('chevronRight', 'sm chev')}</a>
        <a class="menu-item" href="#/subscription"><span class="row-icon">${icon('card')}</span><span class="menu-copy"><strong>Petly Plus</strong>${menuMeta(state.subscribed ? 'Active · Annual' : 'Not subscribed')}</span>${icon('chevronRight', 'sm chev')}</a>
      </div>
    </section>
    <section class="section-block">
      <h2 class="section-title">Preferences</h2>
      <div class="menu-group" style="margin-top:7px">
        <a class="menu-item" href="#/settings"><span class="row-icon">${icon('settings')}</span><span class="menu-copy"><strong>Settings</strong>${menuMeta('Reminders, privacy and app preferences')}</span>${icon('chevronRight', 'sm chev')}</a>
        <a class="menu-item" href="#/credits"><span class="row-icon">${icon('info')}</span><span class="menu-copy"><strong>About & credits</strong>${menuMeta('Photo sources and design system')}</span>${icon('chevronRight', 'sm chev')}</a>
        <button class="menu-item" type="button" data-action="logout"><span class="row-icon">${icon('logout')}</span><span class="menu-copy"><strong>Sign out</strong>${menuMeta('Return to the login screen')}</span>${icon('chevronRight', 'sm chev')}</button>
      </div>
    </section>`;
}

function petsScreen() {
  const nextCare = (pet) => IS_ZH ? (pet.id === 'milo' ? '疫苗 · 11月7日' : '复查 · 11月2日') : pet.next;
  return `
    ${backBar('Your pets', { back: '#/profile', action: `<button class="icon-button" type="button" data-action="add-pet-note" aria-label="Add a pet">${icon('plus')}</button>` })}
    ${IS_ZH ? `
      <h1 class="sr-only">我的宠物</h1>
      <div class="pets-gallery">
        ${PETS.map((pet) => `<a class="pets-gallery-card" href="#/pet/${pet.id}">
          <figure class="pets-gallery-photo">
            <img src="${pet.photo}" alt="${esc(pet.name)}" width="176" height="198">
            ${pet.id === state.activePetId ? '<span class="pet-current-badge">当前</span>' : ''}
            <span class="pet-next-badge">${esc(nextCare(pet))}</span>
          </figure>
          <div class="pets-gallery-copy">
            <div class="pet-card-heading"><h2>${esc(pet.name)}</h2>${icon('chevronRight', 'sm')}</div>
            <p>${esc(pet.breed)} · ${esc(pet.age)}</p>
          </div>
        </a>`).join('')}
      </div>
      <button class="btn secondary full pets-add-button" type="button" data-action="add-pet-note">${icon('plus', 'sm')}Add a pet</button>
      <p class="small muted pets-credit">Pet photos are open-license placeholders. See <a class="link" href="#/credits">credits</a>.</p>
    ` : `
      <section class="page-intro">
        <h1 class="display">Two lives, one record.</h1>
        <p class="section-copy">Care notes, walks and appointments stay separate for each pet.</p>
      </section>
      <section class="section-block">
        <div class="row-list panel" style="padding-top:4px;padding-bottom:4px">
          ${PETS.map((pet) => `<a class="row-item" href="#/pet/${pet.id}"><img class="row-avatar" src="${pet.photo}" alt="${pet.name}" width="44" height="44"><span class="row-copy"><span class="row-title">${pet.name}</span><span class="row-meta">${pet.breed} · ${pet.age}</span></span><span class="pill ${pet.tint === 'sage' ? 'pos' : ''}">${pet.next.split(' ')[0]}</span></a>`).join('')}
        </div>
      </section>
      <button class="btn secondary full" type="button" data-action="add-pet-note" style="margin-top:20px">${icon('plus', 'sm')}Add a pet</button>
      <p class="small muted" style="margin-top:16px">Pet photos are open-license placeholders. See <a class="link" href="#/credits">credits</a>.</p>
    `}
  `;
}

function petProfileScreen(id) {
  const pet = petById(id || state.activePetId);
  const petWalks = state.walks.filter((walk) => walk.petId === pet.id);
  const lastWalk = petWalks[0];
  const upcoming = state.appointments.find((item) => item.status === 'upcoming' && item.petId === pet.id);
  return `
    ${backBar('Pet profile', { back: '#/pets', action: `<button class="icon-button" type="button" data-action="edit-pet-note" aria-label="Edit pet profile">${icon('edit')}</button>` })}
    <section class="page-intro pet-profile-hero">
      <img src="${pet.photo}" alt="${pet.name}" width="96" height="116">
      <div><h1 class="display">${pet.name}</h1><p class="eyeline">${pet.breed} · ${pet.age}</p><div class="chips" style="margin-top:10px"><span class="pill pos">Care active</span><span class="pill">${pet.sex}</span></div></div>
    </section>
    <section class="section-block">
      <div class="record-grid">
        <div class="record"><div class="label">Weight</div><div class="value">${pet.weight}</div></div>
        <div class="record"><div class="label">Next vaccine</div><div class="value">Nov 07</div></div>
        <div class="record"><div class="label">Chip</div><div class="value" style="font-size:14px;line-height:18px">${pet.chip}</div></div>
        <div class="record"><div class="label">Last walk</div><div class="value">${lastWalk ? `${lastWalk.distanceKm.toFixed(1)} km` : 'No walks'}</div></div>
      </div>
    </section>
    <section class="section-block">
      <div class="section-head"><h2 class="section-title">Medical record</h2><span class="small">Official</span></div>
      <div class="info-list">
        <div class="info-row"><span class="info-label">Date of birth</span><span class="info-value">${pet.dob}</span></div>
        <div class="info-row"><span class="info-label">Coat & color</span><span class="info-value">${pet.coat}</span></div>
        <div class="info-row"><span class="info-label">Breed registry</span><span class="info-value">${pet.registry}</span></div>
        <div class="info-row"><span class="info-label">Primary vet</span><span class="info-value">Dr. Sarah Jenkins<br><span class="small muted" style="font-weight:400">Oak Valley Animal Hospital</span></span></div>
      </div>
    </section>
    ${upcoming ? `<section class="section-block"><div class="section-head"><h2 class="section-title">Next appointment</h2><a class="small link" href="#/care">Care hub</a></div><a class="appointment-card" href="#/appointment/${upcoming.id}" style="display:block"><div class="row top"><div class="date-badge"><strong>${upcoming.date.split(' ')[2]}</strong><span>${upcoming.date.split(' ')[1]}</span></div><div class="grow"><div class="appointment-title">${upcoming.title}</div><div class="appointment-meta">${upcoming.time} · ${upcoming.doctor}</div></div>${icon('chevronRight', 'sm')}</div></a></section>` : ''}
    <section class="section-block">
      <div class="section-head"><h2 class="section-title">Recent walks</h2><a class="small link" href="#/walks">See all</a></div>
      ${petWalks.slice(0, 2).map((walk) => `<a class="walk-row" href="#/walk-detail/${walk.id}"><img class="walk-thumb" src="${walk.photo}" alt="" width="54" height="54"><span><span class="walk-title">${walk.route}</span><span class="walk-meta">${walk.date} · ${minutesLabel(walk.durationMin)}</span></span><span class="walk-distance">${walk.distanceKm.toFixed(1)} km</span></a>`).join('')}
    </section>
    <div class="row" style="margin-top:22px;gap:8px"><a class="btn primary grow" href="#/book-vet">Book vet</a><a class="btn secondary grow" href="#/book-vaccine">Book vaccine</a></div>
    <p class="small muted" style="margin-top:14px">Pet photo: open-license placeholder · <a class="link" href="#/credits">credits</a></p>`;
}

function personalInfoScreen() {
  return `
    ${backBar('Personal information', { back: '#/profile' })}
    <section class="page-intro">
      <h1 class="page-title">Who can we reach?</h1>
      <p class="section-copy">This information is used for care coordination and appointment reminders.</p>
    </section>
    <form class="stack-4" style="margin-top:22px" data-personal-form>
      <div class="field"><label for="fullName">Full name</label><input class="input" id="fullName" name="fullName" value="${IS_ZH ? '林知夏' : 'Jina Evans'}" autocomplete="name" required></div>
      <div class="field"><label for="email">Email</label><input class="input" id="email" name="email" type="email" value="${IS_ZH ? 'zhixia.lin@petlymail.com' : 'jina.evans@petlymail.com'}" autocomplete="email" required></div>
      <div class="field"><label for="phone">Mobile number</label><input class="input" id="phone" name="phone" type="tel" value="+1 (415) 555-0194" autocomplete="tel" required></div>
      <div class="field"><label for="address">Home address</label><input class="input" id="address" name="address" value="18 Cedar Street, San Francisco, CA" autocomplete="street-address"></div>
      <div class="form-row">
        <div class="field"><label for="contactName">Emergency contact</label><input class="input" id="contactName" name="contactName" value="Clara Evans"></div>
        <div class="field"><label for="contactPhone">Contact phone</label><input class="input" id="contactPhone" name="contactPhone" value="+1 (415) 555-0137"></div>
      </div>
      <label class="checkline"><input type="checkbox" checked> Share these details with my care circle.</label>
      <button class="btn primary full" type="submit">Save changes</button>
    </form>`;
}

function notificationsScreen() {
  return `
    ${backBar('Notifications', { back: state.notificationsReturnTo || '#/home', action: `<button class="icon-button" type="button" data-action="mark-read" aria-label="Mark all as read">${icon('check')}</button>` })}
    <section class="page-intro"><h1 class="page-title">What needs your attention.</h1><p class="section-copy">Only care reminders and appointment updates appear here.</p></section>
    <section class="section-block">
      ${state.notifications.map((item) => `<a class="notification-row" href="${item.route}"><span class="unread-dot" style="opacity:${item.unread ? 1 : 0}"></span><span class="notification-copy"><strong>${esc(item.title)}</strong><span>${esc(item.body)}</span></span><time>${item.time}</time></a>`).join('')}
    </section>
    <div class="empty-note" style="margin-top:18px">That is everything for today.</div>`;
}

function settingsScreen() {
  const settingMeta = (text) => IS_ZH ? '' : `<small>${esc(text)}</small>`;
  const settingRowMeta = (text) => IS_ZH ? '' : `<span class="row-meta">${esc(text)}</span>`;
  return `
    ${backBar('Settings', { back: '#/profile' })}
    <section class="page-intro"><h1 class="page-title">Make Petly fit your day.</h1>${IS_ZH ? '' : '<p class="section-copy">Reminders stay quiet by default and only appear when care needs attention.</p>'}</section>
    <section class="section-block">
      <h2 class="section-title">Reminders</h2>
      <div class="row-list panel" style="padding-top:0;padding-bottom:0;margin-top:9px">
        <label class="row-item"><span class="row-icon sage">${icon('calendar')}</span><span class="row-copy"><span class="row-title">Appointment reminders</span>${settingRowMeta('24 hours and 1 hour before.')}</span><input class="switch" type="checkbox" checked data-setting="appointments"></label>
        <label class="row-item"><span class="row-icon sage">${icon('walk')}</span><span class="row-copy"><span class="row-title">Walk reminders</span>${settingRowMeta('Morning and evening nudges.')}</span><input class="switch" type="checkbox" checked data-setting="walks"></label>
        <label class="row-item"><span class="row-icon warm">${icon('syringe')}</span><span class="row-copy"><span class="row-title">Vaccine reminders</span>${settingRowMeta('Two weeks before a due date.')}</span><input class="switch" type="checkbox" checked data-setting="vaccines"></label>
      </div>
    </section>
    <section class="section-block">
      <h2 class="section-title">Account</h2>
      <div class="menu-group" style="margin-top:7px">
        <a class="menu-item" href="#/personal-info"><span class="row-icon">${icon('user')}</span><span class="menu-copy"><strong>Personal information</strong>${settingMeta('Contact and emergency details')}</span>${icon('chevronRight', 'sm chev')}</a>
        <a class="menu-item" href="#/subscription"><span class="row-icon">${icon('card')}</span><span class="menu-copy"><strong>Subscription</strong>${settingMeta(state.subscribed ? 'Petly Plus · Annual' : 'Not subscribed')}</span>${icon('chevronRight', 'sm chev')}</a>
        <button class="menu-item" type="button" data-action="privacy-note"><span class="row-icon sage">${icon('shield')}</span><span class="menu-copy"><strong>Privacy & data</strong>${settingMeta('How health records and photos are stored.')}</span>${icon('chevronRight', 'sm chev')}</button>
        <a class="menu-item" href="#/credits"><span class="row-icon">${icon('info')}</span><span class="menu-copy"><strong>About & credits</strong>${settingMeta('Sources and design system notes.')}</span>${icon('chevronRight', 'sm chev')}</a>
      </div>
    </section>
    <section class="section-block">
      <h2 class="section-title">App</h2>
      <div class="info-list" style="margin-top:5px">
        <div class="info-row"><span class="info-label">Version</span><span class="info-value">1.0.0 prototype</span></div>
        <div class="info-row"><span class="info-label">Photo credits</span><a class="info-value link" href="#/credits">Open credits</a></div>
        <div class="info-row"><span class="info-label">Design system</span><a class="info-value link" href="design-system.html">Open spec</a></div>
      </div>
    </section>`;
}

const CREDITS = [
  { title: 'Portrait of a golden retriever on the grass', by: 'Shixart1985', license: 'CC BY 2.0', page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_a_golden_retriever_on_the_grass.jpg' },
  { title: 'Domestic Cat Face Shot', by: 'Augustus Binu', license: 'CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Domestic_Cat_Face_Shot.jpg' },
  { title: 'Dog Walking in Trent Park', by: 'Christine Matthews', license: 'CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:Dog_Walking_in_Trent_Park_-_geograph.org.uk_-_3752506.jpg' },
  { title: 'Sentral Bark Dog Park', by: 'RuralResurrection', license: 'CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:Sentral_Bark_Dog_Park_-_Lindsborg_KS.jpg' },
  { title: 'Kutup veterinary Sisli', by: 'Elgaard', license: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Kutup_veterinary_Sisli.jpg' }
];

function creditsScreen() {
  return `
    ${backBar('About & credits', { back: '#/settings' })}
    <section class="page-intro">
      <h1 class="page-title">A small, honest studio.</h1>
      <p class="section-copy">Petly is a mobile-first design project for pet health coordination. The photography below comes from open collections; each source is linked.</p>
    </section>
    <section class="section-block">
      <h2 class="section-title">Photography</h2>
      <div class="credits-list" style="margin-top:10px">
        ${CREDITS.map((credit) => `<div class="credit-item"><strong>${credit.title}</strong><span>${credit.by} · ${credit.license} · via Wikimedia Commons</span><a href="${credit.page}" target="_blank" rel="noreferrer">Source page</a></div>`).join('')}
      </div>
    </section>
    <section class="section-block">
      <h2 class="section-title">Design system</h2>
      <p class="section-copy">The full token and component spec lives in the project’s visual design-system page.</p>
      <a class="btn secondary full" href="design-system.html" style="margin-top:12px">Open design system ${icon('chevronRight', 'sm')}</a>
    </section>
    <section class="section-block">
      <h2 class="section-title">Prototype note</h2>
      <p class="section-copy">Sample appointments, prices, vaccine dates and vitals are for design review. No real appointment, chat or payment is created.</p>
    </section>`;
}

function notFoundScreen() {
  return `
    ${backBar('Not found', { back: '#/home' })}
    <div class="boot-screen stack-3"><div>${icon('info', 'lg')}</div><h1 class="page-title">That screen is not in this prototype yet.</h1><a class="btn primary" href="#/home">Return home</a></div>`;
}

const ROUTES = {
  login: { title: 'Sign in', render: loginScreen },
  home: { title: 'Home', render: homeScreen, nav: 'home' },
  walks: { title: 'Walks', render: walksScreen, nav: 'walks' },
  'walk-live': { title: 'Live walk', render: walkLiveScreen },
  'walk-detail': { title: 'Walk summary', render: walkDetailScreen, param: true },
  care: { title: 'Care', render: careScreen, nav: 'care' },
  'book-vet': { title: 'Book a vet', render: bookVetScreen },
  'book-vaccine': { title: 'Book a vaccine', render: bookVaccineScreen },
  'appointment-confirm': { title: 'Confirm booking', render: appointmentConfirmScreen },
  appointment: { title: 'Appointment', render: appointmentDetailScreen, param: true },
  subscription: { title: 'Petly Plus', render: subscriptionScreen },
  consult: { title: '24/7 advice', render: consultScreen },
  'consult-chat': { title: 'Vet chat', render: consultChatScreen },
  profile: { title: 'Profile', render: profileScreen, nav: 'profile' },
  pets: { title: 'Your pets', render: petsScreen },
  pet: { title: 'Pet profile', render: petProfileScreen, param: true },
  'personal-info': { title: 'Personal information', render: personalInfoScreen },
  notifications: { title: 'Notifications', render: notificationsScreen },
  settings: { title: 'Settings', render: settingsScreen },
  credits: { title: 'About & credits', render: creditsScreen }
};

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  if (!raw) return { name: 'home', param: null };
  const [name, ...rest] = raw.split('/');
  return { name: name || 'home', param: rest.join('/') || null };
}

function navigate(path) {
  closeModal();
  const next = path.startsWith('#') ? path : `#${path}`;
  if (location.hash === next) renderRoute();
  else location.hash = next;
}

function goBack(fallback = '#/home') {
  closeModal();
  const previous = navigationStack.pop();
  const target = previous || fallback;
  if (!target || target === location.hash) return;
  suppressStackPush = true;
  location.hash = target;
}

function renderRoute(options = {}) {
  const token = ++renderToken;
  const route = parseHash();
  const definition = ROUTES[route.name] || null;
  const preserve = Boolean(options.preserveScroll);
  const transition = options.transition || 'none';
  const previousScroll = preserve ? screenEl.scrollTop : 0;

  const commit = () => {
    if (token !== renderToken) return;
    screenEl.dataset.route = route.name;
    app.dataset.route = route.name;
    document.body.dataset.route = route.name;
    document.body.dataset.activePet = state.activePetId;
    if (!definition) {
      screenEl.innerHTML = notFoundScreen();
      walkLaunchRoot.innerHTML = '';
      navEl.style.display = 'none';
      document.title = 'Not found · Petly';
      return;
    }

    const rendered = definition.param ? definition.render(route.param) : definition.render();
    if (token !== renderToken) return;

    if (!preserve) screenEl.scrollTop = 0;
    screenEl.innerHTML = rendered;
    navEl.innerHTML = definition.nav ? navMarkup(definition.nav) : '';
    navEl.style.display = definition.nav ? 'grid' : 'none';
    walkLaunchRoot.innerHTML = route.name === 'walks' ? walkLaunchMarkup() : '';
    document.title = `${definition.title} · Petly`;

    requestAnimationFrame(() => {
      if (token !== renderToken) return;
      if (preserve) screenEl.scrollTop = previousScroll;
      else screenEl.focus({ preventScroll: true });
    });

    if (route.name === 'walk-live') {
      window.requestAnimationFrame(() => updateLiveWalkUI());
    }
  };

  const shouldAnimate = IS_ZH && !preserve && transition !== 'none' && !reduceMotionQuery.matches;
  if (shouldAnimate && typeof document.startViewTransition === 'function') {
    const root = document.documentElement;
    root.dataset.pageTransition = transition;
    root.dataset.pageTransitionToken = String(token);
    try {
      const viewTransition = document.startViewTransition(commit);
      viewTransition.finished.finally(() => {
        if (root.dataset.pageTransitionToken === String(token)) {
          delete root.dataset.pageTransition;
          delete root.dataset.pageTransitionToken;
        }
      });
      return;
    } catch {
      delete root.dataset.pageTransition;
      delete root.dataset.pageTransitionToken;
    }
  }

  commit();
  if (shouldAnimate) {
    const className = `is-page-${transition}`;
    screenEl.classList.remove('is-page-forward', 'is-page-back', 'is-page-tab');
    void screenEl.offsetWidth;
    screenEl.classList.add(className);
    window.setTimeout(() => screenEl.classList.remove(className), 360);
  }
}

function refresh() {
  renderRoute({ preserveScroll: true });
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
}
function showLoginLoader() {
  if (!loginLoaderRoot) return;
  app.setAttribute('aria-busy', 'true');
  loginLoaderRoot.innerHTML = `
    <div class="login-loader" role="status" aria-live="polite" aria-label="${IS_ZH ? '正在进入 Petly' : 'Entering Petly'}">
      <div class="login-loader-brand">
        <img src="${PHOTO.logo}" alt="" width="28" height="28">
        <span class="brand-name">Petly</span>
      </div>
      <div class="login-loader-center">
        <div class="login-loader-graphic" aria-hidden="true">
          <span class="login-loader-orbit"></span>
          ${icon('paw', 'login-loader-paw')}
        </div>
        <strong>${IS_ZH ? '正在准备米洛的今日照护' : 'Preparing Milo’s care record'}</strong>
        <span>${IS_ZH ? '正在同步健康记录与预约' : 'Syncing health records and appointments'}</span>
      </div>
    </div>`;
  requestAnimationFrame(() => loginLoaderRoot.querySelector('.login-loader')?.classList.add('is-ready'));
}

function hideLoginLoader() {
  const loader = loginLoaderRoot?.querySelector('.login-loader');
  app.removeAttribute('aria-busy');
  if (!loader) {
    if (loginLoaderRoot) loginLoaderRoot.innerHTML = '';
    loginTransitionActive = false;
    return;
  }
  loader.classList.add('is-leaving');
  window.setTimeout(() => {
    loginLoaderRoot.innerHTML = '';
    loginTransitionActive = false;
  }, 240);
}

function beginLoginTransition() {
  if (loginTransitionActive) return;
  loginTransitionActive = true;
  state.loggedIn = true;
  showLoginLoader();
  const wait = reduceMotionQuery.matches ? 550 : 1200;
  window.setTimeout(() => {
    navigate('#/home');
    requestAnimationFrame(hideLoginLoader);
  }, wait);
}


function togglePetPopover(force) {
  const trigger = document.querySelector('[data-action="toggle-pet-popover"]');
  const menu = document.getElementById('walksPetMenu');
  if (!trigger || !menu) return;
  const open = typeof force === 'boolean' ? force : trigger.getAttribute('aria-expanded') !== 'true';
  trigger.setAttribute('aria-expanded', String(open));
  menu.hidden = !open;
  if (open) requestAnimationFrame(() => menu.querySelector('[aria-checked="true"]')?.focus());
}

function closePetPopover() {
  togglePetPopover(false);
}
function openModal({ title, body, confirmLabel = 'Confirm', action = 'close-modal', secondary = true }) {
  modalRoot.innerHTML = `
    <div class="sheet-backdrop open" data-action="close-modal"></div>
    <section class="modal open" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <h2 id="modalTitle">${esc(title)}</h2>
      <p>${esc(body)}</p>
      <div class="modal-actions">
        <button class="btn primary grow" type="button" data-action="${action}">${esc(confirmLabel)}</button>
        ${secondary ? `<button class="btn secondary" type="button" data-action="close-modal">Not now</button>` : ''}
      </div>
    </section>`;
}

function closeModal() {
  modalRoot.innerHTML = '';
}

let liveTimerId = null;

function toggleWalk() {
  if (state.liveWalk.running) {
    state.liveWalk.running = false;
    clearInterval(liveTimerId);
    liveTimerId = null;
  } else {
    state.liveWalk.started = true;
    state.liveWalk.running = true;
    clearInterval(liveTimerId);
    liveTimerId = setInterval(() => {
      state.liveWalk.seconds += 1;
      updateLiveWalkUI();
    }, 1000);
  }
  updateLiveWalkUI();
}

function updateLiveWalkUI() {
  const timer = document.getElementById('liveTimer');
  const distance = document.getElementById('liveDistance');
  const pace = document.getElementById('livePace');
  if (timer) timer.textContent = formatSeconds(state.liveWalk.seconds);
  if (distance) distance.textContent = `${liveDistance(state.liveWalk.seconds)} km`;
  if (pace) pace.textContent = livePace(state.liveWalk.seconds);

  const button = document.querySelector('[data-action="toggle-walk"]');
  const stop = document.querySelector('[data-action="stop-walk"]');
  const label = document.getElementById('liveLabel');
  const mode = document.getElementById('liveMode');
  const modeText = document.getElementById('liveModeText');
  const map = document.querySelector('[data-live-map]');
  if (button) {
    button.classList.toggle('is-running', state.liveWalk.running);
    button.innerHTML = icon(state.liveWalk.running ? 'pause' : 'play', 'lg');
    button.setAttribute('aria-label', state.liveWalk.running ? 'Pause walk' : state.liveWalk.started ? 'Resume walk' : 'Start walk');
  }
  if (stop) stop.hidden = !state.liveWalk.started;
  if (map) map.classList.toggle('is-recording', state.liveWalk.running);
  if (label) {
    label.textContent = state.liveWalk.running
      ? 'Recording: tap pause when you stop moving.'
      : state.liveWalk.started
        ? 'Paused: resume or save this walk.'
        : 'Start when you leave the door.';
  }
  if (mode && modeText) {
    mode.classList.toggle('is-running', state.liveWalk.running);
    mode.classList.toggle('is-paused', !state.liveWalk.running && state.liveWalk.started);
    modeText.textContent = state.liveWalk.running ? 'Recording' : state.liveWalk.started ? 'Paused' : 'Ready';
  }
}

function stopWalk() {
  if (state.liveWalk.seconds < 1) {
    showToast('Start the timer before saving the walk.');
    return;
  }
  clearInterval(liveTimerId);
  liveTimerId = null;
  const seconds = state.liveWalk.seconds;
  const durationMin = Math.max(1, Math.round(seconds / 60));
  const distanceKm = Math.max(0.1, Number(liveDistance(seconds)));
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const walk = {
    id: `live-${Date.now()}`,
    petId: state.activePetId,
    date: 'Today',
    weekday: now.getDay(),
    time,
    durationMin,
    distanceKm,
    pace: livePace(seconds),
    route: 'Riverside path',
    photo: PHOTO.park,
    note: 'Recorded with the live walk timer.'
  };
  state.walks.unshift(walk);
  state.liveWalk = { seconds: 0, running: false, started: false };
  showToast('Walk saved to the care trail.');
  navigate(`#/walk-detail/${walk.id}`);
}

function completeBooking(kind) {
  const pet = petById(state.booking.petId);
  const service = state.booking.service;
  const vaccine = state.booking.vaccine;
  const title = kind === 'vaccine' ? vaccine : service;
  const price = kind === 'vaccine'
    ? VACCINES.find((item) => item.name === vaccine)?.price || 32
    : state.booking.price || 65;
  const appointment = {
    id: `booking-${Date.now()}`,
    petId: pet.id,
    kind,
    title,
    doctor: state.booking.vet || 'Dr. Sarah Jenkins',
    date: state.booking.date,
    time: state.booking.time,
    clinic: 'Oak Valley Animal Hospital',
    address: 'San Francisco, CA',
    price,
    status: 'upcoming',
    note: state.booking.notes || (kind === 'vaccine' ? 'Vaccine appointment. Clinic will confirm stock.' : 'Requested through the Petly prototype.')
  };
  state.booking = { ...state.booking, title, price, clinic: appointment.clinic, address: appointment.address, kind };
  state.appointments.unshift(appointment);
  showToast('Appointment saved.');
  navigate('#/appointment-confirm');
}

function handleChoice(element) {
  const choice = element.dataset.choice;
  const value = element.dataset.value;
  if (choice === 'pet') {
    state.activePetId = value;
    showToast(`${petById(value).name} selected.`);
    refresh();
    return;
  }
  if (choice === 'service') {
    const prices = { 'Annual wellness exam': 65, 'Skin & allergy visit': 95, 'Mobility & joints': 85 };
    state.booking.service = value;
    state.booking.price = prices[value] || 65;
  } else if (choice === 'vet') {
    state.booking.vet = value;
  } else if (choice === 'date') {
    state.booking.date = value;
  } else if (choice === 'time') {
    state.booking.time = value;
  } else if (choice === 'vaccine') {
    state.booking.vaccine = value;
  } else if (choice === 'plan') {
    state.plan = value;
  }
  refresh();
}

function handleAction(action, element) {
  switch (action) {
    case 'navigate-back':
      goBack(element?.dataset.fallback || '#/home');
      break;
    case 'demo-login':
      closeModal();
      beginLoginTransition();
      break;
    case 'forgot-password':
      showToast('A reset link would be sent to your email.');
      break;
    case 'signup-note':
      openModal({ title: 'Create a Petly account', body: 'The prototype keeps sign-up as a secondary flow. For review, use the demo login to explore the full app.', confirmLabel: 'Continue demo', action: 'demo-login' });
      break;
    case 'toggle-walk':
      toggleWalk();
      break;
    case 'stop-walk':
      stopWalk();
      break;
    case 'confirm-vet-booking':
      completeBooking('vet');
      break;
    case 'confirm-vaccine-booking':
      completeBooking('vaccine');
      break;
    case 'booking-done':
      navigate('#/care');
      break;
    case 'add-calendar':
      showToast('Calendar export is ready for the real app.');
      break;
    case 'reschedule-appointment':
      navigate('#/book-vet');
      break;
    case 'cancel-appointment': {
      const item = state.appointments.find((appointment) => appointment.status === 'upcoming');
      state.cancelAppointmentId = item?.id || null;
      openModal({ title: 'Cancel this appointment?', body: 'The clinic will release the slot. You can rebook at any time from Care.', confirmLabel: 'Cancel appointment', action: 'confirm-cancel' });
      break;
    }
    case 'confirm-cancel': {
      const item = state.appointments.find((appointment) => appointment.id === state.cancelAppointmentId);
      if (item) item.status = 'cancelled';
      closeModal();
      showToast('Appointment cancelled.');
      navigate('#/care');
      break;
    }
    case 'book-again':
      navigate('#/book-vet');
      break;
    case 'start-trial':
      state.subscribed = true;
      closeModal();
      showToast('Petly Plus trial started in this demo.');
      navigate('#/consult-chat');
      break;
    case 'mark-read':
      state.notifications.forEach((item) => { item.unread = false; });
      refresh();
      showToast('All notifications marked as read.');
      break;
    case 'logout':
      state.loggedIn = false;
      navigate('#/login');
      showToast('Signed out.');
      break;
    case 'add-pet-note':
      showToast('Add-pet details are the next step in the pet profile flow.');
      break;
    case 'edit-pet-note':
      showToast('Pet profile editing is available when the real data source is connected.');
      break;
    case 'share-walk':
      showToast('Walk summary ready to share.');
      break;
    case 'privacy-note':
      openModal({ title: 'Privacy & data', body: 'This prototype uses local sample data only. Health records, locations and photos would need a secure backend, consent model and audit trail before launch.', confirmLabel: 'Understood' });
      break;
    case 'toggle-pet-popover':
      togglePetPopover();
      break;
    case 'select-walks-pet':
      state.activePetId = element.dataset.value;
      closePetPopover();
      refresh();
      showToast(`${petById(element.dataset.value).name} selected.`);
      break;    case 'close-modal':
      closeModal();
      break;
    default:
      break;
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const trigger = document.querySelector('[data-action="toggle-pet-popover"]');
  if (!trigger || trigger.getAttribute('aria-expanded') !== 'true') return;
  closePetPopover();
  trigger.focus();
});

document.addEventListener('click', (event) => {
  if (event.target.closest?.('.walks-pet-control, .home-pet-control')) return;
  closePetPopover();
}, true);
app.addEventListener('click', (event) => {
  const walkLaunch = event.target.closest?.('[data-walk-launch]');
  if (walkLaunch) {
    event.preventDefault();
    navigate('#/walk-live');
    return;
  }
  const notificationsLink = event.target.closest('a[href="#/notifications"]');
  if (notificationsLink && location.hash !== '#/notifications') {
    state.notificationsReturnTo = location.hash || '#/home';
  }
  const choice = event.target.closest('[data-choice]');
  if (choice) {
    event.preventDefault();
    handleChoice(choice);
    return;
  }
  const actionEl = event.target.closest('[data-action]');
  if (actionEl) {
    event.preventDefault();
    handleAction(actionEl.dataset.action, actionEl);
  }
});

app.addEventListener('submit', (event) => {
  const form = event.target;
  if (form.matches('[data-login-form]')) {
    event.preventDefault();
    const data = new FormData(form);
    if (!data.get('email') || !data.get('password')) {
      showToast('Enter your email and password to continue.');
      return;
    }
    beginLoginTransition();
    return;
  }
  if (form.matches('[data-personal-form]')) {
    event.preventDefault();
    showToast('Personal information saved.');
    navigate('#/profile');
    return;
  }
  if (form.matches('[data-chat-form]')) {
    event.preventDefault();
    const input = form.querySelector('[name="message"]');
    const text = input?.value.trim();
    if (!text) return;
    state.chat.push({ from: 'owner', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    input.value = '';
    refresh();
    showToast('Message sent.');
  }
});

app.addEventListener('input', (event) => {
  if (event.target.matches('[data-booking-notes]')) {
    state.booking.notes = event.target.value;
  }
});

app.addEventListener('change', (event) => {
  if (event.target.matches('[data-setting]')) {
    const label = event.target.closest('.row-item')?.querySelector('.row-title')?.textContent || 'Setting';
    showToast(`${label} ${event.target.checked ? 'enabled' : 'disabled'}.`);
  }
});


window.addEventListener('hashchange', () => {
  const nextHash = location.hash || '#/home';
  const isBack = suppressStackPush;
  if (isBack) suppressStackPush = false;
  else if (currentHash && nextHash !== currentHash) navigationStack.push(currentHash);
  currentHash = nextHash;
  renderRoute({ transition: 'tab' });
});

window.addEventListener('beforeunload', () => {
  if (liveTimerId) clearInterval(liveTimerId);
});

if (!location.hash) history.replaceState(null, '', '#/home');
currentHash = location.hash || '#/home';
renderRoute({ transition: 'none' });
suppressStackPush = false;















