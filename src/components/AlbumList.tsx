import React, { useState, useEffect, ChangeEvent } from "react";
import AlbumDataService from "../services/AlbumService";
import UserDataService from "../services/UserService";
import PhotosDataService from "../services/PhotoService";
import { AlbumData, UserData, PhotosData } from '../types/data';
import styles from './AlbumList.module.css';
import { Link } from "react-router-dom";


function AlbumList() {
  const [albums, setAlbums] = useState<Array<AlbumData>>([]);
  const [user, setUser] = useState<Array<UserData>>([]);
  const [photos, setPhotos] = useState<Array<PhotosData>>([]);
  const [searchUserName, setSearchUser] = useState<string>("");
  const [searchTitle, setSearchTitle] = useState<string>("");

  // const initialState = {
  //   id: null,
  //   title: "",
  //   description: "",
  //   published: false
  // };

  useEffect(() => {
    retrieveAlbums();
    retrieveUser();
    retrievePhoto();
  }, []);

  const onChangeSearchUser = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const searchUserName = e.target.value || '';
    setSearchUser(searchUserName);
  };

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const filterAlbum = () => {
    AlbumDataService.findByFilter(searchUserName, searchTitle)
      .then(response => {
        setAlbums(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveAlbums = () => {
    AlbumDataService.getAll()
      .then(response => {
        setAlbums(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveUser = () => {
    UserDataService.getAll()
        .then(response => {
          setUser(response.data);
          // setUser(state => [response.data, ...state]);
        })
        .catch(e => {
          console.log(e);
        });
  };

  const retrievePhoto = () => {
    PhotosDataService.getAll()
        .then(response => {
          setPhotos(response.data);
          // setUser(state => [response.data, ...state]);
        })
        .catch(e => {
          console.log(e);
        });
  };

  const findPhoto= (id: string) => {
    const res = photos.find(el => el.albumId === id);
    return res;
  }
  
  const findUser= (id: string) => {
    const res = user.find(el => el.id === id);
    return res;
  }

  return (
    <div>
      <div className="jumbotron mb-0 py-4">
        <h1 className="display-4">All Albums</h1>
        <p className="lead">Total {albums && `(${albums.length})`}</p>
      </div>
      <div className="container mt-3">
      <div className="form-row align-items-right mb-4">
          <div className="col-auto">
            <label className="sr-only" htmlFor="inlineFormInput">album name</label>
            <input type="text" className="form-control mb-2" id="inlineFormInput" placeholder="Album Name" value={searchTitle}
            onChange={onChangeSearchTitle}/>
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="formSearchUser">user name</label>
            <select className="custom-select mr-sm-2" id="formSearchUser" value={searchUserName} onChange={onChangeSearchUser}>
              <option value="">Choose...</option>
              {user && user.map((el, index) => (
                <option key={index} value={el.id}>{el.name}</option>
              ))}
            </select>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-2" onClick={filterAlbum}>Filter</button>
          </div>
        </div>
        <div className={`row d-flex align-items-stretch ${styles.albumsWrap}`}>
            {albums && user.length > 0 && photos.length > 0 &&
              albums.map((el, index) => (
                <div
                  className={"col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch "} key={index}
                >
                  <div className={`card mb-1 p-3 w-100 d-block  ${styles.albumsGrid}`}>
                  <Link to={`/album/${el.id}`}><img src={findPhoto(el.id)?.url} alt={findPhoto(el.id)?.url} className="card-img-top"/></Link>
                    <div className="card-body p-0 pt-2">
                      <Link to={`/album/${el.id}`}>
                        <h3 className={`title mb-1 mt-0 ${styles.albumsTitle}`}>{el.title}</h3>
                        </Link>
                      <small className="d-bloc">
                          by&nbsp;:&nbsp;
                        <Link to={`/user/${el.userId}`}>
                            {findUser(el.userId)?.name}
                        </Link>
                      </small>
                    </div>
                  </div>
                  
                </div>
              ))}
              {albums && albums.length === 0 && <div className="col-12 text-center">
              - Empty -
              </div>}
          </div>
      </div>
    </div>
  ) 
}

export default AlbumList;