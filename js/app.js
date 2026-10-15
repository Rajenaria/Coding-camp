"use strict";

// Konfigurasi
const STORAGE_KEY = "tuntas:v1";
const ONBOARDING_KEY = "tuntas:onboarding";
const GUIDE_STEPS = [
  {
    id: "dashboard-welcome",
    route: "beranda",
    target: "#greeting",
    title: "Mulai dari Dashboard",
    description:
      "Di sini kamu bisa melihat ringkasan pekerjaan dan menentukan langkah berikutnya.",
  },
  {
    id: "dashboard-name",
    route: "beranda",
    target: "#name-edit",
    title: "Buat lebih personal",
    description:
      "Klik ikon profil untuk mengganti nama panggilan. Namamu akan muncul di sapaan dashboard.",
  },
  {
    id: "dashboard-theme",
    route: "beranda",
    target: "#theme-toggle",
    title: "Pilih tampilan yang nyaman",
    description:
      "Gunakan tombol ini untuk beralih antara tema terang dan gelap. Pilihanmu tersimpan di perangkat ini.",
  },
  {
    id: "dashboard-clock",
    route: "beranda",
    target: ".date-time",
    title: "Tanggal dan jam lokal",
    description:
      "Jam dan tanggal mengikuti waktu perangkatmu dan diperbarui otomatis tanpa memuat ulang halaman.",
  },
  {
    id: "dashboard-summary",
    compactTarget: "#summary-heading",
    route: "beranda",
    target: ".summary-panel",
    title: "Ringkasan tugas",
    description:
      "Ringkasan ini menunjukkan tugas aktif dan selesai tanpa perlu membuka daftar tugas.",
  },
  {
    id: "dashboard-suggestion",
    route: "beranda",
    target: ".suggestion-card",
    title: "Saran langkah berikutnya",
    description:
      "Jika ada tugas aktif, saran tugas berikutnya muncul di sini. Tombol Kerjakan atau Lanjutkan akan membukanya di Fokus saat panduan sudah ditutup.",
    emptySelector: ".suggestion-card.is-empty",
    emptyDescription:
      "Belum ada tugas yang bisa disarankan. Tambahkan tugas dari tab Tugas setelah panduan selesai; saran berikutnya akan muncul di sini.",
  },
  {
    id: "tasks-add",
    route: "tugas",
    target: "#task-form",
    title: "Tambahkan tugas",
    description:
      "Tulis nama tugas, pilih prioritas, lalu tekan Tambah. Nama tugas aktif tidak boleh sama.",
    compactTarget: "#task-title",
  },
  {
    id: "tasks-select",
    compactTarget: ".tasks-help",
    route: "tugas",
    target: "#task-list .task-select",
    title: "Pilih kartu dan baca catatan",
    description:
      "Pilih kartu untuk melihat detail dan catatan progres. Pada layar kecil, detail dibuka sebagai dialog.",
    fallbackTarget: "#tasks-empty",
    emptyDescription:
      "Belum ada tugas. Tambahkan tugas lewat form di tab ini terlebih dahulu. Setelah itu, kartu menyediakan pilihan detail, catatan, status, edit, dan hapus.",
  },
  {
    id: "tasks-status",
    route: "tugas",
    target: "#task-list .task-checkbox-target",
    title: "Status dan tugas selesai",
    description:
      "Centang tugas untuk menandainya selesai. Di detail tugas, kamu juga dapat memilih Belum dimulai atau Sedang dikerjakan.",
    fallbackTarget: "#tasks-empty",
    emptyDescription:
      "Belum ada tugas. Tambahkan tugas lewat form di tab ini terlebih dahulu. Setelah itu, kartu menyediakan pilihan detail, catatan, status, edit, dan hapus.",
  },
  {
    id: "tasks-edit",
    route: "tugas",
    target: "#task-list .task-actions",
    title: "Edit atau hapus tugas",
    description:
      "Gunakan ikon pensil untuk mengedit tugas dan ikon tempat sampah untuk menghapusnya. Aksi ini juga tersedia di detail tugas.",
    fallbackTarget: "#tasks-empty",
    emptyDescription:
      "Belum ada tugas. Tambahkan tugas lewat form di tab ini terlebih dahulu. Setelah itu, kartu menyediakan pilihan detail, catatan, status, edit, dan hapus.",
  },
  {
    id: "tasks-sort",
    route: "tugas",
    target: "#task-sort",
    title: "Prioritas dan urutan tugas",
    description:
      "Pilih urutan Prioritas, Status, Terbaru, atau Terlama. Tugas selesai tetap diletakkan setelah tugas aktif. Prioritas dapat diubah saat mengedit tugas.",
  },
  {
    id: "focus-task",
    route: "fokus",
    target: "#active-task-name",
    title: "Tugas yang sedang difokuskan",
    description:
      "Nama tugas pilihanmu muncul di sini. Untuk menggantinya, pilih tugas dari tab Tugas setelah panduan ditutup. Timer juga dapat digunakan tanpa tugas.",
    emptySelector: "#focus-task-prompt:not([hidden])",
    emptyDescription:
      "Belum ada tugas yang dipilih. Gunakan tombol menuju Tugas setelah panduan ditutup untuk memilih tugas. Timer mandiri tetap bisa digunakan.",
  },
  {
    id: "focus-timer",
    route: "fokus",
    target: "#timer-display",
    title: "Timer Pomodoro",
    description:
      "Gunakan timer untuk satu sesi fokus. Berpindah tab tidak menjeda timer, dan timer selesai tidak otomatis menyelesaikan tugas.",
  },
  {
    id: "focus-controls",
    route: "fokus",
    target: ".timer-controls",
    title: "Mulai, jeda, dan reset",
    description:
      "Mulai menjalankan sesi, Jeda menghentikannya sementara, dan Reset menyiapkan ulang durasi sesi yang sedang dipakai tanpa menjalankannya.",
  },
  {
    id: "focus-duration",
    route: "fokus",
    target: "#duration-form",
    title: "Atur durasi fokus",
    description:
      "Pilih preset atau masukkan 1 sampai 180 menit. Saat sesi berjalan atau dijeda, kamu dapat menerapkan durasi untuk sesi berikutnya, mereset sesi ini, atau membatalkan perubahan.",
    compactTarget: "#duration-preset",
  },
  {
    id: "focus-note",
    route: "fokus",
    target: "#resume-note",
    title: "Simpan posisi terakhir",
    description:
      "Catat sudah sampai mana dan langkah berikutnya supaya mudah melanjutkan nanti. Draft tetap ada saat berpindah tab.",
  },
  {
    id: "links-open",
    route: "akses-cepat",
    target: "#links-section",
    title: "Tautan favorit, sekali klik",
    description:
      "Buka situs yang sering kamu gunakan langsung dari tombol di sini.",
    compactTarget: ".links-header",
  },
  {
    id: "links-add",
    route: "akses-cepat",
    target: "#link-add",
    title: "Tambahkan tautanmu",
    description:
      "Klik di sini, isi nama dan alamat situs di dialog, lalu simpan. Tautanmu akan muncul di Akses Cepat.",
  },
  {
    id: "links-manage",
    route: "akses-cepat",
    target: ".quick-link-menu",
    title: "Edit atau hapus tautan",
    description:
      "Gunakan menu tiga titik di samping tautan untuk mengedit atau menghapusnya. Klik nama tautan untuk membuka situs di tab baru.",
    fallbackTarget: "#links-empty",
    emptyDescription:
      "Belum ada tautan. Gunakan Tambah link untuk menyimpannya. Setelah ada tautan, menu tiga titik di sampingnya menyediakan Edit dan Hapus.",
  },
  {
    id: "guide-finish",
    route: "akses-cepat",
    target: "#guide-open",
    title: "Siap melanjutkan",
    description:
      "Panduan selesai. Kamu tetap berada di Akses Cepat. Untuk membuka panduan lagi kapan saja, gunakan tombol Panduan berikon tanda tanya di header.",
  },
];
let guideSession = null;
const DEFAULT_FOCUS_MINUTES = 25;
const MIN_FOCUS_MINUTES = 1;
const MAX_FOCUS_MINUTES = 180;
const PRIORITIES = {
  high: { label: "Tinggi", code: "P1", symbol: "↑", rank: 0 },
  medium: { label: "Sedang", code: "P2", symbol: "=", rank: 1 },
  low: { label: "Rendah", code: "P3", symbol: "↓", rank: 2 },
};
const TASK_STATUSES = {
  not_started: { label: "Belum dimulai", rank: 0 },
  in_progress: { label: "Sedang dikerjakan", rank: 1 },
  completed: { label: "Selesai", rank: 2 },
};
const ICON_PATHS = {
  more: [
    "M12 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
    "M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
    "M12 18a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  ],
  user: ["M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z", "M4 21v-2a8 8 0 0 1 16 0v2"],
  help: [
    "M9.1 9a3 3 0 1 1 5.8 1c-.8 1-2.9 1.5-2.9 3M12 17h.01",
    "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z",
  ],
  chevronDown: ["M6 9l6 6 6-6"],
  home: ["M3 10l9-7 9 7v11h-6v-7H9v7H3V10z"],
  tasks: ["M9 5h12M9 12h12M9 19h12M3 5h1M3 12h1M3 19h1"],
  focus: ["M9 2h6M12 6v6l3 2", "M21 14a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"],
  links: [
    "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2",
    "M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2",
  ],
  edit: ["M16 3l5 5-12 12-6 1 1-6L16 3z", "M14 5l5 5"],
  trash: ["M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"],
  sun: [
    "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z",
    "M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5",
  ],
  moon: ["M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10z"],
  close: ["M6 6l12 12M18 6L6 18"],
};
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const mobileLayout = window.matchMedia("(max-width: 639px)");
const compactDetailLayout = window.matchMedia("(max-width: 1199px)");
const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const timeFormatter = new Intl.DateTimeFormat("id-ID", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

// Tema sebelum halaman dirender
function applyInitialTheme() {
  let theme = systemTheme.matches ? "dark" : "light";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const savedTheme = stored === null ? null : JSON.parse(stored)?.theme;
    if (["light", "dark"].includes(savedTheme)) {
      theme = savedTheme;
    }
  } catch {
    // Tampilkan error data setelah halaman siap.
  }
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

applyInitialTheme();

// Elemen halaman
let greetingElement;
let dateElement;
let timeElement;
let themeButton;
let appStatusElement;
let taskForm;
let taskTitleInput;
let taskPriorityInput;
let taskFormError;
let taskList;
let tasksEmpty;
let taskCount;
let taskSort;
let suggestionHeading;
let suggestionReason;
let suggestionButton;
let activeTaskName;
let resumeNoteInput;
let editTaskDialog;
let editTaskForm;
let editTaskTitleInput;
let editTaskPriorityInput;
let editTaskError;
let editTaskCancel;
let suggestionCard;
let timerDisplay;
let timerStatus;
let timerStart;
let timerStop;
let timerReset;
let resumeForm;
let resumeSave;
let resumeStatus;
let linkForm;
let linkLabelInput;
let linkUrlInput;
let linkFormError;
let linkDialog;
let linkAddButton;
let editingLinkId = null;
let linkReturnFocus = null;
let quickLinks;
let linksEmpty;
let choiceDialog;
let choiceMessage;
let choiceActions;
let views;
let navigationLinks;
let notStartedCount;
let inProgressCount;
let completedTaskCount;
let focusTaskPrompt;
let tasksWorkspace;
let taskDetail;
let detailHeading;
let detailEmpty;
let detailContent;
let detailTitle;
let detailPriority;
let detailStatus;
let detailSession;
let detailValidation;
let detailFocus;
let detailComplete;
let detailClose;
let detailEdit;
let detailDelete;
let detailNoteSlot;
let focusNoteSlot;
let editTaskClose;
let choiceClose;
let focusTaskStatus;
let focusTaskActions;
let focusDetail;
let focusComplete;
let nameButton;
let nameDialog;
let nameForm;
let nicknameInput;
let nameError;
let durationForm;
let durationPreset;
let durationInput;
let durationError;
let durationSummary;
let detailDialog;
let mobileHeader;
let brandLink;
let sidebar;
let headerActions;

function collectElements() {
  greetingElement = document.getElementById("greeting");
  dateElement = document.getElementById("current-date");
  timeElement = document.getElementById("current-time");
  themeButton = document.getElementById("theme-toggle");
  appStatusElement = document.getElementById("app-status");
  taskForm = document.getElementById("task-form");
  taskTitleInput = document.getElementById("task-title");
  taskPriorityInput = document.getElementById("task-priority");
  taskFormError = document.getElementById("task-form-error");
  taskList = document.getElementById("task-list");
  tasksEmpty = document.getElementById("tasks-empty");
  taskCount = document.getElementById("task-count");
  taskSort = document.getElementById("task-sort");
  suggestionHeading = document.getElementById("suggestion-heading");
  suggestionReason = document.getElementById("suggestion-reason");
  suggestionButton = document.getElementById("suggestion-button");
  activeTaskName = document.getElementById("active-task-name");
  resumeNoteInput = document.getElementById("resume-note");
  editTaskDialog = document.getElementById("edit-task-dialog");
  editTaskForm = document.getElementById("edit-task-form");
  editTaskTitleInput = document.getElementById("edit-task-title");
  editTaskPriorityInput = document.getElementById("edit-task-priority");
  editTaskError = document.getElementById("edit-task-error");
  editTaskCancel = document.getElementById("edit-task-cancel");
  suggestionCard = document.querySelector(".suggestion-card");
  timerDisplay = document.getElementById("timer-display");
  timerStatus = document.getElementById("timer-status");
  timerStart = document.getElementById("timer-start");
  timerStop = document.getElementById("timer-stop");
  timerReset = document.getElementById("timer-reset");
  resumeForm = document.getElementById("resume-form");
  resumeSave = document.getElementById("resume-save");
  resumeStatus = document.getElementById("resume-status");
  linkForm = document.getElementById("link-form");
  linkLabelInput = document.getElementById("link-label");
  linkUrlInput = document.getElementById("link-url");
  linkFormError = document.getElementById("link-form-error");
  linkDialog = document.getElementById("link-dialog");
  linkAddButton = document.getElementById("link-add");
  quickLinks = document.getElementById("quick-links");
  linksEmpty = document.getElementById("links-empty");
  choiceDialog = document.getElementById("choice-dialog");
  choiceMessage = document.getElementById("choice-message");
  choiceActions = document.getElementById("choice-actions");
  views = document.querySelectorAll("[data-view]");
  navigationLinks = document.querySelectorAll(".sidebar-nav .nav-link");
  notStartedCount = document.getElementById("not-started-count");
  inProgressCount = document.getElementById("in-progress-count");
  completedTaskCount = document.getElementById("completed-task-count");
  focusTaskPrompt = document.getElementById("focus-task-prompt");
  tasksWorkspace = document.getElementById("tasks-workspace");
  taskDetail = document.getElementById("task-detail");
  detailHeading = document.getElementById("detail-heading");
  detailEmpty = document.getElementById("detail-empty");
  detailContent = document.getElementById("detail-content");
  detailTitle = document.getElementById("detail-title");
  detailPriority = document.getElementById("detail-priority");
  detailStatus = document.getElementById("detail-status");
  detailSession = document.getElementById("detail-session");
  detailValidation = document.getElementById("detail-validation");
  detailFocus = document.getElementById("detail-focus");
  detailComplete = document.getElementById("detail-complete");
  detailClose = document.getElementById("detail-close");
  detailEdit = document.getElementById("detail-edit");
  detailDelete = document.getElementById("detail-delete");
  detailNoteSlot = document.getElementById("detail-note-slot");
  focusNoteSlot = document.getElementById("focus-note-slot");
  editTaskClose = document.getElementById("edit-task-close");
  choiceClose = document.getElementById("choice-close");
  focusTaskStatus = document.getElementById("focus-task-status");
  focusTaskActions = document.getElementById("focus-task-actions");
  focusDetail = document.getElementById("focus-detail");
  focusComplete = document.getElementById("focus-complete");
  nameButton = document.getElementById("name-edit");
  nameDialog = document.getElementById("name-dialog");
  nameForm = document.getElementById("name-form");
  nicknameInput = document.getElementById("nickname");
  nameError = document.getElementById("name-error");
  durationForm = document.getElementById("duration-form");
  durationPreset = document.getElementById("duration-preset");
  durationInput = document.getElementById("duration-minutes");
  durationError = document.getElementById("duration-error");
  durationSummary = document.getElementById("duration-summary");
  detailDialog = document.getElementById("detail-dialog");
  mobileHeader = document.getElementById("mobile-header");
  brandLink = document.querySelector(".brand");
  sidebar = document.querySelector(".sidebar");
  headerActions = document.querySelector(".header-actions");
}

// Data aplikasi
let state;
let storageWritable = true;
let editingTaskId = null;
let editorTaskId = null;
const noteDrafts = new Map();
let detailOpen = true;
let pendingMigration = false;
let pendingChoice = null;
let actionPending = false;
let statusTimeoutId = null;

function createTimer(
  taskId = null,
  durationSeconds = (state?.focusMinutes ?? DEFAULT_FOCUS_MINUTES) * 60,
) {
  return {
    status: "idle",
    taskId,
    durationSeconds,
    remainingSeconds: durationSeconds,
    endAt: null,
  };
}

function createInitialState() {
  return {
    schemaVersion: 3,
    selectedTaskId: null,
    tasks: [],
    links: [],
    theme: null,
    nickname: "",
    focusMinutes: DEFAULT_FOCUS_MINUTES,
    timer: createTimer(null, DEFAULT_FOCUS_MINUTES * 60),
  };
}

function showAppStatus(
  message,
  { autoDismiss = false, kind = "info", toast = false } = {},
) {
  clearTimeout(statusTimeoutId);
  statusTimeoutId = null;
  appStatusElement.textContent = message;
  appStatusElement.dataset.kind = kind;
  appStatusElement.classList.toggle("is-toast", toast);

  if (autoDismiss) {
    statusTimeoutId = setTimeout(() => {
      appStatusElement.textContent = "";
      appStatusElement.classList.remove("is-toast");
      statusTimeoutId = null;
    }, 4000);
  }
}

function findTask(taskId) {
  return state.tasks.find((task) => task.id === taskId);
}

// Validasi data
function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isValidTask(task, version = 2) {
  if (!isRecord(task)) {
    return false;
  }
  const validStatus =
    version === 1
      ? typeof task.completed === "boolean"
      : typeof task.status === "string" &&
        Object.hasOwn(TASK_STATUSES, task.status) &&
        !Object.hasOwn(task, "completed");
  return (
    validStatus &&
    typeof task.id === "string" &&
    task.id.trim().length > 0 &&
    typeof task.title === "string" &&
    task.title.trim().length > 0 &&
    task.title.length <= 120 &&
    typeof task.priority === "string" &&
    Object.hasOwn(PRIORITIES, task.priority) &&
    Number.isFinite(task.createdAt) &&
    task.createdAt >= 0 &&
    Number.isFinite(task.updatedAt) &&
    task.updatedAt >= 0 &&
    typeof task.resumeNote === "string" &&
    task.resumeNote.length <= 2000
  );
}

function getValidUrl(value) {
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname) {
      return null;
    }
    return url.href;
  } catch {
    return null;
  }
}

