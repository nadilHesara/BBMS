import React, { useState, useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import "./ChangePassword.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { filledInputClasses } from "@mui/material/FilledInput";
import { Eye, EyeOff } from "lucide-react";


function validatePassword(pwd) {
  if (pwd.length < 8) return "Password must be at least 8 characters long.";
  if (!/[A-Z]/.test(pwd)) return "Password must contain at least one uppercase letter.";
  if (!/[a-z]/.test(pwd)) return "Password must contain at least one lowercase letter.";
  if (!/[0-9]/.test(pwd)) return "Password must contain at least one number.";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return "Password must contain at least one special character.";
  return true;
};

function ChangePassword() {
  const navigate = useNavigate();
  const userType = sessionStorage.getItem("userType");
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem("userData")));
  const { loading, setLoading } = useContext(LoadingContext);
  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);



  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    userType: userType,
    userName: userData.userName

  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const CheckNewPassword = () => {
    if (confirmPassword == formData.newPassword) {
      const validate = validatePassword(formData.newPassword);
      if (validate == true) {
        SendPasswordData();
      }
      toast.warning(validate)
    }
    else {
      toast.error("Password is not matching.")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CheckNewPassword();
  };

  const SendPasswordData = async () => {

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:9191/dashboard/ChangePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json();

      if (response.ok) {
        toast.success("Password Changed successfully!")
        navigate("/dashboard")
      }
      if (result.message === "User type is different!") {
          toast.warning("User type does not match!");
      }
    } catch (error) {
      toast.error("Server not reachable. Try again later.")
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <p className="hospital-reg-notice">For your security, please update your password regularly.</p>
    <form
      className="doner-reg-form max-w-md mx-auto mt-5  bg-white dark:!bg-gray-900 p-6 rounded-2xl shadow-lg space-y-6"
      onSubmit={handleSubmit}
    >
      {/* Current Password */}
      <div>
        <label
          htmlFor="curpwd"
          className="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
        >
          Current Password:
        </label>
        <div className="relative">
          <input
            type={showCur ? "text" : "password"}
            id="curpwd"
            name="currentPassword"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
                       focus:ring-blue-500 bg-white dark:!bg-gray-800 
                       border-gray-300 dark:!border-gray-600 
                       text-gray-900 dark:!text-gray-100"
          />
          <button
            type="button"
            onClick={() => setShowCur(!showCur)}
            className="absolute inset-y-5 right-3 pb-3 flex items-center text-gray-500 dark:!text-gray-400"
          >
            {showCur ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* New Password */}
      <div>
        <label
          htmlFor="newpwd"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          New Password:
        </label>
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            id="newpwd"
            name="newPassword"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
                       focus:ring-blue-500 bg-white dark:!bg-gray-800 
                       border-gray-300 dark:!border-gray-600 
                       text-gray-900 dark:!text-gray-100"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute inset-y-0 right-3 pb-3 flex items-center text-gray-500 dark:!text-gray-400"
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Password constraints */}
        <p className="mt-2 text-xs text-gray-500 dark:!text-gray-200">
          The password must be containing at least <span className="font-semibold">8 characters</span>, including
          <span className="font-semibold"> uppercases</span>, 
          <span className="font-semibold"> lowercases</span>, 
          <span className="font-semibold"> numbers</span>, and 
          <span className="font-semibold"> special characters</span>.
        </p>
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="cfmnewpwd"
          className="block text-sm font-medium text-gray-700 dark:!text-gray-300 mb-1"
        >
          Confirm New Password:
        </label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            id="cfmnewpwd"
            name="conf_password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
                       focus:ring-blue-500 bg-white dark:!bg-gray-800 
                       border-gray-300 dark:!border-gray-600 
                       text-gray-900 dark:!text-gray-100"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute inset-y-0 right-3 flex items-center pb-3 text-gray-500 dark:!text-gray-400"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-red-800 dark:!bg-rose-600 text-white rounded-md hover:bg-rose-950 hover:scale-110 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Password
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-800 dark:!bg-gray-600 text-white rounded-md hover:bg-rose-950 hover:scale-110 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cancel
        </button>
      </div>
    </form>
    </>
  );
}

export default ChangePassword;
