"use client";

import { AssistantContext } from "@/context/AssistantContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AiModelOptions from "@/services/AiModelOptions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Save, Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import ConfirmationAlert from "../ConfirmationAlert";
import { BlurFade } from "@/components/magicui/blur-fade";

const AssistantSettings = () => {
  const { assistant, setAssistant } = useContext(AssistantContext);
  const UpdateAssistant = useMutation(
    api.userAiAssistants.UpdateUserAiAssistant
  );
  const DeleteAssistant = useMutation(api.userAiAssistants.deleteAssistant);
  const [loading, setLoading] = useState(false);

  const onHandleInputChange = (field: string, value: string) => {
    setAssistant((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const OnSave = async () => {
    if (!assistant?._id) return;
    setLoading(true);

    const result = await UpdateAssistant({
      id: assistant?._id,
      aiModelId: assistant?.aiModelId,
      userInstruction: assistant?.userInstruction,
    });
    toast("Saved!");
    setLoading(false);
  };

  const OnDelete = async () => {
    if (!assistant?._id) return;
    console.log("OnDelete");
    setLoading(true);
    await DeleteAssistant({
      id: assistant?._id,
    });
    setAssistant(null);
    setLoading(false);
  };

  return (
    assistant && (
      <div className="p-5 bg-secondary border-l-[1px] h-screen">
        <h2 className="font-bold text-xl">Settings</h2>
        <BlurFade delay={0.25}>
          <BlurFade delay={0.25 * 2}>
            <div className="mt-4 flex gap-3">
              <Image
                src={assistant?.image}
                alt="assistant"
                width={100}
                height={100}
                className="rounded-xl h-[80px] w-[80px] object-cover"
              />
              <div>
                <h2 className="font-bold">{assistant.name}</h2>
                <p className="text-gray-500 dark:text-gray-300">
                  {assistant.title}
                </p>
              </div>
            </div>
          </BlurFade>
          <div>
            <h2 className="text-gray-500">Model:</h2>
            <Select
              value={assistant.aiModelId}
              onValueChange={(value) => onHandleInputChange("aiModelId", value)}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Model">
                  {assistant.aiModelId}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {AiModelOptions.map((model, index) => (
                  <SelectItem value={model.name} key={index}>
                    <div className="flex gap-2 items-center m-1">
                      <Image
                        src={model.logo}
                        alt={model.name}
                        width={20}
                        height={20}
                        className="rounded-md"
                      />
                      <h2>{model.name}</h2>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </BlurFade>
        <BlurFade delay={0.25 * 3}>
          <div className="mt-4">
            <h2 className="text-gray-500">Instruction:</h2>
            <Textarea
              placeholder="Add Instruction..."
              className="h-[180px] bg-white"
              value={assistant?.userInstruction}
              onChange={(e) =>
                onHandleInputChange("userInstruction", e.target.value)
              }
            />
          </div>
        </BlurFade>
        <div className="absolute bottom-6 right-5 flex gap-5">
          <ConfirmationAlert OnDelete={OnDelete}>
            <Button variant="destructive" disabled={loading}>
              <Trash /> Delete
            </Button>
          </ConfirmationAlert>
          <Button variant="outline" onClick={OnSave} disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin" /> : <Save />}
            save
          </Button>
        </div>
      </div>
    )
  );
};

export default AssistantSettings;
