const initialState = {
  watchedVideos: {},
  points: 0,
};

const watchVideoReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default watchVideoReducer;
