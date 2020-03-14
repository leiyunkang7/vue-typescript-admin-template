import { throttle } from 'lodash-es'
import { ref, Ref } from '@vue/composition-api'
import useEvent from './use-event'

export default function useOnScroll(el?: Ref<any>) {
  let eventEl
  let scrollEl: HTMLElement
  if (el) {
    eventEl = ref(el.value)
    scrollEl = el.value
  } else {
    eventEl = ref(window)
    scrollEl = document.documentElement
  }

  const scrollY = ref(0)
  const scrollX = ref(0)

  const handler = throttle(() => {
    scrollY.value = scrollEl.scrollTop
    scrollX.value = scrollEl.scrollLeft
  }, 50)

  const remove = useEvent(eventEl, 'scroll', handler)

  return {
    scrollX,
    scrollY,
    remove
  }
}
