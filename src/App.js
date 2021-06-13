import {
  Button,
  Card,
  Checkbox,
  FormGroup,
  InputGroup,
  Tag,
} from "@blueprintjs/core";
import { useEffect, useState } from "react";

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
  const [userData, setUserData] = useState();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch the user data from the localStorage and set it to the local stage userData
    try {
      const user = window.localStorage.getItem("user");

      if (!user) {
        setUserData(null);
      } else {
        const parsedData = JSON.parse(user);
        setUserData(parsedData);
        if (parsedData.favorites.length === 0) {
          setEditMode(true);
        }
      }
    } catch (error) {
      console.log(error);
      setUserData(null);
    }
  }, []);

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
      window.localStorage.setItem(
        "user",
        JSON.stringify({ name, favorites: [] })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const saveFavorites = () => {
    try {
      window.localStorage.setItem("user", JSON.stringify(userData));
      setEditMode(false);
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
              text="Save"
              fill
              type="submit"
              onClick={saveFavorites}
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
