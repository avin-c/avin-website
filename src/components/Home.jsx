import Signature from "../components/Signature";
import {motion} from 'motion/react'
function Home({id}) {
  const name = "Hi! I'm ";
  
  return (
    <div className = "greeting" id = {id}>
      <h1 className = "title">{name}</h1> 
      <Signature/>
    </div>
  );
}
export default Home;