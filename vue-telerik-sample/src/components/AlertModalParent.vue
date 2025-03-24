<template>
  <div>
    <h1>Modal popup</h1>

    <!-- Buttons to trigger the dialog -->
    <button @click="handleSave">Create new</button> |  
    <button @click="handleEdit">Edit</button> | 
    <button @click="handleCopy">Import participant</button> |  
    <button @click="handlePublish">Publish event page</button>

    <!-- Pass the visibility and alertData to child -->
    <AlertModalPopup
      :alertData="alertData"
      :visibleDialog="visibleDialog"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @closeDialog="handleCloseDialog"
    />
  </div>
</template>

<script>
import AlertModalPopup from './AlertModalPopup.vue';

export default {
  name: 'AlertModalParent',
  components: {
    AlertModalPopup,
  },
  data() {
    return {
      alertData: {
        title: "Are you sure?",
        description: "Do you really want to proceed with this action?",
        confirmButton: "Yes",
        cancelButton: "No",
      },
      visibleDialog: false, // Controls visibility of the dialog
    };
  },
  methods: {
    // Trigger the dialog for Save action
    handleSave() {
      this.alertData = {
        title: "Create new",
        description: "Are you sure you want to create a new one?",
        confirmButton: "Save",
        cancelButton: "Cancel",
      };
      this.visibleDialog = true; // Show the dialog when Save button is clicked
    },
    
    // Trigger the dialog for Edit action
    handleEdit() {
      this.alertData = {
        title: "Edit Item",
        description: "Do you want to edit this item?",
        confirmButton: "Edit",
        cancelButton: "Cancel",
      };
      this.visibleDialog = true; // Show the dialog when Edit button is clicked
    },

    // Trigger the dialog for Copy action
    handleCopy() {
      this.alertData = {
        title: "Import participants",
        description: "<b><u>Click here</u></b> to <b>download</b> the Excel template.<br>Open the file in <b>Excel</b>.<br>Click on <b>'Enable editing'</b> button <b>if</b> the <b>editing is disabled.</b><br><b>To assign multiple groups</b> to a participant, simply <b>add</b> the <b>group names separated by a semicolon (;)</b>.<br><b>Do not alter</b> the <b>order of columns</b> in the template.<br><b>Upload the file you just save using the button below. You will be presented with a list of all the information we managed to extract from the file you uploaded.</b>",
        confirmButton: "Import",
        cancelButton: "Cancel",
      };
      this.visibleDialog = true; // Show the dialog when Copy button is clicked
    },
    // Trigger the dialog for Publish action
    handlePublish() {
      this.alertData = {
        title: "Publish Event Page",
        description: "Configure the settings for publishing the event page:",
        confirmButton: "Publish",
        cancelButton: "Cancel",
        fields: [
          { type: "text", label: "Web address", value: "" },
          { type: "label", text: "Indexing" }, // Label for Indexing section
          { type: "checkbox", label: "Hide page from search engines", checked: false },
          { type: "label", text: "Google Tag Manager" }, // Label for Google Tag Manager section
          { type: "checkbox", label: "Enable Google Tag Manager", checked: false },
        ],
      };
      this.visibleDialog = true; // Show the dialog when Publish button is clicked
    },

     handleConfirm() {
      if (this.alertData.title === "Publish Event Page") {
        // Handle Publish logic
        const webAddress = this.alertData.fields.find((field) => field.label === "Web address").value;
        const hideFromSearchEngines = this.alertData.fields.find((field) => field.label === "Hide page from search engines").checked;
        const enableGoogleTagManager = this.alertData.fields.find((field) => field.label === "Enable Google Tag Manager").checked;

        alert(`Publishing Event Page:\nWeb Address: ${webAddress}\nHide from Search Engines: ${hideFromSearchEngines}\nEnable Google Tag Manager: ${enableGoogleTagManager}`);
      } else {
        alert("Action confirmed!");
      }
      this.visibleDialog = false; // Close the dialog after confirming
    },

    // Handle cancel action and close the dialog
    handleCancel() {
      alert("Action canceled!");
      this.visibleDialog = false; // Close the dialog after canceling
    },

    // Handle close dialog event triggered from child
    handleCloseDialog() {
      this.visibleDialog = false; // Close dialog from child component
    }
  },
};
</script>

<style scoped>
/* Add any styles for the parent component here */
</style>