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


<style scoped>
</style>
