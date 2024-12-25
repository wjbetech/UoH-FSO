export default function Countries({ countries }) {
  return (
    <div className="country-list">
      {countries.map((c) => {
        return <li key={c}>{c}</li>;
      })}
    </div>
  );
}
