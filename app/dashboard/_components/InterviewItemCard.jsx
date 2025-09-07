import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

function InterviewItemCard({ interview }) {
    const router = useRouter();

    //  Moved functions outside of `onStart`
    const onStart = () => {
        router.push('/dashboard/interview/' + interview?.mockId);
    };

    const onFeedbackPress = () => {
        router.push('/dashboard/interview/' + interview?.mockId + "/feedback");
    };

    return (
        <div className=' border shadow-sm rounded-lg p-3 my-3 '>
            <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
            <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
            <h2 className='text-xs text-gray-400 '>Created At: {interview?.createdAt}</h2>

            <div className='flex justify-between mt-2 gap-5'>
                <Button size="sm" variant="outline" className='' onClick={onFeedbackPress}>
                    Feedback
                </Button>
                <Button size="sm" className='' onClick={onStart}>
                    Start
                </Button>
            </div>
        </div>
    );
}

export default InterviewItemCard;
