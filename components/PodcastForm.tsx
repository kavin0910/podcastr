// components/PodcastForm.tsx
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const PodcastForm = ({ existingData }) => {
  const [formData, setFormData] = useState(existingData);
  const updatePodcast = useMutation(api.podcast.updatePodcast);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePodcast(formData); // Assuming formData contains the necessary fields
      alert("Podcast updated successfully");
    } catch (error) {
      console.error("Error updating podcast:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="podcastTitle"
        value={formData.podcastTitle}
        onChange={handleChange}
        placeholder="Podcast Title"
      />
      <textarea
        name="podcastDescription"
        value={formData.podcastDescription}
        onChange={handleChange}
        placeholder="Podcast Description"
      />
      {/* Add more fields as necessary */}
      <button type="submit">Update Podcast</button>
    </form>
  );
};

export default PodcastForm;
