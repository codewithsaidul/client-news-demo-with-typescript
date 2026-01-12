export const uploadToImgBB = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_API_KEY}`, {
    method: "POST",
    body: formData,
  });
  
  console.log("🚀 ~ uploadToImgBB ~ process.env.NEXT_PUBLIC_API_KEY:", process.env.NEXT_PUBLIC_API_KEY)

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ImgBB upload failed with status ${res.status}: ${text}`);
  }

  const data = await res.json();

  if (!data || !data.data || !data.data.url) {
    throw new Error(`ImgBB upload returned invalid response: ${JSON.stringify(data)}`);
  }
  return data.data.url; // use this URL in your DB
};
