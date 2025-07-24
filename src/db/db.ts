import { openDB } from "idb";

export interface ScoreEntry {
  id: string;
  correct: number;
  percentage: number;
  averageTime: number;
  level: string;
  date: string;
}

export const initDB = () => {
  return openDB("strooper-db", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("scores")) {
        const store = db.createObjectStore("scores", { keyPath: "id" });
        store.createIndex("percentage", "percentage");
      }
    },
  });
};

export const addScore = async (entry: ScoreEntry) => {
  const db = await initDB();

  const existing = await db.get("scores", entry.id);
  if (existing) return;

  await db.add("scores", entry);
};

export const getTopScores = async (limit = 5): Promise<ScoreEntry[]> => {
  const db = await initDB();
  const tx = db.transaction("scores", "readonly");
  const store = tx.objectStore("scores");
  const index = store.index("percentage");

  const all = await index.getAll();

  return all.sort((a, b) => b.percentage - a.percentage).slice(0, limit);
};