function isValidLink(link) {
  return (
    isRecord(link) &&
    typeof link.id === "string" &&
    link.id.trim().length > 0 &&
    typeof link.label === "string" &&
    link.label.trim().length > 0 &&
    link.label.length <= 50 &&
    typeof link.url === "string" &&
    getValidUrl(link.url) !== null
  );
}

function hasUniqueIds(items) {
  return new Set(items.map((item) => item.id)).size === items.length;
}

function isValidState(value) {
  if (
    !isRecord(value) ||
    ![1, 2, 3].includes(value.schemaVersion) ||
    !Array.isArray(value.tasks) ||
    !value.tasks.every((task) => isValidTask(task, value.schemaVersion)) ||
    !Array.isArray(value.links) ||
    !value.links.every(isValidLink) ||
    !hasUniqueIds(value.tasks) ||
    !hasUniqueIds(value.links)
  ) {
    return false;
  }
  const activeTitles = value.tasks
    .filter((task) => {
      return value.schemaVersion === 1
        ? !task.completed
        : !isTaskCompleted(task);
    })
    .map((task) => normalizeTaskTitle(task.title));
  if (new Set(activeTitles).size !== activeTitles.length) {
    return false;
  }
  const validSelection =
    value.schemaVersion === 1 ||
    value.selectedTaskId === null ||
    typeof value.selectedTaskId === "string";
  const timer = value.timer;
  const durationSeconds =
    value.schemaVersion === 3
      ? timer?.durationSeconds
      : DEFAULT_FOCUS_MINUTES * 60;
  const validPreferences =
    value.schemaVersion !== 3 ||
    (typeof value.nickname === "string" &&
      value.nickname.length <= 30 &&
      value.nickname === value.nickname.trim() &&
      isValidFocusMinutes(value.focusMinutes));
  return (
    validPreferences &&
    isValidFocusMinutes(durationSeconds / 60) &&
    validSelection &&
    [null, "light", "dark"].includes(value.theme) &&
    isRecord(timer) &&
    ["idle", "running", "paused", "finished"].includes(timer.status) &&
    (timer.taskId === null || typeof timer.taskId === "string") &&
    Number.isInteger(timer.remainingSeconds) &&
    timer.remainingSeconds >= 0 &&
    timer.remainingSeconds <= durationSeconds &&
    (timer.status === "running"
      ? Number.isFinite(timer.endAt) && timer.endAt > 0
      : timer.endAt === null) &&
    (timer.status !== "finished" || timer.remainingSeconds === 0) &&
    (timer.status !== "idle" || timer.remainingSeconds === durationSeconds)
  );
}

function isTaskCompleted(task) {
  return task.status === "completed";
}

function migrateState(value) {
  if (value.schemaVersion === 3) {
    return value;
  }
  let tasks = value.tasks;
  let selectedTaskId = value.selectedTaskId;
  if (value.schemaVersion === 1) {
    tasks = value.tasks.map(({ completed, ...task }) => {
      let status = completed ? "completed" : "not_started";
      if (
        !completed &&
        value.timer.taskId === task.id &&
        ["running", "paused"].includes(value.timer.status)
      ) {
        status = "in_progress";
      }
      return { ...task, status };
    });
    selectedTaskId = tasks.some((task) => task.id === value.timer.taskId)
      ? value.timer.taskId
      : null;
  }
  return {
    ...value,
    schemaVersion: 3,
    nickname:
      typeof value.nickname === "string" && value.nickname.trim().length <= 30
        ? value.nickname.trim()
        : "",
    focusMinutes: isValidFocusMinutes(value.focusMinutes)
      ? value.focusMinutes
      : DEFAULT_FOCUS_MINUTES,
    timer: { ...value.timer, durationSeconds: DEFAULT_FOCUS_MINUTES * 60 },
    selectedTaskId,
    tasks,
  };
}

// Penyimpanan
function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      return createInitialState();
    }
    const parsed = JSON.parse(stored);
    if (!isValidState(parsed)) {
      throw new Error("Format data tidak sesuai.");
    }
    const loaded = migrateState(parsed);
    pendingMigration = parsed.schemaVersion !== 3;
    if (
      loaded.timer.taskId !== null &&
      !loaded.tasks.some((task) => {
        return task.id === loaded.timer.taskId && !isTaskCompleted(task);
      })
    ) {
      loaded.timer = { ...loaded.timer, taskId: null };
      showAppStatus(
        "Tugas pada timer lama tidak tersedia. Waktu sesi dipertahankan sebagai timer mandiri.",
      );
    }
    if (!loaded.tasks.some((task) => task.id === loaded.selectedTaskId)) {
      loaded.selectedTaskId = null;
    }
    return loaded;
  } catch {
    storageWritable = false;
    showAppStatus(
      "Data lokal tidak dapat dibaca. Sesi memakai data sementara; data lama tidak ditimpa.",
      { kind: "error" },
    );
    return createInitialState();
  }
}

