import { Metadata } from "next";
import CreateResumeButton from "./CreateResumeButton";

export const metadata: Metadata = {
    title: "Your resumes",
  };

export default function Page(){
    return <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
            <CreateResumeButton
                canCreate={true}
            />
        </main>
}