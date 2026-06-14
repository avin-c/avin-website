import Signature from "../components/Signature";
import {motion} from 'motion/react'
function Home() {
  const name = "Hi! I'm ";
  
  return (
    <div className = "greeting">
      <h1 className = "title">{name}</h1> 
      <Signature/>
    </div>
  );
}
export default Home;