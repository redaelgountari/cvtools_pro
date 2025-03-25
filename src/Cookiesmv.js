/**
 * LocalStorage utility functions for data persistence
 * 
 * localStorage is generally the better option over sessionStorage when you need
 * data to persist across browser sessions (i.e., after the browser is closed and reopened).
 */

/**
 * Saves data to localStorage with optional expiration
 * @param {string} key - The key to store the data under
 * @param {any} data - The data to store (will be JSON stringified)
 * @param {number} expiryDays - Optional number of days until data expires
 */
export function saveToStorage(key, data, expiryDays = null) {
  try {
    // Create storage object
    const storageItem = {
      data: data,
      timestamp: new Date().getTime()
    };
    
    // Add expiration if specified
    if (expiryDays !== null) {
      storageItem.expiry = new Date().getTime() + (expiryDays * 24 * 60 * 60 * 1000);
    }
    
    // Save to localStorage
    localStorage.setItem(key, JSON.stringify(storageItem));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

/**
 * Retrieves data from localStorage, checking for expiration
 * @param {string} key - The key to retrieve data for
 * @returns {any|null} - The stored data or null if not found or expired
 */
export function getFromStorage(key) {
  try {
    // Get stored item
    const storedItem = localStorage.getItem(key);
    if (!storedItem) return null;
    
    // Parse the stored data
    const storageItem = JSON.parse(storedItem);
    
    // Check if expired
    if (storageItem.expiry && storageItem.expiry < new Date().getTime()) {
      localStorage.removeItem(key); // Clean up expired item
      return null;
    }
    
    return storageItem.data;
  } catch (error) {
    console.error('Error retrieving from localStorage:', error);
    return null;
  }
}

/**
 * Removes data from localStorage
 * @param {string} key - The key to remove
 */
export function removeFromStorage(key) {
  localStorage.removeItem(key);
}

/**
 * Clears all app data from localStorage
 * @param {string} prefix - Optional prefix to limit clearing to specific keys
 */
export function clearStorage(prefix = '') {
  if (prefix) {
    // Remove only items with the specified prefix
    Object.keys(localStorage)
      .filter(key => key.startsWith(prefix))
      .forEach(key => localStorage.removeItem(key));
  } else {
    // Clear all localStorage
    localStorage.clear();
  }
}

/**
 * Checks if localStorage is available and working
 * @returns {boolean} - Whether localStorage is available
 */
export function isStorageAvailable() {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}