"use client";

import { Button } from "@/components/ui/button";
import { db } from '@/utils/db';
import { chatSession } from "@/utils/GeminiAIModal";
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { Mic } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from "react-webcam";
import { toast } from "sonner";

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults

  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Combine results into a single answer
  useEffect(() => {
    const combinedAnswer = results.map((result) => result?.transcript).join(' ');
    setUserAnswer(combinedAnswer);
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);

    const feedbackPrompt = `
      Question: ${mockInterviewQuestion.questions[activeQuestionIndex]},
      User Answer: ${userAnswer},
      Please provide a rating (out of 10) and feedback for improvement in JSON format:
      {
        "rating": "out of 10",
        "feedback": "3 to 5 lines"
      }
    `;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);

      const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
      console.log(MockJsonResp);
      const JsonFeedbackResp = JSON.parse(MockJsonResp);

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion.questions[activeQuestionIndex],
        correctAns: mockInterviewQuestion.answers[activeQuestionIndex],
        userAns: userAnswer, // Fixed issue: using userAnswer instead of userAns
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY'),
      });

      if (resp) {
        toast('User Answer recorded successfully');
      }
    } catch (error) {
      console.error("Error saving user answer:", error);
      toast("Error saving answer. Please try again.");
    } finally {
      setUserAnswer('');
      setResults([]);
      setLoading(false);
    }
    setResults([]);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      {/* Webcam Section */}
      <div className='flex flex-col mt-20 justify-center bg-black items-center rounded-lg p-6 relative'>
        <Image src={'/webcam.jpg'} width={300} height={300} alt="Webcam Placeholder" />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
          }}
        />
      </div>

      {/* Recording Button */}
      <Button
        disabled={loading} // Fixed the incorrect "disable" attribute
        variant='outline'
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic /> Stop Recording
          </h2>
        ) : (
          'Record Answer'
        )}
      </Button>

      {/* Error Display */}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}

      {/* Live Transcription Display */}
      <h2 className="mt-4 font-semibold">Transcription:</h2>
      <p>{userAnswer}</p>
      {interimResult && <p className="italic">Listening: {interimResult}</p>}
    </div>
  );
}

export default RecordAnswerSection;
