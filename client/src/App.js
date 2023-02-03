import { Login, Layout, Dashboard } from "./components";
import { Routes, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  // const state = useSelector((state) => state.UserReducer);

  const demoPage = false;

  return demoPage ? (
    <div className='App h-screen max-h-screen max-w-screen-3xl border-4 2xl:border-blue-900 border-red-900 bg-red-300 lg:bg-yellow-300 2xl:bg-green-300 3xl:bg-blue-300 xl:bg-orange-200'>
      <div className='container'>
        <h1 className='text-3xl font-bold underline'>Hello worlds!</h1>
      </div>
    </div>
  ) : (
    <ApolloProvider client={client}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Dashboard />} />
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;
