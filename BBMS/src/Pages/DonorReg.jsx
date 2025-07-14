import NaviBar from "../components/Navibar/NaviBar";

function DonorReg({theme , setTheme}){
    return(
        <>
            <NaviBar theme={theme} setTheme={setTheme}/>
            <form>
                <h1>Donor Registration</h1>
                <label for="Dname"> Donor Name: </label>
                <input type="text" id="Dname" name="Dname"></input><br></br>

                <label for="Gender"> Gender: </label>
                <input type="radio" id="Male" name="Gender" value=""/>
                
            </form>
        </>
    );
}

export default DonorReg