const dbQueries = {
  CREATE_USER_TABLE:
    "CREATE TABLE IF NOT EXISTS users (" +
    "user_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "first_name TEXT NOT NULL, " +
    "last_name TEXT NOT NULL, " +
    "contact TEXT NOT NULL UNIQUE, " +
    "email TEXT NOT NULL UNIQUE, " +
    "password TEXT NOT NULL" +
    ");",
  INSERT_USER_TABLE:
    "INSERT INTO users (first_name, last_name, contact, email, password) VALUES (?, ?, ?, ?, ?)",
};

export default dbQueries;
