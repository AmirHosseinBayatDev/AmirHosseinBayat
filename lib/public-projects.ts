import "server-only";
import { site } from "@/lib/site";

// ---------- Public contract (the DTO) ----------
// Stays the same when the data moves to a database.

export type PublicProjectStatus = "completed" | "in_development" | "unknown";

export type PublicProject = {
  id: string; // permanent; never derived from name, url or position
  name: string;
  description: string;
  status: PublicProjectStatus;
  url: string;
};

// ---------- Mapping from the current source (lib/site.ts) ----------
// Everything below this line is replaced when a database takes over.

// The fields we read from a source project. Presentation fields (image,
// viewLabel, ...) are deliberately not listed, so they cannot be copied by mistake.
type SourceProject = {
  readonly id: string;
  readonly name: string;
  readonly descriptionLine1: string;
  readonly descriptionLine2: string;
  readonly statusLabel: string;
  readonly url: string;
};

// The exact Persian labels used in lib/site.ts. Anything else is "unknown".
const STATUS_BY_LABEL = new Map<string, PublicProjectStatus>([
  ["تکمیل شده", "completed"],
  ["درحال توسعه", "in_development"],
]);

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const collapseWhitespace = (text: string) => text.replace(/\s+/g, " ").trim();

function toPublicProject(source: SourceProject): PublicProject {
  const status = STATUS_BY_LABEL.get(collapseWhitespace(source.statusLabel));
  if (!status) {
    console.warn(`[public-projects] unmapped status label for project "${source.id}"`);
  }

  return {
    id: source.id,
    name: source.name,
    // No punctuation or words are added; the two lines are only joined.
    description: [source.descriptionLine1, source.descriptionLine2]
      .map(collapseWhitespace)
      .filter(Boolean)
      .join(" "),
    status: status ?? "unknown",
    url: source.url,
  };
}

function assertValidIds(projects: PublicProject[]) {
  const seen = new Set<string>();
  for (const { id } of projects) {
    if (!ID_PATTERN.test(id)) throw new Error(`Invalid public project id: "${id}"`);
    if (seen.has(id)) throw new Error(`Duplicate public project id: "${id}"`);
    seen.add(id);
  }
}

// ---------- The facade ----------

export async function listPublicProjects(): Promise<PublicProject[]> {
  // Today the data comes from lib/site.ts. A database version replaces only
  // this function body; the PublicProject type, the route and the API
  // response stay the same.
  const projects = site.inProgressProjects.map(toPublicProject);
  assertValidIds(projects);
  return projects;
}