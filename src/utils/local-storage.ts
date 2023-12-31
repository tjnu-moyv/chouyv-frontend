/**
 * 默认过期时间
 * @type {number}
 */
const hoursToAdd = 2
const overdueSecondDefault: () => number = () => Date.now() / 1000 + 3600 * hoursToAdd;

/**
 * 设置localStorage
 * <li>只有key不为空时将key对应的值清空</li>
 * <li>只有overdueSecond为空时将value添加到key对应的位置中 并设置默认的过期时间为一小时</li>
 * <li>都不为空时将值设置过期时间放入</li>
 * @param key           键
 * @param value         值 可空
 * @param overdueSecond 过期时间 可空
 */
const setLocalStorage = (key: string, value: string, overdueSecond?: number) => {
  if (!value) {
    // 移除
    localStorage.removeItem(key);
  } else {
    const exp = overdueSecond || overdueSecondDefault();
    localStorage[key] = JSON.stringify({
      value,
      exp
    });
  }
}

/**
 * 通过key获取值
 * @param {string} key 键
 * @return {any}
 */
const getLocalStorage = (key: string): string | null => {
  try {
    let target = JSON.parse(localStorage[key]);
    if (!target) {
      // 获取不到
      return null
    }
    if (target.exp < (Date.now() / 1000)) {
      // 过期了 移除
      localStorage.removeItem(key)
      return null
    }
    // 正常返回
    return JSON.parse(target.value)
  } catch (e) {
    return localStorage.getItem(key)
  }
}

export {
  getLocalStorage,
  setLocalStorage
}
