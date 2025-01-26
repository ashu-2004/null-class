import React, { useState } from 'react'
import "./Comment.css"
import Displaycommment from './Displaycommment'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { postcomment } from '../../action/comment'
const Comment = ({ videoid }) => {
    const dispatch = useDispatch()
    const [commenttext, setcommentext] = useState("")
    const currentuser = useSelector(state => state.currentuserreducer);
    const commentlist = useSelector(state => state.commentreducer)
    console.log(commentlist)
    // const commentlist=[{
    //     _id:1,
    //     commentbody:"hello",
    //     usercommented:"Abc"
    // },
    // {
    //     _id:2,
    //     commentbody:"hello2",
    //     usercommented:"Abc2"
    // }];
    const handleonsubmit = (e) => {
        e.preventDefault();
        if (currentuser) {
            if (!commenttext) {
                alert("please type your comment!!")
            }
            else {
                dispatch(postcomment({
                    videoid: videoid,
                    userid: currentuser?.result._id,
                    commentbody: commenttext,
                    usercommented: currentuser.result.name
                }))
                setcommentext("")
            }
        } else {
            alert("Please login to comment")
        }
    }


    return (
        <>
            <form className='comments_sub_form_comments' onSubmit={handleonsubmit}>
                <input type="text" onChange={(e) => setcommentext(e.target.value)} placeholder='add comment...' value={commenttext} className='comment_ibox' />
                <input type="submit" value="add" className='comment_add_btn_comments' />
            </form>
            <div className="display_comment_container">
                {commentlist?.data.filter((q) => videoid === q?.videoid)
                    .reverse()
                    .map((m) => {

                        return (<Displaycommment cid={m._id} userid={m.userid} commentbody={m.commentbody} commenton={m.commenton} usercommented={m.usercommented} />)
                    })}
            </div>
        </>
    )
}

export default Comment

// import React, { useState } from 'react';
// import "./Comment.css";
// import Displaycommment from './Displaycommment';
// import { useSelector, useDispatch } from 'react-redux';
// import { postcomment, updateCommentLikes, deleteComment } from '../../action/comment';
// import { useTranslation } from 'react-i18next';

// const Comment = ({ videoid }) => {
//     const dispatch = useDispatch();
//     const [commentText, setCommentText] = useState('');
//     const currentuser = useSelector(state => state.currentuserreducer);
//     const commentList = useSelector(state => state.commentreducer);
//     const { t, i18n } = useTranslation();

//     // Get city dynamically (using geolocation or API for actual city)
//     const getCity = () => {
//         // Placeholder logic for city retrieval (you can replace it with real-time city fetching)
//         return "City Name Placeholder";
//     };

//     const handleOnSubmit = (e) => {
//         e.preventDefault();
//         if (currentuser) {
//             if (!commentText) {
//                 alert(t('Please type your comment!'));
//             } else if (/[^a-zA-Z0-9\s.,!?]/.test(commentText)) {
//                 // Allow basic punctuation for better user experience
//                 alert(t('Comments with special characters are not allowed.'));
//             } else {
//                 dispatch(postcomment({
//                     videoid: videoid,
//                     userid: currentuser?.result._id,
//                     commentbody: commentText,
//                     usercommented: currentuser.result.name,
//                     city: getCity(),
//                     likes: 0,
//                     dislikes: 0
//                 }));
//                 setCommentText('');
//             }
//         } else {
//             alert(t('Please login to comment.'));
//         }
//     };

//     const handleLike = (commentId) => {
//         dispatch(updateCommentLikes(commentId, 'like'));
//     };

//     const handleDislike = (commentId) => {
//         dispatch(updateCommentLikes(commentId, 'dislike'));
//     };

//     const translateComment = (text) => {
//         // Translation directly using i18next's t function
//         return t(text);
//     };

//     return (
//         <>
//             <form className='comments_sub_form_comments' onSubmit={handleOnSubmit}>
//                 <input
//                     type="text"
//                     onChange={(e) => setCommentText(e.target.value)}
//                     placeholder={t('Add a comment...')}
//                     value={commentText}
//                     className='comment_ibox'
//                 />
//                 <input type="submit" value={t('Add')} className='comment_add_btn_comments' />
//             </form>
//             <div className="display_comment_container">
//                 {commentList?.data
//                     .filter((q) => videoid === q?.videoid)
//                     .reverse()
//                     .map((m) => {
//                         if (m.dislikes >= 2) {
//                             dispatch(deleteComment(m._id)); // Automatically remove comments with 2+ dislikes
//                             return null;
//                         }
//                         return (
//                             <div key={m._id} className="comment_item">
//                                 <p>
//                                     <strong>{m.usercommented}</strong> ({m.city}):
//                                 </p>
//                                 <p>{translateComment(m.commentbody)}</p>
//                                 <div className="comment_actions">
//                                     <button onClick={() => handleLike(m._id)}>{t('Like')} ({m.likes})</button>
//                                     <button onClick={() => handleDislike(m._id)}>{t('Dislike')} ({m.dislikes})</button>
//                                     <select
//                                         onChange={(e) =>
//                                             alert(translateComment(m.commentbody, e.target.value))
//                                         }
//                                     >
//                                         <option value="en">{t('Translate to English')}</option>
//                                         <option value="es">{t('Translate to Spanish')}</option>
//                                         <option value="fr">{t('Translate to French')}</option>
//                                         {/* Add more language options as needed */}
//                                     </select>
//                                 </div>
//                             </div>
//                         );
//                     })}
//             </div>
//         </>
//     );
// };

// export default Comment;
