const calculateRem = (size) => {
    const remSize = size / 16;
    return `${remSize * 1}rem`;
}

export const fontSize = (size) => {
    return calculateRem(size);
}