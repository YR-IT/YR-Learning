# YR-Elearning Backend

Clean, modular Node.js & Express REST API powered by MongoDB (Mongoose) with authentication, courses management, and articles management.

## 🗄️ Database Configuration
Database Name: `yr_elearning`

To connect your MongoDB cluster:
1. Open `.env` (or copy `.env.example` to `.env`)
2. Update the `MONGO_URI` with your connection string:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.yourdomain.mongodb.net/yr_elearning?retryWrites=true&w=majority
   DB_NAME=yr_elearning
   ```
3. The server automatically uses the `yr_elearning` database and seeds initial courses, articles, and admin credentials if the database is fresh.

## 🚀 Running the Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start in development mode (with hot reloading)
npm run dev

# Or start in production mode
npm start
```

## 🔐 Default Admin Credentials for `/login`
- **Email:** `admin@yrelearning.com`
- **Password:** `admin123`
*(Can be changed in `backend/.env`)*

## 📡 API Endpoints

### Auth
- `POST /api/auth/login` - Admin Login (returns JWT token and admin data)
- `GET /api/auth/me` - Get current Admin profile

### Courses
- `GET /api/courses` or `GET /api/course/allcourses` - Get all courses (with category and search filter)
- `GET /api/courses/:id` - Get single course details
- `POST /api/courses` - Create new course (Admin only)
- `PUT /api/courses/:id` - Update course (Admin only)
- `DELETE /api/courses/:id` - Delete course (Admin only)
- `GET /api/course/lessons/:courseId` - Get course lessons
- `POST /api/course/addlessons/:courseId` - Add lesson (Admin only)
- `PUT /api/course/updatelessons/:courseId` - Update lesson (Admin only)
- `DELETE /api/course/deletelessons/:courseId/:lessonId` - Delete lesson (Admin only)

### Articles
- `GET /api/articles` - Get all articles (with category and search filter)
- `GET /api/articles/:id` - Get single article
- `POST /api/articles` - Create article (Admin only)
- `PUT /api/articles/:id` - Update article (Admin only)
- `DELETE /api/articles/:id` - Delete article (Admin only)

### Banners
- `GET /api/banner/getbanner` - Promotional banners
- `GET /api/banner/getinstructor` - Instructor banners
