
import React, { useState, useEffect, ChangeEvent } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppSelector } from '../app/hooks';
import { CommentData } from '../types/data';
import { selectComment  }  from "../reducer/CommentReducer"

const ModalComment = (props: any) => {

  const initNewComment = {
    id: 0,
    user: "",
    description: "",
    photo: {}
  };
  const stateProps = useAppSelector(selectComment)
  const [comment, setCommentData] = useState<CommentData>(initNewComment);

  useEffect(() => {
    let modal:any = document.getElementById("myModal");
    let span:any = document.getElementsByClassName("close")[0]

    span.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event:any) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  }, []);



  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCommentData({ ...comment, [name]: value });
  };
  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCommentData({ ...comment, [name]: value });
  };

  let selectedComment:any = props.id ?  stateProps.commentData.filter(el => el.photo.id === props.id) : []
  
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
                <small>Comments ({selectedComment.length ?  selectedComment[0].comment.length : 0})</small>
              </div>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">
                <FontAwesomeIcon icon="times" color="#333" />
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="comment-list">
                {selectedComment.length > 0 ? (selectedComment[0].comment.map((el:any, index:any) => (<div key={`list-comment-${index}`} className="list-group">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{el.user}</h5>
                    <small>3 days ago</small>
                  </div>
                  <p className="mb-1">{el.description}</p>
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
                  onChange={handleTextAreaChange}
                  name="description"
                  value={comment.description}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Comment</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  ) 
}

export default ModalComment;