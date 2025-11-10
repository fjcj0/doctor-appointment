import type { ReactNode } from "react";
const FullScreenTsx = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full min-h-[100vh] flex items-center justify-center">
            {children}
        </div>
    )
}
export default FullScreenTsx;