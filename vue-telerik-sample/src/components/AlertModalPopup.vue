<template>
  <div>
    <span v-if="!visibleDialog">
      <kbutton @click="toggleDialog">Open Dialog</kbutton>
    </span>
    <k-dialog
      v-if="visibleDialog"
      :title="alertData.title"
      @close="toggleDialog"
    >
      <div>
        <p :style="{ margin: '25px', textAlign: 'center' }">
          {{ alertData.description }}
        </p>
      </div>
      <dialog-actions-bar>
        <kbutton @click="handleCancel" class="btn btn-secondary">No</kbutton>
        <kbutton @click="handleConfirm" class="btn btn-primary">Yes</kbutton>
      </dialog-actions-bar>
    </k-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
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
  visibleDialog = false;

  // Define the alertData prop
  alertData = {
    title: "Are you sure?",
    description: "Do you really want to proceed with this action?",
    confirmButton: "Yes",
    cancelButton: "No",
  };

  // Method to toggle dialog visibility
  toggleDialog() {
    this.visibleDialog = !this.visibleDialog;
  }

  // Method to handle confirmation
  handleConfirm() {
    alert("Action confirmed!");
    this.toggleDialog();
  }

  // Method to handle cancellation
  handleCancel() {
    alert("Action cancelled!");
    this.toggleDialog();
  }
}
</script>

<style>
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
    width: 50%;
    float: right;
    align-self: end;
}
.k-window{
    box-shadow: unset;
}
.btn-primary{
        color: #fff;
    background-color: #1E3A8A;
    border-color: #193175;
}
.btn-secondary{
        color: #1E3A8A;
    background-color: #fff;
    border-color: #1E3A8A;
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
}
</style>
