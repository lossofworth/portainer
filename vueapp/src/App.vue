<script setup>
import { onMounted, ref } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'

const date = ref(Date())

const mood = ref([])
const anxrate = ref([])
const irtrate = ref([])
const sleephr = ref()
const took_meds = ref()
const notes = ref()

const retrievedEntry = ref([])

onMounted(async () => {
  const today = new Date()
  const formatedDate = today.toLocaleDateString('en-us')
  try {
    const response = await fetch('/api/entry/user/1/date/' + formatedDate)
    retrievedEntry.value = await response.json()
  } catch (error) {
    console.error('Failed to retrieve entry:', error)
  }
})

function dateChanged() {
  console.log('datehasbeenupdated'+date.modelValue)
}


</script>

<template>
  <div class="container">
    <h1 class="wrapper">Mood Tracker</h1>
    <VueDatePicker id='datepicker' class='wrapper' v-model='date' :time-config='{ enableTimePicker: false }' ref="datepicker" @vue:updated="dateChanged"/>
  </div>
</template>


