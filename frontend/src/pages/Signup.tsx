import { useRef, useState } from "react";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");   
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSignup = async () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        try {
            console.log("CONTROL REACHED HERE SAFELY 1");
            const response = await axios.post(`${BACKEND_URL}/signup`, {
                username,
                password,
            });
            console.log("CONTROL REACHED HERE SAFELY 2");
            if (response.status === 200) {
                setError(""); 
                navigate("/signin");
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setError("User already exists !!"); 
            } else {
                setError("Signup failed, please try again"); 
                console.error(error);
            }
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input ref={usernameRef} placeholder="username" />
                <Input ref={passwordRef} placeholder="password" />

                {/*Idhr erorr message display hoga*/}
                {error && (
                    <p className="text-red-500 text-sm font-medium mt-2">
                        {error}
                    </p>
                )}

                <div className="flex justify-center pt-4">
                    <Button 
                        onClick={handleSignup} 
                        loading={loading} 
                        variant="primary" 
                        text="Signup" 
                        fullWidth={true} 
                    />
                </div>
            </div>
        </div>
    );
}