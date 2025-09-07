"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

function StartInterview() {
   const params = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    if (params?.interviewId) {
      GetInterviewDetails();
    }
  }, [params?.interviewId]);

  const GetInterviewDetails = async () => {
    try {
      const result = await db.select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
      
      if (result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions Section */}
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        
        {/* Video/Audio Recording Section */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-end gap-6 mt-6">
        {activeQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
            Previous Question
          </Button>
        )}
        {mockInterviewQuestion && activeQuestionIndex < mockInterviewQuestion.questions.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
            Next Question
          </Button>
        )}
        {mockInterviewQuestion && activeQuestionIndex === mockInterviewQuestion.questions.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`} passHref>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;

