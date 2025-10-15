import templates from "@/utils/template";
import Image from "next/image";

export default function DashboardPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
            {templates.map((template) => (
                <div
                    key={template?.id}
                    className="p-5 shadow-md rounded-md border flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all"
                >
                    <Image src={template?.icon} alt={template?.name} width={50} height={50} />
                    <h2 className="font-medium text-lg">{template.name}</h2>
                    <p className="text-gray-500 line-clamp-3">{template.desc}</p>
                </div>
            ))}
        </div>
    );
}
