import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const query = `
  query{
    allPerson{
        name
    }
}
`;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://localhost:7113/graphql/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.data.allPerson,"responseData+++++++")
        setData(responseData.data.allPerson);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setData(null);
        setLoading(false);
        setError(err.message);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Hello Docker React Api
        </p>
        <p>Islam</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React And CI/CD And Docker
        </a> */}
        {
          data?.map((item,idx)=> <><p>{item.name}</p><br></br></>)
        }
      </header>
    </div>
  );
}

export default App;
