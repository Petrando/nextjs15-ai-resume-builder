/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export const metadata: Metadata = {
  title: "Design your resume",
};

export default async function Page({ searchParams }: PageProps) {
    const { resumeId } = await searchParams;

    const { userId } = await auth();

    if (!userId) {
        return null;
    }
    
    const resumeToEdit = await prisma.resume.findMany({
      where: { userId },
      include: resumeDataInclude,
    })/*resumeId
        ? await prisma.resume.findUnique({
            where: { id: resumeId, userId },
            include: resumeDataInclude,
        })
        : null;*/

    console.log(userId)
    console.log(resumeId)
    console.log(resumeToEdit)
    return <ResumeEditor resumeToEdit={ null } />;
}