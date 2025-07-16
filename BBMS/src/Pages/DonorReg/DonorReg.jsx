import NaviBar from "../../components/Navibar/NaviBar";
import './DonorReg.css'

function DonorReg({ theme, setTheme }) {

  const districts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha",
    "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala",
    "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa",
    "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];


  return (
    <div>
      <NaviBar theme={theme} setTheme={setTheme} />
      <div className={theme == 'light' ? "donor-reg" : "donor-reg dark"}>
        <form>

          <h1>Donor Registration</h1>
          <label for="Dname"> Donor Name: </label>
          <input type="text" id="Dname" name="Dname" required></input>
          <br />

          <label for="Gender"> Gender: </label>
          <input type="radio" id="Male" name="Gender" value="" required/>
          <label for="Male">Male</label>
          <input type="radio" id="Female" name="Gender" value="" />
          <label htmlFor="Female">Female</label>
          <br />

          <label for="BGroup">Blood Group: </label>
          <select name="BloodGrp" id="BloodGrp">
            <option value="-">--Select Blood Group--</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="AB+">AB+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="O-">O-</option>
            <option value="AB-">AB-</option>
          </select>
          <br />

          <label for="NIC"> NIC Number: </label>
          <input type="text" id="NIC" name="NIC" required></input>
          <br />

          <label for="DOB"> Date of Birth: </label>
          <input type="date" id="DOB" name="DOB" required></input>
          <br />

          <label for="Telephone"> Telephone: </label>
          <input type="tel" id="Telephone" name="Telephone" required></input>
          <br />
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <label htmlFor="Address" style={{ width: "130px", paddingTop: "5px" }}>
              Address:
            </label>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
              <input type="text" id="Address1" name="Address1" placeholder="Address Line 1" required/>
              <input type="text" id="Address2" name="Address2" placeholder="Address Line 2" required/>
              <input type="text" id="Address3" name="Address3" placeholder="Address Line 3" />
            </div>
          </div>

          <label for="District"> District: </label>
          <select id="District" name="District" required>
            <option value="">-- Select District --</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>{district}</option>
            ))}
          </select>
          <br />


          <input type="submit" value="Register"></input>
        </form>
      </div>
    </div>
  );
}

export default DonorReg;
