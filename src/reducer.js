const UserReducer = (state = "", action) => {
  switch (action.type) {
    case "SignIn":
      return action.user;
    default:
      return state;
  }
};
export default UserReducer;
