<template>
    <localization :language="selectedLocale.language">
        <intl :locale="selectedLocale.locale">
            <div class="example-wrapper">
                <div class="col-xs-12 col-md-12 example-config">
                    <h6>
                        Locale:
                        <dropdownlist :style="{ width: '230px' }" :value="selectedLocale" :data-items="locales"
                            :text-field="'locale'" @change="Change" />
                    </h6>
                </div>
                <div class="datepicker-container">
                    <date-picker v-if="dateOnly" v-model="bindedDate" class="date-picker" :format="GetDateFormat()"
                        :min="localmindatetime" :min-time="localMinTime" :max="localmaxdatetime"
                        :max-time="localMaxTime" :validityStyles="false" @change="SetDateTime" />
                    <DateTimePicker v-else v-model="bindedDate" class="date-picker" :disabled="disable"
                        :format="GetDateFormat()" :min="localmindatetime" :min-time="localMinTime"
                        :max="localmaxdatetime" :max-time="localMaxTime" :validityStyles="false"
                        :icon="'custom-icon-class'" @change="SetDateTime" />
                    <teleport v-if="isMounted" to=".k-svg-i-calendar"><img :src="iconurl" /></teleport>
                </div>
                <div>
                    <h2>Result:</h2>
                    <p>{{ bindedDate }}</p>
                </div>
            </div>
        </intl>
    </localization>
</template>
<script lang="ts">
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator';
import { DatePicker, DateTimePicker, TimePicker } from '@progress/kendo-vue-dateinputs';
import moment from 'moment';
import { IntlProvider, load, loadMessages, LocalizationProvider } from '@progress/kendo-vue-intl';
import { DropDownList } from "@progress/kendo-vue-dropdowns";

import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';
import esnumbers from 'cldr-numbers-full/main/es/numbers.json';
import escaGregorian from 'cldr-dates-full/main/es/ca-gregorian.json';
import esdateFields from 'cldr-dates-full/main/es/dateFields.json';
import estimeZoneNames from 'cldr-dates-full/main/es/timeZoneNames.json';
import numbers from 'cldr-numbers-full/main/sv/numbers.json';
import caGregorian from 'cldr-dates-full/main/sv/ca-gregorian.json';
import dateFields from 'cldr-dates-full/main/sv/dateFields.json';
import timeZoneNames from 'cldr-dates-full/main/sv/timeZoneNames.json';
load(
    likelySubtags,
    currencyData,
    weekData,
    numbers,
    caGregorian,
    dateFields,
    timeZoneNames,
    esnumbers,
    escaGregorian,
    esdateFields,
    estimeZoneNames
);
import esMessages from '@/locales/es.json';
loadMessages(esMessages, 'es-ES');
import svMessages from '@/locales/sv.json';
loadMessages(svMessages, 'sv-SE')
@Component({
    components: {
        DateTimePicker,
        'date-picker': DatePicker,
        'intl': IntlProvider,
        'localization': LocalizationProvider,
        'dropdownlist': DropDownList,
        timepicker: TimePicker,
    }
})
class Datepicker extends Vue {
    @Prop({ default: () => new Date() }) private date!: Date;
    @Prop({ default: false }) private disable!: false;
    @Prop({ default: false }) private fullDayTimeFormat!: boolean;
    @Prop({ default: false }) private dateOnly!: boolean;
    @Prop({ default: '' }) private format!: string;
    @Prop({ default: '' }) private idValue!: string;
    @Prop({ default: undefined }) private mindatetime?: Date;
    @Prop({ default: undefined }) private maxdatetime?: Date;
    // Local variables
    private iconurl = require('@/assets/Calender.svg');
    private localmindatetime: undefined | Date = undefined;
    private localmaxdatetime: undefined | Date = undefined;
    private localMinTime: undefined | Date = undefined;
    private localMaxTime: undefined | Date = undefined;
    private bindedDate = new Date();
    private isMounted = false;
    private locales = [
        {
            language: 'en-US',
            locale: 'en'
        },
        {
            language: 'es-ES',
            locale: 'es'
        },
        {
            language: 'sv-SE',
            locale: 'sv'
        },
    ];
    private selectedLocale = { language: 'en-US', locale: 'en' };
    // Hooks
    mounted() {
        this.selectedLocale = this.locales[0];
        if (this.mindatetime !== undefined && this.maxdatetime !== undefined) {
            this.localmindatetime = this.mindatetime;
            this.localMinTime = this.mindatetime;
            this.localMinTime.setMinutes(this.localMinTime.getMinutes());
            this.localmaxdatetime = this.maxdatetime;
        } else if (this.maxdatetime !== undefined) {
            this.localmaxdatetime = this.maxdatetime;
            this.localMaxTime = this.maxdatetime;
        } else {
            this.localmindatetime = this.mindatetime;
            this.localMinTime = this.mindatetime;
            if(this.localMinTime !== null && this.localMinTime !== undefined) {
                this.localMinTime.setMinutes(this.localMinTime.getMinutes());
            }
        }
        this.UpdateDate(this.date);
        this.isMounted = true;
    }
    private UpdateDate(date: Date) {
        this.bindedDate = date;
    }
    // Function to set the date format according to the dateOnly prop
    private GetDateFormat() {
        if (this.dateOnly) {
            return 'MMM d, y';
        } else {
            return this.fullDayTimeFormat ? 'MMM d, y, hh:mm' : 'MMM d, y, hh:mm a';
        }
    }
    // Function to set and return value to parent component
    private SetDateTime() {
        if (this.bindedDate) {
            console.log(this.bindedDate);
            this.$emit('selectedUTCDate', this.bindedDate);
            const selectedate = new Date(this.bindedDate);
            selectedate.setSeconds(0);
            this.$emit('selectedDate', moment(selectedate).format());
        }
    }
    // Change drop down value
    private Change(e: any) {
        this.selectedLocale = e.target.value;
    }
}
export default toNative(Datepicker);
</script>
<style>
.datepicker-container {
    width: 300px;
    margin-left: 20px;
}

