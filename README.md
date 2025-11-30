# 📰 Task #2 - Managing Articles (MySQL)

A Node.js REST API for managing articles using a MySQL database.

## 📋 Task Requirements

Create an article management system. You can:
- Add, edit, and delete articles.
- Get a list of articles with various filtering and sorting options.

## 🚀 How to Run

1.  **Database Setup:**
    - Import the `articles_db.sql` file into your MySQL database.
    - Update `dbSingleton.js` with your database credentials if necessary.

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Server:**
    ```bash
    node app.js
    ```

## 🔌 API Endpoints

Base URL: `http://localhost:3000/article`

### 📝 Basic CRUD
- `GET /` - Get all articles
- `GET /:id` - Get article by ID
- `POST /` - Add a new article (Body: `title`, `content`, `author`)
- `DELETE /:id` - Delete an article by ID

### 🔍 Filters & Sorting
- `GET /desc` - Get articles ordered by creation date (Newest first)
- `GET /count` - Get the total number of articles
- `GET /author/:author` - Get articles by a specific author
- `GET /after/:date` - Get articles created after a specific date (Format: YYYY-MM-DD)
- `GET /search/:keyword` - Search articles by keyword in the title
- `GET /authors/distinct` - Get a list of all distinct authors

## 👥 Students

- Bshara Karkaby [49-2]
- Moner Makholuy [49-2]

---

**Happy coding!** 💻✨
