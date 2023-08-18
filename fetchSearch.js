export async function fetchSearch({ queryKey }) {
  const { type, location, breed } = queryKey[1];

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${type}&location=${location}&breed=${breed}`
  );

  if (!apiRes.ok) {
    throw new Error(
      `fetch search with ${type}, ${location}, ${breed} is not ok`
    );
  }

  return apiRes.json();
}