function saveState() {
  if (!storageWritable) {
    showAppStatus(
      "Perubahan hanya berlaku di sesi ini. Data lama tetap dilindungi.",
      { kind: "error" },
    );
    return false;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    showAppStatus(
      "Perubahan belum tersimpan. Penyimpanan browser mungkin dibatasi atau penuh.",
      { kind: "error" },
    );
    return false;
  }
}

function saveWithFeedback(message, options = { autoDismiss: true }) {
  const saved = saveState();
  if (saved) {
    showAppStatus(message, options);
  }
  return saved;
}

// Ikon
function createIcon(name) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.75");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  for (const data of ICON_PATHS[name]) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", data);
    svg.append(path);
  }
  return svg;
}

function decorateSelects() {
  for (const select of document.querySelectorAll("select")) {
    const wrapper = document.createElement("div");
    wrapper.className = "select-control";
    select.before(wrapper);
    wrapper.append(select, createIcon("chevronDown"));
  }
}

function decorateIconButton(button, icon, label) {
  button.classList.add("icon-button");
  button.setAttribute("aria-label", label);
  button.dataset.tooltip = label;
  button.replaceChildren(createIcon(icon));
}

function createIconButton(icon, label, onClick, danger = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = danger
    ? "button button-danger"
    : "button button-secondary";
  decorateIconButton(button, icon, label);
  button.addEventListener("click", onClick);
  return button;
}

// Sapaan dan tema
function getGreeting(hour) {
  if (hour >= 5 && hour < 11) {
    return "Selamat pagi.";
  }

  if (hour >= 11 && hour < 15) {
    return "Selamat siang.";
  }

  if (hour >= 15 && hour < 18) {
    return "Selamat sore.";
  }

  return "Selamat malam.";
}

function updateClock() {
  const now = new Date();

  const greeting = getGreeting(now.getHours());
  greetingElement.textContent = state.nickname
    ? `${greeting.slice(0, -1)}, ${state.nickname}.`
    : greeting;
  dateElement.textContent = dateFormatter.format(now);
  timeElement.textContent = timeFormatter.format(now).replace(".", ":");
  timeElement.dateTime = timeElement.textContent;
  dateElement.dateTime = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

function openNameDialog() {
  if (actionPending || document.querySelector("dialog[open]")) return;
  nicknameInput.value = state.nickname;
  nicknameInput.removeAttribute("aria-invalid");
  nameError.textContent = "";
  nameDialog.showModal();
  document.body.classList.add("has-modal");
  nicknameInput.focus();
}

function handleNameSave(event) {
  event.preventDefault();
  const nickname = nicknameInput.value.trim();
  if (!nickname || nickname.length > 30) {
    nicknameInput.setAttribute("aria-invalid", "true");
    nameError.textContent = !nickname
      ? "Isi nama panggilan terlebih dahulu."
      : "Nama panggilan maksimal 30 karakter.";
    nicknameInput.focus();
    return;
  }
  const previous = state.nickname;
  state.nickname = nickname;
  if (!saveState()) {
    state.nickname = previous;
    nameError.textContent = "Nama belum tersimpan. Coba lagi.";
    return;
  }
  updateClock();
  nameDialog.close();
  showAppStatus("Nama panggilan tersimpan.", { autoDismiss: true });
}

function getPreferredTheme() {
  if (state.theme !== null) {
    return state.theme;
  }

  return systemTheme.matches ? "dark" : "light";
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.removeProperty("color-scheme");
  brandLink.querySelector("img").src =
    `./assets/Icon/tuntas-wordmark-${theme}.svg`;
  brandLink.querySelector("source").srcset =
    `./assets/Icon/tuntas-icon-${theme}.svg`;
  decorateIconButton(
    themeButton,
    isDark ? "sun" : "moon",
    isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap",
  );
  themeButton.setAttribute("aria-pressed", String(isDark));
}

function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme;

  state.theme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(state.theme);
  saveState();
}

// Navigasi
function renderActiveView(moveFocus = true) {
  closeLinkMenus();
  const route = window.location.hash.slice(1);
  const activeView =
    [...views].find((view) => view.dataset.view === route) || views[0];
  const activeRoute = activeView.dataset.view;

  if (route !== activeRoute) {
    window.history.replaceState(null, "", `#${activeRoute}`);
  }

  for (const view of views) {
    view.hidden = view !== activeView;
  }
  for (const link of navigationLinks) {
    if (link.hash === `#${activeRoute}`) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  }

  renderProgressEditor(activeRoute);
  syncDetailLayout();
  updateSuggestionShape();
  if (moveFocus) {
    activeView.querySelector("h2").focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
}

function navigateToView(route) {
  if (window.location.hash === `#${route}`) {
    renderActiveView();
  } else {
    window.location.hash = route;
  }
}

// Dialog pilihan
function askChoice(message, choices) {
  return new Promise((resolve) => {
    const previousFocus = document.activeElement;
    pendingChoice = { resolve, previousFocus };
    syncDetailLayout();
    choiceMessage.textContent = message;
    choiceActions.replaceChildren();
    for (const choice of choices) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "button button-secondary";
      button.textContent = choice.label;
      button.addEventListener("click", () => finishChoice(choice.value));
      choiceActions.append(button);
    }
    choiceDialog.showModal();
    document.body.classList.add("has-modal");
    choiceActions.lastElementChild.focus();
  });
}

function finishChoice(value) {
  const choice = pendingChoice;
  pendingChoice = null;
  choiceDialog.close();
  if (choice.previousFocus?.isConnected) {
    choice.previousFocus.focus();
  }
  choice.resolve(value);
  requestAnimationFrame(() => {
    if (detailDialog.open && taskDetail.contains(choice.previousFocus)) {
      choice.previousFocus.focus({ preventScroll: true });
    }
  });
}

function askConfirmation(message) {
  return askChoice(message, [
    { label: "Lanjutkan", value: true },
    { label: "Batal", value: false },
  ]);
}

async function runGuardedAction(action) {
  if (actionPending) {
    return false;
  }
  actionPending = true;
  try {
    return await action();
  } finally {
    actionPending = false;
    syncDetailLayout();
  }
}

// Tugas
function normalizeTaskTitle(title) {
  return title.trim().toLowerCase();
}

function hasDuplicateTask(title, excludedTaskId = null) {
  const normalizedTitle = normalizeTaskTitle(title);

  return state.tasks.some((task) => {
    return (
      task.id !== excludedTaskId &&
      !isTaskCompleted(task) &&
      normalizeTaskTitle(task.title) === normalizedTitle
    );
  });
}

function getTaskTitleError(
  title,
  excludedTaskId = null,
  checkDuplicates = true,
) {
  if (title.trim().length === 0) {
    return "Nama tugas tidak boleh kosong.";
  }

  if (title.length > 120) {
    return "Nama tugas maksimal 120 karakter.";
  }

  if (checkDuplicates && hasDuplicateTask(title, excludedTaskId)) {
    return "Tugas tersebut masih ada dalam daftar tugas aktif.";
  }

  return "";
}

function handleAddTask(event) {
  event.preventDefault();

  const title = taskTitleInput.value.trim();
  const priority = taskPriorityInput.value;

  const titleError = getTaskTitleError(title);

  if (titleError) {
    taskTitleInput.setAttribute("aria-invalid", "true");
    taskFormError.textContent = titleError;
    taskTitleInput.focus();
    return;
  }

  if (!Object.hasOwn(PRIORITIES, priority)) {
    taskFormError.textContent = "Pilih prioritas yang tersedia.";
    return;
  }

  const now = Date.now();

  const newTask = {
    id: crypto.randomUUID(),
    title,
    priority,
    status: "not_started",
    createdAt: now,
    updatedAt: now,
    resumeNote: "",
  };

  state.tasks.push(newTask);

  const saved = saveState();

  renderTasks();
  taskForm.reset();
  taskFormError.textContent = "";
  taskTitleInput.focus();

  if (saved) {
    showAppStatus("Tugas ditambahkan dan tersimpan.", { autoDismiss: true });
  }
}

function compareTaskPriority(firstTask, secondTask) {
  const priorityDifference =
    PRIORITIES[firstTask.priority].rank - PRIORITIES[secondTask.priority].rank;

  return (
    priorityDifference ||
    firstTask.createdAt - secondTask.createdAt ||
    firstTask.id.localeCompare(secondTask.id)
  );
}

function getSortedTasks() {
  // Salin array agar pengurutan tampilan tidak mengubah data asli.
  const sortedTasks = [...state.tasks];

  sortedTasks.sort((firstTask, secondTask) => {
    // Tugas yang belum selesai selalu berada di atas.
    const completionDifference =
      Number(isTaskCompleted(firstTask)) - Number(isTaskCompleted(secondTask));

    if (completionDifference !== 0) {
      return completionDifference;
    }

    if (taskSort.value === "status") {
      return (
        TASK_STATUSES[firstTask.status].rank -
          TASK_STATUSES[secondTask.status].rank ||
        compareTaskPriority(firstTask, secondTask)
      );
    }
    if (taskSort.value === "newest") {
      return (
        secondTask.createdAt - firstTask.createdAt ||
        firstTask.id.localeCompare(secondTask.id)
      );
    }

    if (taskSort.value === "oldest") {
      return (
        firstTask.createdAt - secondTask.createdAt ||
        firstTask.id.localeCompare(secondTask.id)
      );
    }

    return compareTaskPriority(firstTask, secondTask);
  });

  return sortedTasks;
}

function openEditTask(taskId) {
  const task = state.tasks.find((item) => {
    return item.id === taskId;
  });

  if (!task) {
    showAppStatus("Tugas tidak ditemukan.");
    return;
  }

  editingTaskId = task.id;
  syncDetailLayout();

  editTaskTitleInput.value = task.title;
  editTaskTitleInput.removeAttribute("aria-invalid");
  editTaskPriorityInput.value = task.priority;
  editTaskError.textContent = "";

  editTaskDialog.showModal();
  document.body.classList.add("has-modal");
  editTaskTitleInput.focus();
}

function handleEditTask(event) {
  event.preventDefault();

  const task = state.tasks.find((item) => {
    return item.id === editingTaskId;
  });

  if (!task) {
    editTaskDialog.close();
    showAppStatus("Tugas yang ingin diedit tidak ditemukan.");
    return;
  }

  const title = editTaskTitleInput.value.trim();
  const priority = editTaskPriorityInput.value;

  const titleError = getTaskTitleError(title, task.id, !isTaskCompleted(task));
  if (titleError) {
    editTaskTitleInput.setAttribute("aria-invalid", "true");
    editTaskError.textContent = titleError;
    editTaskTitleInput.focus();
    return;
  }

  if (!Object.hasOwn(PRIORITIES, priority)) {
    editTaskError.textContent = "Pilih prioritas yang tersedia.";
    return;
  }

  task.title = title;
  task.priority = priority;
  task.updatedAt = Date.now();

  const saved = saveState();

  editTaskDialog.close();
  renderTasks();

  if (saved) {
    showAppStatus("Perubahan tugas tersimpan.", { autoDismiss: true });
  }

  focusTaskCheckbox(task.id);
}

function focusTaskCheckbox(taskId) {
  const checkbox = document.getElementById(`task-checkbox-${taskId}`);

  if (checkbox) {
    checkbox.focus();
  }
}

async function prepareTaskChange(taskIds, stopSession = false) {
  if (stopSession && hasFocusSession()) {
    if (
      !(await askConfirmation(
        "Hentikan sesi fokus dan reset timer sebelum melanjutkan?",
      ))
    ) {
      return false;
    }
  }
  return resolveResumeDrafts(taskIds);
}

function setTaskCompleted(taskId, completed) {
  return setTaskStatus(taskId, completed ? "completed" : "not_started");
}

