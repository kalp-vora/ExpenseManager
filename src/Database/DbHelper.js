import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

const DATABASE_NAME = "expense-manager.db";

const DbHelper = {
  init: async () => {
    // Initialize the database connection
    console.log("Database connection initialising...");

    // Check if the database file exists in the document directory
    const databasePath = `${FileSystem.documentDirectory}SQLite/${DATABASE_NAME}`;
    const fileInfo = await FileSystem.getInfoAsync(databasePath);

    // If the file doesn't exist, copy it from the assets folder
    if (!fileInfo.exists) {
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}SQLite`,
        {
          intermediates: true,
        }
      );
      await FileSystem.downloadAsync(
        Asset.fromModule(require(`../../assets/${DATABASE_NAME}`)).uri,
        databasePath
      );
    }

    // Open the database connection
    const db = SQLite.openDatabase(DATABASE_NAME);

    return db;
  },
};

export default DbHelper;
