<template>
    <div>
        <md-button id="btn-modify-1" class="btn-modify btn-edit md-fab md-mini md-warn" @click="toggleEditMode">
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Edit</md-tooltip>
        </md-button>
        <md-button id="btn-modify-2" class="btn-modify btn-dragndrop md-fab md-mini md-warn">
            <md-icon>swap_vertical_circle</md-icon>
            <md-tooltip md-direction="top">Reorder</md-tooltip>
        </md-button>
        <md-button id="btn-modify-3" class="btn-modify btn-delete md-fab md-mini md-warn" @click="deleteCmp">
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

<style lang="scss">
.btn-modify {
    position: absolute;
    opacity: 0.2;
    transition: all .5s;
    right: 5%;
}

#btn-modify-1, #btn-modify-2, #btn-modify-3{
    position: absolute;
}

.btn-modify:hover {
    opacity: 1;
}

.btn-edit {
    top: 10px;
}

.btn-modify,
.btn-delete:hover {
    cursor: pointer;
}

.btn-dragndrop {
    top: 60px;
}

.btn-dragndrop:hover {
    cursor: move;
}

.btn-delete {
    top: 110px;
}
</style>
