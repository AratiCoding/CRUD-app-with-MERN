import React,{useState} from 'react'
import "./adduser.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export const AddUser = () => {

    const users={
        name:"",
        email:"",
        address:""
    };

    const [user,setUser]=useState(users);

    const navigate = useNavigate();

    const inputHandler = (e)=>{
        const {name, value}=e.target;
        console.log(name,value);
        setUser({...user, [name]:value});
    }

    const submitForm = async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8000/api/user",user).then((response)=>{
            console.log("user created successfully");
             toast.success(response.data.message,{position:"top-right"});
            navigate("/");
        }).catch((error)=>{
            
            console.log("User created successfully.",error)
        })
    }

    return (
    <div className='addUser'>
        <Link to="/" type='button' className='btn btn-secondary'>Back</Link>
        <h3>Add User Form</h3>
        <form action="" className='addUserForm' onSubmit={submitForm}>
          
            <div className="inputGroup">
                <label htmlFor="name">name:</label>
                <input type="text"
                id='name'
                name='name'
                autoComplete='off'
                onChange={inputHandler}
                placeholder='Enter your name' />

            </div>
            <div className="inputGroup">
                <label htmlFor="email">email:</label>
                <input type="email"
                id='email'
                name='email'
                autoComplete='off'
                 onChange={inputHandler}
                placeholder='Enter your email' />

            </div>
            <div className="inputGroup">
                <label htmlFor="address">Address:</label>
                <input type="text"
                id='address'
                name='address'
                autoComplete='off'
                 onChange={inputHandler}
                placeholder='Enter your Address' />

            </div>
            <div className="inputGroup">
                <button type="submit" className='btn btn-primary'>
                    Submit
                </button>
            </div>

        </form>
    </div>
  )
}
