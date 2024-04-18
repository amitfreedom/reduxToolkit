import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    mycartList:[],
}

const MyProductSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
        addProducts(state,action){
            state.mycartList.push(action.payload);
        },
        addQtyProducts(state,action){
            let arr = [...state.mycartList]
            let  index=arr.findIndex((item)=> item.id=== action.payload.id)
           if(index>=0){
            // console.log(arr[index]);
            let item = arr[index]
            let new_price = item.price
            item.qty +=1 
            new_price = item.qty * item.price
            item.new_price = new_price
            arr[index]=item;
           }
        },
        removeQtyProducts(state,action){
            let arr = [...state.mycartList]
            let  index=arr.findIndex((item)=> item.id=== action.payload.id)
           if(index>=0){
            // console.log(arr[index]);
            let item = arr[index]
            let new_price = item.price
            item.qty > 0 && (item.qty  = item.qty - 1) 
            new_price = item.qty * item.price
            item.new_price = new_price
            arr[index]=item;
           }
        }
    }
});

export const {addProducts,addQtyProducts,removeQtyProducts} = MyProductSlice.actions
export default  MyProductSlice.reducer;