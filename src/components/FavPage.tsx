
import { selectCollection  }  from "../reducer/collectionReducer"
import { useAppSelector } from '../app/hooks';
import styles from './AlbumList.module.css';
import { Link } from "react-router-dom";

function FavPage() {
  const stateProps = useAppSelector(selectCollection)

  return (
    <div className="">
      <div className="jumbotron py-4">
        <h1 className="display-4">Your Collections</h1>
        <p className="lead">Photos {stateProps && `(${stateProps.collection.length})`}</p>
      </div>
      <div className="container">
        <div className={`row ${styles.albumsWrap}`}>
            {stateProps &&  stateProps.collection.length > 0 ? (
              stateProps.collection.map((el, index) => (
                <div
                  className={"col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch"} key={index}
                >
                    <div className={`card mb-1 p-3 w-100 d-block  postion-relative ${styles.photoGrid}`}>
                      <img src={el.url} alt={el.title} className="card-img-top"/>
                      <div className="card-body p-0 pt-2">
                        <small className="text-secondary">Album Name: </small>
                        <br/>
                        <Link to={`/album/${el.albumId}`}>
                          <small className={`title-link mb-1 mt-0 ${styles.titleLink}`}>{el.title}</small>
                        </Link>
                      </div>
                    </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                - Empty - 
              </div>
            )}
          </div>
      </div>
    </div>
  ) 
}

export default FavPage;