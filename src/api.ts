import axios from 'axios'
import Cookies from 'js-cookie'

import Toast from './components/Toast'

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://api.likeyun.net' : '',
    // baseURL: 'http://192.168.0.104:8080/step',
    timeout: 5000,
})

let isConfig = true
let isError = true

let getPlanList = async () => {
    try {
        const res = await auth.getRefreshToken()
        Cookies.set('token', res.data.jwtToken, {
            domain: process.env.NODE_ENV === 'production' ? '.likeyun.net' : 'localhost',
            expires: 365,
        })
        Cookies.set('uploadToken', res.data.uploadToken, {
            domain: process.env.NODE_ENV === 'production' ? '.likeyun.net' : 'localhost',
            expires: 365,
        })
        instance.defaults.headers.common['Authorization'] = 'Basic ' + res.data.jwtToken
    } catch (error) {}
}

instance.interceptors.response.use(
    function(config) {
        if (config && config.data.code === 4205) {
            if (isConfig) {
                getPlanList()
                isConfig = false
            }
        }
        return config
    },
    function(error) {
        Toast.error('需要重新')
        // 对请求错误做些什么
        if (error && error.response.data.code === 4004) {
            if (isError) {
                Cookies.remove('token')
                Cookies.remove('uploadToken')
                window.location.href =
                    process.env.NODE_ENV === 'production' ? 'https://www.likeyun.net' : 'http://localhost:1234'
                isError = false
            }
        } else if (error && error.response.data.code === 4005) {
            Cookies.remove('token')
            Cookies.remove('uploadToken')
            window.location.href =
                process.env.NODE_ENV === 'production' ? 'https://www.likeyun.net' : 'http://localhost:1234'
            isError = false
        } else if (error && error.response.data.code === 4016) {
            Cookies.remove('token')
            Cookies.remove('uploadToken')
            window.location.href =
                process.env.NODE_ENV === 'production' ? 'https://www.likeyun.net' : 'http://localhost:1234'
            isError = false
        }
    }
)

if (isConfig) {
    if (Cookies.get('token')) {
        instance.defaults.headers.common['Authorization'] = 'Basic ' + Cookies.get('token')
    }
}

