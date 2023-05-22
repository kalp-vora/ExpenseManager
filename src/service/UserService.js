import dbQueries from "../Database/DatabaseQueries";
import DbHelper from "../Database/DbHelper";

const UserService = {
  register: (user, onSuccess = () => {}, onError = () => {}) => {
    console.log("user service: ", user);
    const db = DbHelper.init();

    db.transaction(
      (tx) => {
        tx.executeSql(
          dbQueries.INSERT_USER_TABLE,
          [
            user.firstName,
            user.lastName,
            user.contact,
            user.email,
            user.password,
          ],
          (_, resultSet) => {
            console.log("User inserted in database: ", resultSet.rowsAffected);
            if (onSuccess) onSuccess(resultSet);
          },
          (_, error) => {
            console.error("Error inserting user table: ", error.message);
            if (onError) onError(error);
          }
        );
      },
      (error) => {
        console.error("Transaction error: ", error.message);
        if (onError) onError(error);
      }
    );
  },
};

export default UserService;
