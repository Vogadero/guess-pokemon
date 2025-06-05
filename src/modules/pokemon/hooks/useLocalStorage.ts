import { ref, watch } from 'vue';

// 添加深度合并函数
function deepMerge(target: any, source: any) {
  if (typeof target !== 'object' || target === null) return source;
  if (typeof source !== 'object' || source === null) return target;

  const merged = { ...target };

  Object.keys(source).forEach((key) => {
    if (source[key] instanceof Object && key in target) {
      merged[key] = deepMerge(target[key], source[key]);
    } else {
      merged[key] = source[key];
    }
  });

  return merged;
}
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(defaultValue);

  // 在函数调用时立即加载而不是等待onMounted
  const load = () => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        // 使用深度合并
        data.value = deepMerge(
          defaultValue, 
          JSON.parse(storedValue)
        );
      }
    } catch (error) {
      console.error(`Error parsing localStorage item "${key}":`, error);
      // 解析失败时回退到默认值
      data.value = defaultValue;
    }
  };

  // 立即执行加载
  load();

  // 保存到本地存储
  const save = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage "${key}":`, error);
    }
  };

  // 可选：自动监听变化并保存
  const autoSave = () => {
    watch(
      data,
      (newValue) => {
        save(newValue);
      },
      { deep: true }
    );
  };

  return {
    data,
    load,
    save,
    autoSave
  };
}
