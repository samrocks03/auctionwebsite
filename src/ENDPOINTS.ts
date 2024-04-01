const localhost = "http://localhost:8080/";
export const LOGIN_API = `${localhost}login` //login for everyone


export const SIGNUP_API = `${localhost}user/signup` // signup for user only
export const ARTWORKS_API = `${localhost}artworks?start=0&count=40`

export const POST_ARTWORKS_API = `${localhost}artwork/create`
export const POST_BID_API = `${localhost}bid/create`
export const LOGOUT_API = `${localhost}logout`
export const DELETE_BID_API = `${localhost}artwork`


// admin api's
export const SHOW_USERS_API = `${localhost}users?start=0&count=100&role=user`
export const ADMIN_SIGNUP_API = `${localhost}admin/signup` //SIGNUP FOR admin only


