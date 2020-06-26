import { createEventId } from './event-utils'

export default function useCalendarHandles() {
  return {
    handleDateSelect(selectInfo: any) {
      const title = prompt('请为您的活动输入新标题')
      const calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    },

    handleEventClick(clickInfo: any) {
      if (confirm(`您确定要删除'${clickInfo.event.title}'活动吗`)) {
        clickInfo.event.remove()
      }
    },

    handleEvents(events: any) {
      console.table(events)
    }
  }
}
