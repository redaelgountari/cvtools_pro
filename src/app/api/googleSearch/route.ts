export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    const API_KEY = process.env.GOOGLE_API;
    const SEARCH_ENGINE_ID = process.env.ID_MOTEUR_RECHERCHE;

    if (!query) {
      return new Response(JSON.stringify({ error: "Query parameter is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Search request failed");
    }

    const data = await response.json();

    return new Response(JSON.stringify({ results: data.items || [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch search results" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
