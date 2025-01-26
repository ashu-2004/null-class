const commentreducer=(state={data:null},action)=>{
    switch (action.type) {
        case "POST_COMMENT":
          return {...state};
        case "EDIT_COMMENT":
            return {...state};
        case "FETCH_ALL_COMMENTS":
            return {...state,data:action.payload}
        case "UPDATE_COMMENT_REACTION":
            return state.map((comment) =>
                comment.cid === action.payload.commentId
                  ? { ...comment, likes: action.payload.likes, dislikes: action.payload.dislikes }
                  : comment
              );
        default:
            return state;
    }
}
export default commentreducer