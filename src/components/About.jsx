import CodeProgress from "./CodeProgress";

function About ({name, id}){

    return(
        <div id = {id} className="content">
            <h3 className="header">{name}</h3>
            <p>Hi! I'm a high school student from Canada passionate about engineering, and I love building things, like this website! 
            
            My love for making things started when I was little, from building LEGOs to making cardboard crafts and now I'm into webdev, 3d printing, and electronics, and woodworking.
            </p>
            <p>
            I joined Hack Club <a href="https://construct.hackclub.com/">Construct</a> in March 2026 because I wanted a 3D printer. Unfortunately I didn't get one because I was too busy with school to complete the hours, but I had a lot of fun in the process! This website is my first official Hack Club project! 
            </p>
            <p>
            When I'm bored, I like to play <a href="https://www.chess.com/member/malkinaw">chess</a>, play the violin, woodwork, and eat ice cream (my fav flavor is key lime pie).
            </p>
        </div>
    ); 

}

export default About