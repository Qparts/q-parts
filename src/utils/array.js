export const isEmpty = (array) => {
    return array ? array.length === 0 : -1;
}

export const filterObject = (array, key) => {
    let newArray = [];
    array.forEach(filter => {
        newArray.push({
            [key]: filter[key],
        })
    });
    return newArray;
}

export const shiftArrayToRight = (arr, places) => {
    for (var i = 0; i < places; i++) {
        arr.unshift(arr.pop());
    }
}

export const toUpperCaseForEach = (array) => {
    const upperCaseArray = array.map(string => {
        return string.replace(/^\w/, c => c.toUpperCase());
    });
    return upperCaseArray;
}

export const replaceAll = (array, searchValue, replaceValue) => {
    const replace = array.map(string => {
        return string.replace(searchValue, replaceValue);
    });
    return replace;
}

export const getLength = (array) => (
    array ? array.length : 0
)

export const binarySearch = (arr, x) => {
    let start = 0;
    let end = arr.length - 1;

    // Iterate while start not meets end 
    while (start <= end) {

        // Find the mid index 
        let mid = Math.floor((start + end) / 2);

        // If element is present at mid, return it 
        if (arr[mid].id === x) return arr[mid];

        // Else look in left or right half accordingly 
        else if (arr[mid].id < x)
            start = mid + 1;
        else
            end = mid - 1;
    }

    return false;
}
