import http from "../http-common";
import {  PhotosData } from "../types/data";

const getAll = () => {
  return http.get("/photos");
};

const get = (id: any) => {
  return http.get(`/photos`, {
    params: {
      albumId: id
    }
  });
};

const create = (data: PhotosData) => {
  return http.post("/photos", data);
};

const update = (id: any, data: PhotosData) => {
  return http.put(`/photos/${id}`, data);
};

const remove = (id: any) => {
  return http.delete(`/photos/${id}`);
};

const removeAll = () => {
  return http.delete(`/photos`);
};

const findByTitle = (title: string) => {
  return http.get(`/photos?title=${title}`);
};

const PhotosDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default PhotosDataService;
