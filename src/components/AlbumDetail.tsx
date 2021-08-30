import React, { useState, useEffect, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';

import PhotosDataService from "../services/PhotoService";
import AlbumDataService from "../services/AlbumService";
import UserService from "../services/UserService";
import { PhotosData, AlbumData, UserData } from '../types/data';

import { addCollection, selectCollection  }  from "../reducer/collectionReducer"
import { useAppSelector, useAppDispatch } from '../app/hooks';

import styles from './AlbumList.module.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ModalComment from '../components/modalComment'

interface RouterProps {
  id: string;
}
type Props = RouteComponentProps<RouterProps>;

function AlbumDetail(props: Props) {
  
  const InitState = {
    id: '',
    albumId: '',
    title: '',
    url: '',
    name: '',
  }
  const CollectionProps = useAppSelector(selectCollection)
  const CommentProps = useAppSelector(selectCollection)
  const dispatch = useAppDispatch();

  const [currentPhotos, setPhotos] = useState<Array<PhotosData>>([]);
  const [albums, setAlbums] = useState<AlbumData>();
  const [user, setUser] = useState<UserData>();
  const [comment, setCurrentComment] = useState<any>(InitState);

  const getAlbumPhotos = (id: string) => {
    PhotosDataService.get(id)
      .then(response => {
        setPhotos(response.data);
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  const getCurrentAlbum = (id: string) => {
    AlbumDataService.get(id)
      .then(response => {
        setAlbums(response.data);
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  const getCurrentUser = (id: string) => {
    UserService.get(id)
      .then(response => {
        setUser(response.data);
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAlbumPhotos(props.match.params.id);
    getCurrentAlbum(props.match.params.id);
    getCurrentUser(props.match.params.id);

  }, [props.match.params.id]);

  const handleAddCollection = (photo: any) => {
    dispatch(addCollection(photo));
  }

  const checkAnyComment = (id: number) => {
    const found = CommentProps.commentData.filter(el => el.photo.id === id)
    return found.length > 0 ?  true : false;
  }
  
  const handleAddComment = (obj: object | null) => {
    let modal:any = document.getElementById("myModal");
    setCurrentComment(obj)
    modal.style.display = "block";
  }
  
  return (
    <div className="">
      <div className="jumbotron py-4">
        <h1 className="display-5 text-capitalize">{albums && (albums.title || 'Title')}</h1>
        <p className="lead">Album Photos {albums &&  currentPhotos && `(${currentPhotos.length})`}</p>
        <hr className="my-2"/>
        {user && <div className="container-fluid px-0">
          <div className="row text-sm">
            {user && user.name && <div className="col-12">
              <span className="">{user ? `${user.name}` : 'name'}
              <Link to={`/user/${user ? user.id : ''}`}>{user ? ` (${user.username}) ` : 'username'}</Link></span>
              <br/>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>}
          </div>
        </div>}
      </div>
      <div className="container">
        <div className={`row ${styles.albumsWrap}`}>
            {currentPhotos && albums &&
              currentPhotos.map((el, index) => (
                <div
                  className={"col-sm-6 col-md-4 col-lg-3 mb-4"} key={index}
                >
                    <div className={`card mb-1 w-100 d-block postion-relative ${styles.photoGrid}`}>
                      <span  className={`cursor-pointer ${styles.iconFav}`}>
                        <FontAwesomeIcon icon="heart" color={CollectionProps.collection.length > 0 && CollectionProps.collection.find(fav => fav.id === el.id) ?  '#F63345' : '#ccc'} onClick={()=>{handleAddCollection(el)}}/>
                      </span>
                      <span className={`cursor-pointer ${styles.iconComment}`} data-toggle="modal" data-target="#exampleModal">
                        <FontAwesomeIcon className="open-modal" icon="comment" color={checkAnyComment(el.id) ? '#06d675' :  '#ccc'} onClick={()=>{handleAddComment(el)}}/>
                      </span>
                      <img src={el.url} alt={el.title} className=""/>
                    </div>
                </div>
              ))}
          </div>
      </div>
      {currentPhotos && albums && <ModalComment {...comment}/>}
    </div>
  ) 
}

export default AlbumDetail;