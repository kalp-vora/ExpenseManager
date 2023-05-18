const Tables = {
  CREATE_USER_TABLE:
    "CREATE TABLE IF NOT EXISTS users (" +
    "user_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "firstName TEXT NOT NULL, " +
    "lastName TEXT NOT NULL, " +
    "contact TEXT NOT NULL UNIQUE, " +
    "email TEXT NOT NULL UNIQUE, " +
    "password TEXT NOT NULL" +
    ");",
  INSERT_USER_TABLE:
    "INSERT INTO users (firstName, lastName, contactNumber, email, password) VALUES (?, ?, ?, ?, ?)",
};

export default Tables;
