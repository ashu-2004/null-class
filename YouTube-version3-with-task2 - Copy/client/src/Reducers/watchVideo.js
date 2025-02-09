
const initialState = {
  watchedVideos: {},
  points: 0,       
  userId: null,     
};

const watchVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        userId: action.payload.userId,
        points: action.payload.points,
        watchedVideos: {},
      };
    case "WATCHED_VIDEO":
      return {
        ...state,
        watchedVideos: { ...state.watchedVideos, [action.payload]: true },
      };
    case "ALLOCATE_POINTS":
      return {
        ...state,
        points: state.points + action.payload,
      };
    case "LOGOUT":
      return initialState; 
    default:
      return state;
  }
};

export default watchVideoReducer;
