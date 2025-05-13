import { defineStore } from 'pinia'
const useNavAction = defineStore('navAction', {
    state:() =>{
        return{
            fixedHeader: true,
            fixedCategory: true,
            showHeader: true,
            showCategory: true,
            forceFixedHeader: false,
        }
    },
    actions:{
        setFixedHeader(fixedHeader){
            this.fixedHeader = fixedHeader
        },
        setFixedCategory(fixedCategory){
            this.fixedCategory = fixedCategory
        },
        setShowHeader(showHeader){
            this.showHeader = showHeader
        },
        setShowCategory(showCategory){
            this.showCategory = showCategory
        },
        setForceFixHeader(forceFixedHeader){
            this.forceFixedHeader = forceFixedHeader;
        },
    }
})
export {
    useNavAction
};