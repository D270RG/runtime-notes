import { createSlice,configureStore,current  } from "@reduxjs/toolkit"
import type { PayloadAction} from '@reduxjs/toolkit'

//----------------------------------
interface AddNotePayload{
  label:string
}
interface DeleteNotePayload{
  index:number
}
interface ModifyNotePayload{
  index:number
  newLabel:string
} 
//----------------------------------
export interface Note{
  label:string
}
export interface notesState{
  notes: Note[]
}
const notesInitialState:notesState = {
  notes:[] as Note[]
}
//----------------------------------
export const notesSlice = createSlice({
  name:'notesState',
  initialState:notesInitialState,
  reducers:{
    addNote:(state, action:PayloadAction<AddNotePayload>)=>{
      state.notes.push({
        label:action.payload.label
      });
    },
    deleteNote:(state, action:PayloadAction<DeleteNotePayload>)=>{
      state.notes.splice(action.payload.index, 1);
    },
    modifyNote:(state, action:PayloadAction<ModifyNotePayload>)=>{
      try{
        state.notes.at(action.payload.index)!.label = action.payload.newLabel
      } catch(e) {
        console.log(e);
      }
    },
  }
});
