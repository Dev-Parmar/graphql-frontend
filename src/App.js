
import './App.css';
import DisplayData from './DisplayData';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

function App() {

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://127.0.0.1:4000/graphql"
  })

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
