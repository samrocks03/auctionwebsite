// const storagePrefix = '';

const storage = {
    getToken: () => {
        return window.localStorage.getItem(`token`)
    },
    // setToken: (token: string) => {
    //     window.localStorage.setItem(`token`, JSON.stringify(token));
    // },
    clearToken: () => {
        window.localStorage.removeItem(`token`);
    },
    authStatus: () => {
        const abc = window.localStorage.getItem(`token`)
        console.log("abc-->", abc);
        return abc ? true : false
    }
};

export default storage; 