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

  createUser(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getUserById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  getUserByUsername(username: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
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

  getPost(id: string): Promise<Post | undefined> {
    throw new Error('Method not implemented.');
  }
  deletePost(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createComment(comment: Comment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getComments(postId: string): Promise<Comment[]> {
    throw new Error('Method not implemented.');
  }
  deleteComment(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createLike(like: Like): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
