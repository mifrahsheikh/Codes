import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useResetPasswordConfirmMutation } from "./AuthAPI";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [resetPasswordConfirm, { isLoading }] = useResetPasswordConfirmMutation();

    const handleReset = async () => {
        try {
            await resetPasswordConfirm({ token, password }).unwrap();
            alert("Password updated!");
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert(err?.data?.error || "Invalid or expired link");
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
            <h1 className="text-3xl mb-4">Enter New Password</h1>
            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full max-w-md p-2 border rounded-md mb-4"
            />
            <button
                onClick={handleReset}
                disabled={isLoading}
                className="px-5 py-3 text-white bg-green-500 rounded-md hover:bg-green-700 w-full max-w-md"
            >
                {isLoading ? "Updating..." : "Reset Password"}
            </button>
        </div>
    );
};

export default ResetPassword;