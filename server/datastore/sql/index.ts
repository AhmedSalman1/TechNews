import sqlite3 from 'sqlite3';
import { open as sqliteOpen, Database } from 'sqlite';
import path from 'path';

import { Datastore } from '..';
import { User, Post, Comment, Like } from '../../types';

export class SqliteDataStore implements Datastore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;
  public async openDb() {
    this.db = await sqliteOpen({
      filename: path.join(__dirname, 'technews.sqlite'),
      driver: sqlite3.Database,
    });

    this.db.run('PRAGMA foreign_keys = ON;');

    await this.db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });

    return this;
  }

  async createUser(user: User): Promise<void> {
    await this.db.run(
      'INSERT INTO users (id, firstName, lastName, password, username, email) VALUES (?, ?, ?, ?, ?, ?)',
      user.id,
      user.firstName,
      user.lastName,
      user.password,
      user.username,
      user.email,
    );
  }

  async updateCurrentUser(user: Partial<User>): Promise<void> {
    await this.db.run(
      'UPDATE users SET firstName = ?, lastName = ?, username = ? WHERE id = ?',
      user.firstName,
      user.lastName,
      user.username,
      user.id,
    );
  }

  getUserById(id: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM users WHERE id = ?`, id);
  }

  getUserByEmail(email: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM users WHERE email = ?`, email);
  }

  getUserByUsername(username: string): Promise<User | undefined> {
    return this.db.get<User>(
      `SELECT * FROM users WHERE username = ?`,
      username,
    );
  }

  getPosts(): Promise<Post[]> {
    return this.db.all<Post[]>('SELECT * FROM posts;');
  }

  async createPost(post: Post): Promise<void> {
    await this.db.run(
      'INSERT INTO posts (id, title, url, userId, postedAt) VALUES (?, ?, ?, ?, ?)',
      post.id,
      post.title,
      post.url,
      post.userId,
      post.postedAt,
    );
  }

  async getPost(id: string, userId: string): Promise<Post | undefined> {
    return await this.db.get<Post>(
      `SELECT *, EXISTS(
        SELECT 1 FROM likes WHERE likes.postId = ? AND likes.userId = ?
      ) as liked FROM posts WHERE id = ?`,
      id,
      userId,
      id,
    );
  }

  async getPostByUrl(url: string): Promise<Post | undefined> {
    return await this.db.get<Post>('SELECT * From posts where url = ?', url);
  }

  async updatePost(post: Post): Promise<void> {
    await this.db.run(
      'UPDATE posts SET title = ?, url = ?, userId = ?, postedAt = ? WHERE id = ?',
      post.title,
      post.url,
      post.userId,
      post.postedAt,
      post.id,
    );
  }

  async deletePost(id: string): Promise<void> {
    await this.db.run('Delete FROM posts WHERE id = ?', id);
  }

  async createComment(comment: Comment): Promise<void> {
    await this.db.run(
      'INSERT INTO Comments(id, userId, postId, comment, postedAt) VALUES(?,?,?,?,?)',
      comment.id,
      comment.userId,
      comment.postId,
      comment.comment,
      comment.postedAt,
    );
  }

  async getComments(postId: string): Promise<Comment[]> {
    return await this.db.all<Comment[]>(
      'SELECT * FROM comments WHERE postId = ?',
      postId,
    );
  }

  async countComments(postId: string): Promise<number> {
    let result = await this.db.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM comments WHERE postId = ?',
      postId,
    );
    return result?.count ?? 0;
  }

  async deleteComment(id: string): Promise<void> {
    await this.db.run('DELETE FROM comments WHERE id = ?', id);
  }

  async createLike(like: Like): Promise<void> {
    await this.db.run(
      'INSERT INTO likes(userId,postId) VALUES(?,?)',
      like.userId,
      like.postId,
    );
  }

  async deleteLike(like: Like): Promise<void> {
    await this.db.run(
      'DELETE FROM likes WHERE userId = ? AND postId = ?',
      like.userId,
      like.postId,
    );
  }

  async getLikes(postId: string): Promise<number> {
    let result = await this.db.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM likes WHERE postId = ?',
      postId,
    );
    return result?.count ?? 0;
  }

  async exists(like: Like): Promise<boolean> {
    let awaitResult = await this.db.get<number>(
      'SELECT 1 FROM likes WHERE postId = ? and userId = ?',
      like.postId,
      like.userId,
    );
    let val: boolean = awaitResult === undefined ? false : true;
    return val;
  }
}
