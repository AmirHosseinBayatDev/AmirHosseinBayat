import { connection } from "next/server";
import { listPublicProjects, type PublicProject } from "@/lib/public-projects";

const SCHEMA_VERSION = 1;
const NO_STORE = { "Cache-Control": "no-store" };

// Explicit allowlist: only these fields can ever leave the server.
const toResponseProject = ({ id, name, description, status, url }: PublicProject) => ({
  id,
  name,
  description,
  status,
  url,
});

export async function GET() {
  // Wait for a real request, so this handler is never prerendered at build
  // time (this matters if Cache Components is enabled) and no-store always applies.
  await connection();

  try {
    const projects = await listPublicProjects();
    return Response.json(
      { schemaVersion: SCHEMA_VERSION, projects: projects.map(toResponseProject) },
      { headers: NO_STORE },
    );
  } catch (error) {
    console.error("[api/support/catalog] failed to list projects", error);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500, headers: NO_STORE },
    );
  }
}