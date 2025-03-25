<template>
  <div>
    <k-dialog
      v-if="visibleDialog"
      :title="alertData.title"
      @close="HandleCloseDialog"
    >
      <div class="dialog-content">
        <p v-html="alertData.description"></p>
        <!-- Render input fields, labels, and checkboxes -->
        <div v-for="(field, index) in alertData.fields" :key="index" class="field-container">
          <!-- Render text input -->
          <label v-if="field.type === 'text'" class="input-label">{{ field.label }}</label> <br>
          <input
            v-if="field.type === 'text'"
            type="text"
            v-model="field.value"
            :placeholder="field.label"
            class="input-field"
          />
          <!-- Render label -->
          <label v-if="field.type === 'label'" class="input-label section-label">{{ field.text }}</label>
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
        <Button @click="HandleCancel" class="btn btn-secondary">
          {{ alertData.cancelButton }}
        </Button>
        <Button @click="HandleConfirm" class="btn btn-primary">
          {{ alertData.confirmButton }}
        </Button>
      </dialog-actions-bar>
    </k-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-facing-decorator";
import { Dialog, DialogActionsBar } from "@progress/kendo-vue-dialogs";
import { Button } from "@progress/kendo-vue-buttons";
// Import the PopupViewModel and Field classes
import PopupViewModel from "@/entities/PopupViewModel";
@Component({
  components: {
    "k-dialog": Dialog,
    "dialog-actions-bar": DialogActionsBar,
    Button,
  },
})
class AlertModalPopup extends Vue {
  @Prop({ required: true }) alertData!: PopupViewModel; // Use PopupViewModel class here
  @Prop({ required: true }) visibleDialog!: boolean;
  // Renaming methods to PascalCase convention
  public HandleConfirm() {
    this.$emit("confirm");
  }
  public HandleCancel() {
    this.$emit("cancel");
  }
  public HandleCloseDialog() {
    this.$emit("closeDialog");
  }
}
export default AlertModalPopup;
</script>
<style>
.k-dialog {
  width: 30%;
}
.k-dialog-title {
  text-align: left;
}
.k-dialog {
  border-radius: 24px;
  background: white;
}
.k-dialog-titlebar {
  border-radius: 24px;
  background: white;
  border: unset;
}
.k-dialog-actions {
  border: unset;
  background-image: unset;
  width: 50%;
  float: right;
  align-self: end;
}
.k-window {
  box-shadow: unset;
}
.k-dialog-content {
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
  border: 1px solid #1E3A8A ;
}
.btn-secondary:hover,
.btn-secondary:focus {
  color: #3C59AC;
  border-color: #3C59AC;
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
  white-space: nowrap;
  height: 44px;
  font-weight: 600;
  padding: 0px 22px;
  font-size: 14px;
  line-height: 1.42857143;
  border-radius: 22px;
}
.line {
  display: block;
}
.line::before {
  content: "•";
  margin-right: 0.5em;
  color: black;
}
.input-field{
  height: 44px;
  width: -webkit-fill-available;
  border-radius: 10px;
  border: 1px solid #DCDFE4;
  background: #fff;
  padding: 6px 12px;
  font-size: 14px;
}
.input-label {
  font-weight: 600;
  color: #333333;
  margin-top: 6px;
  font-size: 14px;
}
.dialog-content {
  text-align: left;
}
.dialog-content ul{
  padding-left: 15px;
}
</style>