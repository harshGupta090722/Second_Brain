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
                setError("User already exists");
            } else {
                setError("Signup failed, please try again");
                console.error(error);
            }
        }
    };

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-[#fdfcfb] via-[#e2f0f1] to-[#e8f0ff] flex justify-center items-center">
            <div className="bg-white/90 backdrop-blur-md rounded-xl border border-gray-200 min-w-48 p-8 shadow-lg">
                <h2 className="text-2xl font-extrabold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 mb-6">
                    Create Your Account
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