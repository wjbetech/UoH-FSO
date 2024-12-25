export default function Toast({ message, status }) {
  const toastStatus = status === "error" ? "toast-error" : "toast-success";
  return <div className={`${toastStatus}`}>{message}</div>;
}
