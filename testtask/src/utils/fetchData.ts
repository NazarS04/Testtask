export async function fetchData<T extends object>(url:string):Promise<T>{
  const response: Response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return await response.json();
}