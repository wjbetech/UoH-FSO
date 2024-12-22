// I wrote this code to fiddle around with how to implement
// our axios.get() in its own custom hook
// -- it probably is mentioned later in the course, but I like
// to fiddle with stuff anyways

// import axios from "axios";
// import { useEffect, useState } from "react";
//
// // define custom hooks with "use..."
// const useAxiosGet = (url) => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//
//   // debugging start of useEffect
//   console.log("useEffect /w axios fetching notes...");
//
//   // useEffect /w axios
//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const response = await axios.get(url);
//         if (response.status === 200) {
//           setData(response.data);
//           console.log("Data successfully set!");
//         }
//       } catch (error) {
//         setError(error);
//         console.log("Error fetching notes", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchNotes();
//   }, [url]);
//
//   return { data, error, loading };
// };
//
// export default useAxiosGet;
