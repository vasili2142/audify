import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import './register.scss';

import Spotify, { redirectUri, clientId } from "../../util/spotify";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const register = async (e) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
                console.log('success', user);
            })

    }

    return (
        <div className="container registerContainer">
            <h1>Register</h1>
            <form className="loginForm">
                <div>
                    <label>Email <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    ></input></label>
                </div>
                <div>
                    <label>Password <input
                        type="text"
                        onChange={(e) => setPassword(e.target.value)}
                    ></input></label>
                </div>

                <button type="submit" onClick={register}>Create Account</button>
            </form>
        </div>
    )
}