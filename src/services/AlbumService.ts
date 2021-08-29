import http from "../http-common";
import {  AlbumData } from "../types/data";

const getAll = () => {
  return http.get("/albums");
};

const getThisUser = (obj: any) => {
  return http.get("/users", {
    params: {
      id: obj.userId
    }
  });
};

const get = (id: any) => {
  return http.get(`/albums/${id}`);
};

const getRefByUser = (id: any) => {
  return http.get(`/albums`, {
    params: {
      userId: id
    }
  });
};

const create = (data: AlbumData) => {
  return http.post("/albums", data);
};

const update = (id: any, data: AlbumData) => {
  return http.put(`/albums/${id}`, data);
};

const remove = (id: any) => {
  return http.delete(`/albums/${id}`);
};

const removeAll = () => {
  return http.delete(`/albums`);
};

const findByTitle = (title: string) => {
  return http.get(`/albums?title=${title}`);
};

const findByFilter = (user: string, album: string) => {
  let params:object = {}
  if(user) {
    params = {...params, ...{
      userId: user
    }}
  }
  if(user) {
    params = {...params, ...{
      userId: user
    }}
  }
  if(album) {
    params = {...params, ...{
      title: album
    }}
  }
  return http.get("/albums", {
    params: params
  });
};

const AlbumDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  getThisUser,
  getRefByUser,
  findByFilter
};

export default AlbumDataService;
