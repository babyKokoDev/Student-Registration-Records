import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import {Form, Modal} from 'react-bootstrap';

function App() {
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [matric, setmatric] = useState('')
  const [dept, setdept] = useState('')
  const [todo, setTodo] = useState([])
  const [show, setShow] = useState(false);
  const [userindex, setuserindex] = useState(0)


  const [newfirstname, setnewfirstname] = useState('')
  const [newlastname, setnewlastname] = useState('')
  const [newmatric, setnewmatric] = useState('')
  const [newdept, setnewdept] = useState('')
  

  const handleClose = () => setShow(false);

  const handleShow = (item, index) => {
    setShow(true);
    setuserindex(index)
    setnewfirstname(item.fN)
    setnewlastname(item.lN)
    setnewmatric(item.matRic)
    setnewdept(item.dep)
  }

  const saveChanges = (e) => {
    e.preventDefault()
    setShow(false)
    const newState = todo.map((obj, indx) => {
      if (indx === userindex){
       return {...obj, fN : newfirstname, lN : newlastname, matRic : newmatric, dep : newdept}
      }
      return obj
    })
    
    setTodo(newState)
     
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    const newObject = {
      fN: firstname,
      lN: lastname,
      matRic: matric,
      dep: dept
    }
    setTodo(current => [...current, newObject])
    setfirstname('')
    setlastname('')
    setmatric('')
    setdept('')
  }

  const deletebtn = (index) => {
    setTodo(todo.filter((item, ind) => ind !== index))
  }

  return (
    <>
      <div className="container mt-2">
        <div className='fs-1 text-center text-secondary'>STUDENT REGISTRATION</div>
        <form action="" onSubmit={handleSubmit}>
          <div className="form-group shadow p-4 bg-transparent rounded-3 mb-3">
            <input type="text" className='form-control mb-4 shadow bg-transparent text-white fs-5' placeholder='Enter your First name' value={firstname} onChange={(e) => setfirstname(e.target.value)} />
            <input type="text" className='form-control mb-4 shadow bg-transparent text-white fs-5' placeholder='Enter your Last name' value={lastname} onChange={(e) => setlastname(e.target.value)} />
            <input type="number" className='form-control mb-4 shadow bg-transparent text-white fs-5' placeholder='Enter your matric Number' maxLength={6} value={matric} onChange={(e) => setmatric(e.target.value)} />
            <input type="text" className='form-control mb-4 shadow bg-transparent text-white fs-5' placeholder='Enter your Department' value={dept} onChange={(e) => setdept(e.target.value)} />
            <button type='submit' className='btn btn-primary w-100 fs-5 shadow'>Submit</button>
          </div>
        </form>

        {(todo.length >= 1) ? <table className="table shadow bg-transparent text-white table-bordered text-center">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Matric Number</th>
              <th>Department</th>
              <th>Add/Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              todo.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.fN}</td>
                  <td>{item.lN}</td>
                  <td>{item.matRic}</td>
                  <td>{item.dep}</td>
                  <td>
                    <button onClick={() => deletebtn(index)} className='btn btn-sm btn-danger me-1'>Delete</button>
                    <button onClick={()=>handleShow(item, index)} className='btn btn-sm btn-secondary ms-1'>Edit</button>
                  </td>
                </tr>

              ))
            }
          </tbody>
        </table> : ""}
      </div>


      {/* Modal Page */}
      
      <Modal show={show} onHide={handleClose}>
      <Form action='' onSubmit={saveChanges}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" value={newfirstname} onChange={(event)=>setnewfirstname(event.target.value)} className = "form-control mb-3" />
          <input type="text" value={newlastname} onChange={(event)=>setnewlastname(event.target.value)} className = "form-control mb-3" />
          <input type="text" value={newmatric} onChange={(event)=>setnewmatric(event.target.value)} className = "form-control mb-3" />
          <input type="text" value={newdept} onChange={(event)=>setnewdept(event.target.value)} className = "form-control mb-3" /> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
      </Modal>
    </>
  );
}

export default App;