async function setTaskStatus(taskId, nextStatus) {
  return runGuardedAction(async () => {
    const task = findTask(taskId);
    if (!task || !Object.hasOwn(TASK_STATUSES, nextStatus)) {
      return false;
    }
    const reopening = isTaskCompleted(task) && nextStatus !== "completed";
    if (reopening) {
      nextStatus = "not_started";
    }
    if (task.status === nextStatus) {
      return true;
    }
    if (reopening && hasDuplicateTask(task.title, taskId)) {
      const message =
        "Ada tugas aktif dengan nama yang sama. Ubah judul sebelum membuka kembali.";
      if (state.selectedTaskId === taskId)
        detailValidation.textContent = message;
      const card = [...taskList.children].find(
        (element) => element.dataset.taskId === taskId,
      );
      if (card) {
        let error = card.querySelector(".task-inline-error");
        if (!error) {
          error = document.createElement("p");
          error.className = "form-error task-inline-error";
          error.setAttribute("role", "alert");
          card.querySelector(".task-body").append(error);
        }
        error.textContent = message;
      }
      showAppStatus(message, { kind: "error" });
      return false;
    }
    const detachTimer =
      state.timer.taskId === taskId && nextStatus !== "in_progress";
    if (nextStatus === "completed" || detachTimer) {
      if (!(await prepareTaskChange([taskId], detachTimer))) {
        return false;
      }
    }
    if (detachTimer) {
      state.timer = createTimer();
    }
    task.status = nextStatus;
    task.updatedAt = Date.now();
    const feedback = reopening
      ? "Tugas dibuka kembali sebagai Belum dimulai."
      : `Status tugas: ${TASK_STATUSES[nextStatus].label}.`;
    saveWithFeedback(feedback);
    renderTasks();
    return true;
  });
}

async function deleteTask(taskId) {
  return runGuardedAction(async () => {
    const task = findTask(taskId);
    if (
      !task ||
      !(await askConfirmation(
        `Hapus tugas "${task.title}" beserta catatannya?`,
      ))
    ) {
      return false;
    }
    const relatedTimer = state.timer.taskId === taskId;
    if (!(await prepareTaskChange([taskId], relatedTimer))) {
      return false;
    }
    if (relatedTimer) {
      state.timer = createTimer();
    }
    if (state.selectedTaskId === taskId) {
      state.selectedTaskId = null;
    }
    noteDrafts.delete(taskId);
    state.tasks = state.tasks.filter((item) => item.id !== taskId);
    saveWithFeedback("Tugas dihapus dan perubahan tersimpan.");
    renderTasks();
    taskTitleInput.focus();
    return true;
  });
}

function getFocusLabel(task) {
  if (state.timer.taskId === task.id && hasFocusSession()) {
    return "Lanjutkan fokus";
  }
  return "Mulai fokus";
}

// Saran dan pilihan fokus
function getSuggestedTask() {
  const activeTasks = state.tasks.filter((task) => {
    return !isTaskCompleted(task);
  });

  activeTasks.sort(compareTaskPriority);

  return activeTasks[0] ?? null;
}

async function selectTask(taskId) {
  return runGuardedAction(async () => {
    if (!findTask(taskId)) {
      return false;
    }
    if (
      state.selectedTaskId !== taskId &&
      !(await resolveResumeDrafts([state.selectedTaskId]))
    ) {
      return false;
    }
    state.selectedTaskId = taskId;
    detailOpen = true;
    saveState();
    renderTasks();
    detailHeading.focus({ preventScroll: true });
    taskDetail.scrollIntoView({ block: "nearest" });
    return true;
  });
}

async function beginFocus(taskId) {
  return runGuardedAction(async () => {
    const task = findTask(taskId);
    if (!task || isTaskCompleted(task)) {
      showAppStatus("Buka kembali tugas selesai sebelum memulai fokus.");
      return false;
    }
    const changingSession = state.timer.taskId !== taskId;
    const leavingIds = [
      editorTaskId,
      state.selectedTaskId,
      state.timer.taskId,
    ].filter((id) => id !== taskId);
    if (!(await prepareTaskChange(leavingIds, changingSession))) {
      return false;
    }
    if (changingSession) {
      state.timer = createTimer(taskId);
    }
    state.selectedTaskId = taskId;
    detailOpen = true;
    startFocusSession();
    navigateToView("fokus");
    return true;
  });
}

// Timer
function getRemainingSeconds() {
  if (state.timer.status !== "running") {
    return state.timer.remainingSeconds;
  }
  return Math.max(
    0,
    Math.min(
      state.timer.durationSeconds,
      Math.ceil((state.timer.endAt - Date.now()) / 1000),
    ),
  );
}

function hasFocusSession() {
  return ["running", "paused"].includes(state.timer.status);
}

function refreshTimer() {
  if (state.timer.status === "running" && getRemainingSeconds() === 0) {
    state.timer.status = "finished";
    state.timer.remainingSeconds = 0;
    state.timer.endAt = null;
    saveWithFeedback("Sesi fokus selesai. Status tugas tetap sama.", {
      autoDismiss: false,
    });
    renderTasks();
  }
  renderTimer();
}

function startTimer() {
  if (actionPending || state.timer.status === "running") {
    return;
  }
  startFocusSession();
}

function startFocusSession() {
  if (state.timer.status !== "running") {
    if (
      state.timer.status === "finished" ||
      state.timer.remainingSeconds === 0
    ) {
      state.timer = createTimer(state.timer.taskId);
    }
    state.timer.endAt = Date.now() + state.timer.remainingSeconds * 1000;
    state.timer.status = "running";
    const task = findTask(state.timer.taskId);
    if (task && task.status === "not_started") {
      task.status = "in_progress";
      task.updatedAt = Date.now();
    }
  }
  saveWithFeedback("Sesi fokus berjalan dan tersimpan.");
  renderTasks();
}

function stopTimer() {
  if (actionPending || state.timer.status !== "running") {
    return;
  }
  refreshTimer();
  if (state.timer.status !== "running") {
    return;
  }
  state.timer.remainingSeconds = getRemainingSeconds();
  state.timer.endAt = null;
  state.timer.status = "paused";
  saveWithFeedback("Sesi fokus dijeda dan tersimpan.");
  renderTasks();
}

function resetTimer() {
  if (actionPending) {
    return;
  }
  state.timer = createTimer(state.timer.taskId, state.timer.durationSeconds);
  saveWithFeedback("Timer direset. Catatan tugas tetap tersedia.");
  renderTasks();
}

// Pengaturan durasi
function isValidFocusMinutes(value) {
  return (
    Number.isInteger(value) &&
    value >= MIN_FOCUS_MINUTES &&
    value <= MAX_FOCUS_MINUTES
  );
}

function parseFocusMinutes(value) {
  if (!/^\d+$/.test(value)) return null;
  const minutes = Number(value);
  return isValidFocusMinutes(minutes) ? minutes : null;
}

function syncDurationPreset() {
  const minutes = parseFocusMinutes(durationInput.value);
  const preset = [...durationPreset.options].find(
    (option) => option.value === String(minutes),
  );
  durationPreset.value = preset?.value ?? "custom";
}

function renderDurationSettings() {
  durationInput.value = state.focusMinutes;
  syncDurationPreset();
}

async function handleDurationSave(event) {
  event.preventDefault();
  const minutes = parseFocusMinutes(durationInput.value);
  if (minutes === null) {
    durationInput.setAttribute("aria-invalid", "true");
    durationError.textContent = "Isi durasi dengan bilangan bulat 1–180 menit.";
    durationInput.focus();
    return;
  }
  await runGuardedAction(async () => {
    refreshTimer();
    let decision = "reset";
    if (hasFocusSession()) {
      decision = await askChoice(
        `Sesi ini berdurasi ${state.timer.durationSeconds / 60} menit. Terapkan ${minutes} menit untuk sesi berikutnya, atau hentikan dan reset sesi ini tanpa memulainya?`,
        [
          { label: "Terapkan sesi berikutnya", value: "next" },
          { label: "Reset sesi ini", value: "reset" },
          { label: "Batal", value: false },
        ],
      );
    }
    if (!decision) {
      renderDurationSettings();
      return false;
    }
    const previousMinutes = state.focusMinutes;
    const previousTimer = state.timer;
    state.focusMinutes = minutes;
    if (decision === "reset") {
      state.timer = createTimer(state.timer.taskId, minutes * 60);
    }
    if (!saveState()) {
      state.focusMinutes = previousMinutes;
      state.timer = previousTimer;
      durationError.textContent =
        "Durasi belum tersimpan. Sesi dan preferensi sebelumnya dipertahankan.";
      renderTimer();
      return false;
    }
    durationError.textContent = "";
    durationInput.removeAttribute("aria-invalid");
    renderDurationSettings();
    renderTimer();
    showAppStatus(
      decision === "next"
        ? "Durasi sesi berikutnya tersimpan. Sesi sekarang tetap berjalan atau dijeda seperti semula."
        : "Durasi tersimpan. Timer siap tanpa berjalan otomatis.",
      { autoDismiss: true },
    );
    return true;
  });
}

// Catatan progres
function captureNoteDraft() {
  const task = findTask(editorTaskId);
  if (!task) {
    return;
  }
  if (resumeNoteInput.value === task.resumeNote) {
    noteDrafts.delete(task.id);
  } else {
    noteDrafts.set(task.id, resumeNoteInput.value);
  }
}

function hasResumeDraft(taskId = editorTaskId) {
  captureNoteDraft();
  return noteDrafts.has(taskId);
}

function hasAnyResumeDraft() {
  captureNoteDraft();
  return noteDrafts.size > 0;
}

function saveResumeNote(taskId = editorTaskId) {
  captureNoteDraft();
  const task = findTask(taskId);
  if (!task) {
    return false;
  }
  const note = noteDrafts.has(taskId)
    ? noteDrafts.get(taskId)
    : task.resumeNote;
  if (note.length > 2000) {
    showAppStatus("Catatan maksimal 2000 karakter.", { kind: "error" });
    resumeNoteInput.setAttribute("aria-invalid", "true");
    resumeStatus.textContent = "Catatan maksimal 2000 karakter.";
    return false;
  }
  const previousNote = task.resumeNote;
  const previousUpdatedAt = task.updatedAt;
  task.resumeNote = note;
  task.updatedAt = Date.now();
  if (!saveState()) {
    task.resumeNote = previousNote;
    task.updatedAt = previousUpdatedAt;
    if (editorTaskId === taskId) {
      resumeStatus.textContent =
        "Catatan belum tersimpan. Draft tetap ada; coba simpan lagi.";
    } else {
      showAppStatus(
        `Catatan progres "${task.title}" belum tersimpan. Draft tetap ada.`,
      );
    }
    return false;
  }
  noteDrafts.delete(taskId);
  if (editorTaskId === taskId) {
    resumeStatus.textContent = "Catatan tersimpan.";
  } else {
    showAppStatus(`Catatan progres "${task.title}" tersimpan.`, {
      autoDismiss: true,
    });
  }
  renderTasks();
  return true;
}

async function resolveResumeDrafts(taskIds) {
  captureNoteDraft();
  const discardedIds = [];
  for (const taskId of new Set(taskIds)) {
    if (!noteDrafts.has(taskId)) {
      continue;
    }
    const task = findTask(taskId);
    if (!task) {
      continue;
    }
    const choice = await askChoice(
      `Catatan progres "${task.title}" belum tersimpan.`,
      [
        { label: "Simpan", value: "save" },
        { label: "Buang draft", value: "discard" },
        { label: "Batal", value: "cancel" },
      ],
    );
    if (choice === "save") {
      if (!saveResumeNote(taskId)) {
        return false;
      }
    } else if (choice === "discard") {
      discardedIds.push(taskId);
    } else {
      return false;
    }
  }
  // Buang draft setelah semua pilihan disetujui.
  for (const taskId of discardedIds) {
    noteDrafts.delete(taskId);
    if (editorTaskId === taskId) {
      resumeNoteInput.value = findTask(taskId).resumeNote;
    }
  }
  return true;
}

