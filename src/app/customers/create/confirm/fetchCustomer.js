export default async function fetchCustomer(id) {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:8000";
  try {
    const res = await fetch(`${endpoint}/customers?customer_id=${id}`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch customer");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}