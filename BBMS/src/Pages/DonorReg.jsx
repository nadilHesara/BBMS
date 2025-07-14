function DonorReg(){
    return(
        <form>
            <h1>Donor Registration</h1>
            <label for="Dname"> Donor Name: </label>
            <input type="text" id="Dname" name="Dname"></input><br/>

            <label for="Gender"> Gender: </label>
            <input type="radio" id="Male" name="Gender" value=""/>
            <input type="radio" id="Female" name="Gender" value=""/> <br/>

            <label for="BGroup">Blood Group: </label>
            <select name="BloodGrp" id="BloodGrp">
                <option value="-"> </option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="O-">O-</option>
                <option value="AB-">AB-</option>
            </select><br/>

            <label for="NIC"> NIC Number: </label>
            <input type="text" id="NIC" name="NIC"></input><br/>

            <label for="DOB"> Date of Birth: </label>
            <input type="date" id="DOB" name="DOB"></input><br/>


            <label for="Telephone"> Telephone: </label>
            <input type="tel" id="Telephone" name="Telephone"></input><br/>

            
            <label for="Address1"> Address Line 1: </label>
            <input type="text" id="Address1" name="Address1"></input><br/>

            <label for="Address2"> Address Line 2: </label>
            <input type="text" id="Address2" name="Address2"></input><br/>

            <label for="Address3"> Address Line 3: </label>
            <input type="text" id="Address3" name="Address3"></input><br/>

            <label for="District"> District: </label>
            <input type="text" id="District" name="District"></input><br/>


            <input type="submit" value="Save"></input>

            
            
        </form>
    );
}

export default DonorReg