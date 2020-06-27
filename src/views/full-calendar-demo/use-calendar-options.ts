import { ref, watch } from '@vue/composition-api'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS } from './event-utils'
import useCalendarHandles from './use-calendar-handles'
import esLocale from '@fullcalendar/core/locales/es-us'
import zhLocale from '@fullcalendar/core/locales/zh-cn'
import events from './events'

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
      center: 'timeGrid,timeGridWeek',
      right: ''
    },
    firstDay: 1,
    initialView: 'timeGridWeek',
    locaels: [esLocale, zhLocale],
    locale: 'zh-cn',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed

    events,
    allDaySlot: false,
    slotEventOverlap: false,
    slotDuration: '00:10:00',
    slotLabelInterval: { hours: 1 },
    scrollTime: '00:00:00',
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false
    },
    editable: true,
    selectable: true,
    selectMirror: true,
    weekends: true,
    dayMaxEventRows: true, // for all non-TimeGrid views
    views: {
      timeGrid: {
        dayMaxEventRows: 3 // adjust to 6 only for timeGridWeek/timeGridDay
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
