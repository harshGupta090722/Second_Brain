import { useRef, useState } from "react";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const [loading, setLoading] = useState(false);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate=useNavigate();

    const handleSignin = async () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        try {
            const response = await axios.post(`${BACKEND_URL}/signin`, {
                username,
                password,
            });

            if (response.status === 200) {
                const jwt=response.data.token; //In axios response.data has the final data that the backend has returned you!
                localStorage.setItem("token",jwt);
                navigate("/dashboard");
            }
        } catch (error: any) {
            if (error.response && error.response.status === 411) {
                alert("User already exists");
            } else {
                alert("Signin failed, please try again");
                console.error(error);
            }
        }
    }

    return <div className="h-screen w-screen bg-gray-200
    flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input placeholder="username" />
            <Input placeholder="password" />
            <div className="flex justify-center pt-4 ">
                <Button onClick={handleSignin} loading={loading} variant="primary" text="Signin" fullWidth={true} />
            </div>
        </div>
    </div>
}