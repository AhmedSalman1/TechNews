<h1 align="center">
  Tech-News
    <h4 align="center">API for a social web app for sharing learning resources in a Hacker News-style experience.</h4>
</h1>

---

## Key Features

- **Authentication and Authorization** 🚀
  - Sign up, Sign in.
- **User Profile** 🧑‍💼
  - Update username, first/last name, and other information.
- **Post list** 🔗
  - List of links, each titled by the poster and scored based on popularity.
  - Users can create/update/delete their own posts.
  - After signing in, users can add comments and upvote posts.
- **Comments and Likes** 🖋️
  - Users are able to delete their own comments and likes.

---

## Database ERD

<img src="https://github.com/AhmedSalman1/TechNews/blob/main/docs/ERD-TechNews.drawio.png" />

---

## API Usage

Before using the API, you need to set the variables in Postman depending on your environment (development or production). Simply add:

```
- {{URL}} with your hostname as value (Eg. http://127.0.0.1:3000 or http://www.example.com)
- {{password}} with your user password as value.
```

For more info check API Documentation on Postman 👉🏻 [Tech News API Documentation](https://documenter.getpostman.com/view/30055418/2sAXxP9CMV).

---

## Built With

- [NodeJS](https://nodejs.org/en/) - JS runtime environment
- [Express](http://expressjs.com/) - The web framework used
- [TypeScript](https://www.typescriptlang.org/) - A strongly typed PL
- [SQLite](https://www.sqlite.org/) - A self-contained SQL database engine
- [JSON Web Token](https://jwt.io/) - Security token
- [Postman](https://www.getpostman.com/) - API testing
