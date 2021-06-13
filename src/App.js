import { Button, Card, FormGroup, InputGroup } from "@blueprintjs/core";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    try {
      window.localStorage.setItem(
        "user",
        JSON.stringify({ name, favorites: [] })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Card elevation="1">
        <form onSubmit={formSubmitHandler}>
          <FormGroup label="Name" labelFor="name">
            <InputGroup
              id="Name"
              placeholder="Name"
              type="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <Button intent="primary" text="Submit" fill type="submit" />
        </form>
      </Card>
    </div>
  );
}

export default App;
