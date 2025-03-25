<template>
  <div>
    <h1>Modal popup</h1>
    <!-- Buttons to trigger the dialog -->
    <button @click="HandleSave">Create new</button> |
    <button @click="HandleEdit">Edit</button> |
    <button @click="HandleCopy">Import participant</button> |
    <button @click="HandlePublish">Publish event page</button>
    <!-- Display the result message below the buttons -->
    <div v-if="resultMessage" class="result-message">
      <p>{{ resultMessage }}</p>
    </div>
    <!-- Pass the visibility and alertData to child -->
    <AlertModalPopup
      :alertData="alertData"
      :visibleDialog="visibleDialog"
      @confirm="HandleConfirm"
      @cancel="HandleCancel"
      @closeDialog="HandleCloseDialog"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import AlertModalPopup from './AlertModalPopup.vue';
import PopupViewModel, { Field } from "@/entities/PopupViewModel";
@Component({
  components: {
    AlertModalPopup,
  }
})
export default class AlertModalParent extends Vue {
  private alertData = new PopupViewModel('','','','');
  private visibleDialog = false;
  private resultMessage = "";
  // Public methods called from template
  public HandleSave() {
    this.alertData = new PopupViewModel(
      "Create new",
      "Are you sure you want to create a new one?",
      "Save",
      "Cancel"
    );
    this.visibleDialog = true;
  }
  public HandleEdit() {
    this.alertData = new PopupViewModel(
      "Edit Item",
      "Do you want to edit this item?",
      "Edit",
      "Cancel"
    );
    this.visibleDialog = true;
  }
  public HandleCopy() {
    this.alertData = new PopupViewModel(
      "Import participants",
      `
      <b><u>Click here</u></b> to <b>download</b> the Excel template.
      <ul>
      <li>Open the file in <b>Excel</b>.</li>
      <li>Click on <b>'Enable editing'</b> button <b>if</b> the <b>editing is disabled.</b></li>
      <li><b>To assign multiple groups</b> to a participant, simply <b>add</b> the <b>group names separated by a semicolon (;)</b>.</li>
      <li><b>Do not alter</b> the <b>order of columns</b> in the template.</li>
      <li><b>Upload the file you just saved using the button below. You will be presented with a list of all the information we managed to extract from the file you uploaded.</b></li>
      </ul>`,
      "Import",
      "Cancel"
    );
    this.visibleDialog = true;
  }
  public HandlePublish() {
    this.alertData = new PopupViewModel(
      "Publish Event Page",
      "Configure the settings for publishing the event page:",
      "Publish",
      "Cancel",
      [
        new Field("text", "Web address", undefined),
        new Field("label", "Indexing", undefined),
        new Field("checkbox", "Hide page from search engines", undefined, false),
        new Field("label", "Google Tag Manager", undefined),
        new Field("checkbox", "Enable Google Tag Manager", undefined, false),
      ]
    );
    this.visibleDialog = true;
  }
  public HandleConfirm() {
    if (this.alertData.title === "Publish Event Page") {
      const webAddress = this.alertData.fields?.find((field) => field.label === "Web address")?.value || '';
      const hideFromSearchEngines = this.alertData.fields?.find((field) => field.label === "Hide page from search engines")?.checked || false;
      const enableGoogleTagManager = this.alertData.fields?.find((field) => field.label === "Enable Google Tag Manager")?.checked || false;
      this.resultMessage = `Publishing Event Page:\nWeb Address: ${webAddress}\nHide from Search Engines: ${hideFromSearchEngines}\nEnable Google Tag Manager: ${enableGoogleTagManager}`;
    } else {
      this.resultMessage = "Action confirmed!";
    }
    setTimeout(() => {
      this.resultMessage = "";
    }, 3000);
    this.visibleDialog = false;
  }
  public HandleCancel() {
    this.resultMessage = "Action canceled!";
    setTimeout(() => {
      this.resultMessage = "";
    }, 3000);
    this.visibleDialog = false;
  }
  public HandleCloseDialog() {
    this.visibleDialog = false;
  }
}
</script>
<style scoped>
.result-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #F1F1F1;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>