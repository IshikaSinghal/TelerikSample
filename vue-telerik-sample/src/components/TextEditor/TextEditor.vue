  <template>
    <div>
      <!-- Kendo Editor Component -->
       <div class="text-editor-container">
        <Editor
        :resizable="isResizable"
        :readonly="isReadOnly"
        :tools="tools"
        :style="[editorStyle]"
        :default-content="description"
        @change="OnChange($event)"
        :class="{ 'readonly-editor': isReadOnly }"
        :extend-view="ExtendView"
      />
       </div>
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
    private mobileViewWidth = 768;  

    // Toolbar configuration
    tools = [
      ["Bold", "Italic", "Underline"],
      ["Link", "Unlink"],
      ["Undo", "Redo"],
      ["OrderedList", "UnorderedList"],
    ];

    // Editor styling
    editorStyle = {
      borderRadius: '10px',
      resize: 'vertical',
      minHeight: '200px', 
      maxHeight: 'inherit',
    };

    // Lifecycle hook to initialize `localDescription` with the `description` prop
    mounted() {
      this.localDescription = this.description;
      if(window.innerWidth < this.mobileViewWidth){
        window.addEventListener('scroll', this.HandleScroll);
      }
    }
    beforeDestroy() {
      // Clean up event listener when component is destroyed
      window.removeEventListener('scroll', this.HandleScroll);
    }
    // Method to handle editor content change
    private OnChange(data: { html: string }) {
      this.localDescription = data.html;
      this.$emit('change-value', this.localDescription); // Emit changes to the parent
    }

    
    private HandleScroll() {
      const toolbarPopup = document.querySelector('.k-toolbar-popup') as HTMLElement;
      if (toolbarPopup) {
        toolbarPopup.style.display = 'none'; 
      }
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
  .text-editor-container{
    height:219px;
  }
  .k-editor-content>.k-iframe{
    height:100% !important;
  }

@media (max-width: 768px) {
    .k-toolbar-popup {
        position: fixed;  
        top: 378px;         
        left: 50%;        
        transform: translateX(-50%); 
        width: inherit;
    }
}
</style>
