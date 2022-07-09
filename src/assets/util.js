function roundUp(num, precision = 4) {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
}

const indexContains = (list, item) => {
    for (var i = 0; i < list.length; i++) {
        if (list[i] === item) {
            return i;
        }
    }

    return -1;
};

export function findIndexOption(options, event) {
    for (let i = 0; i, options.length; i++) {
        if (event.target.options[i].selected === true) {
            return event.target.options[i];
        }
    }
    return -1;
}

export { roundUp, indexContains };
