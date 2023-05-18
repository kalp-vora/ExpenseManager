import SQLite from "react-native-sqlite-storage";
import Tables from "./tables";

const DATABASE_NAME = "expense-manager.db";

const DbHelper = {
  init: () => {
    // Initialize the database
    console.log("Database initialising...");
    return new Promise((resolve, reject) => {
      // Open a connection to the database
      const db = SQLite.openDatabase(
        {
          name: DATABASE_NAME,
          location: "default",
        },
        () => {
          console.log("Database connection opened.");
          resolve(db);
        },
        (error) => {
          console.error("Error opening database connection: ", error);
          reject(error);
        }
      );
    });
  },
  createUserTable: (db) => {
    // Create the user table
    console.log("Creating user table...");
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            Tables.CREATE_USER_TABLE,
            [],
            () => {
              console.log("User table created.");
              resolve();
            },
            (error) => {
              console.error("Error creating user table: ", error);
              reject(error);
            }
          );
        },
        (error) => {
          console.error("Transaction error: ", error);
          reject(error);
        }
      );
    });
  },
  close: (db) => {
    // Close the database
    console.log("Closing database...");
    return new Promise((resolve, reject) => {
      db.close(
        () => {
          console.log("Database connection closed.");
          resolve();
        },
        (error) => {
          console.error("Error closing database connection: ", error);
          reject(error);
        }
      );
    });
  },
};

export default DbHelper;
