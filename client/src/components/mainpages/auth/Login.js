import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [user, setUser] = useState({email: "", password: ""});

    const onChangeInput = e => {
        const {name, value} = e.target;

        setUser({...user, [name]: value})
    }


    const loginSubmit = async e => {
        e.preventDefault();
        try {
            console.log(user)
            await axios.post('/user/login', {...user})

            localStorage.setItem('firstLogin', true)

            window.location.href = "/"
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="login-page">
            <form onSubmit={loginSubmit}>
                <h2>Login</h2>
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
                    <button type="submit">Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
