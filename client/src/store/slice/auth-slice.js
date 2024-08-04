// import { userInfo } from "os";

export const createAuthSlice = (set) => ({
    userInfo:undefined,
    setUserInfo:(userInfo) => set({userInfo})
})