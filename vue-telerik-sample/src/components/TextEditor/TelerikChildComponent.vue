  <template>
    <div>
      <Editor
        v-model="localDescription"
        :resizable="isResizable"
        :readonly="isReadOnly"
        :tools="tools"
        :style="[editorStyle]"
        :default-content="description"
        @change="onChange($event)"
        :content-style="{
          height: '150px',
          overflowY: 'auto',
        }"
        :class="{ 'readonly-editor': isReadOnly }"
        :extend-view="extendView"
      />
      <div style="font-size: 14px;font-family:'Times New Roman', Times, serif;">{{ localDescription }}</div>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Prop, toNative, Vue, Watch } from 'vue-facing-decorator';
  import { Editor } from "@progress/kendo-vue-editor";
  import { ProseMirror } from '@progress/kendo-vue-editor';
  import '@progress/kendo-theme-default/dist/all.css';
  
  const { EditorState, EditorView, Plugin, PluginKey } = ProseMirror;
  
  @Component({
    components: {
      Editor,
    },
  })
  class TelerikChildComponent extends Vue {
    @Prop({ default: '' }) description!: string; 
    @Prop({ default: false }) isReadOnly!: boolean;
    private localDescription!: string;
    private  isResizable!: boolean;
    tools = [
      ["Bold", "Italic", "Underline"],
      ["Link", "Unlink"],
      ["Undo", "Redo"],
      ["OrderedList", "UnorderedList"],
    ];
    editorStyle = {
      width: '100%',
      resize: 'vertical',
      minHeight: '198px',
      borderRadius: '10px',
    };
  // Lifecycle hook to initialize `localDescription` with the `description` prop
  mounted() {
      this.localDescription = this.description;
      this.isResizable = true;
    }
    // Method to handle editor content change
    onChange(data: { html: string }): void {
      this.localDescription = data.html;
      this.$emit('change-value', this.localDescription); // Emit changes to the parent
    }
  
    // Method to extend the editor view with custom plugins
    extendView(event: { dom: HTMLElement; viewProps: { state: any } }) {
      const state = event.viewProps.state;
      const plugins = [
        ...state.plugins,
        new Plugin({
          key: new PluginKey('readonly'),
          props: {
            editable: () => !this.isReadOnly,
          },
          filterTransaction: (tr: any) => !this.isReadOnly || !tr.docChanged,
        }),
      ];
  
      return new EditorView(
        {
          mount: event.dom,
        },
        {
          ...event.viewProps,
          state: EditorState.create({
            doc: state.doc,
            plugins,
          }),
        },
      );
    }
    // Watch for changes to the `description` prop
    @Watch('description')
    onDescriptionChange(newDescription: string): void {
      this.localDescription = newDescription;
    }
  }
  export default toNative(TelerikChildComponent);
  </script>


  <style >

.readonly-editor .k-toolbar .k-button {
  pointer-events: none;
  opacity: 0.5;
}
.k-window{
  border-radius: 10px;
}
.k-window-titlebar{
  background: none;
}
@media (min-width: 419px) and (max-width: 569px) {
  .k-toolbar-separator, .k-toolbar-overflow-button {
    display: none;
  }
}
</style>