export async function uploadImage(file: File) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "ml_default");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dlmrbca0i/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!data.secure_url) {
    throw new Error("Falha no upload da imagem");
  }

  return data.secure_url as string;
}