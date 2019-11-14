//禁止频繁点击
import Toast from '../components/Toast'
let preDate = 0
export default function frequently(func: () => void, wait: number) {
    return () => {
        let now = Date.now()
        if (now - preDate >= wait) {
            func()
            preDate = Date.now()
        } else {
            Toast.warning('点击太频繁')
        }
    }
}
