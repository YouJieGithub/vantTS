/**
 * 函数防抖
 * @param func
 * @param wait
 * @returns {function(...[*]=)}
 */
export const debounce = (func: any, wait = 750) => {
    let timeout: any;
    return function () {
        // @ts-ignore
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait);
    }
}

/**
 * 函数节流
 * @param func
 * @param wait
 * @returns {function(...[*]=)}
 */
export const throttle = (func: any, wait = 750) => {
    let prev = 0
    return function () {
        // @ts-ignore
        let context = this;
        let now = Date.now()
        if ((now - prev) >= wait) {
            func.apply(context, arguments)
            prev = Date.now()
        }
    }
}