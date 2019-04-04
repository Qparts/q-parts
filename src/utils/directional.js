export const left = (direction) => {
    return direction === 'ltr' ? 'left' : 'right'
}

export const right = (direction) => {
    return direction === 'ltr' ? 'right' : 'left'
}

export const paddingLeft = (direction) => {
    return direction === 'ltr' ? 'padding-left' : 'padding-right'
}
export const paddingRight = (direction) => {
    return direction === 'ltr' ? 'padding-right' : 'padding-left'
}

export const l = (direction) => {
    return direction === 'ltr' ? 'l' : 'r';
}

export const r = (direction) => {
    return direction === 'ltr' ? 'r' : 'l';
}

export const sideValues = (direction, values) => {
    const unite = 'px';
    return direction === 'ltr' ?
        `${values[0]}${unite} ${values[1]}${unite} ${values[2]}${unite} ${values[3]}${unite}` : `${values.join(`${unite} `)}${unite}`;
}

export const cornerValues = (direction, values) => {
    const unite = 'px';
    if (direction === 'rtl') {
        return values.length === 2 ? `${values[1]}${unite} ${values[0]}${unite}` :
            values.length === 3 ? `${values[1]}${unite} ${values[0]}${unite} ${values[1]}${unite} ${values[2]}${unite}` :
                `${values[1]}${unite} ${values[0]}${unite} ${values[3]}${unite} ${values[2]}${unite}`
    } else {
        return `${values.join(`${unite} `)}${unite}`;
    }
}
