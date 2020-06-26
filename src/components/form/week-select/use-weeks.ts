import { ref, computed } from '@vue/composition-api'
import { dayjs } from '@u3u/vue-hooks'

export function useWeeks() {
  const date = ref(
    new Date('native Date Tue Apr 03 2018 00:00:00 GMT+0800 (中国标准时间)')
  )

  return {
    date,
    startDateString: computed(() =>
      dayjs(date.value)
        .startOf('week')
        .format('YYYY-MM-DD')
    ),
    endDateString: computed(() =>
      dayjs(date.value)
        .endOf('week')
        .format('YYYY-MM-DD')
    )
  }
}
