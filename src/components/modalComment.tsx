
import React, { useState, useEffect, ChangeEvent } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { CommentData, PhotoSingleData } from '../types/data';
import { selectComment, addNewComment  }  from "../reducer/CommentReducer"

const ModalComment = (props: any) => {

  const initNewComment = {
    id: 0,
    user: "",
    description: "",
    date: ""
  };
  const initCurrentPhoto = {photo: {}}
  
  const stateProps = useAppSelector(selectComment)
  const [comment, setCommentData] = useState<CommentData>(initNewComment);
  const [photo, setPhotoData] = useState<PhotoSingleData>(initCurrentPhoto);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let modal:any = document.getElementById("myModal");
    let span:any = document.getElementsByClassName("close")[0]
    

    handleSetSelectedPhoto();
    
    span.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event:any) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }

  }, [props]);

  const handleAddCollection = () => {
    let payloadComment:any = comment;
    let payloadPhoto:any = photo;
    const date = new Date();
    payloadComment.date = date.toUTCString().replace('GMT','');
    payloadComment.id = stateProps.commentData.length + 1;
    
    let payload:any = {...payloadPhoto, ...{comment:  [...[payloadComment]]}};
    dispatch(addNewComment(payload));
    setCommentData({ ...comment, ...initNewComment });
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCommentData({ ...comment, [name]: value });
  };
  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCommentData({ ...comment, [name]: value });
  };

  const handleSetSelectedPhoto = () => {
    setPhotoData({ ...photo, ...{photo: props} });
  };

  let selectedComment:any = props.id ?  stateProps.commentData.filter(el => el.photo.id === props.id) : []

  console.log(stateProps.commentData)
  console.log(selectedComment)
  
  return (
    <div>
      <div id="myModal" className="modal">

        <div className="container">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h5 className="modal-title">
                  {props.title || '-'}
                </h5>
                <small>Comments ({stateProps.commentData  && selectedComment ?  selectedComment.length : 0})</small>
              </div>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">
                <FontAwesomeIcon icon="times" color="#333" />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="comment-list">
                {selectedComment.length > 0 ? (selectedComment.map((el:any, index:any) => (<div key={`list-comment-${index}`} className="list-group">
                  {el.comment.map((item:any, index2:any)=> <div className="mb-2">
                    <div className="d-flex w-100 justify-content-between" key={`list-${index2}`}>
                      <small className="d-block">from : <strong className="mb-1">{item.user}</strong></small>
                      <small>{item.date}</small>
                    </div>
                    <p className="mb-1">{item.description}</p>
                  </div>)
                  }
                </div>))):(
                  <div className="col-12 text-center">
                    - Empty - 
                  </div>
                )}
              </div>
              <div className="">
                <div className="form-group">
                  <input type="text"
                  className="form-control"
                  id="userName" 
                  required
                  placeholder="name"
                  onChange={handleInputChange}
                  name="user"
                  value={comment.user}/>
                </div>
                <div className="form-group">
                  <textarea
                  className="form-control"
                  id="commentDesc"
                  rows={3}
                  placeholder="Description"
                  onChange={handleTextAreaChange}
                  name="description"
                  value={comment.description}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => {handleAddCollection()}}>Comment</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  ) 
}

export default ModalComment;