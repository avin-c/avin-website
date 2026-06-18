import React from "react";
import GithubSvg from "./svgcomponents/GithubSvg";
import LinkedinSvg from "./svgcomponents/LinkedinSvg";
import MailSvg from "./svgcomponents/MailSvg";
import SlackSvg from "./svgcomponents/SlackSvg";
function Contacts ({name}){
    const contactMethod = [
        {
            platform: "Github",
            link: "https://github.com/avin-c",
            svg: GithubSvg
        },
        {
            platform: "LinkedIn",
            link: "https://www.linkedin.com/in/avinchiu/",
            svg: LinkedinSvg
        },
        {
            platform: "Slack",
            link: "https://hackclub.enterprise.slack.com/team/U0AGDHP491Q",
            svg: SlackSvg

        },
        {
            platform: "Email",
            link: "mailto:avinc5678@gmail.com",
            svg: MailSvg
        }
    ]
    const platforms = contactMethod.map(name => name.platform);
    const links = contactMethod.map(methods => methods.link);
    console.log(links);


    
    return (
        <div className="content">
        <h3 className="header">{name}</h3>
            <div className = "contacts">
                {contactMethod.map((item) => {
                        const Item = item.svg
                        console.log(item.link)
                        return (
                        <a  href={item.link} id="contactBoxes" key = {item.platform}>
                            <Item url={item.link} color = "#54426B" strokeWeight = {1} side = {64}/>
                        </a>

                    );
                    })}
            </div>
        </div>
    );

}

export default Contacts