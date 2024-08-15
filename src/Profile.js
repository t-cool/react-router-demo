import React from 'react';
import { useUser } from './UserContext';

export default function Profile() {
  const { user } = useUser();

  if (!user) {
    return <h2>ユーザーがログインしていません</h2>;
  }

  return (
    <div>
      <h2>プロフィール</h2>
      <p>ユーザー名: {user.username}</p>
      <p>メールアドレス: {user.email}</p>
    </div>
  );
}