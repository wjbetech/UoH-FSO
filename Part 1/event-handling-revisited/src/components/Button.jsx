// changed handleClick prop to onClick, doesn't cause any conflicts
// but this may not be a very good practice

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

export default Button;
