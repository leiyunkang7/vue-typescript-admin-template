<template>
  <div class="calendar-demo">
    <calendar
      class="calendar"
      :week="{
        startDayOfWeek: 1,
        daynames: [
          '星期日',
          '星期一',
          '星期二',
          '星期三',
          '星期四',
          '星期五',
          '星期六'
        ]
      }"
      :taskView="false"
      :scheduleView="['time']"
      :template="template"
      :schedules="scheduleList"
      :usageStatistics="false"
      :theme="myTheme"
      @beforeCreateSchedule="onBeforeCreateSchedule"
      @beforeDeleteSchedule="onBeforeDeleteSchedule"
    >
    </calendar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { Calendar } from '@toast-ui/vue-calendar'
import 'tui-calendar/dist/tui-calendar.css'
// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import myTheme from './myTheme'
import { uniqueId } from 'lodash-es'

export default defineComponent({
  name: 'CalendarDemo',

  components: {
    Calendar
  },

  setup() {
    const template = ref({
      weekDayname(a: any) {
        return `<div>${a.dayName}\r(18)</div>`
      },
      milestone: function(schedule: any) {
        return (
          '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' +
          schedule.bgColor +
          '">' +
          schedule.title +
          '</span>'
        )
      }
    })

    const scheduleList = ref([
      {
        id: '1',
        calendarId: '1',
        title: 'my schedule',
        category: 'time',
        dueDateClass: '',
        start: '2020-06-25T03:30:00+08:00',
        end: '2020-06-25T05:30:00+08:00'
      },
      {
        id: '2',
        calendarId: '1',
        title: 'second schedule',
        category: 'time',
        dueDateClass: '',
        start: '2020-06-25T04:30:00+08:00',
        end: '2020-06-25T06:31:00+08:00'
      }
    ])

    return {
      template,
      scheduleList,
      myTheme,
      onBeforeCreateSchedule(e: any) {
        scheduleList.value.push({
          id: uniqueId(),
          calendarId: '1',
          title: e.title,
          category: 'time',
          dueDateClass: '',
          start: e.start,
          end: e.end
        })
      },
      onBeforeDeleteSchedule(res: any) {
        const index = scheduleList.value.findIndex(
          item => item.id === res.schedule.id
        )
        scheduleList.value.splice(index, 1)
      }
    }
  }
})
</script>

<style lang="less" scoped>
.calendar-demo {
  .calendar {
    height: 800px;
  }
}
</style>
