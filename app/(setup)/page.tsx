import { initialProfiel } from "@/lib/initial-profile"
import { db } from "@/lib/db"; 
import { redirect } from "next/navigation";
import InitialModal from "@/components/modals/initial-modal";

async function SetupPage() {
  const profile = await initialProfiel();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId : profile.id
        }
      }
    }
  });

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return (
    <InitialModal />
  )
}

export default SetupPage