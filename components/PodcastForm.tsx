import { useState } from "react"; // Import useState to manage loading state
import { useMutation } from "convex/react"; // Import the mutation hook
import { Id } from "@/convex/_generated/dataModel";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button"; // Assuming you have these components
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select"; // Assuming you're using these
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Loader } from "lucide-react";

interface PodcastFormProps {
  existingData: {
    podcastId: Id<"podcasts">;
    audioUrl: string;
    imageUrl: string;
    podcastTitle: string;
    podcastDescription: string;
    voicePrompt: string;
    imagePrompt: string;
    voiceType: string;
    categoryType: string;
    views: number;
    audioDuration: number;
  };
}

const podcastCategories = [
  "business",
  "technology",
  "comedy",
  "education",
  "hobbies",
  "government",
  "mental health",
  "family",
  "music",
  "politics",
  "spirituality",
  "culture",
  "arts",
];

const voiceCategories = ["alloy", "shimmer", "nova", "echo", "fable", "onyx"];

const PodcastForm = ({ existingData }: PodcastFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isSuccess, setIsSuccess] = useState(false); // Success state

  // Use the mutation hook to update podcasts
  const updatePodcast = useMutation(api.podcast.updatePodcast);

  const form = useForm({
    defaultValues: {
      podcastTitle: existingData.podcastTitle,
      podcastDescription: existingData.podcastDescription,
      audioUrl: existingData.audioUrl,
      imageUrl: existingData.imageUrl,
      voicePrompt: existingData.voicePrompt,
      imagePrompt: existingData.imagePrompt,
      voiceType: existingData.voiceType,
      categoryType: existingData.categoryType,
      views: existingData.views,
      audioDuration: existingData.audioDuration,
    },
  });

  const onSubmit = async (formData: any) => {
    setIsLoading(true); // Start loading
    setIsSuccess(false);

    const changedFields: Partial<PodcastFormProps["existingData"]> = {};

    if (formData.podcastTitle !== existingData.podcastTitle) {
      changedFields.podcastTitle = formData.podcastTitle;
    }
    if (formData.podcastDescription !== existingData.podcastDescription) {
      changedFields.podcastDescription = formData.podcastDescription;
    }
    if (formData.audioUrl !== existingData.audioUrl) {
      changedFields.audioUrl = formData.audioUrl;
    }
    if (formData.imageUrl !== existingData.imageUrl) {
      changedFields.imageUrl = formData.imageUrl;
    }
    if (formData.voicePrompt !== existingData.voicePrompt) {
      changedFields.voicePrompt = formData.voicePrompt;
    }
    if (formData.imagePrompt !== existingData.imagePrompt) {
      changedFields.imagePrompt = formData.imagePrompt;
    }
    if (formData.voiceType !== existingData.voiceType) {
      changedFields.voiceType = formData.voiceType;
    }
    if (formData.categoryType !== existingData.categoryType) {
      changedFields.categoryType = formData.categoryType;
    }
    if (formData.views !== existingData.views) {
      changedFields.views = formData.views;
    }
    if (formData.audioDuration !== existingData.audioDuration) {
      changedFields.audioDuration = formData.audioDuration;
    }

    // Ensure all required fields are present by merging existingData with changedFields
    const finalData = {
      podcastId: existingData.podcastId,
      podcastTitle: formData.podcastTitle ?? existingData.podcastTitle,
      podcastDescription:
        formData.podcastDescription ?? existingData.podcastDescription,
      audioUrl: formData.audioUrl ?? existingData.audioUrl,
      imageUrl: formData.imageUrl ?? existingData.imageUrl,
      voicePrompt: formData.voicePrompt ?? existingData.voicePrompt,
      imagePrompt: formData.imagePrompt ?? existingData.imagePrompt,
      voiceType: formData.voiceType ?? existingData.voiceType,
      categoryType: formData.categoryType ?? existingData.categoryType,
      views: formData.views ?? existingData.views,
      audioDuration: formData.audioDuration ?? existingData.audioDuration,
    };

    try {
      await updatePodcast(finalData); // Call the API with complete data
      console.log("Podcast updated successfully.");
      setIsSuccess(true); // Set success state
      setTimeout(() => {
        router.push("/"); // Redirect to podcasts page
      }, 2000); // Optional: Delay to show the message before redirecting
    } catch (error) {
      console.error("Error updating podcast:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Update Podcast</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex w-full flex-col"
        >
          <div className="flex flex-col gap-6 border-b border-black-5 pb-10">
            {/* Podcast Title Field */}
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Podcast Title"
                      className="input-class focus-visible:ring-offset-orange-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />

            {/* Select AI Voice Field */}
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">
                Select AI Voice
              </Label>
              <Select
                onValueChange={(value) => form.setValue("voiceType", value)}
                value={form.watch("voiceType")}
              >
                <SelectTrigger className="input-class">
                  <SelectValue placeholder="Select AI Voice" />
                </SelectTrigger>
                <SelectContent>
                  {voiceCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Podcast Description Field */}
            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Podcast Description"
                      className="input-class focus-visible:ring-offset-orange-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />

            {/* Select Category Field */}
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">
                Select Category
              </Label>
              <Select
                onValueChange={(value) => form.setValue("categoryType", value)}
                value={form.watch("categoryType")}
              >
                <SelectTrigger className="input-class">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {podcastCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Voice Prompt Field */}
            <FormField
              control={form.control}
              name="voicePrompt" // New field for Voice Prompt
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Voice Prompt
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Voice Prompt"
                      className="input-class focus-visible:ring-offset-orange-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center mt-4">
              <Loader size={20} className="animate-spin mr-2" />
              Updating...
            </div>
          ) : (
            <Button
              type="submit"
              className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1"
            >
              Update Podcast
            </Button>
          )}

          {/* Success message */}
          {isSuccess && (
            <p className="mt-4 text-green-500 text-center">
              Podcast updated successfully!
            </p>
          )}
        </form>
      </Form>
    </section>
  );
};

export default PodcastForm;
