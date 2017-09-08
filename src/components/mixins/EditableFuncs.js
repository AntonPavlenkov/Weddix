export default {
    data() {
        return {
            isEditMode: false
        }
    },
    computed: {
        cmpToEdit() {
            return JSON.parse(JSON.stringify(this.cmp))
        }
    },
        methods: {
            updateCmp(updatedCmp) {
                this.$store.dispatch({ type: "updateCmp", cmp: updatedCmp });
            },
            toggleEditMode() {
                this.isEditMode = !this.isEditMode
            },
            moveCmp(isUp) {
                this.$store.dispatch({ type: "moveCmp", cmp: this.cmpToEdit, isUp });
            },
            deleteCmp() {
                this.isEditMode = false;
                this.$store.dispatch({ type: "deleteCmp", cmp: this.cmpToEdit });
            }
        }
    }