import { serviceInstance } from "../instance";

export const postApi = {
  postImage: (data: any) => {
    return serviceInstance.post('/post/image', data)
  },
}
