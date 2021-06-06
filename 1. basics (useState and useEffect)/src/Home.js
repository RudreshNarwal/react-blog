import { useEffect, useState } from "react";
import BlogList from "./BlogList";

const Home = () => {
  // creating state for component
  const [blogs, setBlogs] = useState(null);
  const [isPending, setIsPending] = useState(true);  
  const [error, setError] = useState(null);


  // useEffect is called whenever page is rerendered
  // if dependencies = []  -->  Then it will be called only during initial reder
  // if Dependencies = [blogs] --> it will be called during initial reder + every time when we change state of blogs
  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:8000/blogs')
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setBlogs(data);
        setError(null);
      })
      .catch(err => {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      })
    }, 1000);
  }, [])

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { blogs && <BlogList blogs={blogs} /> }
    </div>
  );
}
 
export default Home;
