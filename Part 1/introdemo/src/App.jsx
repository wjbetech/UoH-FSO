import Hello from "./components/Hello";
import { Friends } from "./components/Friends";

const App = () => {
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log(now, a + b);

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
      <Hello
        name="will"
        age="32"
      />
      <Friends />
    </div>
  );
};

export default App;
