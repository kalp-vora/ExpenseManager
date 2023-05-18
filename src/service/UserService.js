import DbHelper from "../Database/DbHelper";
import Tables from "../Database/tables";

const UserService = {
  register: (user) => {
    DbHelper.init()
      .then((db) => {
        return DbHelper.createUserTable(db);
      })
      .then((db) => {
        // Insert the user into the database
        console.log("Inserting user...");
        return new Promise((resolve, reject) => {
          db.transaction(
            (tx) => {
              tx.executeSql(
                Tables.INSERT_USER_TABLE,
                [
                  user.firstName,
                  user.lastName,
                  user.contact,
                  user.email,
                  user.password,
                ],
                ({ insertId }) => {
                  console.log("User inserted with id: ", insertId);
                  resolve(insertId);
                },
                (error) => {
                  console.error("Error inserting user: ", error);
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
      })
      .then(() => {
        // Close the database connection
        return DbHelper.close();
      })
      .then(() => {
        console.log("Database connection closed.");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};

export default UserService;
