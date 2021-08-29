import http from "../http-common";
import {  UserData } from "../types/data";

const getAll = () => {
  return http.get("/users");
};

const get = (id: any) => {
  return http.get(`/users/${id}`);
};

const create = (data: UserData) => {
  return http.post("/users", data);
};

const update = (id: any, data: UserData) => {
  return http.put(`/users/${id}`, data);
};

const remove = (id: any) => {
  return http.delete(`/users/${id}`);
};

const removeAll = () => {
  return http.delete(`/users`);
};

const findByTitle = (title: string) => {
  return http.get(`/users?title=${title}`);
};

const UserService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default UserService;
