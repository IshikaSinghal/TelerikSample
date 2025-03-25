<template>
    <div>
        <Datepicker :date="new Date(1739323800000)" :fullDayTimeFormat="true" :dateOnly="false" :mindatetime="minDateTime" :maxdatetime="undefined"/>
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
}
export default toNative(DatePickerContainer);
</script>