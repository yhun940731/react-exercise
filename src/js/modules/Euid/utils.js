  /* -------------------------------------------------------------------------- */
  // 타입 검사 유틸리티

  const typeIs = data => {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  };

  const isNumber = data => {
    return typeIs(data) === 'number';
  };

  const isString = data => {
    return typeIs(data) === 'string';
  };

  const isBoolean = data => {
    return typeIs(data) === 'boolean';
  };

  const isFunction = data => {
    return typeIs(data) === 'function';
  };

  const isArray = data => {
    return typeIs(data) === 'array';
  };

  const isObject = data => {
    return typeIs(data) === 'object';
  };

  /* -------------------------------------------------------------------------- */
  // 배열 유틸리티

  const makeArray = likeArray => {
    return Array.prototype.slice.call(likeArray);
  };

  /* -------------------------------------------------------------------------- */
  // 시리얼라이즈 유틸리티
  
  const serialize = (data, prettiy) => {
    return !prettiy ? JSON.stringify(data) : JSON.stringify(data, null, 2) 
  }

  const deserialize = json => {
    return JSON.parse(json)
  }

  /* -------------------------------------------------------------------------- */
  // 믹스인 유틸리티

  const mixins = (...arg) => {
    return makeArray(arg).reduce((o1, o2) => {
      for (let key in o2) {
        if (o2.hasOwnProperty(key)) {
          let o1Value = o1[key];
          let o2Value = o2[key];
          if (isObject(o2Value)) {
            o1Value && _checkValueType(isObject, o1Value, key)
            o1[key] = mixins(o1Value || {}, o2Value);
          } 
          else if (isArray(o2Value)) {
            o1Value && _checkValueType(isArray, o1Value, key)
            o1[key] = (o1Value || []).concat(o2Value);
          } 
          else {
            o1[key] = o2Value;
          }
        }
      }
      return o1;
    }, {});
  };

  const _checkValueType = (method, value, key) => {
    if (!method(value)) {
      let message = '혼합할 각 객체 ' + key + ' 속성 유형이 다릅니다.';
      if (Euid.logger) {
        Euid.logger.error(message)
      } else {
        throw new Error(message);
      }
    }
  }

  /* -------------------------------------------------------------------------- */
  // 모듈 내보내기

  export default {
    typeIs: typeIs,
    isNumber: isNumber,
    isString: isString,
    isBoolean: isBoolean,
    isFunction: isFunction,
    isArray: isArray,
    isObject: isObject,
    makeArray: makeArray,
    serialize: serialize,
    deserialize: deserialize,
    mixins: mixins,
  };
