# 🌀 WeirdFlow

**WeirdFlow** is a Reddit-style app focused on strange, bizarre, or simply *weird* content. It allows you to view Reddit posts (via Reddit JSON API) alongside local user-generated posts stored in the browser.

---

## 🚀 Features

- 🔍 Search for posts by keyword.
- 📝 Create, edit, and delete local posts.
- 🧠 Filter by category.
- 👍 Upvote/downvote system.
- 🌐 Load Reddit posts in real-time.
- 🎨 Dark mode UI (experimental).

---

## 🛠️ Tech Stack

- React
- Redux Toolkit
- Reddit JSON API
- localStorage

---
## 📁 Project Structure 

weirdflow/
├── public/
├── src/
│   ├── app/
│   │   ├── features/
│   │   │   ├── posts/
│   │   │   │   └── postSlice.js ✅
│   │   │   ├── users/
│   │   │   │   ├── userSlice.js ✅
│   │   │   │   └── userService.js (in progress)
│   │   └── store.js ✅
│   ├── components/
│   │   ├── Navbar.js ✅
│   │   ├── PostCard.js ✅
│   │   ├── PostForm.js ✅
│   │   ├── PostList.js ✅
│   │   ├── SearchBar.js ✅
│   ├── pages/
│   │   ├── Home.js ✅
│   │   ├── PostDetail.js (in progress)
│   │   ├── UserProfile.js (in progress)
│   ├── styles/
│   │   ├── App.css ✅
│   │   ├── PostCard.css ✅
│   │   ├── PostForm.css ✅
│   │   ├── PostList.css ✅
│   │   ├── SearchBar.css ✅
│   │   ├── Navbar.css ✅
│   │   ├── UserProfile.css (in progress)
│   │   ├── darkmode.css ✅
│   ├── utils/
│   │   ├── api.js (in progress)
│   │   ├── formatDate.js (in progress)
│   │   ├── removeDuplicates.js ✅
│   ├── App.js ✅
│   ├── index.js ✅
│   └── reportWebVitals.js
├── .gitignore ✅
├── package.json
├── README.md ✅

## 🧪 Getting Started

Install dependencies and run the app:

```bash
npm install
npm start



