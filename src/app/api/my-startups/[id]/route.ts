// // import { NextResponse } from "next/server";
// // import { cookies } from "next/headers";
// // import { connectToDatabase } from "@/lib/db";
// // import { verifyToken } from "@/lib/auth";
// // import { StartupData } from "@/models/StartupData";

// // export async function DELETE(
// //   req: Request,
// //   { params }: { params: { id: string } }
// // ) {
// //   await connectToDatabase();

// //   const cookieStore = await cookies();
// //   const token = cookieStore.get("auth_token")?.value;
// //   if (!token) {
// //     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
// //   }
// //   const decoded = verifyToken(token);

// //   const startup = await StartupData.findById(params.id);
// //   if (!startup || startup.founderEmail !== decoded.email) {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
// //   }

// //   await StartupData.findByIdAndDelete(params.id);
// //   return NextResponse.json({ success: true });
// // }



// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { connectToDatabase } from "@/lib/db";
// import { verifyToken } from "@/lib/auth";
// import { StartupData } from "@/models/StartupData";

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   await connectToDatabase();

//   const { id } = params; // Destructure id here

//   const cookieStore = await cookies();
//   const token =  cookieStore.get("auth_token")?.value;
//   if (!token) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }
//   const decoded = verifyToken(token);

//   const startup = await StartupData.findById(id); // Use destructured id
//   if (!startup || startup.founderEmail !== decoded.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//   }

//   await StartupData.findByIdAndDelete(id); // Use destructured id
//   return NextResponse.json({ success: true });
// }

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { StartupData } from "@/models/StartupData";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();

  // ⬇️ Await the params promise before destructuring
  const { id } = await context.params;

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const decoded = verifyToken(token);

  const startup = await StartupData.findById(id);
  if (!startup || startup.founderEmail !== decoded.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await StartupData.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
