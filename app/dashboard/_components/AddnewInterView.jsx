"use client";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import createChatSession from "../../../utils/GeminiAiModel"; // Import your chat session function
import { LoaderCircle } from "lucide-react";
import { db } from "../../../utils/db";
import { MockInterView } from "../../../utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function AddnewInterView() {
  const [open, setOpen] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResult, setJsonResult] = useState([]);
  const { user } = useUser();
  function handleToggleModal() {
    setOpen(!open);
  }

  async function handleSubmitForm(e) {
    e.preventDefault();
    console.log(jobDescription, jobPosition, jobExperience);

    try {
      // Set loading state to true
      setLoading(true);

      // Get a valid chat session
      const chatSession = await createChatSession();
      if (!chatSession) {
        console.error("Chat session not initialized properly");
        return;
      }

      // Build the input prompt
      const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, I have ${jobExperience} Years of Experience. Based on this detail, please generate six questions and answers in JSON format.`;

      // Send the prompt
      const result = await chatSession.sendMessage(inputPrompt);
      const parsedJson = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      console.log("Parsed JSON:", JSON.parse(parsedJson));

      // Insert into the database
      if (!parsedJson) {
        console.log("something went wrong");
        return;
      }
      if (parsedJson) {
        setOpen(false);
      }
      const mockResult = await db
        .insert(MockInterView)
        .values({
          mockId: uuidv4(),
          jsonMockResp: parsedJson,
          jsonPosition: jobPosition,
          jobExperience: jobExperience,
          jobDesc: jobDescription,
          createdBy: user?.primaryEmailAddress.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
          updatedAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: MockInterView.mockId });

      console.log("Generated Questions:", mockResult);
    } catch (error) {
      console.error("Error generating questions:", error.message); // Log just the error message
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="text-xl">
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
        onClick={handleToggleModal}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={open} onOpenChange={handleToggleModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <form onSubmit={handleSubmitForm}>
              <div className="text-xl">
                <p>
                  Add more details about your job position/role, job
                  description, and years of experience.
                </p>
                <div className="mt-8 my-7">
                  <label>Job Role/Job Position</label>
                  <Input
                    placeholder="Ex. Full Stack Developer"
                    required
                    value={jobPosition}
                    onChange={(e) => setJobPosition(e.target.value)}
                  />
                </div>
                <div className="mt-8 my-7">
                  <label className="text-xl">Job Description</label>
                  <Textarea
                    placeholder="Ex. React, Angular,Nodejs,Javascript"
                    required
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <div className="mt-8 my-7">
                  <label>Year of experience</label>
                  <Input
                    placeholder="5"
                    type="number"
                    required
                    value={jobExperience}
                    onChange={(e) => setJobExperience(e.target.value)}
                  />
                </div>
                <div className="mt-4 space-x-2 flex gap-5 justify-end">
                  <Button variant="ghost" onClick={handleToggleModal}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {!loading ? (
                      "Start Interview"
                    ) : (
                      <>
                        <LoaderCircle />
                        "loading"
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddnewInterView;
