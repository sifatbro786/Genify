import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
    return (
        <div className="p-5">
            <UserProfile />
        </div>
    );
}
