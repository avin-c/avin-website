import CodeProgress from "./CodeProgress";

function About ({name}){

    return(
        <div >
            <div className="content" id = "content1">
                <h3 className="header">{name}</h3>
                <p>hi! i'm a high school student from Canada passionate about engineering, and i love building things! i enjoy hardware but i'm also like to dabble with making React apps! (yeah im larping bro this is my first React app.)
                my love for making things started when i was little, from building legos to making cardboard crafts. and now i'm into woodworking, 3d printing, and electronics.
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
        </div>
    ); 

}

export default About