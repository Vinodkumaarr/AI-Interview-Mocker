import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';


function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
  if (!mockInterviewQuestion || !mockInterviewQuestion.questions) {
    return <div>No questions available</div>;
  }
  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech)
    }
    else{
      alert('Sorry ,Your browser does not support text to  speech')
    }
  }

  return (
    <div className='p-10 border rounded-lg my-10'>
      {/* Question Navigation */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion.questions.map((question, index) => (
          <h2
            key={index}
            className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer
            ${activeQuestionIndex === index ? 'bg-primary text-white' : ''}
            `}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      {/* Display Active Question */}
      <h2 className='my-5 text-md md:text-lg'>
        {mockInterviewQuestion.questions[activeQuestionIndex] || "No question available."}
      </h2>

      <Volume2 className='cursor-pointer mb-10' onClick={()=>textToSpeech(mockInterviewQuestion.questions[activeQuestionIndex] )}/>

      {/* Note Section */}
      <div className='border rounded-lg p-5 bg-blue-100 scroll-mt-20'>
        <h2 className='flex gap-5 items-center text-primary'>
          <Lightbulb />
          <strong>Note:</strong> 
        </h2>
        <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>
    </div>
  );
}

export default QuestionSection;
