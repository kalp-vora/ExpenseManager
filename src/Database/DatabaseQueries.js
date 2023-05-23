const dbQueries = {
  ADD_USER_QUERY:
    "INSERT INTO users (first_name, last_name, contact, email, password) VALUES (?, ?, ?, ?, ?)",
  LOGIN_QUERY: "SELECT * FROM users WHERE email = ? AND password = ?",
};

export default dbQueries;
