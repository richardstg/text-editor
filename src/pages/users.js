import React, { useState, useEffect } from "react";
import TextList from "../components/textlist/textlist";

const query = `{
  users {
    id
    email
    texts {
      id
      name
    }
  }
}`;

const Users = (props) => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/graphql`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ query }),
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        setUsers(data.data.users);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h3 className="mt-3" data-testid="home">
        Users
      </h3>
      {users && users.length > 0 && (
        <>
          {users.map((user) => (
            <>
              <h5>{user.email}</h5>
              {user.texts && user.texts.length > 0 && (
                <TextList texts={user.texts} />
              )}
            </>
          ))}
        </>
      )}
      {error && <p className="text-danger mt-1 mb-1">{error}</p>}
    </>
  );
};

export default Users;
