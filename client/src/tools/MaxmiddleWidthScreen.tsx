import type { ReactNode } from "react";
const MaxmiddleWidthScreen = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full min-h-[100vh] max-w-[90%] md:max-w-[80%] mx-auto">
            {children}
        </div>
    );
}
export default MaxmiddleWidthScreen;