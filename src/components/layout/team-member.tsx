import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";

interface TeamMemberProps {
  name: string;
  linkedinUrl: string;
  githubUrl: string;
}

const TeamMember = ({ name, linkedinUrl, githubUrl }: TeamMemberProps) => {
  return (
    <li className=" flex items-center justify-between w-full">
      <p className="font-museo text-lg text-white">{name}</p>
      <div className="flex flex-row space-x-4">
        <Link
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white duration-200"
        >
          <BsLinkedin size={20} />
        </Link>
        <Link
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white duration-200"
        >
          <BsGithub size={20} />
        </Link>
      </div>
    </li>
  );
};

export default TeamMember;
