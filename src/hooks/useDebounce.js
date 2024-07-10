function debounce(cb, delay){
    let timer;
    return function(...args){
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            cb(...args)

        }, delay)
    }
}

export default debounce