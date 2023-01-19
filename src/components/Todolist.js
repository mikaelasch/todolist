import React, {useState, useRef} from 'react';
import { AgGridReact } from'ag-grid-react'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import Snackbar from '@mui/material/Snackbar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Stack from '@mui/material/Stack'
import {TextField} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';

function Todolist() {
    const [todo, setTodo] = useState({
        desc: '',
        date: '',
        priority: ''})
    const [open, setOpen] = useState(false)
    const [todos, setTodos] = useState([])
    const [columnDefs]=useState([
        {field:'date', sortable: true, filter:true, floatingFilter: true,
            valueFormatter: params=> moment((params.value),"dd.MM.yyyy")},
        {field:'desc', sortable: true, filter:true, floatingFilter: true},
        {field:'priority', sortable: true, filter:true, floatingFilter: true, 
        cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} }
    ])
    

   
    const gridRef = useRef()
    const addTodo = () => {
        setTodos([...todos, todo]);
        
    }
    const inputChanged=(event)=>{
        setTodo({...todo,[event.target.name]:event.target.value})
    }

    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0){
        setTodos(todos.filter((todo,index) => index !== 
      gridRef.current.getSelectedNodes()[0].childIndex))
      setOpen(true)
    }
    else {
        alert('Select row first')
    }
    }   
   
    return(
        <div>
            <Stack 
            alignItems="center"
            justifyContent="center"
            direction="row" 
            spacing={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
             <DatePicker
                label="Date"
                value={todo.date}
                onChange={value=> setTodo({...todo,date:value})}
                renderInput={(params) => <TextField variant="standard"{...params} />}
                />
            </LocalizationProvider>
            <TextField
            name="desc"
            variant="standard"
            label="Description"
            value={todo.desc}
            onChange={inputChanged}/>
            <TextField
            name="priority"
            variant="standard"
            label="Priority"
            value={todo.priority} 
            onChange={inputChanged}/> 
            <Button 
            variant="outlined" 
            color="success" 
            startIcon={<AddCircleOutlineIcon/>}
            onClick={addTodo}>Add</Button>
            <Button 
            variant="outlined" 
            color="error" 
            startIcon={<DeleteIcon />}
            onClick={deleteTodo}>Delete</Button>
            </Stack>
            <div className='ag-theme-material' style={{width:'60%', height:500, margin:'auto'}}>
        <AgGridReact
            ref={gridRef}
            onGridReady={ params => gridRef.current = params.api}
            rowSelection='single'
            rowData={todos}
            columnDefs={columnDefs}
            animateRows={true}>
            

       </AgGridReact>
    </div>
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Todo deleted succesfully"
        />
        </div>
    )
}

export default Todolist;