import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { parse } from "@babel/core";

export const PASSKEY_STORAGE_KEY = "user_passkey";
export const ACCOUNT_ADDRESS_STORAGE_KEY = "account_address";
export const HISTORY_STORAGE_KEY = "history";

export function useSecureStore(key: string) {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  // Load data from secure storage
  const loadData = async () => {
    try {
      setIsLoading(true);
      const storedData = await SecureStore.getItemAsync(key);
      // console.log({storedData});
      if (storedData) {
        setData(storedData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async (newData: string) => {
    try {
      await SecureStore.setItemAsync(key, newData);
      // console.log({newData});
      setData(newData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save data");
      throw err;
    }
  };

  const saveHistoryData = async (newData: string) => {
    try {
      let history: string[] = [];

      // Check if `data` exists and parse it
      if (data) {
        history = JSON.parse(data);
      }
  
      // Ensure `history` is an array
      if (!Array.isArray(history)) {
        history = [];
      }
      console.log({data});
      // Push new data to history
      history.push(newData);
      console.log({history});
      // Store updated history as a JSON string
      await SecureStore.setItemAsync(key, JSON.stringify(history));
  
      // Update state with the new history array
      setData(JSON.stringify(history));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save data");
      throw err;
    }
  };

  const removeData = async () => {
    try {
      await SecureStore.deleteItemAsync(key);
      setData(undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove data");
      throw err;
    }
  };

  // Load data from secure storage on mount
  useEffect(() => {
    loadData();
  }, []);

  return {
    data,
    isLoading,
    error,
    saveData,
    saveHistoryData,
    removeData,
    loadData,
  };
}
