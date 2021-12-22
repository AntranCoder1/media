import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { UidContext } from '../AppContext';
import { updateComment, deleteComment } from '../../redux/actions/Post.actions';

const EditDeleteComment = ({ comment, postId }) => {

    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handleUpdate = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(updateComment(postId, comment._id, text));
            setText('');
            setEdit(false);
        }
    }

    const handleDelete = () => {
        dispatch(deleteComment(postId, comment._id));
    }

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.commenterId) {
                setIsAuthor(true);
            }
        }

        checkAuthor();
    }, [uid, comment.commenterId]);

    return (
        <div className="edit-comment">
            { isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <img src="./img/icons/edit.svg" alt="edit-comment" />
                </span>
            ) }
            { isAuthor && edit && (
                <form className="edit-comment-form" onSubmit={handleUpdate}>
                    <label htmlFor='text'>Editer</label>
                    <br />
                    <input 
                        type="text"
                        name="text"
                        defaultValue={comment.text}
                        onChange={(e) =>setText(e.target.value)}
                    />
                    <br />
                    <div className="btn">
                        <span
                            onClick={() => {
                                if (window.confirm("Do you want to delete this comment ?")) {
                                    handleDelete();
                                }
                            }}
                        >
                            <img src="./img/icons/trash.svg" alt="delete" />
                        </span>
                        <input type="submit" value="Valider modification" />
                    </div>
                </form>
            )}
        </div>
    )
}

export default EditDeleteComment
