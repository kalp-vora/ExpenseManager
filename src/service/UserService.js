import dbQueries from "../Database/DatabaseQueries";
import DbHelper from "../Database/DbHelper";

const UserService = {
  register: async (user, onSuccess = () => {}, onError = () => {}) => {
    const db = await DbHelper.init();

    db.transaction(
      (tx) => {
        tx.executeSql(
          dbQueries.ADD_USER_QUERY,
          [
            user.firstName,
            user.lastName,
            user.contact,
            user.email,
            user.password,
          ],
          (_, resultSet) => {
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

  login: async (user, onSuccess = () => {}, onError = () => {}) => {
    const db = await DbHelper.init();

    db.transaction(
      (tx) => {
        tx.executeSql(
          dbQueries.LOGIN_QUERY,
          [user.email, user.password],
          (_, resultSet) => {
            if (onSuccess) onSuccess(resultSet);
          },
          (_, error) => {
            console.error("Error while login query: ", error.message);
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
