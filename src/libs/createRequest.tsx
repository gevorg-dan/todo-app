export enum METHODS {
  POST = "post",
  GET = "get"
}

function getResponse(url, method, payload) {
  if (method === METHODS.POST) {
    return fetch(url, {
      method,
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });
  }

  return fetch(url, { method });
}

export function createRequest(url: string, method: METHODS) {
  return function(payload = {}) {
    return makeRequest(url, method, payload);
  };
}

export async function makeRequest(url, method, payload) {
  const response = await getResponse(url, method, payload);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Ошибка HTTP: " + response.status);
  }
}
