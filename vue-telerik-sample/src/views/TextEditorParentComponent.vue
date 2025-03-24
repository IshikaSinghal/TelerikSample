<template>
    <div class="parent-container">
      <button @click="ToggleReadonly" class="toggle-button">
        Toggle Readonly : {{ isReadOnly }}
      </button>
      <TelerikEditor
        :description="description"
        :isReadOnly="isReadOnly"
        @change-value="UpdateDescription"
      />
    </div>
</template>
  <script lang="ts">
  import { Component, toNative, Vue } from 'vue-facing-decorator';
  import TelerikEditor from '@/components/TextEditor/TextEditor.vue'; 
  
  // Telerik Editor child component
  @Component({
    components: {
      TelerikEditor,
    },
  })
  class TextEditorParentComponent extends Vue {
    // Contains placeholder text with formatting
    private description  = '\u003cp\u003eThis event is the premier gathering designed to empower [audience] from across [industry/region] to achieve extraordinary results. We curate an immersive experience that fosters collaboration, ignites innovation, and unlocks the full potential of your business.\u003cbr /\u003e\n- Explore the full agenda and speakers.\u003cbr /\u003e\n- Learn more about registration options and early-bird discounts.\u003cbr /\u003e\n\u003ci\u003eRegister today and join us at the event for an experience that will redefine your business potential.\u003c/i\u003e\u003c/p\u003e\n'; // Initial description with type annotation
    private isReadOnly = false; 
  
    // Method to toggle read-only state
    private ToggleReadonly() {
      this.isReadOnly = !this.isReadOnly;
    }

    // Method to handle content updates from child component
    private UpdateDescription(newDescription: string) {
      this.description = newDescription;
    }
  }
  export default toNative(TextEditorParentComponent);

  </script>

<style scoped>
.parent-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
}
.toggle-button {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 5px;
  background-color: #0056b3;
}
</style>