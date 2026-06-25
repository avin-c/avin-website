import CodeProgress from "./CodeProgress";

function About ({name, id}){

    return(
        <div id = {id} className="content">
            <h3 className="header">{name}</h3>
            <p>Hi! I'm a high school student from Canada passionate about engineering, and I love building things! I enjoy building both hardware and software, like this website!
            My love for making things started when I was little, from building LEGOs to making cardboard crafts. Now i'm into webdev, 3d printing, and electronics, and woodworking.
            <br></br>
            <br></br>

            i joined hack club <a href="https://construct.hackclub.com/">construct</a> in march 2026 because i wanted a 3d printer. unfortunately i didnt get one because i was too busy with school to complete the hours, but i had a lot of fun in the process! this website is my first official hack club project! 
            <br></br>
            <br></br>
            when i'm bored, i like to play <a href="https://www.chess.com/member/malkinaw">chess</a>, play the violin, woodwork, and eat ice cream (my fav flavor is vanilla).

            <br></br>
            <br></br>
            check out the rest of my site!
            </p>
        </div>
    ); 

}

export default About