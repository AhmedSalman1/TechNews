import { UserDao } from './dao/UserDao';
import { PostDao } from './dao/PostDao';
import { CommentDao } from './dao/CommentDao';
import { LikeDao } from './dao/LikeDao';
import { SqliteDataStore } from './sql';
// import { InMemeoryDataStore } from './memorydb';

export interface Datastore extends UserDao, PostDao, CommentDao, LikeDao {}

export let db: Datastore;

export async function initDb() {
  // db = new InMemeoryDataStore();
  db = await new SqliteDataStore().openDb();
}
