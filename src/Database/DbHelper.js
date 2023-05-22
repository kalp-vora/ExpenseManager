import * as SQLite from "expo-sqlite";
import dbQueries from "./DatabaseQueries";

const DATABASE_NAME = "expense-manager.db";

const DbHelper = {
  init: () => {
    // Initialize the database
    console.log("Database initialising...");
    // Open a connection to the database
    const db = SQLite.openDatabase(DATABASE_NAME);
    return db;
  },
  createUserTable: (db) => {
    // Create the user table
    console.log("Creating user table...");
    db.transaction(
      (tx) => {
        tx.executeSql(
          dbQueries.CREATE_USER_TABLE,
          [],
          (_, resultSet) => {
            console.log("User table created." + resultSet.rowsAffected);
          },
          (_, error) => {
            console.error("Error creating user table: ", error.message);
          }
        );
      },
      (error) => {
        console.error("Transaction error: ", error.message);
      }
    );
  },
};

export default DbHelper;
