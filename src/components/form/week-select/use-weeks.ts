import { ref, computed } from '@vue/composition-api'
import { dayjs } from '@u3u/vue-hooks'

export function useWeeks() {
  const date = ref(new Date())

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
