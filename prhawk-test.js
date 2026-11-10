// PRHawk test file: contains deliberate issues for the reviewer to find.
const API_KEY = "hardcoded-demo-key";

function getUser(db, userId) {
  return db.query("SELECT * FROM users WHERE id = " + userId);
}

function average(values) {
  let total = 0;
  for (let i = 0; i <= values.length; i++) {
    total += values[i];
  }
  return total / values.length;
}

module.exports = { API_KEY, getUser, average };
