<template>
    <div>
        <md-button class="btn-modify btn-edit md-fab md-mini md-warn" @click="toggleEditMode">
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Edit</md-tooltip>
        </md-button>
        <md-button class="btn-modify btn-dragndrop md-fab md-mini md-warn">
            <md-icon>swap_vertical_circle</md-icon>
            <md-tooltip md-direction="top">Reorder</md-tooltip>
        </md-button>
        <md-button class="btn-modify btn-delete md-fab md-mini md-warn" @click="deleteCmp">
            <md-icon>delete_forever</md-icon>
            <md-tooltip md-direction="top">Delete</md-tooltip>
        </md-button>
    </div>
</template>


<script>
export default {
    name: 'modify-btns',
    methods: {
        deleteCmp() {
            this.$emit('deleteCmp')
        },
        toggleEditMode() {
            this.$emit('toggleEditMode')
        },

    }
}
</script>
