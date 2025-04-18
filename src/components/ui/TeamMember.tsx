import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";

interface TeamMemberProps {
  name: string;
  linkedinUrl: string;
  githubUrl: string;
}

const TeamMember = ({ name, linkedinUrl, githubUrl }: TeamMemberProps) => {
  return (
    <div className="flex justify-between space-x-4">
      <p className="font-MuseoModerno text-lg leading-[1.5] text-white">
        {name}
      </p>
      <div className="flex flex-row space-x-4">
        <Link
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition-colors duration-200 hover:text-[#3E31AE]"
        >
          <BsLinkedin size={20} />
        </Link>
        <Link
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition-colors duration-200 hover:text-[#3E31AE]"
        >
          <BsGithub size={20} />
        </Link>
      </div>
    </div>
  );
};

export default TeamMember;
