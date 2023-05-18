const Regex = {
  EMAIL: new RegExp(
    "^[a-zA-Z0-9_+&*-]+(?:\\." +
      "[a-zA-Z0-9_+&*-]+)*@" +
      "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
      "A-Z]{2,7}$"
  ),
  NAME: new RegExp(/^[A-Za-z]+$/),
  CONTACT: new RegExp(/^[0-9]{10}$/),
};

export default Regex;
