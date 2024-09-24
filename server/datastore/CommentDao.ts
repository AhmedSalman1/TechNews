import { Comment } from '../types';

export interface CommentDao {
  createComment(comment: Comment): void;
  getComments(postId: string): Comment[];
  deleteComment(id: string): void;
}
