import DonorReg from "./Pages/DonorReg";
import { useState, useEffect } from "react";
import './App.css'; 

function App() {
    const current_theme = localStorage.getItem("current_theme");
    const [theme, setTheme] = useState(current_theme ? current_theme : "light");
  
    useEffect(() => {
        localStorage.setItem("current_theme", theme);
    }, [theme]);

    return(
        <div className={theme === 'light' ? 'container' : 'container dark'}>
            <DonorReg theme={theme} setTheme={setTheme}/>
        </div>
    );
}

export default App;
