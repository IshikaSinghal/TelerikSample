<template>
  <div>
    <k-dialog
      v-if="visibleDialog"
      :title="alertData.title"
      @close="handleCloseDialog"
    >
      <div :style="{ textAlign: 'left' }">
        <p  v-html="formattedDescription"></p>
         <!-- Render input fields, labels, and checkboxes -->
        <div v-for="(field, index) in alertData.fields" :key="index" class="field-container">
          <!-- Render text input -->
          <label v-if="field.type === 'text'" class="label">{{ field.label }}</label> <br>
          <input
            v-if="field.type === 'text'"
            type="text"
            v-model="field.value"
            :placeholder="field.label"
            class="input-box"
          />

          <!-- Render label -->
          <label v-if="field.type === 'label'" class="label section-label">{{ field.text }}</label>

          <!-- Render checkbox -->
          <label v-if="field.type === 'checkbox'" class="checkbox-label">
            <input
              type="checkbox"
              v-model="field.checked"
            />
            {{ field.label }}
          </label>
        </div>
      </div>
      <dialog-actions-bar>
        <kbutton @click="handleCancel" class="btn btn-secondary">
          {{ alertData.cancelButton }}
        </kbutton> 
        <kbutton @click="handleConfirm" class="btn btn-primary">
          {{ alertData.confirmButton }}
        </kbutton>
      </dialog-actions-bar>
    </k-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-facing-decorator";
import { Dialog, DialogActionsBar } from "@progress/kendo-vue-dialogs";
import { Button } from "@progress/kendo-vue-buttons";

@Component({
  components: {
    "k-dialog": Dialog,
    "dialog-actions-bar": DialogActionsBar,
    kbutton: Button,
  },
})
export default class AlertModalPopup extends Vue {
  @Prop({ required: true }) alertData!: {
    title: string;
    description: string;
    confirmButton: string;
    cancelButton: string;
        fields: { type: string; label: string; value?: string; checked?: boolean }[];
  };
  @Prop({ required: true }) visibleDialog!: boolean;

 get formattedDescription() {
    if (this.alertData.title === "Import participants") {
      // Split by <br> tags and filter out empty lines
      const lines = this.alertData.description
        .split(/<br\s*\/?>/i) // Split by <br> or <br />
        .map((line) => line.trim()) // Trim whitespace
        .filter((line) => line.length > 0); // Remove empty lines

      // Wrap each line in a span with the dot
      return lines.map((line) => `<span class="line">${line}</span>`).join("");
    } else {
      return this.alertData.description; // Return the description as-is for other dialogs
    }
  }

// Emit confirm event when the user clicks the "Confirm" button
  @Emit("confirm")
  handleConfirm() {
    return "confirmed";
  }

  // Emit cancel event when the user clicks the "Cancel" button
  @Emit("cancel")
  handleCancel() {
    return "canceled";
  }

  // Emit closeDialog event when the dialog is closed manually (X button or other ways)
  @Emit("closeDialog")
  handleCloseDialog() {
    return;
  }
}
</script>

<style>
.k-dialog{
  width: 30%;
}
.k-dialog-title {
  text-align: left !important;
}
.k-dialog{
    border-radius: 24px;
    background: white;
    border-radius: 24px;
}
.k-dialog-titlebar{
    border-radius: 24px;
    background: white;
    border:unset;
}
.k-dialog-actions{
    border: unset;
    background-image: unset;
    /* width: 50%; */
    display: flex;
    justify-content: end;
    float: right;
    align-self: end;
}
.k-window{
    box-shadow: unset;
}
.k-dialog-content{
  border: 1px solid #D9D7D7;
  border-left: unset;
  border-right: unset;
  padding-left: 0px;
  margin: 0px 20px;
}
.btn-primary {
  color: #fff;
  background-color: #1E3A8A;
  border: 1px solid #193175;
}
.btn-primary:hover,
.btn-primary:focus {
  background-color: #3C59AC;
  border-color: #3C59AC;
  text-decoration: none;
}
.btn-secondary {
  color: #1E3A8A;
  background-color: #fff;
  border: 1px solid #1E3A8A !important;
}
.btn-secondary:hover,
.btn-secondary:focus {
  color: #3C59AC;
  border-color: #3C59AC !important;
  background-color: #fff;
  text-decoration: none;
}
.btn-secondary:active {
  background-color: #fff;
}
.btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    height: 44px;
    font-weight: 600;
    padding: 0px 22px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 22px;
    max-width: 100px;
}
.line {
  display: block; /* Ensure each line is on a new line */
}

.line::before {
  content: "•"; /* Add the dot */
  margin-right: 0.5em; /* Space between the dot and the text */
  color: black; /* Dot color */
}
.input-box{
    height: 44px;
    width: -webkit-fill-available;
    border-radius: 10px;
    border: 1px solid #DCDFE4;
    background: #fff;
    padding: 6px 12px;
    font-size: 14px;
}
.label{
  font-weight: 600;
    color: #333333;
    margin-top: 6px;
    font-size: 14px;
}
</style>
