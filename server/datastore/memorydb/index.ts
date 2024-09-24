import { User, Post, Like, Comment } from '../../types';
import { Datastore } from '../index';

export class InMemeoryDataStore implements Datastore {
  private users: User[] = [];
  private posts: Post[] = [];
  private likes: Like[] = [];
  private comments: Comment[] = [];

  createUser(user: User): void {
    this.users.push(user);
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  getUserByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  getPosts(): Post[] {
    return this.posts;
  }

  createPost(post: Post): void {
    this.posts.push(post);
  }

  getPost(id: string): Post | undefined {
    return this.posts.find((post) => post.id === id);
  }

  deletePost(id: string): void {
    const index = this.posts.findIndex((post) => post.id === id);
    if (index === -1) {
      return;
    }
    this.posts.splice(index, 1);
  }

  createLike(like: Like): void {
    this.likes.push(like);
  }
  createComment(comment: Comment): void {
    this.comments.push(comment);
  }

  getComments(postId: string): Comment[] {
    return this.comments.filter((comment) => comment.postId === postId);
  }

  deleteComment(id: string): void {
    const index = this.comments.findIndex((comment) => comment.id === id);
    if (index === -1) {
      return;
    }
    this.comments.splice(index, 1);
  }
}
