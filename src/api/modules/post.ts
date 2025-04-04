import { serviceInstance } from "../instance";

export const postApi = {
  postImage: (data: any) => {
    return serviceInstance.post('/post/image', data)
  },
  getPosts: (userId: string) => {
    return serviceInstance.get(`/post/${userId}/get`)
  }
}
