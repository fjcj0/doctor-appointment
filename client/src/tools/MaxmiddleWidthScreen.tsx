import type { ReactNode } from "react";
const MaxmiddleWidthScreen = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full min-h-[100vh] max-w-7xl mx-auto">
            {children}
        </div>
    );
}
export default MaxmiddleWidthScreen;