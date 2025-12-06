import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/jannerfdb";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not found");
}

// 캐시(재연결 방지)
let cached = (global as any).mongoose || { conn: null, promise: null };

export default async function connectDB() {
  // 이미 연결되어 있으면 재사용
  if (cached.conn) return cached.conn;

  // 연결 시도
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
}

