"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/db";
import { MockInterView } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "../../../../components/ui/button";
import { TITLE_FOR_INFORMATION } from "../../../../const";
import Link from "next/link";

function InterView({ params }) {
  const [interview, setInterview] = useState(null); // To hold interview data
  const [webcamEnabled, setWebCamEnabled] = useState(false); // For webcam toggle
  const [cameraError, setCameraError] = useState(""); // To hold any camera error
  const [loadingCamera, setLoadingCamera] = useState(false); // Loading state for webcam

  // Fetch interview details when interviewId changes
  useEffect(() => {
    if (params.interviewId) {
      getInterviewDetails();
    }
  }, [params.interviewId]);

  // Fetch interview details from the database
  const getInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterView)
        .where(eq(MockInterView.mockId, params.interviewId))
        .execute();

      if (result && result.length > 0) {
        setInterview(result[0]); // Store interview data
      } else {
        alert("Interview details not found");
      }
    } catch (error) {
      // console.error("Error fetching interview details:", error);
      alert("Error fetching interview details");
    }
  };

  // Enable webcam with proper error handling
  const handleWebcamEnable = () => {
    setLoadingCamera(true); // Set loading state when enabling the camera
    setCameraError(""); // Clear any previous errors
    setWebCamEnabled(true);
  };

  return (
    <div className="m-10 ">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Interview details section */}
        <div className="flex flex-col my-5 gap-5">
          {interview ? (
            <div className="flex flex-col my-5 gap-5 rounded-lg border p-5">
              <h2 className=" text-lg">
                <strong>Job Position:</strong> {interview.jsonPosition}
              </h2>
              <h2 className="text-lg">
                <strong>Description:</strong> {interview.jobDesc}
              </h2>
              <h2 className="text-lg">
                <strong>Experience:</strong> {interview.jobExperience} years
              </h2>
            </div>
          ) : (
            <p>Loading interview details...</p>
          )}

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2>{TITLE_FOR_INFORMATION}</h2>
          </div>
        </div>

        {/* Webcam section */}
        <div>
          {webcamEnabled ? (
            <>
              {loadingCamera && <p>Accessing camera...</p>}
              <Webcam
                style={{ width: 300, height: 300 }}
                audio={true} // Enable audio (microphone)
                onUserMedia={() => setLoadingCamera(false)} // Turn off loading when camera is accessed
                onUserMediaError={(error) => {
                  console.error("Camera access denied:", error);
                  setWebCamEnabled(false); // Disable webcam on error
                  setLoadingCamera(false); // Turn off loading
                  setCameraError("Camera access denied or device not found.");
                }}
              />
              {cameraError && <p className="text-red-500">{cameraError}</p>}
            </>
          ) : (
            <>
              <WebcamIcon className="h-72 w-full p-20 my-7 bg-secondary rounded-lg border" />
              <Button
                onClick={handleWebcamEnable}
                className="w-full p-2"
                variant="ghost"
              >
                Enable Microphone and Camera
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button>Let's Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default InterView;
