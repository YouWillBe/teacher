import { observable, action } from 'mobx'
import { range } from 'ramda'
import dayjs from 'dayjs'

import api from '../api'

interface Course {
    courseId: number
    courseSection: number
    courseType: number
    courseClassTime: number
    teamId: string
    teamName: string
    teamFullName: string
    teamPeriod: number
    week: number
    weekDay: number
}
interface Class {
    id: number
    index: number
    courseTimeId: number
    duration: number
    endTime: number
    endTimeString: string
    name: string
    startTime: number
    startTimeString: string
    timeLength: number
    timeState: number
    type: number
}
interface CourseTime {
    id: number
    initWeekDay: number
    initialTime: number
    name: string
    sections: number
    state: number
    amClass: Class[]
    pmClass: Class[]
    nightClass: Class[]
}

export interface IClassTableStore {
    gettingClassTable: boolean
    gettingCourses: boolean
    classTableReady: boolean
    coursesReady: boolean
    week: number
    currentWeek: number
    courseContent: Course[]
    courseTime: CourseTime
    abscissa: string[]
    am: Class[]
    pm: Class[]
    night: Class[]
    amCourses: Course[]
    pmCourses: Course[]
    nightCourses: Course[]
    getClassTable(): Promise<void>
    nextWeek(): void
    previousWeek(): void
    resetWeek(): void
    getProcessingCourse(): Promise<void>
    comingCourse: null | Course
    processingCourse: null | Course
    gettingProcessingCourse: boolean
}

function getDate(date: any): string[] {
    return range(0, 7).map(v =>
        date
            .locale({
                weekStart: 1,
            })
            .startOf('week')
            .add(v, 'day')
            .format('MM-DD')
    )
}

class ClassTableStore implements IClassTableStore {
    @observable gettingClassTable = false
    @observable gettingCourses = false
    @observable coursesReady = false
    @observable classTableReady = false
    @observable week = 0
    @observable currentWeek = 0
    @observable courseContent = []
    @observable courseTime = {
        id: 0,
        initWeekDay: 0,
        initialTime: 0,
        name: '',
        sections: 0,
        state: 0,
        amClass: [],
        pmClass: [],
        nightClass: [],
    }
    @observable abscissa = getDate(dayjs())
    currentDate = dayjs()
    @observable am = []
    @observable pm = []
    @observable night = []
    @observable amCourses = []
    @observable pmCourses = []
    @observable nightCourses = []
    @observable gettingProcessingCourse = false
    @observable comingCourse: null | Course = null
    @observable processingCourse: null | Course = null

    @action resetWeek() {
        this.week = this.currentWeek
        this.getCourses(this.currentWeek)
    }
    @action async getCourses(week: number) {
        this.gettingCourses = true
        try {
            const res = await api.classTable.getCourses({
                week: week,
            })
            if (res.success) {
                console.log(res)
                this.amCourses = res.data.filter((v: Course) => v.courseType === 1)
                this.pmCourses = res.data.filter((v: Course) => v.courseType === 2)
                this.nightCourses = res.data.filter((v: Course) => v.courseType === 3)
                this.gettingCourses = false
                this.coursesReady = true
            }
        } catch (error) {}
    }
    @action async getClassTable() {
        if (!this.classTableReady) {
            this.gettingClassTable = true
            try {
                const res = await api.classTable.getClassTable()
                if (res.success) {
                    this.gettingClassTable = false
                    this.classTableReady = true
                    this.week = res.data.week
                    this.currentWeek = res.data.week
                    this.courseContent = res.data.courseContent
                    this.courseTime = res.data.courseTime
                    this.am = res.data.courseTime.amClass
                    this.pm = res.data.courseTime.pmClass
                    this.night = res.data.courseTime.nightClass
                    this.getCourses(res.data.week)
                }
            } catch (error) {}
        }
    }
    @action previousWeek() {
        this.week = this.week - 1
        this.abscissa = getDate(this.currentDate.subtract(7, 'day'))
        this.currentDate = this.currentDate.subtract(7, 'day')
        this.getCourses(this.week)
    }
    @action nextWeek() {
        this.week = this.week + 1
        this.abscissa = getDate(this.currentDate.add(7, 'day'))
        this.currentDate = this.currentDate.add(7, 'day')
        this.getCourses(this.week)
    }
    @action async getProcessingCourse() {
        this.gettingProcessingCourse = true
        try {
            const res = await api.classTable.getProcessingCourse()
            console.log('processing', res)
            if (res.success) {
                this.comingCourse = res.data.plan
                this.processingCourse = res.data.underway
                this.gettingProcessingCourse = false
            }
        } catch (error) {}
    }
}

export const classTableStore = new ClassTableStore()
