import { useUsage } from "@/context/usage";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpModal() {
    const { openModal, setOpenModal } = useUsage();

    return (
        <Dialog
            open={openModal}
            // onOpenChange={() => (openModal ? setOpenModal(!openModal) : setOpenModal(openModal))}
            onOpenChange={setOpenModal}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>🚀 Unlock unlimited AI-Powered content!</DialogTitle>
                    <br />
                    <DialogDescription className="space-y-3 text-sm text-muted-foreground">
                        <p>
                            🎉 Congrats! You’ve generated 10,000 words with our AI tool — that’s
                            amazing!
                        </p>
                        <p>
                            🔒 Ready to take your content creation to the next level? Upgrade to a
                            paid plan and enjoy:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-3">
                            <li>✨ Unlimited word generation</li>
                            <li>🧠 Advanced AI features</li>
                            <li>⚡ Faster processing times</li>
                            <li>🛠️ Priority customer support</li>
                        </ul>
                        <p>
                            💡 Don’t let your creativity hit a wall — upgrade now and keep the ideas
                            flowing!
                        </p>

                        <div className="mt-5 text-center">
                            <Link href="/membership">
                                <Button>Join Membership</Button>
                            </Link>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
