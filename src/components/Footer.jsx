import {useState, useEffect} from "react";


function Footer (props){
    const [commitDate, setCommitDate] = useState(null);
    const [commitLink, setCommitLink] = useState("");
    const [commitMessage, setMessage] = useState("");
    const [commitID, setCommitID] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() =>{
        const username = "avin-c";
        const repo = "avin-website";
        const url = `https://api.github.com/repos/${username}/${repo}/commits`;

        const fetchData = async () => {
            const result = await fetch(url);
            result.json().then(json => {
                console.log(json[0].commit.message);
                setMessage(json[0].commit.message);
                console.log(json[0].html_url);
                setCommitLink(json[0].html_url);
                let id = json[0].sha.substring(0,7);
                console.log(id);
                setCommitID(id);
                console.log(json[0].commit.author.date);
                let date = json[0].commit.author.date;
                const formattedDate = new Intl.DateTimeFormat('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short'
                }).format(new Date(date));
                console.log(new Date(date));
                console.log(formattedDate);
                setCommitDate(formattedDate);

            })
        }
        fetchData();
    }, []);
    return (
        <footer className="content">
            <div className = "edgeAlign">
            <p>© 2026 avin-c</p>
            <p id = "commitInfo">Commit <span><a title = {commitMessage} href = {commitLink}>{commitID}</a></span> @ <span id = "date">{commitDate}</span></p>
            </div>
        </footer>
    )
}
export default Footer