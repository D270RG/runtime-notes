import React, { useEffect } from 'react'
import { useState } from 'react';
import { Note, notesSlice, notesState } from './store/reducers';
import { RootDispatch, RootState } from './store/store';
import { useSelector,useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.scss'
function EditForm(props:{index:number,initialState:Note,cancelCallback:any}){
    const notesDispatch = useDispatch()
    const [formState,setFormState] = useState('');
    function onSubmit(){
        if(formState){
            notesDispatch(notesSlice.actions.modifyNote({index:props.index,newLabel:formState}));
        }
        onCancel();
    }
    function onCancel(){
        props.cancelCallback();
    }
    return(
        <div className='clickbox'>
            <div className='form-placeholder'>
                <Form className='popup-form'>
                    <Form.Label><h5>Edit</h5></Form.Label>
                    <Form.Control type="text" defaultValue={props.initialState.label} onChange={(e)=>setFormState(e.target.value)}/>
                    <div className='button-container'>
                        <Button variant="primary" type="button" onClick={()=>{onSubmit()}}>
                            Submit
                        </Button>
                        <Button variant='secondary' type="button" onClick={()=>{onCancel()}}>
                            Cancel
                        </Button>
                    </div>
                </Form>
                <button className='btn form-close' onClick={()=>{onCancel()}}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>     
        </div>
    );
}
function AddForm(){
    const notesDispatch = useDispatch()
    const [formState,setFormState] = useState('');
    function onSubmit(){
        if(formState){
            notesDispatch(notesSlice.actions.addNote({label:formState}));
        }
    }
    return(
        <Form>
            <div className='button-container'>
                <Form.Control type="text" placeholder='Add note' onChange={(e)=>setFormState(e.target.value)}/>
                <Button variant="dark" type="button" onClick={()=>{onSubmit()}}>
                    Submit
                </Button>
            </div>
        </Form>
    );
}
export default function App() {
  const notes = useSelector((state:RootState) => state.notesReducer.notes);
  const notesDispatch = useDispatch()
  const [formVisibility,setFormVisibility] = useState(undefined as {index:number,initialValue:Note}|undefined);
  function closeEditForm(){
    setFormVisibility(undefined);
  }
  return (
    <div className='page-container'>
        <div className="note-container">
            {notes.map((noteEntry:Note,index)=>{
            return(<div className="note" onClick={()=>{setFormVisibility({index:index,initialValue:{...noteEntry}})}}>
                        <span className="note-text">{noteEntry.label}</span>
                        <div className="button-container">
                            <Button variant='dark' onClick={()=>{
                                    setFormVisibility({index:index,initialValue:{...noteEntry}});
                                }}><i className="bi bi-pencil-square"></i></Button>
                            <Button variant='danger' onClick={()=>{
                                    notesDispatch(notesSlice.actions.deleteNote({index:index}));
                                }}><i className="bi bi-trash"></i></Button>
                            </div>
                        </div>);
            })}
            {formVisibility && <EditForm cancelCallback={closeEditForm} index={formVisibility.index} initialState={formVisibility.initialValue}/>}
        </div>
        {!formVisibility && <div className="float-form">
            <AddForm/>
        </div>}
    </div>
  )
}
