const db = require("./database");
const bcrypt = require("bcryptjs");

function registerUser(data) {
  const { fullname, username, email, phone, password } = data;

  const existingUser = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(email);

  if (existingUser) {
    return { status: 409, message: "User already exists" };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.prepare(`
    INSERT INTO users (fullname, username, email, phone, password)
    VALUES (?, ?, ?, ?, ?)
  `).run(fullname, username, email, phone, hashedPassword);

  // Mark app as activated
  db.prepare(`
    INSERT OR REPLACE INTO app_state (key, value)
    VALUES ('activated', 'true')
  `).run();

  return { status: 201, message: "Registration successful" };
}

function isActivated() {
  const row = db
    .prepare("SELECT value FROM app_state WHERE key = 'activated'")
    .get();

  return row?.value === "true";
}

module.exports = {
  registerUser,
  isActivated,
};
