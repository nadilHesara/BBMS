export default function CampaignHistory() {
  return (
    <div>
      <table>
        <tr>
          <thead>
            <tr>
              <th rowSpan="2">Organization</th>
              <th rowSpan="2">Contact Number</th>
              <th rowSpan="2">Date</th>
              <th rowSpan="2">Number of Donations</th>
              <th colSpan="8">Blood Groups</th>
            </tr>
            <tr>
              <th>A+</th>
              <th>B+</th>
              <th>AB+</th>
              <th>O+</th>
              <th>A-</th>
              <th>B-</th>
              <th>AB-</th>
              <th>O-</th>
            </tr>
          </thead>
        </tr>
      </table>
    </div>
  );
}
