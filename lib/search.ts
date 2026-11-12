export interface ExploreSearchParams {
  category?: string;
  location?: string;
  q?: string;
}

export function buildExploreHref({
  category,
  location,
  q,
}: ExploreSearchParams = {}): string {
  const params = new URLSearchParams();

  if (category && category !== "all") {
    params.set("category", category);
  }
  if (location && location !== "all") {
    params.set("location", location);
  }
  if (q && q.trim()) {
    params.set("q", q.trim());
  }

  const query = params.toString();
  return query ? `/explore?${query}` : "/explore";
}
