import { ref } from '@vue/composition-api'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS } from './event-utils'
import useCalendarHandles from './use-calendar-handles'

export default function useCalendarOptions() {
  const {
    handleDateSelect,
    handleEventClick,
    handleEvents
  } = useCalendarHandles()

  const calendarOptions = ref({
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin // needed for dateClick
    ],
    headerToolbar: {
      left: '',
      center: '',
      right: ''
    },
    initialView: 'timeGridWeek',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    allDaySlot: false,
    slotEventOverlap: false,
    slotDuration: '00:10:00',
    slotLabelInterval: { hours: 1 },
    locale: 'en-GB',
    scrollTime: '00:00',
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false
    },
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    columnHeaderHtml(date: Date) {
      if (date.getUTCDay() === 5) {
        return '<b>Friday!</b>'
      } else {
        return '<i>other day</i>'
      }
    },
    select: handleDateSelect,
    eventClick: handleEventClick,
    eventsSet: handleEvents
    /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
  })

  return { calendarOptions }
}
