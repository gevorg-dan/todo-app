export enum METHODS {
  POST = "post",
  GET = "get"
}

export function createRequest(url: string, method: METHODS) {
  return function(payload = {}) {
    return makeRequest(url, method, payload);
  };
}

export async function makeRequest(url, method, payload) {
  const response =
    method === METHODS.GET
      ? await fetch(url, { method })
      : await fetch(url, {
          method,
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" }
        });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Ошибка HTTP: " + response.status);
  }
}
