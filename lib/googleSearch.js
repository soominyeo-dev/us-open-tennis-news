async function searchUsOpenArticles() {
  const { GOOGLE_API_KEY, GOOGLE_CSE_ID } = process.env;
  if (!GOOGLE_API_KEY || !GOOGLE_CSE_ID) {
    const err = new Error("GOOGLE_API_KEY / GOOGLE_CSE_ID가 설정되어 있지 않습니다.");
    err.status = 500;
    throw err;
  }

  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", GOOGLE_API_KEY);
  url.searchParams.set("cx", GOOGLE_CSE_ID);
  url.searchParams.set("q", "US Open tennis");
  url.searchParams.set("num", "10");

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data?.error?.message || "Google 검색 API 호출에 실패했습니다.");
    err.status = response.status;
    throw err;
  }

  const items = (data.items || []).map((item) => ({
    title: item.title,
    link: item.link,
    source: item.displayLink,
  }));

  return { items, fetchedAt: new Date().toISOString() };
}

module.exports = { searchUsOpenArticles };
