import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [user, setUser] = useState({name:'',mail: "", password: ""});

    const onChangeInput = e => {
        const {name, value} = e.target;

        setUser({...user, [name]: value})
    }


    const registerSubmit = async e => {
        e.preventDefault();
        try {
            console.log(user)
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)

            window.location.href = "/"
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    required
                    placeholder="Name"
                    onChange={onChangeInput}

                />
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    required
                    placeholder="Email"
                    onChange={onChangeInput}

                />
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    required
                    placeholder="Password"
                    autoComplete="on"
                    onChange={onChangeInput}/>

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
