import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    const data = {
      email,
      name,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/sendmail",
        data
      );
      console.log(response.data);
      // Reload the page after successful email submission
      window.location.reload();
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="--flex-center --bg-primary --100vh">
      <div className="--width-500px --card --p --bg-light">
        <form className="--form-control" onSubmit={sendEmail}>
          <h1>MERN STACK EMAIL TUTORIAL </h1>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="--btn --btn-primary">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
