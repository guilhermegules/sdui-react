const DB_NAME = "serverDrivenUI";
const STORE_NAME = "schemas";
const VERSION = 1;

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);

    request.addEventListener("upgradeneeded", () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    });

    request.addEventListener("success", () => resolve(request.result));

    request.addEventListener("error", () => reject(request.error));
  });
}

export async function saveSchema(id: string, data: unknown): Promise<void> {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  store.put({ id, data });

  return new Promise((resolve, reject) => {
    transaction.addEventListener("complete", () => resolve());
    transaction.addEventListener("error", () => reject(transaction.error));
  });
}

export async function getSchema(id: string): Promise<unknown | null> {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.get(id);

  return new Promise((resolve, reject) => {
    request.addEventListener("success", () =>
      resolve(request.result?.data ?? null)
    );
    request.addEventListener("error", () => reject(request.error));
  });
}
