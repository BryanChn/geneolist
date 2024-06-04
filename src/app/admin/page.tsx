"use client";
import AdminGuard from "../components/adminGuard";
import { MainTabs } from "../components/tabsAdmin";

export default function AdminPage() {
    return (
        <AdminGuard>
            <div>
                <MainTabs />
            </div>
        </AdminGuard>
    );
}
