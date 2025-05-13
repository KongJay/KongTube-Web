import {defineStore} from "pinia";

const useCategoryStore = defineStore('categoryStore', {
    state: () => {
        return {
            categoryMap: {},
            categoryList: [],
            currentPCategory: {},
        }
    },
    actions: {
        saveCategoryMap(data) {
            this.categoryMap = data;
        },
        saveCategoryList(data) {
            this.categoryList = data;
        },
        saveCurrentPCategory(data) {
            if (data) {
                this.currentPCategory = this.categoryMap[data] || {};
            } else {
                this.currentPCategory = {};
            }

        }
    }
})
export {
    useCategoryStore
};