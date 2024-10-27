"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../../../../../../components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";

function RecordSection() {
  const [userAnswers, setUserAnswers] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.forEach((result) =>
      setUserAnswers((prevAns) => prevAns + result.transcript)
    );
  }, [results]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center my-7 w-full">
        <div className="bg-gray-800 rounded-lg p-5 flex flex-col justify-center items-center h-full max-h-[400px] w-full">
          <div className="flex justify-center mb-5 relative">
            <div className="bg-white p-3 rounded-full flex items-center justify-center">
              <Image
                src="https://img.freepik.com/premium-vector/realistic-white-webcam_157999-80.jpg"
                width={200}
                height={200}
                alt="web-cam-image"
                className="rounded-full"
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
              <Webcam
                mirrored={true}
                className="mt-5"
                style={{ width: "100%", height: "300px", zIndex: 10 }}
              />
            </div>
          </div>
        </div>
        <Button
          className="mt-5"
          variant="outline"
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
        >
          {isRecording ? (
            <h2 className="text-red-600 flex gap-2">
              <Mic />
              stop Recording
            </h2>
          ) : (
            "Record Answer"
          )}
        </Button>
      </div>
      <Button onClick={() => console.log(userAnswers)}>Show Answer</Button>
    </div>
  );
}

export default RecordSection;
