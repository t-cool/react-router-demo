const DB_NAME = 'UserDB';
const DB_VERSION = 2;
const USER_STORE_NAME = 'users';
const MEMO_STORE_NAME = 'memos';

let db = null;

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(USER_STORE_NAME)) {
        db.createObjectStore(USER_STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(MEMO_STORE_NAME)) {
        db.createObjectStore(MEMO_STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};

const getDB = async () => {
  if (db) return db;
  return openDB();
};

export const addUser = async (user) => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(USER_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(USER_STORE_NAME);
    const request = store.add(user);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const getUser = async (id) => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(USER_STORE_NAME, 'readonly');
    const store = transaction.objectStore(USER_STORE_NAME);
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const addMemo = async (memo) => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MEMO_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(MEMO_STORE_NAME);
    const request = store.add(memo);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const getUserMemos = async (userId) => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MEMO_STORE_NAME, 'readonly');
    const store = transaction.objectStore(MEMO_STORE_NAME);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const memos = request.result.filter(memo => memo.userId === userId);
      resolve(memos);
    };
  });
};

export const deleteMemo = async (memoId) => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MEMO_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(MEMO_STORE_NAME);
    const request = store.delete(memoId);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

export const initDB = async () => {
  await getDB();
};