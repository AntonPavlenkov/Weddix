<template>
    <section class="couple-form">
        <md-input-container md-clearable class="input-newUrl">
            <label>Enter New Url</label>
            <md-input v-model="url"></md-input>
        </md-input-container>
        <md-button @click="saveNewUrl" class="md-fab md-mini md-clean">
            <md-icon>save</md-icon>
            <md-tooltip md-direction="top">Save</md-tooltip>
        </md-button>
    </section>
</template>
<script>
export default {
    name: 'CoupleToolbar',
    props: ['cmp', 'selectedImgType'],
    data() {
        return {
            url: this.cmp.data[this.selectedImgType]
        }
    },
    created() {

    },
    computed: {
        cmpToEdit() {
            return JSON.parse(JSON.stringify(this.cmp))
        },
    },
    methods: {
        updateCmp(updatedCmp) {
            this.$emit('update', updatedCmp);
        },
        saveNewUrl() {
            this.cmpToEdit.data[this.selectedImgType] = this.url
            this.updateCmp(this.cmpToEdit)
        },
    },
    watch: {
        selectedImgType(newVal) {
            this.url = this.cmp.data[newVal]
        }
    }
}
</script>

<style scoped lang="scss">
.couple-form{
    text-align: center;
}
</style>




