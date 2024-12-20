import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import clsx from "clsx";

function SocialLink({ href, icon: Icon, children, className }) {
    return (
        <a
            href={href}
            className={clsx(
                "bg-slate-50 p-2 flex items-center rounded-lg mx-1",
                className,
            )}
        >
            <Icon className="mr-1 " />
            {children}
        </a>
    );
}

export default function FooterAtribbuition() {
    return (
        <div className="mt-4 flex">
            <SocialLink href="https://github.com/snaggleback" icon={FaGithub}>
                GitHub
            </SocialLink>
            <SocialLink
                href="https://www.instagram.com/snaggleback/"
                icon={FaInstagram}
            >
                Instagram
            </SocialLink>
        </div>
    );
}
