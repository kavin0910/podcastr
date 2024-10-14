// pages/podcast/update/[podcastId].tsx
"use client";
import { useRouter, useParams } from "next/navigation"; // Import useParams
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react"; // Ensure you import useQuery
import PodcastForm from "@/components/PodcastForm";
import { Id } from "@/convex/_generated/dataModel";

const UpdatePodcastPage = () => {
  const router = useRouter();
  const { podcastId } = useParams(); // Use useParams to get the podcastId

  // Handle the case where podcastId is undefined
  if (!podcastId) {
    return <p>Podcast ID is missing. Please check the URL.</p>;
  }

  // Use useQuery to fetch podcast data
  const podcastData = useQuery(api.podcast.getPodcastById, {
    podcastId: podcastId as Id<"podcasts">, // Type assertion to Id<"podcasts">
  });

  const isLoading = podcastData === undefined; // Check loading state
  const error = podcastData === null ? new Error("Podcast not found.") : null;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching podcast: {error.message}</p>;
  if (!podcastData) return <p>Podcast not found.</p>;

  return (
    <div>
      <h1>Update Podcast</h1>
      <PodcastForm existingData={podcastData} />
    </div>
  );
};

export default UpdatePodcastPage;
