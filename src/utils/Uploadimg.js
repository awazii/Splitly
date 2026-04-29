export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Splitly users image"); 
  console.log(formData)
try{
  const res = await fetch("https://api.cloudinary.com/v1_1/dllocncsk/image/upload", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }
  const json = await res.json();
  return json.secure_url;
} catch (error) {
  console.error("Error uploading image:", error.message);
  return null;
}
};