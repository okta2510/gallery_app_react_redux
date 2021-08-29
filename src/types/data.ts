export interface AlbumData {
  id?: any | null,
  albumId?: any | null,
  title: string,
  userId: string
}

export interface UserData {
  id: string,
  name: string,
  username: string,
  email: string,
  address: any,
  phone: string,
  website: string,
}

export interface PhotosData {
  id?: any | null,
  albumId?: any | null,
  title: string,
  url: string,
  name: string,
}