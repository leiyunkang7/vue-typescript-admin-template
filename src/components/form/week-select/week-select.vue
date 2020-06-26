<template>
  <div class="week-select">
    <el-button @click="preveWeek">上一周</el-button>
    <el-date-picker
      v-model="selfValue"
      type="week"
      format="yyyy 第 WW 周"
      placeholder="选择周"
    >
    </el-date-picker>
    <el-button @click="nextWeek">下一周</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import { DatePicker } from 'element-ui'
import { dayjs } from '@u3u/vue-hooks'

export default defineComponent({
  name: 'WeekSelect',

  props: {
    value: {
      type: Date,
      required: true
    }
  },

  components: {
    'el-date-picker': DatePicker
  },

  setup(props, context) {
    const selfValue = computed<Date>({
      get() {
        return (props.value as any) as Date
      },
      set(val) {
        context.emit('input', val)
      }
    })
    return {
      selfValue,
      preveWeek() {
        selfValue.value = dayjs(selfValue.value)
          .subtract(1, 'week')
          .toDate()
      },
      nextWeek() {
        selfValue.value = dayjs(selfValue.value)
          .add(1, 'week')
          .toDate()
      }
    }
  }
})
</script>

<style lang="less" scoped>
.week-select {
}
</style>
