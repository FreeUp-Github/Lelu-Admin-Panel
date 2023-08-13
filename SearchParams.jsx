import { useState } from "react";

function SearchParams() {
  const [location, setLocation] = useState("kermun");
  console.log("rerendered");
  return (
    <div>
      <form>
        <label htmlFor="location">location</label>
        <input
          id="location"
          placeholder="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default SearchParams;
