import useScroll from './use-scroll'
import { watch } from '@vue/composition-api'

export default function useEndOfPage(cb: Function, margin = 100) {
  const { scrollY } = useScroll()

  watch(scrollY, (newY: number, oldY: number) => {
    // return if already loading or scrolling up
    if (newY < oldY) return

    const isBottom =
      document.documentElement.scrollHeight - (window.innerHeight + newY) <
      margin
    // if we reached the bottom of the page ...
    // select the next page
    isBottom && cb()
  })
}
