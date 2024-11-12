import Cookies from 'js-cookie';

export const addToCookieArray = (name, value) => {
    let cookieArray = Cookies.getJSON(name) || [];
    cookieArray.push(value);
    Cookies.set(name, JSON.stringify(cookieArray), { expires: 7 });
};

export const getCookieArray = (name) => {
    return Cookies.getJSON(name) || [];
};