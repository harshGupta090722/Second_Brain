import { useRef, useState } from "react";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSignin = async () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        try {
            console.log("CONTROL REACHED HERE SAFELY 1");
            const response = await axios.post(`${BACKEND_URL}/signin`, {
                username,
                password,
            });
            console.log("CONTROL REACHED HERE SAFELY 2");

            if (response.status === 200) {
                const jwt = response.data.token;
                localStorage.setItem("token", jwt);
                navigate("/dashboard");
            }
        } catch (error: any) {
            if (error.response && error.response.status === 411) {
                setError("Invalid username or password");
            } else {
                setError("Signin failed, please try again");
                console.error(error);
            }
        }
    };

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-[#fdfcfb] via-[#e8f0ff] to-[#e2f7f5] flex justify-center items-center">
            <div className="bg-white/90 backdrop-blur-md rounded-xl border border-gray-200 min-w-48 p-8 shadow-lg">
                <h2 className="text-2xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-teal-400 to-indigo-400">
                    Welcome Back 👋
                </h2>

                <Input
                    ref={usernameRef}
                    placeholder="Username"
                />
                <Input
                    ref={passwordRef}
                    placeholder="Password"
                />

                {/* Error message */}
                {error && (
                    <p className="text-red-500 text-sm font-medium mb-2">
                        {error}
                    </p>
                )}

                <div className="flex justify-center pt-4">
                    <Button
                        onClick={handleSignin}
                        loading={loading}
                        variant="primary"
                        text="Signin"
                        fullWidth={true}
                    />
                </div>
            </div>
        </div>
    );
}