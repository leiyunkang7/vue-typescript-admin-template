import {
  ref,
  onMounted,
  watch,
  Ref,
  SetupContext,
  computed
} from '@vue/composition-api'

export default function useCalendarRef({
  week,
  context
}: {
  week: Ref<Date>
  context: SetupContext
}) {
  const calendarRef = ref<any>(null)

  const calendar = computed(() => calendarRef.value?.getApi())

  const win: any = window

  win.calendarRef = calendarRef

  onMounted(() => {
    watch(
      week,
      week => {
        calendar.value.gotoDate(week)
      },
      { immediate: true }
    )

    // 切换国际化
    watch(
      () => context.root.$i18n.locale,
      locale => {
        calendar.value.setOption('locale', locale)
      }
    )
  })
  return { calendarRef }
}
