<template>
  <div class="home">
    <el-table
      :data="tableData"
      style="width: 100%"
      @select="handleSelect"
      ref="tableRef"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>

    <el-table :data="selectedData" style="width: 100%">
      <el-table-column label="Action" width="70">
        <template slot="header">
          <i class="el-icon-delete" @click="selectedData = []"></i>
        </template>

        <template slot-scope="{ row }">
          <i class="el-icon-delete" @click="handleDelete(row)"></i>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'
import { differenceBy, unionBy } from 'lodash-es'
import { Table } from 'element-ui'

interface User {
  id: string
  date: string
  name: string
  address: string
}

export default defineComponent({
  setup() {
    const tableData = ref<User[]>([
      {
        id: '1',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        id: '2',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        id: '3',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        id: '4',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }
    ])

    const selectedData = ref<User[]>([])

    const selection = ref<User[]>([])

    const tableRef = ref<Table>(null)

    function addItem(list: User[]) {
      selectedData.value = unionBy([...selectedData.value, ...list], 'id')
    }

    function removeItem(list: User[]) {
      selectedData.value = selectedData.value.filter(
        ({ id }) => !list.find(item => id === item.id)
      )
    }

    watch(selection, (newValue, oldValue) => {
      if (!oldValue) {
        return
      }

      if (newValue.length > oldValue.length) {
        const list = differenceBy(newValue, oldValue, 'id')
        addItem(list)
      } else if (newValue.length < oldValue.length) {
        const list = differenceBy(oldValue, newValue, 'id')
        removeItem(list)
      }
    })

    function handleDelete(item: User) {
      const index = selectedData.value.findIndex(({ id }) => id === item.id)

      if (index < 0) {
        return
      }

      selectedData.value.splice(index, 1)

      const toggleItem = tableData.value.find(({ id }) => id === item.id)

      if (toggleItem) {
        tableRef.value && tableRef.value.toggleRowSelection(toggleItem, false)
      }
    }

    function handleSelect(selections: User[]) {
      selection.value = selections.slice()
    }

    return { tableData, selectedData, tableRef, handleDelete, handleSelect }
  }
})
</script>
