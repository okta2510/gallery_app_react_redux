import React, { useState, useEffect } from "react";
import { RouteComponentProps } from 'react-router-dom';
import AlbumDataService from "../services/AlbumService";
import UserDataService from "../services/UserService";
import PhotosDataService from "../services/PhotoService";
import { AlbumData, UserData, PhotosData } from '../types/data';
import styles from './AlbumList.module.css';
import { Link } from "react-router-dom";


interface RouterProps {
  id: string;
}
type Props = RouteComponentProps<RouterProps>;


function UserPage(props: Props) {
  const [albums, setAlbums] = useState<Array<AlbumData>>([]);
  const [user, setUser] = useState<UserData>();
  const [photos, setPhotos] = useState<Array<PhotosData>>([]);

  useEffect(() => {
    retrieveAlbums(props.match.params.id);
    retrieveUser(props.match.params.id);
    retrievePhoto();
  }, [props.match.params.id]);

  const retrieveAlbums = (id: string) => {
    AlbumDataService.getRefByUser(id)
      .then(response => {
        setAlbums(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveUser = (id: string) => {
    UserDataService.get(id)
        .then(response => {
          setUser(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  };

  const retrievePhoto = () => {
    PhotosDataService.getAll()
        .then(response => {
          setPhotos(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  };

  const findPhoto= (id: string) => {
    const res = photos.find(el => el.albumId === id);
    return res;
  }
  

  return (
    <div>
      <div className="jumbotron py-4">
        <h1 className="display-4">{user ? `${user.name} (${user.username})` : 'user name'}</h1>
        <p className="lead">User Allbums {albums && `(${albums.length})`}</p>
        <hr className="my-2"/>
        <div className="container-fluid px-0">
          <div className="row text-sm">
            <div className="col-12">
              More Info:
            </div>
            {user && user.email && <div className="col-sm-6 col-md-4 col-lg-3">
              {`${user.phone}`}
            </div>}
            {user && user.address && <div className="col-sm-6 col-md-4 col-lg-3">
              {`${user.address.street}, ${user.address.street} ${user.address.suite}, ${user.address.zipcode}`}
            </div>}
            {user && user.email && <div className="col-sm-6 col-md-4 col-lg-3">
              {user.email}<br/>
              {user.website}
            </div>}
          </div>
        </div>
      </div>
        <div className="container mt-4">
          <div className={`row d-flex align-items-stretch ${styles.albumsWrap}`}>
              {albums && user &&
                albums.map((el, index) => (
                  <div
                    className={"col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch "} key={index}
                  >
                    <div className={`card mb-1 p-3 w-100 d-block  ${styles.albumsGrid}`}>
                      <Link to={`/album/${el.id}`}>
                      <img src={findPhoto(el.id)?.url} alt={findPhoto(el.id)?.url} className="card-img-top"/>
                      </Link>
                      <div className="card-body p-0 pt-2">
                        <Link to={`/album/${el.id}`}>
                          <h3 className={`title mb-1 mt-0 ${styles.albumsTitle}`}>{el.title}</h3>
                          </Link>
                        <small className="d-bloc">
                            by&nbsp;:&nbsp;
                            <Link to={`/user/${el.userId}`}>
                              {user.username}
                          </Link>
                        </small>
                      </div>
                    </div>
                    
                  </div>
                ))}
            </div>
        </div>
    </div>
  ) 
}

export default UserPage;