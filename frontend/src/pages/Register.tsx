import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router"
import LoginApi from "../class/login.api";
import Navigation from "../components/Navegation";

const Register = () => {
    // Api Rest
    const loginApi = new LoginApi();

    // History
    const history = useHistory();

    // State of information
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // State of validation
    const [isValidUser, setValidUser] = useState("");


    // handlers funtions
    const handlerSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();       

        // Realice the login to application
        const { data } = await loginApi.register(username, password, email);

        if (data.status === 406)
            setValidUser("is-invalid");
        else {
            // Save token on the localstorange
            const token: string = data.body["X-Access-Token"];
            localStorage.setItem("token", token);

            history.push(`/tasks`);
        }
    };

    return (
        <>
            {/* Navegacion!!! */}
            <Navigation />

            {/* Register */}
            <section className="container mt-5 mb-5" >
                <div className="row">
                    <div className="col-5 mx-auto">
                        <form onSubmit={handlerSubmit}>
                            <div className="card card-body">
                                <p className="text-center h1">Sing up</p>
                                <div className="logo-login-register"></div>
                                <div className="form-group has-danger">
                                    <input
                                        type="text"
                                        className={`form-control ${isValidUser}`}
                                        placeholder="UserName"
                                        name="username"
                                        required
                                        onChange={(e: FormEvent<HTMLInputElement>) => {
                                            const { value } = e.currentTarget;
                                            setValidUser("");
                                            setUsername(value);
                                        }}
                                    />
                                    <div className="invalid-feedback">User registered!!</div>
                                </div>
                                <div className="form-group has-danger">
                                    <input
                                        type="Email"
                                        className="form-control"
                                        placeholder="Email"
                                        name="email"
                                        required
                                        onChange={(e: FormEvent<HTMLInputElement>) => {
                                            const { value } = e.currentTarget;
                                            setEmail(value);
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        name="password"
                                        required
                                        onChange={(e: FormEvent<HTMLInputElement>) => {
                                            const { value } = e.currentTarget;
                                            setPassword(value);
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                > Sing up </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;