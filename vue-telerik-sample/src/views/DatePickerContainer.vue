<template>
    <div>
        <Datepicker :date="new Date(1739323800000)"  :fullDayTimeFormat="isFullDayTimeFormat" :dateOnly="false" :mindatetime="minDateTime" :maxdatetime="undefined"/>
    </div>
</template>
<script lang="ts">
import {Component, toNative, Vue} from 'vue-facing-decorator';
import Datepicker from '@/components/Datepicker.vue';
@Component({
    components: {
        Datepicker
    }
})
class DatePickerContainer extends Vue {
    private minDateTime = new Date();
    private maxDateTime = new Date(
      new Date().setDate(new Date().getDate() + 5),
    );
    private isFullDayTimeFormat = false;
    mounted() {
        this.CheckTimeFormat();
    }
    private CheckTimeFormat() {
    const date = new Date();
    const dateString = date.toLocaleTimeString();
    if (dateString.match(/am|pm/i) || date.toString().match(/am|pm/i) ) {
      // 12 hour clock
      this.isFullDayTimeFormat = false;
    } else {
      // 24 hour clock
      this.isFullDayTimeFormat = true;
    }
  }
}
export default toNative(DatePickerContainer);
</script>