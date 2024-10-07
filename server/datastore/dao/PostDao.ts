import { Post } from '../../types';

export interface PostDao {
  getPosts(): Promise<Post[]>;
  createPost(post: Post): Promise<void>;
  getPost(id: string, userId?: string): Promise<Post | undefined>;
  getPostByUrl(url: string): Promise<Post | undefined>;
  updatePost(post: Post): Promise<void>;
  deletePost(id: string): Promise<void>;
}
