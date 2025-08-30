import { useNavigate } from "react-router-dom"
import { Button } from "../Components/Button"
import { Logo } from "../icons/Logo";

export const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#fdfcfb] to-[#e2ebf0]">
            <header className="backdrop-blur-md bg-white/60 sticky top-0 z-50 flex items-center justify-between px-8 py-4 shadow-md">
                <div className="flex items-center gap-2">
                    <Logo />
                    <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-teal-400 to-lime-500">
                        Second Brain
                    </h1>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        text="Signup"
                        onClick={() => navigate("/signup")}
                    />
                    <Button
                        variant="primary"
                        text="Signin"
                        onClick={() => navigate("/signin")}
                    />
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-sky-100 via-pink-100 to-lime-100 text-center px-6">
                <div className="max-w-4xl text-gray-700">
                    <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-sky-400 to-teal-400 animate-gradient">
                        Welcome to Your Second Brain
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                        <span className="font-semibold text-sky-500">Second Brain</span> helps you
                        <span className="text-teal-500"> save your favorite links</span>,
                        organize them with tags, and
                        <span className="text-pink-500"> share your knowledge</span> with others —
                        like your own light, connected memory.
                    </p>

                    <Button
                        variant="primary"
                        text="Get Started"
                        onClick={() => navigate("/signup")}
                    />

                    <div className="mt-12 animate-bounce text-gray-500">
                        ↓ Share More ,to Learn More ↓
                    </div>
                </div>
            </main>

            <footer className="backdrop-blur-md bg-white/60 flex flex-col min-h-[12vh] items-center justify-center text-gray-600 text-sm">
                <p>© {new Date().getFullYear()} Second Brain. All rights reserved.</p>
                <p className="mt-1">Made with 🌿 by <span className="text-sky-500 font-semibold">Harsh</span></p>
            </footer>
        </div>
    )
}
