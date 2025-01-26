export const setUser = (userId, points) => ({
    type: "SET_USER",
    payload: { userId, points },
  });
  
  export const logoutUser = () => ({
    type: "LOGOUT",
  });
  