// Akses cepat
function normalizeLinkUrl(value) {
  let candidate = value.trim();
  if (!candidate) return null;
  const hasScheme = /^[a-z][a-z\d+.-]*:/i.test(candidate);
  const hostWithPort = /^[^/?#:\s]+:\d+(?:[/?#]|$)/.test(candidate);
  if (candidate.startsWith("//")) candidate = `https:${candidate}`;
  else if (!hasScheme || hostWithPort) candidate = `https://${candidate}`;
  const normalized = getValidUrl(candidate);
  if (!normalized || /[\s%]/.test(new URL(normalized).hostname)) return null;
  return normalized;
}

function findLinkMenu(linkId) {
  return [...quickLinks.querySelectorAll(".quick-link-menu")].find(
    (menu) => menu.dataset.linkId === linkId,
  );
}

function closeLinkMenus(except = null) {
  for (const menu of quickLinks.querySelectorAll(".quick-link-menu[open]")) {
    if (menu !== except) menu.open = false;
  }
}

function openLinkDialog(linkId = null, trigger = linkAddButton) {
  if (actionPending || document.querySelector("dialog[open]")) return;
  const link = state.links.find((item) => item.id === linkId);
  if (linkId !== null && !link) return;
  closeLinkMenus();
  editingLinkId = linkId;
  linkReturnFocus = trigger;
  linkForm.reset();
  clearLinkErrors();
  document.getElementById("link-dialog-heading").textContent = link
    ? "Edit link"
    : "Tambah link";
  linkLabelInput.value = link?.label ?? "";
  linkUrlInput.value = link?.url ?? "";
  linkDialog.showModal();
  document.body.classList.add("has-modal");
  linkLabelInput.focus({ preventScroll: true });
}

function clearLinkErrors() {
  linkFormError.textContent = "";
  for (const input of [linkLabelInput, linkUrlInput]) {
    input.removeAttribute("aria-invalid");
    document.getElementById(`${input.id}-error`).textContent = "";
  }
}

function handleLinkSave(event) {
  event.preventDefault();
  clearLinkErrors();
  const label = linkLabelInput.value.trim();
  const url = normalizeLinkUrl(linkUrlInput.value);
  if (!label || label.length > 50) {
    linkLabelInput.setAttribute("aria-invalid", "true");
    document.getElementById("link-label-error").textContent =
      "Nama link wajib diisi, maksimal 50 karakter.";
    linkLabelInput.focus();
    return;
  }
  if (!url) {
    linkUrlInput.setAttribute("aria-invalid", "true");
    document.getElementById("link-url-error").textContent =
      "Gunakan alamat situs dengan protokol http atau https.";
    linkUrlInput.focus();
    return;
  }
  const previous = state.links;
  const editing = editingLinkId !== null;
  state.links = editing
    ? previous.map((link) => {
        if (link.id !== editingLinkId) return link;
        return { ...link, label, url };
      })
    : [...previous, { id: crypto.randomUUID(), label, url }];
  if (!saveState()) {
    state.links = previous;
    linkFormError.textContent = "Link belum tersimpan. Coba lagi.";
    return;
  }
  renderLinks();
  linkDialog.close();
  showAppStatus(
    editing ? "Link berhasil diperbarui" : "Link berhasil ditambahkan",
    { autoDismiss: true, toast: true },
  );
}

async function deleteLink(linkId, trigger) {
  return runGuardedAction(async () => {
    const link = state.links.find((item) => item.id === linkId);
    if (!link || !(await askConfirmation(`Hapus link "${link.label}"?`))) {
      trigger?.focus({ preventScroll: true });
      return false;
    }
    const previous = state.links;
    state.links = previous.filter((item) => item.id !== linkId);
    if (!saveState()) {
      state.links = previous;
      trigger?.focus({ preventScroll: true });
      return false;
    }
    renderLinks();
    linkAddButton.focus({ preventScroll: true });
    showAppStatus("Link dihapus", { autoDismiss: true, toast: true });
    return true;
  });
}

function createLinkMenu(link) {
  const menu = document.createElement("details");
  menu.className = "quick-link-menu";
  menu.dataset.linkId = link.id;
  const trigger = document.createElement("summary");
  trigger.className = "button button-secondary icon-button";
  trigger.setAttribute("aria-label", `Menu link ${link.label}`);
  trigger.setAttribute("data-tooltip", "Opsi link");
  trigger.append(createIcon("more"));
  const actions = document.createElement("div");
  actions.className = "quick-link-actions";
  for (const action of ["Edit", "Hapus"]) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button button-secondary";
    button.textContent = action;
    button.setAttribute("aria-label", `${action} link ${link.label}`);
    button.addEventListener("click", () => {
      menu.open = false;
      if (action === "Edit") openLinkDialog(link.id, trigger);
      else deleteLink(link.id, trigger);
    });
    actions.append(button);
  }
  menu.append(trigger, actions);
  menu.addEventListener("toggle", () => {
    if (!menu.open) return;
    closeLinkMenus(menu);
    menu.dataset.side = "bottom";
    const viewportTop = window.visualViewport?.offsetTop ?? 0;
    const viewportBottom =
      viewportTop + (window.visualViewport?.height ?? window.innerHeight);
    const navHeight = mobileLayout.matches
      ? document.querySelector(".sidebar-nav").getBoundingClientRect().height
      : 0;
    const safeBottom = viewportBottom - navHeight - 12;
    const triggerRect = trigger.getBoundingClientRect();
    const availableBelow = safeBottom - triggerRect.bottom - 8;
    const availableAbove = triggerRect.top - viewportTop - 20;
    const height = actions.getBoundingClientRect().height;
    if (availableBelow < height && availableAbove > availableBelow)
      menu.dataset.side = "top";
    actions.style.maxHeight = `${Math.max(44, menu.dataset.side === "top" ? availableAbove : availableBelow)}px`;
  });
  return menu;
}

// Tampilan tugas dan link
function createTaskCard(task) {
  const card = document.createElement("li");
  card.className = "task-card";
  card.dataset.taskId = task.id;
  const selected = state.selectedTaskId === task.id;
  card.classList.toggle("is-completed", isTaskCompleted(task));
  card.classList.toggle("is-selected", selected);

  const marker = document.createElement("div");
  marker.className = "task-priority";
  marker.setAttribute("aria-hidden", "true");
  const symbol = document.createElement("span");
  symbol.className = "task-priority-symbol";
  symbol.textContent = PRIORITIES[task.priority].symbol;
  const code = document.createElement("span");
  code.className = "task-priority-label";
  code.textContent = PRIORITIES[task.priority].code;
  marker.append(symbol, code);

  const taskBody = document.createElement("div");
  taskBody.className = "task-body";
  const titleRow = document.createElement("div");
  titleRow.className = "task-title-row";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.id = `task-checkbox-${task.id}`;
  checkbox.checked = isTaskCompleted(task);
  checkbox.setAttribute(
    "aria-label",
    `${isTaskCompleted(task) ? "Buka kembali" : "Tandai selesai"}: ${task.title}`,
  );
  checkbox.addEventListener("change", async () => {
    const changed = await setTaskCompleted(task.id, checkbox.checked);
    if (!changed) {
      checkbox.checked = isTaskCompleted(task);
    } else {
      focusTaskCheckbox(task.id);
    }
  });
  const detailButton = document.createElement("button");
  detailButton.type = "button";
  detailButton.className = "task-select";
  detailButton.setAttribute("aria-pressed", String(selected));
  detailButton.setAttribute("aria-label", `Lihat detail: ${task.title}`);
  const title = document.createElement("span");
  title.className = "task-title";
  title.textContent = task.title;
  detailButton.append(title);
  detailButton.addEventListener("click", () => selectTask(task.id));
  const checkboxTarget = document.createElement("label");
  checkboxTarget.className = "task-checkbox-target";
  checkboxTarget.htmlFor = checkbox.id;
  checkboxTarget.append(checkbox);
  titleRow.append(checkboxTarget, detailButton);

  const badges = document.createElement("div");
  badges.className = "task-badges";
  const status = document.createElement("span");
  status.className = "status-badge";
  status.textContent = TASK_STATUSES[task.status].label;
  status.dataset.status = task.status;
  badges.append(status);
  const selection = document.createElement("span");
  selection.className = "selection-marker";
  selection.textContent = "Dipilih";
  selection.setAttribute("aria-hidden", String(!selected));
  badges.append(selection);
  const priority = document.createElement("p");
  priority.className = "task-meta";
  priority.textContent = `Prioritas ${PRIORITIES[task.priority].label.toLowerCase()}`;
  const preview = document.createElement(
    task.resumeNote.trim() ? "button" : "p",
  );
  preview.className = "note-preview";
  preview.textContent = task.resumeNote.trim() || "Belum ada catatan progres.";
  if (preview.tagName === "BUTTON") {
    preview.type = "button";
    preview.setAttribute("aria-label", `Baca catatan progres: ${task.title}`);
    preview.addEventListener("click", () => selectTask(task.id));
  }
  const actions = document.createElement("div");
  actions.className = "task-actions";
  if (!isTaskCompleted(task)) {
    const focus = document.createElement("button");
    focus.type = "button";
    focus.className = "button button-primary";
    focus.textContent = getFocusLabel(task);
    focus.addEventListener("click", () => beginFocus(task.id));
    actions.append(focus);
  }
  const edit = createIconButton("edit", "Edit tugas", () =>
    openEditTask(task.id),
  );
  const remove = createIconButton(
    "trash",
    "Hapus tugas",
    () => deleteTask(task.id),
    true,
  );
  actions.append(edit, remove);
  taskBody.append(titleRow, badges, priority, preview, actions);
  card.append(marker, taskBody);
  card.addEventListener("click", (event) => {
    if (!event.target.closest("button, input, select, textarea, a, label")) {
      detailButton.click();
    }
  });
  return card;
}

function renderTasks() {
  const fragment = document.createDocumentFragment();
  for (const task of getSortedTasks()) {
    fragment.append(createTaskCard(task));
  }
  taskList.replaceChildren(fragment);
  const counts = { not_started: 0, in_progress: 0, completed: 0 };
  for (const task of state.tasks) {
    counts[task.status]++;
  }
  taskCount.textContent = `${counts.completed} dari ${state.tasks.length} selesai`;
  notStartedCount.textContent = counts.not_started;
  inProgressCount.textContent = counts.in_progress;
  completedTaskCount.textContent = counts.completed;
  tasksEmpty.hidden = state.tasks.length > 0;
  renderSuggestion();
  renderFocusTask();
  renderTaskDetail();
  renderProgressEditor();
}

function renderSuggestion() {
  const suggestedTask = getSuggestedTask();

  suggestionCard.classList.toggle("is-empty", !suggestedTask);

  if (!suggestedTask) {
    suggestionHeading.textContent =
      state.tasks.length === 0
        ? "Mulai dari tugas pertamamu"
        : "Semua tugas sudah tuntas.";

    suggestionReason.textContent =
      state.tasks.length === 0
        ? "Tambahkan tugas untuk mendapatkan saran berdasarkan prioritas."
        : "Tambahkan tugas baru saat kamu membutuhkannya.";

    suggestionButton.hidden = true;
    updateSuggestionShape();
    return;
  }

  const priority = PRIORITIES[suggestedTask.priority];

  suggestionHeading.textContent = suggestedTask.title;

  suggestionReason.textContent = `Prioritas ${priority.label.toLowerCase()} · Tugas terlama pada prioritas ini`;

  suggestionButton.hidden = false;

  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";

  suggestionButton.replaceChildren(
    document.createTextNode(`${getFocusLabel(suggestedTask)} `),
    arrow,
  );

  suggestionButton.removeAttribute("aria-pressed");
  updateSuggestionShape();
}

function renderFocusTask() {
  const task = findTask(state.timer.taskId);
  activeTaskName.textContent = task
    ? task.title
    : "Timer mandiri ? belum ada tugas terhubung";
  focusTaskPrompt.hidden = Boolean(task);
  focusTaskStatus.hidden = !task;
  focusTaskActions.hidden = !task;
  focusTaskStatus.textContent = task ? TASK_STATUSES[task.status].label : "";
  focusTaskStatus.dataset.status = task?.status ?? "";
  renderTimer();
}

function renderTaskDetail() {
  detailValidation.textContent = "";
  const task = findTask(state.selectedTaskId);
  taskDetail.hidden = !detailOpen;
  tasksWorkspace.classList.toggle("has-detail", detailOpen);
  detailEmpty.hidden = Boolean(task);
  detailContent.hidden = !task;
  syncDetailLayout();
  if (!task) {
    return;
  }
  detailTitle.textContent = task.title;
  detailPriority.textContent = `Prioritas ${PRIORITIES[task.priority].label.toLowerCase()}`;
  detailStatus.value = task.status;
  detailStatus.disabled = isTaskCompleted(task);
  detailFocus.hidden = isTaskCompleted(task);
  detailFocus.textContent = getFocusLabel(task);
  detailComplete.textContent = isTaskCompleted(task)
    ? "Buka kembali"
    : "Tandai selesai";
  if (state.timer.taskId === task.id && hasFocusSession()) {
    detailSession.textContent =
      state.timer.status === "running"
        ? "Sesi fokus tugas ini sedang berjalan."
        : "Sesi fokus tugas ini sedang dijeda.";
  } else if (hasFocusSession()) {
    const focusTask = findTask(state.timer.taskId);
    const sessionState =
      state.timer.status === "running" ? "berjalan" : "dijeda";
    detailSession.textContent = focusTask
      ? `Sesi fokus "${focusTask.title}" tetap ${sessionState}.`
      : `Timer mandiri tetap ${sessionState}.`;
  } else {
    detailSession.textContent = "";
  }
}

