export const loadState = (stateKey) => {
  try {
    const serializedState = localStorage.getItem(stateKey);
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
};

export const saveState = (stateKey, stateValue) => {
  try {
    if (stateValue === null) {
      localStorage.removeItem(stateKey);
    } else {
      const serializedState = JSON.stringify(stateValue);
      localStorage.setItem(stateKey, serializedState);
    }
  } catch (err) {
    alert(
      `Failed to persist ${stateKey}: ${stateKey} will be reset when browser is refreshed.`
    );
  }
};

export const removeState = (stateKey) => localStorage.removeItem(stateKey);