const request = {
    get: async (url: string, data?: any) => {
        try {
            const res = await instance.get(url, {
                params: data,
            })
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
    post: async (url: string, data?: object) => {
        try {
            const res = await instance.post(url, data)
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
    put: async (url: string, data?: object) => {
        try {
            const res = await instance.put(url, data)
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
    del: async (url: string) => {
        try {
            const res = await instance.delete(url)
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
}

const auth = {
    getCaptcha: () => request.get('/captchas/base64'),
    getRefreshToken: () => request.get('/refresh-token'),
    logOut: () => request.del('/logout'),
}
const user = {
    getUserInfo: () => request.get('/user-info'),
}
const admin = {
    getAdminList: (data: any) => request.get('/admin-lists', data),
}
const classTable = {
    getClassTable: () => request.get('/courses/times/using'),
    getCourses: (data: any) => request.get('/teachers/courses', data),
    getProcessingCourse: () => request.get('/teachers/courses/plan'),
}
const plan = {
    getPlanList: (data: any) => request.get('/program-lists', data),
    createPlan: (data: any) => request.post('/programs', data),
    getPlan: (id: number) => request.get(`/programs/${id}`),
    updatePlan: (data: any) => request.put('/programs/update', data),
    deletePlan: (id: number) => request.del(`/programs/${id}`),
}
const volume = {
    getVolumeList: (data: any) => request.get('/volume-lists', data),
    deleteVolume: (id: number) => request.del(`/volumes/delete/${id}`),
    getVolumeTemplateList: (data: any) => request.get('/volumes/template-lists', data),
    createVolumeTemplate: () => request.post('/volumes/template-create'),
    deleteVolumeTemplate: (id: number) => request.del(`/volumes/template-delete/${id}`),
    getVolumeTemplateDetail: (id: number) => request.get(`/volumes/template-detail/${id}`),
    updateVolumeTemplate: (data: any) => request.put('/volumes/template-update', data),
    createVolume: (data: any) => request.post('/volumes', data),
    getVolume: (id: number) => request.get(`/volumes/${id}`),
    getVolumeProblem: (id: number) => request.get(`/volumes/problem/${id}`),
    removeVolumeProblem: (data: any) => request.del(`/volumes/problem-delete/${data.volumeId}/${data.id}`),
    updateVolumeProblem: (data: any) => request.put('/volumes/problem/update', data),
    updateVolumeName: (data: any) => request.put('/volumes/update-name', data),
    getVolumeProblemAll: (id: number) => request.get(`/volumes/problem-all/${id}`),
    getVolumeOutline: (id: number) => request.get(`/volumes/outline/${id}`),
    getVolumeProblemState: (data: any) => request.get('/volumes/problem-state', data),
    getVolumeProblemSimple: (id: number) => request.get(`volumes/problem-simple/${id}`),
    updateVolumeOutline: (data: any) => request.put('/volumes/outline/update', data),
    updateVolumeFinish: (data: any) => request.put('/volumes/finish', data),
}

const exercise = {
    getProblemList: (data: any) => request.get('/problem-lists', data),
    getProblemTypeList: (data: any) => request.get('/problem-type-lists', data),
    getProblem: (id: number) => request.get(`/problems/${id}`),
    addProblem: (data: any) => request.post('/problems', data),
    editProblem: (data: any) => request.put('/problems/update', data),
}

const course = {
    getPlan: (id: string) => request.get(`/course/program/${id}`),
    getPreparation: (id: string) => request.get(`/course/preparation/${id}`),
    getPreview: (id: string) => request.get(`/course/preview/${id}`),
    getPreviewFinished: (id: string) => request.get(`/course/preview/finished/${id}`),
    getClassTest: (id: string) => request.get(`/course/quiz/${id}`),
    getQuizFinished: (id: string) => request.get(`/course/quiz/finished/${id}`),
    getTask: (id: string) => request.get(`/course/work/${id}`),
    getWorkFinished: (id: string) => request.get(`/course/work/finished/${id}`),
    getExamination: (id: string) => request.get(`/course/examination/${id}`),
    getExaminationFinished: (id: string) => request.get(`/course/examination/finished/${id}`),
    bindingPlan: (data: any) => request.post('/programs-publish/create', data),
    bindingPreview: (data: any) => request.post('/tests/4', data),
    bindingClassTest: (data: any) => request.post('/tests/1', data),
    bindingTask: (data: any) => request.post('/tests/2', data),
    bindingExamination: (data: any) => request.post('/tests/3', data),
    publishVolume: (data: any) => request.put(`/tests/publish`, data),
    testsStudentCheck: (data: any) => request.put(` /tests/students/check`, data),
    preparationCreate: (data: any) => request.post(`/preparation/create`, data),
    getVolumeLore: () => request.get(`/volumes-lore`, { page: 1, limit: 5 }),
    testOver: (id: number) => request.put(`/tests/over/${id}`),
    getStudentTest: (id: number) => request.get(`/course/student-test/${id}`),
    getStudentTestProblem: (data: any) => request.get(`/course/student-test/${data.testId}/${data.id}`),
    getTestAccuracy: (id: number) => request.get(`/tests/accuracy/${id}`),
    getTestProblem: (data: any) => request.get(`/tests/problem/${data.testId}/${data.id}`),
    getTestAcademicAnalysisVolume: (data: any) => request.get('/tests/academic-analysis/volume', data),
    getTestAcademicAnalysisStudent: (data: any) => request.get('/tests/academic-analysis/student', data),
    getWhiteBoard: (id: number) => request.get(`/black-board/get/${id}`),
    upsertWhiteBoadr: (data: any) => request.post('/black-board/upsert', data),
}
const lore = {
    getProblemLoreLlist: (problemId: number) => request.get(`/problem-lore/list/${problemId}`),
    postProblemLore: (data: any) => request.post(`/problem/${data.problemId}/lores/${data.loreId}/${data.problemType}`),
    deleteProblemLore: (data: any) => request.del(`/problem/${data.problemId}/lores/${data.loreId}`),
    getLore: (data: any) => request.get('/lore-top-ten', data),
    createLore: (data: any) => request.post('/lore/create', data),
    removeLore: (data: any) => request.del(`/lore/delete-connect/${data.id}/${data.programId}`),
}
const analysis = {
    // 获取所有知识点
    getKnowledgePoints: () => request.get('/statics/lore-list/tiled/1'),
    getTestTotalAnalysisGrade: () => request.get('/tests/total-analysis/grade'),
    getTeacherTeams: () => request.get('/teachers/teams'),
    getTeacherTotalAnalysis: (data: any) => request.get('/tests/total-analysis/class', data),
}
const point = {
    getPoints: (data?: any) => request.get('/lore-list', data),
    getTags: () => request.get('/target-list'),
}

export default {
    auth,
    user,
    admin,
    classTable,
    plan,
    volume,
    exercise,
    course,
    lore,
    analysis,
    point,
}
