import NaviBar from "../../components/Navibar/NaviBar";

function CompReg({ theme, setTheme }) {
  return (
    <>
      <NaviBar theme={theme} setTheme={setTheme} />
    <form>
      <h1>Campaign Registration</h1>
      <label for="OrgName"> Organizer Name: </label>
      <input type="text" id="OrgName" name="OrgName"></input>
      <br />

      <label for="District"> District: </label>
      <input type="text" id="District" name="District"></input>
      <br />

      <label for="address"> Address: </label>
      <input type="text" id="address" name="address"  />
      
      <br />


      <label for="date"> Date : </label>
      <input type="date" id="date" name="date"></input>
      <br />

      <label for="capacity"> Number of donations </label>
      <input type="text" id="capacity" name="capacity" placeholder="Enter an expected number of donars"  />

      <br />

      <label for="startTime"> Starting Time : </label>
      <input type="time" id="startTime" name="startTime"></input>
      <br />

      <label for="endTime"> Ending Time : </label>
      <input type="time" id="endTime" name="endTime"></input>
      <br />

      <label for="contactNo"> Contact Number: </label>
      <input type="text" id="contactNo" name="contactNo"  />
      <br />
      <label for="email"> Email Address: </label>
      <input type="text" id="email" name="email"  />
      <br />
      <input type="submit" value="Save"></input>
    </form>
    </>
  );
}

export default CompReg;
