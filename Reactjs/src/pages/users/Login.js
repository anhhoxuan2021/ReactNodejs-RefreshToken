import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getUserByEmail} from '../../features/user/userLoginSlice';


const UserLogin = ({socket}) => {
    const {userLogin,userChatName} = useSelector((state)=>state.user_Login);   
    const navigate = useNavigate();

    const dispatch  = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(getUserByEmail({email:email,password:password}));
        // if(userLogin?.email ===email){
        //    // socket.emit("newUser", {userChatName:userChatName, socketID: socket.id})
        //   // let userLogin1 = JSON.stringify(userLogin)
        //    //localStorage.setItem("userLogin", userLogin1)
        //     navigate("/home");
        // }
    }

    useEffect(() => {
        document.body.className = '#e9ecef';
    }, [])

    useEffect(()=>{
        if(userLogin?.id !=='') navigate("/home");
        
    },[userLogin])

    return(
        <div className='row justify-content-center bg-white pt-4 min-h-700'>
            <div className='col-md-4'>
            <form className='justify-content-center ' onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <Form.Control
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    type="email" name='email' onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text ><span style={{color:"#605e57"}}><FontAwesomeIcon icon={['fas', 'fa-lock']} /> </span></InputGroup.Text>
                    <Form.Control
                    placeholder="Password"
                    aria-label="Password"
                    type="password" name='password' onChange={(e) => setPassword(e.target.value)}
                    />
                </InputGroup>

              
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-outline-primary mt-3' type="submit">Login</button>
                </div>
                
            </form>
            </div>
        </div>
    )
}

export default UserLogin;
