<template>
  <k-dialog @close="cancel">
    <div class="k-form k-form-horizontal">
      <div class="k-form-field">
        <label for="Product Name" class="k-form-label">Product Name</label>
        <div class="k-form-field-wrap">
          <input
            :style="{ width: '230px' }"
            type="text"
            :name="'ProductName'"
            v-model="productInEdit.ProductName" />    </div>
      </div>
      <div class="k-form-field">
        <label for="Units In Stock" class="k-form-label">Units In Stock</label>
        <div class="k-form-field-wrap">
          <numerictextbox
            :style="{ width: '230px' }"
            :name="'UnitsInStock'"
            v-model="productInEdit.UnitsInStock"
          ></numerictextbox>
        </div>
      </div>
      
    </div>
    <dialog-actions-bar :layout="'start'">
      <kbutton :theme-color="'primary'" @click="save" :svg-icon="saveIcon">
        Save
      </kbutton>
      <kbutton @click="cancel" :svg-icon="cancelIcon"> Cancel </kbutton>
    </dialog-actions-bar>
  </k-dialog>
</template>
  <script>
import { Component, Prop, Vue } from "vue-facing-decorator";

import { Dialog, DialogActionsBar } from "@progress/kendo-vue-dialogs";
import { NumericTextBox,  Checkbox  } from "@progress/kendo-vue-inputs";
import { Label } from "@progress/kendo-vue-labels";
import { Button } from "@progress/kendo-vue-buttons";
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";


@Component({
  components: {
    numerictextbox: NumericTextBox,
    "k-dialog": Dialog,
    "dialog-actions-bar": DialogActionsBar,
    kbutton: Button,
    checkbox: Checkbox,
    klabel: Label,
  },
})
export default class DialogueContainer extends Vue {
  @Prop() dataItem = null;

  created() {
    debugger;
    if (this.dataItem) {
      this.productInEdit = this.dataItem;
    }
  }

  cancel() {
    this.$emit("cancel", this.productInEdit);
  }
  save() {
    this.$emit("save", this.productInEdit);
  }

  data() {
    return {
      cancelIcon,
      saveIcon,
      productInEdit: {
        ProductName: "",
        UnitsInStock: 0,
      },
    };
  }
  mounted() {
    this.initializeProductInEdit();
  }

  initializeProductInEdit() {
    if (this.dataItem) {
      this.productInEdit = { ...this.dataItem };
    }
  }
}
</script>
  