import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from './UserContext';
import MemoForm from './MemoForm';
import { getUserMemos, addMemo, deleteMemo } from './indexedDB';

export default function Memo() {
  const { user } = useUser();
  const [memos, setMemos] = useState([]);

  const loadMemos = useCallback(async () => {
    if (user) {
      const userMemos = await getUserMemos(user.id);
      setMemos(userMemos);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadMemos();
    }
  }, [user, loadMemos]);

  const handleAddMemo = async (content) => {
    if (user) {
      const newMemo = { userId: user.id, content, createdAt: new Date() };
      const memoId = await addMemo(newMemo);
      setMemos([...memos, { ...newMemo, id: memoId }]);
    }
  };

  const handleDeleteMemo = async (memoId) => {
    await deleteMemo(memoId);
    setMemos(memos.filter(memo => memo.id !== memoId));
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">ログインしてメモを作成してください</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{user.username}さんのメモ</h2>
      <MemoForm onAddMemo={handleAddMemo} />
      <div className="mt-8 space-y-4">
        {memos.map(memo => (
          <div key={memo.id} className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center">
            <span className="text-gray-800">{memo.content}</span>
            <button
              onClick={() => handleDeleteMemo(memo.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}