const Hello = (props) => {
  console.log(props);

  return (
    <div>
      <p>Hello, {props.name}!</p>
      <p>You are {props.age}.</p>
    </div>
  );
};

export default Hello;
