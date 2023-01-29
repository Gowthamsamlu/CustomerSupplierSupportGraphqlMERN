import { Login } from "./components";

function App() {
  const demoPage = false;

  return demoPage ? (
    <div className='App h-screen max-h-screen max-w-screen-3xl border-4 2xl:border-blue-900 border-red-900 bg-red-300 lg:bg-yellow-300 2xl:bg-green-300 3xl:bg-blue-300 xl:bg-orange-200'>
      <div className='container'>
        <h1 className='text-3xl font-bold underline'>Hello worlds!</h1>
      </div>
    </div>
  ) : (
    <div className='App h-screen max-h-screen w-screen max-w-screen bg-gray-300'>
      <div className='container'>
        <Login />
      </div>
    </div>
  );
}

export default App;
