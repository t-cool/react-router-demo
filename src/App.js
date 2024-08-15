import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { UserProvider, useUser } from './UserContext';

// ページのコンポーネント
import Home from './Home';
import Memo from './Memo';
import Profile from './Profile';
import User from './User';
import NewUser from './NewUser';
import Login from './Login';

function Navigation() {
  const { user, logout } = useUser();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-blue-200">ホーム</Link></li>
          <li><Link to="/article" className="hover:text-blue-200">メモ</Link></li>
          <li><Link to="/profile" className="hover:text-blue-200">プロフィール</Link></li>
        </ul>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>ようこそ、{user.username}さん</span>
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">ログアウト</button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded">ログイン</Link>
              <Link to="/user/new" className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded">新規ユーザー登録</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/user/new" element={<NewUser />} />
              <Route path="/user/:id" element={<User />} />
              <Route path="/article" element={<Memo/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}