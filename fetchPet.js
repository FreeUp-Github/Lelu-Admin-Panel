export async function fetchPet({ queryKey }) {
  const id = queryKey[1];

  const apiRes = await fetch("http://pets-v2.dev-apis.com/pets?id=" + id);

  if (!apiRes.ok) {
    throw new Error("fetch detail with id: " + id + " is not ok");
  }

  return apiRes.json();
}
