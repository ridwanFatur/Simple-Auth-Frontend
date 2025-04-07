import { STORAGE_KEY } from "@/config";

export interface StorageData {
  accessToken?: string;
  refreshToken?: string;
}

function getStorageData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as StorageData;
}

export function getStorageValue<T>(key: keyof StorageData) {
  return getStorageData()[key] as T;
}

export function setStorageValue(value: Partial<StorageData>) {
  const data = getStorageData();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, ...value }));
}

export function useLocalStorage() {
  function get<T>(key: keyof StorageData) {
    return getStorageValue<T>(key);
  }

  function set(value: Partial<StorageData>) {
    setStorageValue(value);
  }

  return {
    get,
    set,
  };
}
