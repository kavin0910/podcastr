"use client";

import { useRouter, useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import PodcastForm from "@/components/PodcastForm";
import { Id } from "@/convex/_generated/dataModel";

const UpdatePodcastPage = () => {
  const router = useRouter();
  const { podcastId } = useParams();

  // Early return if podcastId is undefined
  if (!podcastId) {
    return <p>Podcast ID is missing. Please check the URL.</p>;
  }

  // Ensure podcastId is of type Id<"podcasts">
  const podcastIdTyped = podcastId as Id<"podcasts">;

  // Always call the query
  const podcastData = useQuery(api.podcast.getPodcastById, {
    podcastId: podcastIdTyped,
  });

  // Loading state
  if (podcastData === undefined) {
    return <p>Loading...</p>;
  }

  // Error state handling
  if (podcastData === null) {
    return <p>Podcast not found. Please check the ID.</p>;
  }

  // Construct existingData from the fetched podcastData
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
