'use client'


export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('ACCESS_TOKEN');
}


export const removeTokenFromLocalStorage = () => {
    return localStorage.removeItem('ACCESS_TOKEN');
}

// export const saveToLocalStorage = (value) => {
//     localStorage.setItem('myKey', value);
// };

