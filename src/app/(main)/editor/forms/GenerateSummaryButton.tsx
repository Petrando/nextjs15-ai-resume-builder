/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/hooks/use-toast";
import usePremiumModal from "@/hooks/usePremiumModal";
import { canUseAITools } from "@/lib/permission";
import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import { generateSummary } from "./actions";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
    const subscriptionLevel = useSubscriptionLevel();

    const premiumModal = usePremiumModal();

    const { toast } = useToast();

    const [loading, setLoading] = useState(false);

    async function handleClick() {
        if (!canUseAITools(subscriptionLevel)) {
            premiumModal.setOpen(true);
            return;
        }

        try {
            setLoading(true);
            const aiResponse = await generateSummary(resumeData);
            onSummaryGenerated(aiResponse);            
        } catch (error) {
            if(error instanceof Error){
                const { message } = error
                console.log(message.includes('You exceeded your current quota'))
                if(message.includes('You exceeded your current quota')){
                    toast({
                        variant: "destructive",
                        description: "Sorry, AI text generation exceeds allowed quota, cannot generate for now.",
                    });
                }
            }else{
                toast({
                    variant: "destructive",
                    description: "Something went wrong. Please try again.",
                });
            }                        
            
        } finally {
            setLoading(false);
        }
    }

    return (
        <LoadingButton
            variant="outline"
            type="button"
            onClick={handleClick}
            loading={loading}
        >
            <WandSparklesIcon className="size-4" />
            Generate (AI)
        </LoadingButton>
    );
}