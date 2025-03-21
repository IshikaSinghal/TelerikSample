<template>
  <td class="k-command-cell k-table-td">
    <kbutton
      :theme-color="'primary'"
      class="k-grid-edit-command"
      @click="editHandler"
    >
      Edit
    </kbutton>

    <kbutton class="k-grid-remove-command" @click="removeHandler">
      Remove
    </kbutton>
  </td>
</template>
    <script>
import { Button } from "@progress/kendo-vue-buttons";
import { Component, Vue, Prop, toNative } from "vue-facing-decorator";

@Component({
  components: {
    kbutton: Button,
  },
})
class CommandCell extends Vue {
  @Prop() dataItem = null;

  editHandler() {
    this.$emit("edit", this.dataItem);
  }
  removeHandler() {
    if (confirm("Confirm deleting: " + this.dataItem.ProductName)) {
      this.$emit("remove", this.dataItem);
    }
  }
  // Compare this snippet from src/components/grid/CommandCell.vue:
}
export default toNative(CommandCell);
</script>
    