import React, { FormEvent, useState, useEffect } from "react";
import { useHistory } from "react-router";
import LoginApi from "../class/login.api";

// Componets
import Navigation from "../components/Navegation";

const Login = () => {
    // Api Rest
    const loginApi = new LoginApi();

    // History
    const history = useHistory();

    // Global state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Styles state
    const [validPassword, setValidPassword] = useState("");
    const [validUser, setValidUser] = useState("");

    useEffect(() => {
        const localtoken: string | null = localStorage.getItem("token");
        
        if (localtoken !== null) 
            history.push("/tasks")
        
    }, [history]);

    const handlerSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const { data } = await loginApi.login(username, password);

        if (data.status === 404)
            setValidUser("is-invalid");
        else if (data.status === 401)
            setValidPassword("is-invalid");
        else {
            // Save token on the localstorange
            const token: string = data.body;
            localStorage.setItem("token", token);

            history.push(`/tasks`);
        }
    }

    return (
        <>
            {/* Navegacion!!! */}
            <Navigation />

            {/* Login form */}
            <section className="container mt-5">
                <div className="row">
                    <div className="col-5 mx-auto">
                        <div className="card card-body">
                            <form onSubmit={handlerSubmit}>
                                <p className="text-center h1">Sing in</p>
                                <div className="logo-login-register"></div>
                                <div className="form-group has-danger">
                                    <input
                                        type="text"
                                        className={`form-control ${validUser}`}
                                        placeholder="UserName"
                                        name="username"
                                        required

                                        onChange={ (e: FormEvent<HTMLInputElement>) => {
                                            const { value } = e.currentTarget;
                                            setValidUser("");
                                            setUsername(value);
                                        }}
                                    />
                                    <div className="invalid-feedback">User not register!!</div>
                                </div>
                                <div className="form-group has-danger">
                                    <input
                                        type="password"
                                        className={`form-control ${validPassword}`}
                                        placeholder="Password"
                                        name="password"
                                        required

                                        onChange={ (e: FormEvent<HTMLInputElement>) => {
                                            const { value } = e.currentTarget;
                                            setValidPassword("");
                                            setPassword(value);
                                        }}
                                    />
                                    <div className="invalid-feedback">Invalid Password!!</div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                > Sing in </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;