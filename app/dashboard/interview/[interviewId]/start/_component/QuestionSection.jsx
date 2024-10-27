"use client";
import { Lightbulb, Volume2 } from "lucide-react";
import React, { useState } from "react";
import { SUBTITLE_FOR_QUESTIONS } from "../../../../../../const";

function QuestionSection({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  function handleCurrentQuestion(i) {
    setCurrentQuestion(i);
  }

  function textToSpeach(text) {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support speak");
    }
  }
  return (
    <div className="p-5 border rounded-lg my-5">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {questions.length > 0 &&
          questions.map((question, index) => (
            <h2
              key={index}
              className={`p-2 rounded-full m-1 cursor-pointer text-center ${
                index === currentQuestion
                  ? "bg-blue-400 text-black"
                  : "bg-secondary"
              }`}
              onClick={() => handleCurrentQuestion(index)}
            >
              #Question {index + 1}
            </h2>
          ))}
      </div>

      <div className="bg-gray-50 my-3 text-md md:text-lg p-2 overflow-auto max-h-40">
        {questions[currentQuestion]?.question && (
          <p>{questions[currentQuestion].question}</p>
        )}
      </div>
      <Volume2 className=" cursor-pointer"
        onClick={() => textToSpeach(questions[currentQuestion]?.question)}
      />

      <div className="bg-blue-100 border rounded-lg p-4 my-3">
        <h2 className="flex gap-2 items-center text-primary">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-primary">{SUBTITLE_FOR_QUESTIONS}</h2>
      </div>
    </div>
  );
}

export default QuestionSection;
