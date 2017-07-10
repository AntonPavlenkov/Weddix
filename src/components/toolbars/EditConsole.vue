<template>
    <section class="edit-console">
        <md-button class="btn-close md-icon-button" @click="toggleEditMode">
            <md-icon>close</md-icon>
            <md-tooltip md-direction="top">Close</md-tooltip>
        </md-button>
        <p>{{cmp.label}}</p>
        <slot></slot>
    </section>
</template>

<script>
export default {
    name: 'EditConsole',
    props: ['cmp'],
    components: {
    },
    data() {
        return {
            isEditMode: false,
            color: "",
        }
    },
    computed: {
        cmpToEdit() {
            return JSON.parse(JSON.stringify(this.cmp))
        }
    },
    methods: {
       toggleEditMode() {
            // this.isEditMode = !this.isEditMode
            this.$emit('toggleEditMode')
        },
    }
}
</script>


<style scoped <style lang="scss">
.edit-console {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  z-index: 99;
  padding: 5px;
  position: absolute;
  width: 300px;
  border: 1px solid lightgrey;
  top: 10%;
  right: 10%;
  background-color: white;
  opacity: 0.95;
  box-shadow: 8px 9px 55px -7px rgba(0, 0, 0, 0.67);
  border-radius: 5px;
  font-family: 'cursive';
  color: black;
  cursor: move;
  p {
    width: 100%;
    text-align: center;
    background-color: #f9d8ce ;
    font-size: 16px;
  }
  .btn-close {
    position: absolute;
    top: 10px;
    right: 0;
    cursor: pointer;
  }
}

</style>
>
</style>
