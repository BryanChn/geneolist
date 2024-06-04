import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
            router.push("/"); // redirection vers profile user
        }
    }, [session, status, router]);

    if (status === "loading" || session?.user?.role !== "ADMIN") {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default AdminGuard;
