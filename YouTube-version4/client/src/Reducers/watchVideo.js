
const initialState = {
  watchedVideos: {}, // Tracks watched videos for the current user
  points: 0,         // Tracks points for the current user
  userId: null,      // Tracks the logged-in user's ID
};

const watchVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        userId: action.payload.userId,
        points: action.payload.points, // Set user-specific points
        watchedVideos: {}, // Clear watchedVideos for new user
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
      return initialState; // Reset to initial state on logout
    default:
      return state;
  }
};

export default watchVideoReducer;
// Actions
// const initialState = {
//   watchedVideos: {},
//   points: 0,
// };

// const watchVideoReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "WATCHED_VIDEO":
//       return {
//         ...state,
//         watchedVideos: { ...state.watchedVideos, [action.payload]: true },
//       };
//     case "ALLOCATE_POINTS":
//       return {
//         ...state,
//         points: state.points + action.payload,
//       };
//     case "FETCH_WATCHED_VIDEOS":
//       return {
//         ...state,
//         watchedVideos: action.payload.reduce(
//           (acc, videoId) => ({ ...acc, [videoId]: true }),
//           {}
//         ),
//       };
//     case "SET_USER":
//       return {
//         ...state,
//         points: action.payload.points,
//       };
//     default:
//       return state;
//   }
// };

// export default watchVideoReducer;
