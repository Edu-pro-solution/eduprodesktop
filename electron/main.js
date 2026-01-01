const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");

let db;
let mainWindow; // ✅ GLOBAL WINDOW REFERENCE

// Disable GPU to avoid macOS rendering issues
// app.commandLine.appendSwitch("disable-gpu");
// app.commandLine.appendSwitch("disable-software-rasterizer");

/* =========================
   CREATE WINDOW
========================= */
function createWindow() {
  if (mainWindow) return;

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: true, // ✅ IMPORTANT
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // ✅ LOAD YOUR LIVE WEB APP
  mainWindow.loadURL("https://cbt.edupro.com.ng");

  // ✅ SHOW WINDOW ONLY WHEN READY
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // ✅ DEBUG (you can remove later)
  mainWindow.webContents.openDevTools();

  // ✅ HANDLE FAILURES
  mainWindow.webContents.on("did-fail-load", (_e, code, desc) => {
    console.error("PAGE FAILED TO LOAD:", code, desc);
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
/* =========================
   DATABASE INIT
========================= */
// function initDatabase() {
//   const dbPath = path.join(__dirname, "app.db");
//   db = new Database(dbPath);

//   db.prepare(`
//     CREATE TABLE IF NOT EXISTS users (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       fullname TEXT,
//       username TEXT,
//       email TEXT UNIQUE,
//       phone TEXT,
//       password TEXT,
//       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     )
//   `).run();

//   db.prepare(`
//   CREATE TABLE IF NOT EXISTS activation (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     license_key TEXT,
//     is_active INTEGER DEFAULT 0,
//     activated_at DATETIME
//   )
// `).run();
// db.prepare(`
//   CREATE TABLE IF NOT EXISTS license_keys (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     license_key TEXT UNIQUE,
//     is_used INTEGER DEFAULT 0,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//     used_at DATETIME
//   )
// `).run();

// }
function initDatabase() {
  const userDataPath = app.getPath("userData");
  const dbPath = path.join(userDataPath, "app.db");

  db = new Database(dbPath);

  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullname TEXT,
      username TEXT,
      email TEXT UNIQUE,
      phone TEXT,
      password TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS activation (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      license_key TEXT,
      is_active INTEGER DEFAULT 0,
      activated_at DATETIME
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS license_keys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      license_key TEXT UNIQUE,
      is_used INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      used_at DATETIME
    )
  `).run();
}

/* =========================
   IPC: AUTH
========================= */
ipcMain.handle("auth:register", async (_event, payload) => {
  const { fullname, phone, username, email, password } = payload;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.prepare(`
      INSERT INTO users (fullname, phone, username, email, password)
      VALUES (?, ?, ?, ?, ?)
    `).run(fullname, phone, username, email, hashedPassword);

    return { status: 201, user: { fullname, username, email, phone } };
  } catch (err) {
    if (err.message.includes("UNIQUE")) {
      return { status: 409, message: "Email already exists" };
    }
    return { status: 500, message: "Registration failed" };
  }
});
function generateLicenseKey() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const block = () =>
    Array.from({ length: 4 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");

  return `OGAPOS-${block()}-${block()}-${block()}`;
}
ipcMain.handle("admin:generate-license", () => {
  const key = generateLicenseKey();

  try {
    db.prepare(`
      INSERT INTO license_keys (license_key)
      VALUES (?)
    `).run(key);

    return { status: 200, licenseKey: key };
  } catch (err) {
    return { status: 500, message: "Failed to generate key" };
  }
});

/* =========================
   IPC: EXAM SUBJECTS
========================= */
const SUBJECT_DIR = path.join(__dirname, "subject");

ipcMain.handle("get-subjects", async () => {
  if (!fs.existsSync(SUBJECT_DIR)) return [];
  return fs
    .readdirSync(SUBJECT_DIR)
    .filter((name) => fs.statSync(path.join(SUBJECT_DIR, name)).isDirectory());
});

ipcMain.handle("get-subject-topics", async (_event, subject) => {
  const topicsPath = path.join(SUBJECT_DIR, subject, "Topics.json");
  if (!fs.existsSync(topicsPath)) return [];
  const data = JSON.parse(fs.readFileSync(topicsPath, "utf-8"));
  return data.map((topic) => topic.Name);
});

ipcMain.handle("get-questions-for-subject", async (_event, subject, selectedTopics = [], limit = 50) => {
  const topicsPath = path.join(SUBJECT_DIR, subject, "Topics.json");
  if (!fs.existsSync(topicsPath)) return [];

  const topicsData = JSON.parse(fs.readFileSync(topicsPath, "utf-8"));
  let allQuestions = [];

  for (const topic of topicsData) {
    if (selectedTopics.length && !selectedTopics.includes(topic.Name)) continue;

    for (const qRef of topic.Questions) {
      const yearFile = path.join(SUBJECT_DIR, subject, `${qRef.Year}.json`);
      if (!fs.existsSync(yearFile)) continue;

      const yearData = JSON.parse(fs.readFileSync(yearFile, "utf-8"));
      const questionKey = `Question ${qRef.Number}`;
      const question = yearData[questionKey];

      if (question) {
        allQuestions.push({
          ...question,
          Topic: topic.Name,
          Year: qRef.Year,
        });
      }
    }
  }

  allQuestions.sort(() => Math.random() - 0.5);
  return allQuestions.slice(0, limit);
});
// ipcMain.handle("api:activate", async (_event, payload) => {
//   const { licenseKey } = payload;

//   try {
//     if (!licenseKey) {
//       return { status: 400, message: "License key is required" };
//     }

//     // 🔐 Example validation (replace with real logic later)
//     const VALID_KEY = "OGAPOS-2025-ACTIVE";

//     if (licenseKey !== VALID_KEY) {
//       return { status: 401, message: "Invalid license key" };
//     }

//     // Save activation
//     db.prepare(`
//       INSERT INTO activation (license_key, is_active, activated_at)
//       VALUES (?, 1, CURRENT_TIMESTAMP)
//     `).run(licenseKey);

//     return {
//       status: 200,
//       message: "Application activated successfully",
//     };
//   } catch (err) {
//     return {
//       status: 500,
//       message: "Activation failed",
//     };
//   }
// });
ipcMain.handle("api:activate", async (_event, payload) => {
  const { licenseKey } = payload;

  if (!licenseKey) {
    return { status: 400, message: "License key is required" };
  }

  // 1️⃣ Check if key exists and unused
  const row = db.prepare(`
    SELECT * FROM license_keys
    WHERE license_key = ? AND is_used = 0
  `).get(licenseKey);

  if (!row) {
    return { status: 401, message: "Invalid or already used license key" };
  }

  // 2️⃣ Activate app
  db.prepare(`
    INSERT INTO activation (license_key, is_active, activated_at)
    VALUES (?, 1, CURRENT_TIMESTAMP)
  `).run(licenseKey);

  // 3️⃣ Mark key as used
  db.prepare(`
    UPDATE license_keys
    SET is_used = 1, used_at = CURRENT_TIMESTAMP
    WHERE license_key = ?
  `).run(licenseKey);

  return {
    status: 200,
    message: "Application activated successfully",
  };
});

/* =========================
   IPC: STUDY MATERIAL
========================= */
const STUDY_DIR = path.join(__dirname, "study");

ipcMain.handle("study:get-subjects", async () => {
  if (!fs.existsSync(STUDY_DIR)) return [];
  return fs
    .readdirSync(STUDY_DIR)
    .filter((name) => fs.statSync(path.join(STUDY_DIR, name)).isDirectory());
});

ipcMain.handle("study:get-topics", async (_event, subject) => {
  const subjectPath = path.join(STUDY_DIR, subject);
  if (!fs.existsSync(subjectPath)) return [];
  return fs.readdirSync(subjectPath).filter((file) => file.endsWith(".html"));
});

ipcMain.handle("study:get-content", async (_event, { subject, topic }) => {
  const filePath = path.join(STUDY_DIR, subject, topic);
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf-8");
});

/* =========================
   APP LIFECYCLE
========================= */
app.whenReady().then(() => {
  initDatabase();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
