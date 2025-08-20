
import React,{useState,useEffect} from 'react'
import "./update.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export const Update = () => {

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
  const {id}=useParams();

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/user/${id}`).then((response)=>{
        setUser(response.data);
    }).catch((error)=>{
        console.log(error);
    });
  },[id]);


    const submitForm = async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/user/${id}`,user).then((response)=>{
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
        <h3>Update User</h3>
        <form action="" className='addUserForm' onSubmit={submitForm}>
          
            <div className="inputGroup">
                <label htmlFor="name">name:</label>
                <input type="text"
                id='name'
                name='name'
                value={user.name}
                autoComplete='off'
                onChange={inputHandler}
                placeholder='Enter your name' />

            </div>
            <div className="inputGroup">
                <label htmlFor="email">email:</label>
                <input type="email"
                id='email'
                name='email'
                value={user.email}
                autoComplete='off'
                 onChange={inputHandler}
                placeholder='Enter your email' />

            </div>
            <div className="inputGroup">
                <label htmlFor="address">Address:</label>
                <input type="text"
                id='address'
                name='address'
                value={user.address}
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

export default Update