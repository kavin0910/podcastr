"use client";

import { useRouter, useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import PodcastForm from "@/components/PodcastForm";
import { Id } from "@/convex/_generated/dataModel";

const UpdatePodcastPage = () => {
  const router = useRouter();
  const { podcastId } = useParams();

  // Handle the case where podcastId is undefined
  if (!podcastId) {
    return <p>Podcast ID is missing. Please check the URL.</p>;
  }

  // Fetch podcast data
  const podcastData = useQuery(api.podcast.getPodcastById, {
    podcastId: podcastId as Id<"podcasts">,
  });

  const isLoading = !podcastData; // Loading state
  const error = podcastData === null ? new Error("Podcast not found.") : null;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching podcast: {error.message}</p>;

  const existingData = {
    podcastId: podcastData._id,
    audioUrl: podcastData.audioUrl || "",
    imageUrl: podcastData.imageUrl || "",
    podcastTitle: podcastData.podcastTitle || "",
    podcastDescription: podcastData.podcastDescription || "",
    voicePrompt: podcastData.voicePrompt || "",
    imagePrompt: podcastData.imagePrompt || "",
    voiceType: podcastData.voiceType || "",
    categoryType: podcastData.categoryType || "",
    views: podcastData.views || 0,
    audioDuration: podcastData.audioDuration || 0,
  };

  return (
    <div>
      <h1>Update Podcast</h1>
      <PodcastForm existingData={existingData} />
    </div>
  );
};

export default UpdatePodcastPage;
