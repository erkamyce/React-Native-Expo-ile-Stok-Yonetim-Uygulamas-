const INITAL_STATE = {
  email: "",
  parola: "",
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PAROLA":
      return { ...state, parola: action.payload };

    default:
      return state;
  }
};
