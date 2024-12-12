// changed handleClick prop to onClick, doesn't cause any conflicts
// but this may not be a very good practice

const Button = ({ onClick, label }) => <button onClick={onClick}>{label}</button>;

export default Button;
