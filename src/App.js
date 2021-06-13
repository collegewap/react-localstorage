import {
  Button,
  Card,
  Checkbox,
  FormGroup,
  InputGroup,
  Tag,
} from "@blueprintjs/core";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

const fruits = [
  "Apple",
  "Orange",
  "Guava",
  "Mango",
  "Grapes",
  "Kiwi",
  "Strawberry",
];

function App() {
  const [name, setName] = useState("");
  const [userData, setUserData] = useLocalStorage("user", null);
  // Set edit mode to true whenever the userData is not present or
  // selected favorites are 0
  const [editMode, setEditMode] = useState(
    userData === null || userData?.favorites?.length === 0
  );

  const onFruitChecked = (e, fruit) => {
    // Check if the fruit exists in the current list of favorites
    const index = userData.favorites.indexOf(fruit);
    // If the checkbox is checked and fruit is not part of favorites
    if (e.target.checked && index === -1) {
      setUserData((prevValues) => {
        // Add the fruit to the current list of favorites
        return { ...prevValues, favorites: [...prevValues.favorites, fruit] };
      });
    } else if (!e.target.checked && index !== -1) {
      // If the checkbox is unchecked and fruit is part of favorites
      setUserData((prevValues) => {
        // Remove the fruit from the current list of favorites
        return {
          ...prevValues,
          favorites: [
            ...prevValues.favorites.slice(0, index),
            ...prevValues.favorites.slice(index + 1),
          ],
        };
      });
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    try {
      setUserData({ name, favorites: [] });
      setEditMode(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {userData === null && (
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
      )}
      {userData &&
        (editMode ? (
          <Card elevation="1">
            <p>
              Welcome <strong>{userData.name}</strong>, choose your favorite
              fruits:
            </p>
            {fruits.map((fruit) => {
              return (
                <Checkbox
                  key={fruit}
                  label={fruit}
                  inline={true}
                  className="space"
                  checked={userData.favorites.indexOf(fruit) !== -1}
                  onChange={(e) => {
                    onFruitChecked(e, fruit);
                  }}
                />
              );
            })}
            <Button
              intent="primary"
              text="Done"
              fill
              type="submit"
              onClick={() => setEditMode(false)}
            />
          </Card>
        ) : (
          <Card elevation="1">
            <p>
              Welcome <strong>{userData.name}</strong>, your favorite fruits
              are:
            </p>
            {userData.favorites.map((fruit) => {
              return (
                <Tag
                  key={fruit}
                  round
                  minimal
                  large
                  intent="success"
                  className="space"
                >
                  {fruit}
                </Tag>
              );
            })}
            <Button
              intent="primary"
              text="Change"
              fill
              type="submit"
              onClick={() => setEditMode(true)}
            />
          </Card>
        ))}
    </div>
  );
}

export default App;
