import { observable, action } from 'mobx'
import Cookies from 'js-cookie'

import api from '../api'

interface IUserInfo {
    id: number
    username: string
    realName: string
    subjectName: string
    schoolName: string
}

export interface IUserStore {
    userInfoReady: boolean
    username: string
    userInfo: IUserInfo
    getUserInfo(): Promise<void>
    logOut(): Promise<void>
}

class UserStore implements IUserStore {
    @observable userInfoReady = false
    @observable username = Cookies.get('username') || ''
    @observable userInfo: IUserInfo = {
        id: -1,
        username: '',
        realName: '',
        subjectName: '',
        schoolName: '',
    }
    token = Cookies.get('token')

    @action async getUserInfo() {
        if (!this.userInfoReady) {
            try {
                const res = await api.user.getUserInfo()
                if (res.success) {
                    this.userInfo = res.data
                    this.userInfoReady = true
                }
            } catch (error) {}
        }
    }
    @action async logOut() {
        try {
            const res = await api.auth.logOut()
            if (res.success) {
                Cookies.remove('token')
                Cookies.remove('uploadToken')
                window.location.href =
                    process.env.NODE_ENV === 'production' ? 'https://www.likeyun.net' : 'http://localhost:1234'
            }
        } catch (error) {}
    }
}

export const userStore = new UserStore()
