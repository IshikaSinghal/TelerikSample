  <template>
    <div>
      <!-- Kendo Editor Component -->
      <Editor
        :resizable="isResizable"
        :readonly="isReadOnly"
        :tools="tools"
        :style="[editorStyle]"
        :default-content="description"
        @change="OnChange($event)"
        :content-style="contentStyle"
        :class="{ 'readonly-editor': isReadOnly }"
        :extend-view="ExtendView"
      />
      <div class="result">
        <h2>Result:</h2>
        {{ localDescription }}
      </div>
    </div>
  </template>
  
<script lang="ts">
  import { Component, Prop, toNative, Vue, Watch } from 'vue-facing-decorator';
  import { Editor } from "@progress/kendo-vue-editor";
  import { ProseMirror } from '@progress/kendo-vue-editor';
    
  const { EditorState, EditorView, Plugin, PluginKey } = ProseMirror;
  
  @Component({
    components: {
      Editor, //Kendo UI Editor component
    },
  })
  class TextEditor extends Vue {
    // Props received from parent component
    @Prop({ default: '' }) description!: string; 
    @Prop({ default: false }) isReadOnly!: boolean;
    
    private localDescription = '';
    private  isResizable = true;

    // Toolbar configuration
    tools = [
      ["Bold", "Italic", "Underline"],
      ["Link", "Unlink"],
      ["Undo", "Redo"],
      ["OrderedList", "UnorderedList"],
    ];

    // Editor styling
    editorStyle = {
      width: '100%',
      resize: 'vertical',
      minHeight: '198px',
      borderRadius: '10px',
    };
    contentStyle = {
      height: '150px',
      overflowY: 'auto',
    };

    // Lifecycle hook to initialize `localDescription` with the `description` prop
    mounted() {
      this.localDescription = this.description;
    }
    // Method to handle editor content change
    private OnChange(data: { html: string }) {
      this.localDescription = data.html;
      this.$emit('change-value', this.localDescription); // Emit changes to the parent
    }
  
    // Method to extend the editor view with custom plugins
    private ExtendView(event: { dom: HTMLElement; viewProps: { state: any } }) {
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

    // Watch for changes to the description prop
    @Watch('description')
    private OnDescriptionChange(newDescription: string) {
      this.localDescription = newDescription;
    }
  }
  export default toNative(TextEditor);
</script>


<style >
  .result{
    font-size: 14px;
    font-family:'Times New Roman', Times, serif;
    margin-top:40px;
  }
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