// Layout dan detail responsif
function closeTaskDetail() {
  captureNoteDraft();
  detailOpen = false;
  syncDetailLayout();
  renderTaskDetail();
  const trigger = taskList.querySelector(".is-selected .task-select");
  (trigger || taskTitleInput).focus({ preventScroll: true });
  (trigger || taskTitleInput).scrollIntoView({ block: "nearest" });
}

function syncDetailLayout() {
  const compact = compactDetailLayout.matches;
  const shouldOpen =
    compact &&
    detailOpen &&
    Boolean(findTask(state.selectedTaskId)) &&
    location.hash === "#tugas" &&
    !pendingChoice &&
    editingTaskId === null &&
    !nameDialog.open &&
    !linkDialog.open &&
    !guideSession;
  const focused = taskDetail.contains(document.activeElement)
    ? document.activeElement
    : null;
  if (detailDialog.open && !shouldOpen) detailDialog.close();
  const target = compact ? detailDialog : tasksWorkspace;
  if (taskDetail.parentElement !== target) {
    target.append(taskDetail);
    if (focused && !compact) focused.focus({ preventScroll: true });
  }
  taskDetail.hidden = !detailOpen;
  if (shouldOpen && !detailDialog.open) {
    detailDialog.showModal();
    (focused || detailHeading).focus({ preventScroll: true });
  }
  document.body.classList.toggle(
    "has-modal",
    Boolean(document.querySelector("dialog[open]:not(#guide-dialog)")),
  );
}

function syncResponsiveLayout() {
  const mobile = mobileLayout.matches;
  mobileHeader.hidden = !mobile;
  if (mobile && brandLink.parentElement !== mobileHeader) {
    mobileHeader.append(brandLink, document.getElementById("header-tools"));
  } else if (!mobile && brandLink.parentElement !== sidebar) {
    sidebar.prepend(brandLink);
    headerActions.append(document.getElementById("header-tools"));
  }
  syncDetailLayout();
  requestAnimationFrame(updateSuggestionShape);
}

function updateViewportSpace() {
  const viewport = window.visualViewport;
  const height = viewport?.height ?? window.innerHeight;
  const top = viewport?.offsetTop ?? 0;
  const bottom = Math.max(0, window.innerHeight - height - top);
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty("--viewport-height", `${height}px`);
  rootStyle.setProperty("--viewport-top", `${top}px`);
  rootStyle.setProperty("--viewport-bottom", `${bottom}px`);
}

function renderProgressEditor(route = location.hash.slice(1)) {
  captureNoteDraft();
  let taskId;
  let slot;
  if (route === "tugas" && detailOpen) {
    taskId = state.selectedTaskId;
    slot = detailNoteSlot;
  } else if (route === "fokus") {
    taskId = state.timer.taskId;
    slot = focusNoteSlot;
  } else {
    return;
  }
  const task = findTask(taskId);
  const nextId = task?.id ?? null;
  if (editorTaskId !== nextId) {
    editorTaskId = nextId;
    resumeNoteInput.value = task
      ? (noteDrafts.get(task.id) ?? task.resumeNote)
      : "";
    resumeStatus.textContent = noteDrafts.has(nextId)
      ? "Draft belum tersimpan."
      : "";
  }
  resumeNoteInput.disabled = !task;
  resumeSave.disabled = !task;
  if (resumeForm.parentElement !== slot) {
    slot.append(resumeForm);
  }
}

function renderTimer() {
  const remaining = getRemainingSeconds();
  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
  const messages = {
    idle: "Siap memulai sesi fokus.",
    running: "Sesi fokus berjalan.",
    paused: "Sesi dijeda. Start untuk melanjutkan.",
    finished: "Sesi selesai. Tugas tidak otomatis ditandai selesai.",
  };
  timerStatus.textContent = messages[state.timer.status];
  timerStart.disabled = state.timer.status === "running";
  timerStop.disabled = state.timer.status !== "running";
  const summary = `Durasi sesi ini: ${state.timer.durationSeconds / 60} menit. Preferensi sesi baru: ${state.focusMinutes} menit.`;
  if (durationSummary.textContent !== summary)
    durationSummary.textContent = summary;
}

const LINK_PLATFORMS = [
  { id: "github", domains: ["github.com"] },
  { id: "youtube", domains: ["youtube.com", "youtu.be"] },
  { id: "gitlab", domains: ["gitlab.com"] },
];

function getLinkPlatform(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (!["http:", "https:"].includes(parsed.protocol)) return null;
  const hostname = parsed.hostname.toLowerCase().replace(/\.$/, "");
  const platform = LINK_PLATFORMS.find(({ domains }) =>
    domains.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
    ),
  );
  return platform?.id ?? "generic";
}

function renderLinks() {
  const fragment = document.createDocumentFragment();
  for (const link of state.links) {
    const item = document.createElement("li");
    item.className = "quick-link-item";
    const anchor = document.createElement("a");
    anchor.className = "quick-link-anchor";
    const platform = getLinkPlatform(link.url);
    if (!platform) continue;
    anchor.dataset.platform = platform;
    const icon = document.createElement("span");
    icon.className = "quick-link-icon";
    icon.setAttribute("aria-hidden", "true");
    if (platform === "generic") icon.append(createIcon("links"));
    const label = document.createElement("span");
    label.className = "quick-link-label";
    label.textContent = link.label;
    anchor.append(icon, label);
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    item.append(anchor, createLinkMenu(link));
    fragment.append(item);
  }
  quickLinks.replaceChildren(fragment);
  linksEmpty.hidden = state.links.length > 0;
}

// Bentuk kartu saran
function updateSuggestionShape() {
  if (suggestionButton.hidden) {
    suggestionCard.style.removeProperty("--suggestion-shape");
    return;
  }

  const cardSize = suggestionCard.getBoundingClientRect();
  const buttonSize = suggestionButton.getBoundingClientRect();

  const width = cardSize.width;
  const height = cardSize.height;

  if (width === 0 || height === 0) {
    return;
  }

  // Ikuti tinggi tombol saat teks membesar.
  suggestionCard.style.setProperty("--action-height", `${buttonSize.height}px`);

  const gap = parseFloat(
    getComputedStyle(suggestionCard).getPropertyValue("--notch-gap"),
  );
  const outerRadius = parseFloat(
    getComputedStyle(suggestionCard).getPropertyValue("--radius-panel"),
  );
  const curve = 16;

  // Lekukan untuk tombol.
  const cutX = width - buttonSize.width - gap;
  const cutY = height - buttonSize.height - gap;

  // Gunakan bentuk utuh jika ruang lekukan tidak cukup.
  if (cutX < outerRadius + curve || cutY < outerRadius + curve) {
    suggestionCard.style.removeProperty("--suggestion-shape");
    return;
  }

  const path = [
    `M ${outerRadius} 0`,

    `H ${width - outerRadius}`,
    `Q ${width} 0 ${width} ${outerRadius}`,

    `V ${cutY - curve}`,
    `Q ${width} ${cutY} ${width - curve} ${cutY}`,

    `H ${cutX + curve}`,
    `Q ${cutX} ${cutY} ${cutX} ${cutY + curve}`,

    `V ${height - curve}`,
    `Q ${cutX} ${height} ${cutX - curve} ${height}`,

    `H ${outerRadius}`,
    `Q 0 ${height} 0 ${height - outerRadius}`,

    `V ${outerRadius}`,
    `Q 0 0 ${outerRadius} 0`,

    "Z",
  ].join(" ");

  suggestionCard.style.setProperty("--suggestion-shape", `path("${path}")`);
}

