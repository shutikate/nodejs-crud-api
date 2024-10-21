export const findMatchId = (url: string) => {
  return url.match(/^\/api\/users\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/);
};
