<template>
  <div class="wrapper">
    <button @click="exportPDF">Download PDF</button>
    <button @click="exportExcel">Download Excel</button>
    <button @click="exportPDFWithComp">Export pdf via a component</button>
    <pdfexport ref="gridPdfExport" :margin="'1cm'">
      <Grid
        ref="grid"
        :style="{ height: '520px' }"
        :data-items="gridData"
        :resizable="true"
        :reorderable="true"
        :sortable="true"
        :filterable="true"
        :filter="filter"
        :pageable="gridPageable"
        :groupable="true"
        :group="group"
        :take="take"
        :skip="skip"
        :expand-field="'expanded'"
        :columns="columns"
        :loader="loader"
        :selectable="{ mode: 'multiple', checkboxOnly: true }"
        :selected-field="selectedField"
        @expandchange="expandChange"
        @datastatechange="dataStateChange"
        @filterchange="filterChange"
        @headerselectionchange="onHeaderSelectionChange" 
        @rowclick="onRowClick"
      >
        <template v-slot:myTemplate="{ props }">
          <custom :data-item="props.dataItem" @edit="edit" @remove="remove" />
        </template>
      </Grid>
      <dialog-container
        v-if="productInEdit"
        :data-item="productInEdit"
        @save="save"
        @cancel="cancel"
      >
      </dialog-container>
    </pdfexport>
    <ExcelExport ref="excelExport"> </ExcelExport>
  </div>
</template>
<script lang="ts">
import { Component, toNative, Vue } from "vue-facing-decorator";

import { process } from "@progress/kendo-data-query";
import { Grid } from "@progress/kendo-vue-grid";
import { savePDF } from "@progress/kendo-vue-pdf";
import { ExcelExporter } from "@progress/kendo-vue-excel-export";
import { GridPdfExport } from "@progress/kendo-vue-pdf";
import "@progress/kendo-theme-default/dist/all.css";
import DialogContainer from "./DialogueContainer.vue";
import CommandCell from "./CommandCell.vue";
import { Button } from "@progress/kendo-vue-buttons";

@Component({
  components: {
    Grid,
    ExcelExporter, // Uncommenting the ExcelExporter component will enable Excel export
    pdfexport: GridPdfExport,
    "dialog-container": DialogContainer,
    custom: CommandCell,
    kbutton: Button,
  },
})
class DataGrid extends Vue {
  private gridPageable = { pageSizes: true };
  private products = this.createRandomData(100);
  private gridData: { data: any[]; total: number } = { data: [], total: 0 }; // Ensure gridData is an object
  private skip = 0;
  private take = 10;
  private group = [];
  private expandedItems = [];
  private loader = false;
  private selectedField = "selected";
  private filter = null;
  private sort = [];
  private productInEdit = null;
  private columns = [
    {
      field: "selected",
      title: "Selected",
      filterable: false,
      sortable: false,
      width: "50px",
      selectable: "checkbox", // Use Kendo's checkbox selection
    },
    {
      field: "ProductID",
      filterable: true,
      sortable: true,
      title: "ID",
      width: "80px",
    },
    {
      field: "ProductName",
      filterable: true,
      sortable: true,
      title: "Product Name",
    },
    {
      field: "UnitPrice",
      filterable: true,
      sortable: true,
      title: "Unit Price",
      filter: "numeric",
    },
    {
      field: "UnitsInStock",
      filterable: true,
      sortable: true,
      title: "Units In Stock",
    },
    {
      field: "StockDate",
      filterable: true,
      sortable: true,
      title: "Stock Date",
      format: "{0:MM/dd/yyyy}",
    },
    { cell: "myTemplate", width: "210px" },
  ];

  private edit(dataItem: any) {
    this.productInEdit = dataItem;
  }
  private cancel() {
    this.productInEdit = null;
  }
  private save(event: any) {
    const products = this.products;
    const index = products.findIndex((p) => p.ProductID === event.ProductID);
    products.splice(index, 1, event);
    this.products = products;
    this.productInEdit = null;
    this.getData();
  }

  cloneProduct(product: any) {
    return Object.assign({}, product);
  }

  private remove(dataItem: any) {
    const index = this.products.findIndex(
      (p) => p.ProductID === dataItem.ProductID
    );
    this.products.splice(index, 1);
    this.getData();
  }

  mounted() {
    this.getData();
  }

  private exportPDFWithComp() {
    (this.$refs.gridPdfExport as any).save(this.products);
  }

  selectedDataItems() {
    return this.gridData.data.filter((item: any) => item.selected === true);
  }

  onRowClick(event: any) {
    alert(JSON.stringify(event.dataItem.ProductID));
  }

  private pageChangeHandler(event: any) {
    // hit api and get data 
console.log(event);

    // this.getData();

  }

  created() {
    this.getData();
  }

  onHeaderSelectionChange(event: any) {
    const checked = event.event.target.checked;
    this.gridData.data.forEach((element: any) => {
      element.selected = checked;
    });
  }

  private getData() {
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
      this.gridData = process(this.products, {
        take: this.take,
        skip: this.skip,
        group: this.group,
        sort: this.sort,
        filter: this.filter || { logic: "and", filters: [] },
      });
    }, 300);
  }

  createAppState(dataState: any) {
    this.group = dataState.group;
    this.take = dataState.take;
    this.skip = dataState.skip;
    this.sort = dataState.sort;
    this.filter = dataState.filter;
    this.getData();
  }

  dataStateChange(event: any) {
    this.createAppState(event.data);
  }

  filterChange(event: any) {
    this.filter = event.filter;
    this.getData();
  }

  expandChange(event: any) {
    // Vue.set(event.dataItem, "expanded", event.value);
  }

  createRandomData(count: number) {
    const productNames = [
      "Chai",
      "Chang",
      "Syrup",
      "Apple",
      "Orange",
      "Banana",
      "Lemon",
      "Pineapple",
      "Tea",
      "Milk",
      "Grapes",
    ];
    const unitPrices = [12.5, 10.1, 5.3, 7, 22.53, 16.22, 20, 50, 100, 120];
    const units = [2, 7, 12, 25, 67, 233, 123, 53, 67, 89];

    return Array(count)
      .fill({})
      .map((_, idx) => ({
        selected: false,
        ProductID: idx + 1,
        ProductName:
          productNames[Math.floor(Math.random() * productNames.length)],
        UnitPrice: unitPrices[Math.floor(Math.random() * unitPrices.length)],
        UnitsInStock: units[Math.floor(Math.random() * units.length)],
        StockDate: new Date(
          2021,
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1
        ),
      }));
  }

  private exportPDF() {
    const originalData = this.gridData;
    const fullData = process(this.products, {
      take: this.products.length,
      skip: 0,
      group: this.group,
      sort: this.sort,
    });

    this.gridData = fullData;

    this.$nextTick(() => {
      const gridElement = (this.$refs.grid as any).$el;
      savePDF(gridElement, {
        paperSize: "A4",
        margin: "1cm",
        fileName: "AllGridData.pdf",
      });

      this.gridData = originalData;
    });
  }

  private exportExcel() {
    console.log("Exporting Excel");
    // (this.$refs.excelExport as any).save(this.products);
  }
}

export default toNative(DataGrid);
</script>
