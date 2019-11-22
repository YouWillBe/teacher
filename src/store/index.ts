import { userStore, IUserStore } from './user'
import { classTableStore, IClassTableStore } from './classTable'
import { planStore, IPlanStore } from './plan'
import { volumeStore, IVolumeStore } from './volume'
import { courseIndexStore, ICourseIndexStore } from './course/index'
import { coursePlanStore, ICoursePlanStore } from './course/plan'
import { coursePreparationStore, ICoursePreparationStore } from './course/preparation'
import { coursePreviewStore, ICoursePreviewStore } from './course/preview'
import { courseClassTestStore, ICourseClassTestStore } from './course/classTest'
import { courseTaskStore, ICourseTaskStore } from './course/task'
import { courseExaminationStore, ICourseExaminationStore } from './course/examination'
import { exerciseStore, IExerciseStore } from './exercise'
import { analysisStore, IAnalysisStore } from './analysis'

import {pointStore, IPointStore} from './point'

export interface IStore {
    userStore: IUserStore
    classTableStore: IClassTableStore
    planStore: IPlanStore
    volumeStore: IVolumeStore
    courseIndexStore: ICourseIndexStore
    coursePlanStore: ICoursePlanStore
    coursePreparationStore: ICoursePreparationStore
    coursePreviewStore: ICoursePreviewStore
    courseClassTestStore: ICourseClassTestStore
    courseTaskStore: ICourseTaskStore
    courseExaminationStore: ICourseExaminationStore
    exerciseStore: IExerciseStore
    analysisStore: IAnalysisStore
    pointStore: IPointStore
}

export const store: IStore = {
    userStore,
    classTableStore,
    planStore,
    volumeStore,
    courseIndexStore,
    coursePlanStore,
    coursePreparationStore,
    coursePreviewStore,
    courseClassTestStore,
    courseTaskStore,
    courseExaminationStore,
    exerciseStore,
    analysisStore,
    pointStore
}
