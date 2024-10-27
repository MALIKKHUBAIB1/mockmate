"use client";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { MockInterView } from "../../../../../utils/schema";
import { db } from "../../../../../utils/db";
import QuestionSection from "../start/_component/QuestionSection";
import RecordSection from "../start/_component/RecordSection";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterView)
        .where(eq(MockInterView.mockId, params.interviewId))
        .execute();

      if (result && result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setInterviewData(result[0]); // Store interview data
        setMockInterviewQuestions(jsonMockResp);
      } else {
        alert("Interview details not found");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
      alert("Error fetching interview details");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-5">
      {/* Questions */}
      <div className=" rounded-lg p-5">
        <QuestionSection questions={mockInterviewQuestions} />
      </div>
      {/* Audio Recording */}
      <div className=" rounded-lg p-5">
        <RecordSection />
      </div>
    </div>
  );
}

export default StartInterview;
