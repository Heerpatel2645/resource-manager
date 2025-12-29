export type ResourceType = "Article" | "Video" | "Tutorial";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  link?: string;
  fileName?: string;
}
