import UserService from "../service/UserService";

const UserMiddleware = {
  register: (user, onSuccess = () => {}, onError = () => {}) => {
    // SETTING NAME
    let firstName = user.firstName.trim();
    firstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

    let lastName = user.lastName.trim();
    lastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

    // SETTING EMAIL
    const email = user.email.trim();

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      contact: user.contact,
      email: email,
      password: user.password,
    };

    UserService.register(
      newUser,
      (onSuccess = (resultSet) => {
        console.log(resultSet);
      }),
      (onError = (error) => {
        console.error(error);
      })
    );
  },
};

export default UserMiddleware;
