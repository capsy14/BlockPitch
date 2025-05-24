// import Image from "next/image"
// import Link from "next/link"
// import { Linkedin } from "lucide-react"

// interface TeamMemberProps {
//   name: string
//   role: string
//   image: string
//   bio: string
//   linkedin: string
// }

// export default function TeamMember({ name, role, image, bio, linkedin }: TeamMemberProps) {
//   return (
//     <div className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md">
//       <div className="aspect-square overflow-hidden">
//         <Image
//           src={image || "/placeholder.svg"}
//           alt={name}
//           width={300}
//           height={300}
//           className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//         />
//       </div>
//       <div className="p-4">
//         <h3 className="text-lg font-bold">{name}</h3>
//         <p className="text-sm text-muted-foreground">{role}</p>
//         <p className="mt-2 text-sm">{bio}</p>
//         <div className="mt-4 flex justify-end">
//           <Link
//             href={linkedin}
//             className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
//           >
//             <Linkedin className="h-4 w-4" />
//             <span className="sr-only">LinkedIn</span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }


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
