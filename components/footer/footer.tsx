export default function Footer() {
    return (
        <footer className="py-4 text-center border-t-2 dark:border-gray-600">
            <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Genify. All rights reserved.
            </p>
        </footer>
    );
}
