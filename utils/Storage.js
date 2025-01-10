import _set from 'lodash/set';
import _get from 'lodash/get';


const engine = () => localStorage;

const removeFromObject = (key, dataKey) => {
    addToObject(key, dataKey, undefined);
}

const addToObject = (key, dataKey, data) => {
    let obj = getData(key, {});
    _set(obj, dataKey, data);
    setData(key, obj);
    return obj;
}

const setData = (key, value) => {
    engine().setItem(key, valueToString(value))
}

const getData= (key, defaultValue="") => {
    return restoreValue(engine().getItem(key)) || defaultValue;
}

const valueToString = (value) => {
    const type = typeof value;
    switch (type) {
      case "function":
        return value.toString();
      case "object":
      case "array":
        return JSON.stringify(value || {});
      default:
        return String(value);
    }
  };
  
  const restoreValue = (value) => {
    const type = typeof value;
    if (type === "string") {
      if (value === "true") {
        return true;
      }
      if (value === "false") {
        return false;
      }
      if (!isNaN(value)) {
        return Number(value);
      }
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return value;
  };
  
  const removeData = (key) => {
    engine().removeItem(key);
  };
  
  const destroy = () => {
    engine().clear();
  };
  
  const Storage = {
    engine,
    removeFromObject,
    getFromObject,
    addToObject,
    setData,
    getData,
    valueToString,
    restoreValue,
    removeData,
    destroy,
  };
  
  export default Storage;
  