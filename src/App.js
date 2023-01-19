
import './App.css';
import React, {useState} from 'react';
import Todolist from './components/Todolist'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';

function App() {
  
  const [value, setValue] = useState('one');

  const handleChange = (event,value) => {
    setValue(value);}; //if not working take event off, or change to _

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todo-list</Typography>
        </Toolbar>
      </AppBar>
    
    <Tabs value={value} onChange={handleChange}>
       <Tab value="one"label="Home" />
       <Tab value="two"label="Todos" />
    </Tabs>
      {value === 'one' && <div> <h2>Welcome to my Todo-list page!</h2></div>}
      {value === 'two' && <div><Todolist/></div>}   
   
    </div>
  );
}

export default App;
