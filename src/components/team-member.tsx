

import Image from "next/image";

export default function TeamMember({ name, role, image, bio, linkedin }) {
  return (
    <div className="flex flex-col items-center text-center max-w-xs">
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        className="rounded-full object-cover"
      />
      <h4 className="mt-4 text-lg font-semibold">{name}</h4>
      <p className="text-sm text-muted-foreground">{role}</p>
      <p className="mt-2 text-sm">{bio}</p>
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-blue-600 hover:underline"
        >
          LinkedIn
        </a>
      )}
    </div>
  );
}
