import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import AlbumList from "./components/AlbumList";
import EmptyPage from "./components/EmptyPage";
import AlbumDetail from "./components/AlbumDetail";
import FavPage from "./components/FavPage";
import UserPage from "./components/UserPage";

import { selectCollection  }  from "./reducer/collectionReducer"
import { useAppSelector } from './app/hooks';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faCoffee, faComment, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faHeart, faCoffee, faComment, faTimes)

function App() {
  const stateProps = useAppSelector(selectCollection)

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav">
      <Link to={"/"} className="nav-link text-uppercase">
                Gallery App
              </Link>
        </div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to={"/"} className="nav-link">
                Albums
              </Link>
          </li>
          <li className="nav-item active">
            <Link to={"/fav"} className="nav-link">
                My Favourite <span className="badge badge-light align-text-top">{stateProps.collection ? stateProps.collection.length : "0"}</span>
              </Link>
          </li>
        </ul>
      </div>
      </nav>

      <div className="">
        <Switch>
          <Route exact path={["/"]} component={AlbumList} />
          <Route exact path={["/album/:id"]} component={AlbumDetail} />
          <Route exact path={["/user/:id"]} component={UserPage} />
          <Route exact path={["/fav"]} component={FavPage} />
          <Route component={EmptyPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
