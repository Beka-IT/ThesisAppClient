type key = 'profile' | 'sidebar';

export const useSessionStorage = (name: key) => {
  const setItem = (data: string | object) => {
    let storageValue: string;
    if (typeof data === 'string') {
      storageValue = data;
    } else {
      storageValue = JSON.stringify(data);
    }

    sessionStorage.setItem(name, storageValue);
  };

  const getItem = () => {
    const storageValue = sessionStorage.getItem(name);

    if (storageValue) {
      try {
        return JSON.parse(storageValue);
      } catch (e) {
        return storageValue;
      }
    }
    return null;
  };

  const removeItem = () => {
    sessionStorage.removeItem(name);
  };
  return {
    setItem,
    getItem,
    removeItem,
  };
};