// Interaksi halaman
function bindEvents() {
  decorateIconButton(nameButton, "user", "Ubah nama");
  nameButton.addEventListener("click", openNameDialog);
  nameForm.addEventListener("submit", handleNameSave);
  document
    .getElementById("name-cancel")
    .addEventListener("click", () => nameDialog.close());
  nameDialog.addEventListener("close", () => {
    syncDetailLayout();
    nameButton.focus({ preventScroll: true });
  });
  nicknameInput.addEventListener("input", () => {
    nicknameInput.removeAttribute("aria-invalid");
    nameError.textContent = "";
  });
  durationForm.addEventListener("submit", handleDurationSave);
  durationPreset.addEventListener("change", () => {
    durationInput.value =
      durationPreset.value === "custom" ? "" : durationPreset.value;
    durationInput.removeAttribute("aria-invalid");
    durationError.textContent = "";
    if (durationPreset.value === "custom") durationInput.focus();
  });
  durationInput.addEventListener("input", () => {
    syncDurationPreset();
    durationInput.removeAttribute("aria-invalid");
    durationError.textContent = "";
  });
  for (const link of navigationLinks) {
    link.prepend(createIcon(link.dataset.icon));
    link.setAttribute("aria-label", link.textContent.trim());
    link.dataset.tooltip = link.textContent.trim();
  }
  mobileLayout.addEventListener("change", syncResponsiveLayout);
  compactDetailLayout.addEventListener("change", syncResponsiveLayout);
  window.addEventListener("resize", updateViewportSpace);
  window.visualViewport?.addEventListener("resize", updateViewportSpace);
  window.visualViewport?.addEventListener("scroll", updateViewportSpace);
  detailDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeTaskDetail();
  });
  detailDialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const controls = [
      ...detailDialog.querySelectorAll(
        "button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled)",
      ),
    ].filter((element) => element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls.at(-1);
    if (
      event.shiftKey &&
      (document.activeElement === first ||
        document.activeElement === detailHeading)
    ) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  focusDetail.addEventListener("click", async () => {
    if (await selectTask(state.timer.taskId)) {
      navigateToView("tugas");
    }
  });
  focusComplete.addEventListener("click", () =>
    setTaskCompleted(state.timer.taskId, true),
  );
  decorateIconButton(detailClose, "close", "Tutup detail tugas");
  decorateIconButton(detailEdit, "edit", "Edit tugas");
  decorateIconButton(detailDelete, "trash", "Hapus tugas");
  decorateIconButton(editTaskClose, "close", "Tutup editor tugas");
  decorateIconButton(choiceClose, "close", "Tutup konfirmasi");
  detailClose.addEventListener("click", closeTaskDetail);
  detailEdit.addEventListener("click", () =>
    openEditTask(state.selectedTaskId),
  );
  detailDelete.addEventListener("click", () =>
    deleteTask(state.selectedTaskId),
  );
  detailFocus.addEventListener("click", () => beginFocus(state.selectedTaskId));
  detailComplete.addEventListener("click", () => {
    const task = findTask(state.selectedTaskId);
    if (task) {
      setTaskCompleted(task.id, !isTaskCompleted(task));
    }
  });
  detailStatus.addEventListener("change", async () => {
    const changed = await setTaskStatus(
      state.selectedTaskId,
      detailStatus.value,
    );
    if (!changed) {
      renderTaskDetail();
    }
  });
  editTaskClose.addEventListener("click", () => editTaskDialog.close());
  choiceClose.addEventListener("click", () => finishChoice(false));
  window.addEventListener("hashchange", () => renderActiveView());
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (
      !link ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    const route = link.hash.slice(1);
    if ([...views].some((view) => view.dataset.view === route)) {
      event.preventDefault();
      navigateToView(route);
    }
  });
  themeButton.addEventListener("click", toggleTheme);
  systemTheme.addEventListener("change", () => {
    if (state.theme === null) {
      applyTheme(getPreferredTheme());
    }
  });
  taskForm.addEventListener("submit", handleAddTask);
  taskTitleInput.addEventListener("input", () => {
    taskFormError.textContent = "";
    taskTitleInput.removeAttribute("aria-invalid");
  });
  taskSort.addEventListener("change", renderTasks);
  suggestionButton.addEventListener("click", () => {
    const task = getSuggestedTask();
    if (task) {
      beginFocus(task.id);
    }
  });
  editTaskForm.addEventListener("submit", handleEditTask);
  editTaskCancel.addEventListener("click", () => editTaskDialog.close());
  editTaskDialog.addEventListener("close", () => {
    const previousTaskId = editingTaskId;
    editingTaskId = null;
    editTaskForm.reset();
    editTaskError.textContent = "";
    syncDetailLayout();
    if (detailDialog.open) detailEdit.focus();
    else focusTaskCheckbox(previousTaskId);
  });
  editTaskTitleInput.addEventListener("input", () => {
    editTaskError.textContent = "";
    editTaskTitleInput.removeAttribute("aria-invalid");
  });
  choiceDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    finishChoice(false);
  });
  timerStart.addEventListener("click", startTimer);
  timerStop.addEventListener("click", stopTimer);
  timerReset.addEventListener("click", resetTimer);
  resumeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveResumeNote();
  });
  resumeNoteInput.addEventListener("input", () => {
    resumeNoteInput.removeAttribute("aria-invalid");
    resumeStatus.textContent = hasResumeDraft() ? "Draft belum tersimpan." : "";
  });
  decorateIconButton(
    document.getElementById("link-dialog-close"),
    "close",
    "Tutup dialog link",
  );
  linkAddButton.addEventListener("click", (event) =>
    openLinkDialog(null, event.currentTarget),
  );
  document
    .getElementById("link-empty-add")
    .addEventListener("click", (event) =>
      openLinkDialog(null, event.currentTarget),
    );
  linkForm.addEventListener("submit", handleLinkSave);
  linkForm.addEventListener("input", clearLinkErrors);
  for (const id of ["link-cancel", "link-dialog-close"]) {
    document
      .getElementById(id)
      .addEventListener("click", () => linkDialog.close());
  }
  linkDialog.addEventListener("close", () => {
    const trigger = linkReturnFocus;
    const replacement = findLinkMenu(editingLinkId)?.querySelector("summary");
    editingLinkId = null;
    linkReturnFocus = null;
    linkForm.reset();
    clearLinkErrors();
    syncDetailLayout();
    const focus =
      trigger?.isConnected && trigger.checkVisibility()
        ? trigger
        : replacement || linkAddButton;
    focus.focus({ preventScroll: true });
  });
  linkDialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const controls = [...linkDialog.querySelectorAll("button, input")].filter(
      (element) => !element.disabled,
    );
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  document.addEventListener("click", (event) => {
    for (const menu of quickLinks.querySelectorAll(".quick-link-menu[open]")) {
      if (!menu.contains(event.target)) menu.open = false;
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const menu = quickLinks.querySelector(".quick-link-menu[open]");
    if (menu) {
      event.preventDefault();
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
  window.addEventListener("resize", () => closeLinkMenus());
  document.addEventListener("visibilitychange", refreshTimer);
  window.addEventListener("beforeunload", (event) => {
    if (hasAnyResumeDraft()) {
      event.preventDefault();
      event.returnValue = "";
    }
  });
}

// Panduan
function initGuide() {
  const dialog = document.getElementById("guide-dialog");
  const panel = document.getElementById("guide-panel");
  const highlight = document.getElementById("guide-highlight");
  const heading = document.getElementById("guide-heading");
  const description = document.getElementById("guide-description");
  const counter = document.getElementById("guide-counter");
  const fallback = document.getElementById("guide-fallback");
  const back = document.getElementById("guide-back");
  const next = document.getElementById("guide-next");
  const help = document.getElementById("guide-open");
  const close = document.getElementById("guide-close");
  let frame = null;
  let scrollRequested = false;
  let focusRequested = false;
  let resizeObserver = null;
  decorateIconButton(help, "help", "Panduan");
  decorateIconButton(close, "close", "Tutup panduan");

  function getScrollParents(target) {
    const parents = [];
    for (
      let parent = target?.parentElement;
      parent && parent !== document.body;
      parent = parent.parentElement
    ) {
      const style = getComputedStyle(parent);
      if (
        /(auto|scroll|hidden|clip)/.test(
          `${style.overflowX} ${style.overflowY}`,
        )
      )
        parents.push(parent);
    }
    return parents;
  }

  function rememberScroll(element) {
    if (!guideSession.scrollPositions.has(element)) {
      guideSession.scrollPositions.set(element, {
        top: element.scrollTop,
        left: element.scrollLeft,
      });
    }
  }

  function getViewportBounds() {
    const viewport = window.visualViewport;
    const left = viewport?.offsetLeft ?? 0;
    const top = viewport?.offsetTop ?? 0;
    const width = viewport?.width ?? document.documentElement.clientWidth;
    const height = viewport?.height ?? window.innerHeight;
    const navHeight = mobileLayout.matches
      ? document.querySelector(".sidebar-nav").getBoundingClientRect().height
      : 0;
    return {
      left: left + 16,
      top: top + 16,
      right: left + width - 16,
      bottom: top + height - navHeight - 16,
    };
  }

  function getVisibleTargetRect(target, viewport) {
    const rect = target.getBoundingClientRect();
    const visible = {
      left: Math.max(viewport.left, rect.left - 5),
      top: Math.max(viewport.top, rect.top - 5),
      right: Math.min(viewport.right, rect.right + 5),
      bottom: Math.min(viewport.bottom, rect.bottom + 5),
    };
    for (const parent of getScrollParents(target)) {
      const bounds = parent.getBoundingClientRect();
      const style = getComputedStyle(parent);
      if (/(auto|scroll|hidden|clip)/.test(style.overflowX)) {
        visible.left = Math.max(visible.left, bounds.left + parent.clientLeft);
        visible.right = Math.min(
          visible.right,
          bounds.left + parent.clientLeft + parent.clientWidth,
        );
      }
      if (/(auto|scroll|hidden|clip)/.test(style.overflowY)) {
        visible.top = Math.max(visible.top, bounds.top + parent.clientTop);
        visible.bottom = Math.min(
          visible.bottom,
          bounds.top + parent.clientTop + parent.clientHeight,
        );
      }
    }
    return visible.right > visible.left && visible.bottom > visible.top
      ? visible
      : null;
  }

  function scrollToTarget(target, viewport) {
    let changed = false;
    for (const parent of getScrollParents(target)) {
      rememberScroll(parent);
      const bounds = parent.getBoundingClientRect();
      const rect = target.getBoundingClientRect();
      const top = bounds.top + parent.clientTop;
      const bottom = top + parent.clientHeight;
      const left = bounds.left + parent.clientLeft;
      const right = left + parent.clientWidth;
      let delta = 0;
      let deltaX = 0;
      if (rect.top < top) delta = rect.top - top;
      else if (rect.bottom > bottom)
        delta = Math.min(rect.bottom - bottom, rect.top - top);
      if (rect.left < left) deltaX = rect.left - left;
      else if (rect.right > right)
        deltaX = Math.min(rect.right - right, rect.left - left);
      const before = parent.scrollTop;
      const beforeX = parent.scrollLeft;
      parent.scrollBy({ top: delta, left: deltaX, behavior: "instant" });
      changed ||= parent.scrollTop !== before || parent.scrollLeft !== beforeX;
    }
    const rect = target.getBoundingClientRect();
    let delta = 0;
    if (rect.top < viewport.top) delta = rect.top - viewport.top;
    else if (rect.bottom > viewport.bottom)
      delta = Math.min(rect.bottom - viewport.bottom, rect.top - viewport.top);
    const before = window.scrollY;
    window.scrollBy({ top: delta, behavior: "instant" });
    return changed || window.scrollY !== before;
  }

  function findPlacement(rect, viewport, allowCompact = false) {
    const size = panel.getBoundingClientRect();
    const width = size.width;
    const height = size.height;
    const gap = 16;
    const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
    const content = document.getElementById("guide-content");
    const minimumHeight =
      height - content.clientHeight + Math.min(40, content.scrollHeight);
    const candidates = {
      right: {
        x: rect.right + gap,
        y: clamp(rect.top, viewport.top, viewport.bottom - height),
        width: viewport.right - rect.right - gap,
        height: viewport.bottom - viewport.top,
      },
      left: {
        x: rect.left - gap - width,
        y: clamp(rect.top, viewport.top, viewport.bottom - height),
        width: rect.left - viewport.left - gap,
        height: viewport.bottom - viewport.top,
      },
      bottom: {
        x: clamp(rect.left, viewport.left, viewport.right - width),
        y: rect.bottom + gap,
        width: viewport.right - viewport.left,
        height: viewport.bottom - rect.bottom - gap,
      },
      top: {
        x: clamp(rect.left, viewport.left, viewport.right - width),
        y: rect.top - gap - height,
        width: viewport.right - viewport.left,
        height: rect.top - viewport.top - gap,
      },
    };
    const order = mobileLayout.matches
      ? ["bottom", "top", "right", "left"]
      : ["right", "left", "bottom", "top"];
    for (const side of order) {
      const candidate = candidates[side];
      if (
        candidate.width < width ||
        candidate.height < (allowCompact ? minimumHeight : height)
      )
        continue;
      if (allowCompact && candidate.height < height) {
        panel.style.maxHeight = `${candidate.height}px`;
        const compactHeight = panel.getBoundingClientRect().height;
        if (side === "top") candidate.y = rect.top - gap - compactHeight;
        else
          candidate.y = clamp(
            candidate.y,
            viewport.top,
            viewport.bottom - compactHeight,
          );
      }
      return { ...candidate, side };
    }
    return null;
  }

  function findGuideTarget(selector, step) {
    if (!selector || !step) return null;
    return (
      [...document.querySelectorAll(selector)].find((element) => {
        const view = element.closest(".app-view");
        return (
          element.checkVisibility() &&
          (!view || view.dataset.view === step.route)
        );
      }) ?? null
    );
  }

  function positionGuide(scrollTarget = false) {
    if (!guideSession) return true;
    const content = document.getElementById("guide-content");
    const contentScrollTop = content.scrollTop;
    const viewport = getViewportBounds();
    panel.style.width = `${Math.min(380, viewport.right - viewport.left)}px`;
    panel.style.maxHeight = `${Math.max(1, viewport.bottom - viewport.top)}px`;
    const step = GUIDE_STEPS[guideSession.step];
    let target = findGuideTarget(step?.target, step);
    const emptyTarget = findGuideTarget(step?.emptySelector, step);
    const fallbackTarget =
      !target && findGuideTarget(step?.fallbackTarget, step);
    target = emptyTarget || target || fallbackTarget;
    if (step)
      description.textContent =
        emptyTarget || fallbackTarget
          ? step.emptyDescription
          : step.description;
    if (step?.compactTarget && target?.checkVisibility()) {
      const available =
        viewport.bottom -
        viewport.top -
        panel.getBoundingClientRect().height -
        16;
      if (target.getBoundingClientRect().height > available)
        target = findGuideTarget(step.compactTarget, step) || target;
    }
    guideSession.target = target;
    const visible = target?.checkVisibility();
    fallback.hidden = !step || Boolean(visible);
    if (visible && scrollTarget && scrollToTarget(target, viewport))
      return false;
    let bounds = visible ? getVisibleTargetRect(target, viewport) : null;
    let placement =
      bounds &&
      (findPlacement(bounds, viewport) ||
        findPlacement(bounds, viewport, true));

    // Gulir hanya jika kartu panduan belum muat.
    if (visible && bounds && !placement && scrollTarget) {
      for (const edge of ["top", "bottom"]) {
        const rect = target.getBoundingClientRect();
        const delta =
          edge === "top"
            ? rect.top - viewport.top
            : rect.bottom - viewport.bottom;
        const before = window.scrollY;
        window.scrollBy({ top: delta, behavior: "instant" });
        bounds = getVisibleTargetRect(target, viewport);
        placement =
          bounds &&
          (findPlacement(bounds, viewport) ||
            findPlacement(bounds, viewport, true));
        if (placement && before !== window.scrollY) return false;
        if (placement) break;
      }
    }
    // Gunakan target ringkas jika ruang di sekitar panel tidak cukup.
    if (!placement && step?.compactTarget) {
      const compact = findGuideTarget(step.compactTarget, step);
      const compactBounds = compact && getVisibleTargetRect(compact, viewport);
      const compactPlacement =
        compactBounds &&
        (findPlacement(compactBounds, viewport) ||
          findPlacement(compactBounds, viewport, true));
      if (compactPlacement) {
        guideSession.target = compact;
        bounds = compactBounds;
        placement = compactPlacement;
      }
    }
    if (!placement) {
      fallback.hidden = !step;
      fallback.textContent = visible
        ? "Area ini berada di luar ruang yang terlihat. Gulir halaman atau lanjutkan panduan."
        : "Area ini belum tersedia. Kamu tetap dapat melanjutkan panduan.";
      const size = panel.getBoundingClientRect();
      placement = {
        x: viewport.left + (viewport.right - viewport.left - size.width) / 2,
        y: viewport.top + (viewport.bottom - viewport.top - size.height) / 2,
        side: "fallback",
      };
      bounds = null;
    }
    panel.style.left = `${placement.x}px`;
    panel.style.top = `${placement.y}px`;
    panel.dataset.side = placement.side;
    highlight.hidden = !bounds;
    dialog.dataset.target = String(Boolean(bounds));
    if (bounds) {
      Object.assign(highlight.style, {
        left: `${bounds.left}px`,
        top: `${bounds.top}px`,
        width: `${bounds.right - bounds.left}px`,
        height: `${bounds.bottom - bounds.top}px`,
      });
    }
    content.scrollTop = contentScrollTop;
    return true;
  }

  function forwardContainerScroll(event, deltaX, deltaY, x, y) {
    if (!guideSession || panel.contains(event.target)) return;
    for (const parent of getScrollParents(guideSession.target)) {
      const rect = parent.getBoundingClientRect();
      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom)
        continue;
      const style = getComputedStyle(parent);
      if (!/(auto|scroll)/.test(`${style.overflowX} ${style.overflowY}`))
        continue;
      rememberScroll(parent);
      const beforeX = parent.scrollLeft;
      const beforeY = parent.scrollTop;
      parent.scrollBy({ top: deltaY, left: deltaX, behavior: "instant" });
      if (parent.scrollTop !== beforeY || parent.scrollLeft !== beforeX) {
        if (event.cancelable) event.preventDefault();
        return;
      }
    }
  }

  function schedulePosition(scrollTarget = false, focusHeading = false) {
    if (!guideSession) return;
    const session = guideSession;
    const revision = session.revision;
    scrollRequested ||= scrollTarget;
    focusRequested ||= focusHeading;
    if (frame !== null) return;
    frame = requestAnimationFrame(() => {
      if (guideSession !== session || session.revision !== revision) return;
      frame = null;
      const shouldFocus = focusRequested;
      const shouldScroll = scrollRequested;
      focusRequested = false;
      scrollRequested = false;
      if (!positionGuide(shouldScroll)) {
        schedulePosition(shouldScroll, shouldFocus);
        return;
      }
      if (shouldFocus) heading.focus({ preventScroll: true });
      session.transitioning = false;
      next.disabled = false;
      back.disabled = session.step <= 0;
    });
  }

  function showStep(index) {
    if (!guideSession || index < -1 || index >= GUIDE_STEPS.length) return;
    cancelAnimationFrame(frame);
    frame = null;
    scrollRequested = false;
    focusRequested = false;
    guideSession.revision += 1;
    guideSession.transitioning = true;
    next.disabled = true;
    guideSession.step = index;
    dialog.dataset.step = GUIDE_STEPS[index]?.id ?? "welcome";
    const step = GUIDE_STEPS[index];
    dialog.dataset.mode = step ? "tour" : "welcome";
    heading.textContent = step?.title ?? "Selamat datang di Tuntas";
    description.textContent =
      step?.description ??
      `Kenali cara mengatur tugas dan melanjutkan pekerjaan dalam ${GUIDE_STEPS.length} langkah singkat.`;
    const note = document.getElementById("guide-note");
    note.hidden = !step?.note;
    note.textContent = step?.note ?? "";
    counter.hidden = !step;
    counter.textContent = step ? `${index + 1} dari ${GUIDE_STEPS.length}` : "";
    back.hidden = !step;
    back.disabled = true;
    if (!step) next.textContent = "Mulai panduan";
    else if (index === GUIDE_STEPS.length - 1) next.textContent = "Selesai";
    else next.textContent = "Berikutnya";
    document.getElementById("guide-content").scrollTop = 0;
    highlight.hidden = true;
    const route = step?.route ?? "beranda";
    if (location.hash !== `#${route}`) {
      history.replaceState(history.state, "", `#${route}`);
      renderActiveView(false);
    }
    resizeObserver.disconnect();
    resizeObserver.observe(panel);
    resizeObserver.observe(sidebar);
    resizeObserver.observe(document.querySelector(".sidebar-nav"));
    resizeObserver.observe(document.querySelector(".app-shell"));
    const target =
      findGuideTarget(step?.target, step) ||
      findGuideTarget(step?.fallbackTarget, step);
    if (target) resizeObserver.observe(target);
    for (const parent of getScrollParents(target))
      resizeObserver.observe(parent);
    const compactTarget = findGuideTarget(step?.compactTarget, step);
    if (compactTarget) resizeObserver.observe(compactTarget);
    // Ukur setelah tampilan dan editor selesai dipindahkan.
    schedulePosition(true, true);
  }

  function finishGuide(status, restoreRoute = true) {
    if (!guideSession) return;
    const previous = guideSession;
    guideSession = null;
    previous.controller.abort();
    resizeObserver.disconnect();
    cancelAnimationFrame(frame);
    frame = null;
    scrollRequested = false;
    focusRequested = false;
    dialog.close();
    document.querySelector(".app-shell").inert = previous.inert;
    if (restoreRoute) history.replaceState(history.state, "", previous.url);
    renderActiveView(false);
    syncDetailLayout();
    const focus = previous.focus;
    const activeDialog = document.querySelector("dialog[open]");
    if (restoreRoute) {
      for (const [element, position] of previous.scrollPositions) {
        if (element.isConnected)
          element.scrollTo({ ...position, behavior: "instant" });
      }
      if (
        focus?.isConnected &&
        focus !== document.body &&
        focus.checkVisibility() &&
        !focus.disabled &&
        (!activeDialog || activeDialog.contains(focus))
      ) {
        focus.focus({ preventScroll: true });
      } else if (!activeDialog) {
        document
          .querySelector(".app-view:not([hidden]) h2")
          .focus({ preventScroll: true });
      }
      window.scrollTo({
        top: previous.scrollY,
        left: previous.scrollX,
        behavior: "instant",
      });
    } else if (!activeDialog) {
      help.focus({ preventScroll: true });
    }
    try {
      // Status panduan disimpan terpisah dari data aplikasi.
      localStorage.setItem(
        ONBOARDING_KEY,
        JSON.stringify({ status, version: 1 }),
      );
    } catch {
      showAppStatus(
        "Panduan ditutup. Pilihan panduan belum tersimpan di browser ini; sambutan dapat muncul lagi setelah halaman dimuat ulang.",
        { kind: "error" },
      );
    }
  }

  function openGuide(welcome = false) {
    if (guideSession || document.querySelector("dialog[open]") || actionPending)
      return;
    guideSession = {
      step: -1,
      revision: 0,
      transitioning: true,
      url: location.href,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      focus: document.activeElement,
      controller: new AbortController(),
      inert: document.querySelector(".app-shell").inert,
      scrollPositions: new Map(),
      target: null,
    };
    for (const element of document.querySelectorAll(
      ".app-shell, .app-shell *",
    )) {
      if (element.scrollTop || element.scrollLeft) rememberScroll(element);
    }
    const { signal } = guideSession.controller;
    document.querySelector(".app-shell").inert = true;
    // Batasi interaksi latar tanpa mengunci scroll.
    dialog.show();
    resizeObserver = new ResizeObserver(() => schedulePosition());
    window.addEventListener("resize", () => schedulePosition(true), { signal });
    document.addEventListener(
      "scroll",
      (event) => {
        if (!panel.contains(event.target)) schedulePosition();
      },
      { capture: true, passive: true, signal },
    );
    document.addEventListener(
      "wheel",
      (event) => {
        const unit =
          event.deltaMode === 1
            ? 16
            : event.deltaMode === 2
              ? window.innerHeight
              : 1;
        forwardContainerScroll(
          event,
          event.deltaX * unit,
          event.deltaY * unit,
          event.clientX,
          event.clientY,
        );
      },
      { passive: false, signal },
    );
    let lastTouch = null;
    document.addEventListener(
      "touchstart",
      (event) => {
        lastTouch = event.touches.length === 1 ? event.touches[0] : null;
      },
      { passive: true, signal },
    );
    document.addEventListener(
      "touchmove",
      (event) => {
        const touch = event.touches.length === 1 ? event.touches[0] : null;
        if (touch && lastTouch)
          forwardContainerScroll(
            event,
            lastTouch.clientX - touch.clientX,
            lastTouch.clientY - touch.clientY,
            touch.clientX,
            touch.clientY,
          );
        lastTouch = touch;
      },
      { passive: false, signal },
    );
    document.addEventListener(
      "focusin",
      (event) => {
        if (!panel.contains(event.target))
          heading.focus({ preventScroll: true });
      },
      { signal },
    );
    window.visualViewport?.addEventListener(
      "resize",
      () => schedulePosition(true),
      { signal },
    );
    window.visualViewport?.addEventListener(
      "scroll",
      () => schedulePosition(),
      { signal },
    );
    window.addEventListener("popstate", () => finishGuide("skipped", false), {
      signal,
    });
    showStep(welcome ? -1 : 0);
  }

  help.addEventListener("click", () => openGuide());
  close.addEventListener("click", () => finishGuide("skipped"));
  document
    .getElementById("guide-skip")
    .addEventListener("click", () => finishGuide("skipped"));
  back.addEventListener("click", () => {
    if (!guideSession || guideSession.transitioning || guideSession.step <= 0)
      return;
    showStep(guideSession.step - 1);
  });
  next.addEventListener("click", () => {
    if (!guideSession || guideSession.transitioning) return;
    if (guideSession.step === GUIDE_STEPS.length - 1)
      finishGuide("completed", false);
    else showStep(guideSession.step + 1);
  });
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    finishGuide("skipped");
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      finishGuide("skipped");
      return;
    }
    if (event.key !== "Tab") return;
    const controls = [
      ...panel.querySelectorAll("button:not([disabled])"),
    ].filter((button) => !button.hidden);
    const first = controls[0];
    const last = controls.at(-1);
    if (
      event.shiftKey &&
      (document.activeElement === first || document.activeElement === heading)
    ) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  let alreadyHandled = false;
  try {
    const saved = JSON.parse(localStorage.getItem(ONBOARDING_KEY));
    alreadyHandled = ["completed", "skipped"].includes(saved?.status);
  } catch {
    // Panduan tetap dapat dipakai jika penyimpanan gagal.
  }
  if (!alreadyHandled && !appStatusElement.textContent && !pendingMigration)
    openGuide(true);
}

// Inisialisasi
function initApp() {
  collectElements();
  decorateSelects();
  state = loadState();
  applyTheme(getPreferredTheme());
  if (pendingMigration) {
    saveWithFeedback(
      "Data lokal diperbarui untuk personalisasi dan durasi sesi. Tugas, catatan, dan waktu sesi lama dipertahankan.",
      { autoDismiss: false },
    );
  }
  bindEvents();
  renderTasks();
  renderLinks();
  updateClock();
  renderDurationSettings();
  refreshTimer();
  renderActiveView(false);
  syncResponsiveLayout();
  updateViewportSpace();
  initGuide();
  const suggestionResizeObserver = new ResizeObserver(updateSuggestionShape);
  suggestionResizeObserver.observe(suggestionCard);
  suggestionResizeObserver.observe(suggestionButton);

  // Hitung sisa waktu dari endAt, bukan jumlah tick.
  setInterval(() => {
    updateClock();
    refreshTimer();
  }, 1000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp, { once: true });
} else {
  initApp();
}