.k-datetimepicker,
.k-datepicker,
.k-timepicker {
    height: 44px;
    border-radius: 10px;
}

.k-dateinput {
    padding: 6px 12px;
}

.k-datetimepicker:hover,
.k-datepicker:hover,
.k-timepicker:hover {
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
}

.k-datetimepicker:focus,
.k-dateinput:focus,
.k-datepicker:focus,
.k-timepicker:focus {
    border: 1px solid #1E3A8A;
}

.k-datetime-container {
    border-radius: 10px;
    box-shadow: 4px 4px 20px 0px #0000001A;
    margin-top: 10px;
}

/* Buttons */
.k-datetime-container .k-button-solid-base {
    background-color: #fff;
    border-color: #1E3A8A;
    color: #1E3A8A;
}

.k-datetime-container .k-button-solid-primary {
    background-color: #1E3A8A;
    border-color: #193175;
    color: #fff;
}

.k-datetime-container .k-button-solid {
    height: 44px;
    border-radius: 22px;
}

.k-button-group .k-selected {
    background-color: #1E3A8A;
    border-color: #193175;
    color: #fff;
}

/* Grouping buttons */
.k-group-start {
    border-radius: 8px 0 0 8px;
    font-weight: 600;
}

.k-group-end {
    border-radius: 0 8px 8px 0;
    font-weight: 600;
}

/* Flat primary button and calendar today text */
.k-button-flat-primary,
.k-calendar .k-calendar-view .k-today,
.k-time-now .k-button-text {
    color: #1E3A8A;
}

/* Selected date in the calendar */
.k-calendar .k-calendar-td.k-selected .k-calendar-cell-inner,
.k-calendar .k-calendar-td.k-selected .k-link {
    background-color: #1E3A8A;
}

/* Icon button customization */
.k-icon-button {
    border-color: #DCDFE4;
    border-radius: 0;
    color: #333;
    width: 44px;
    background-color: #F2F2F2;
}

/* Remove today button */
.k-calendar-nav-today,
.k-time-now {
    display: none;
}

/* Hover effect for items */
.k-time-container .k-item:hover {
    color: #1E3A8A;
}

.k-datetime-container .k-button-solid-primary:hover,
.k-calendar-tr .k-selected .k-link:hover {
    background-color: #3C59AC;
    border-color: #3C59AC;
    color: #fff;
}

.custom-datepicker .k-select {
    background-image: url('@/assets/Calender.svg') !important;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 16px 16px;
    /* Adjust size as needed */
}
</style>