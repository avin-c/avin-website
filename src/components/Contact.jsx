import React from "react";
import GithubSvg from "./svgcomponents/ContactSvgs/GithubSvg";
import LinkedinSvg from "./svgcomponents/ContactSvgs/LinkedinSvg";
import MailSvg from "./svgcomponents/ContactSvgs/MailSvg";
import SlackSvg from "./svgcomponents/ContactSvgs/SlackSvg";
import ContactForm from "./ContactForm";
import Logo from "./Logo";
function Contacts ({name, id}){
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


    
    return (
        <div className="content" id = {id}>
            <div className = "contactButtons">
                <h3 className="header">{name}</h3>
                <div className = "contacts">
                    {contactMethod.map((item) => {
                            const Item = item.svg
                            return (
                            <a  href={item.link} id="contactBoxes" key = {item.platform}>
                                <Item url={item.link} color = "white" strokeweight = {1.5} side = {32}/>
                            </a>

                        );
                        })}
                </div>
                <pagering-link className = "pageRing" theme="dark"></pagering-link>
                <Logo/>

            </div>
            <ContactForm/>
        </div>
    );

}

export default Contacts