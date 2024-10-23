"use client";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { MockInterView } from "../../../../../utils/schema";
import { db } from "../../../../../utils/db";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestions, setMocInterviewQuestions] = useState([]);
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
      const jsonMockResp = JSON.parse(result[0].jsonMockResp);

      if (result && result.length > 0) {
        setInterviewData(result[0]); // Store interview data
        setMocInterviewQuestions(jsonMockResp);
        console.log("Mock Interview Questions:", jsonMockResp);
      } else {
        alert("Interview details not found");
      }
    } catch (error) {
      // console.error("Error fetching interview details:", error);
      alert("Error fetching interview details");
    }
  };
  return <div>StartInterview</div>;
}

export default StartInterview;
