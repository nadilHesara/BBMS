import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function logOut() {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userType");
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=dashboard;";
}

export default function useVerifyAccess(pageName) {
    const navigate = useNavigate();
    const [verified, setVerified] = useState(null); // null = loading

    useEffect(() => {
        const checkAccess = async () => {
            try {
                const cleanPageName = pageName.replace(/^\//, ""); // remove leading slash
                const response = await fetch(
                    `http://localhost:9191/dashboard/verifyRole?pageName=${cleanPageName}`,
                    {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    }
                );

                const data = await response.json();

                if (data.status !== "authorized") {
                    throw new Error(data.message || "Unauthorized");
                }

                setVerified(true); // authorized
            } catch (error) {
                console.error(`Access error for ${pageName}:`, error);
                toast.error(`Unauthorized access to ${pageName}`);
                setVerified(false);
                logOut();
                if (pageName == "dashboard") {
                    navigate("/login", { replace: true });
                } else {
                    navigate("/dashboard")
                }
            }
        };

        checkAccess();
    }, [navigate, pageName]);

    return verified; // null = loading, true = authorized, false = unauthorized
}
