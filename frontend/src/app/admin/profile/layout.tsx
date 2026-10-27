import { ProfileTabs } from "@/components/profile/ProfileTabs";

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProfileTabs />

      {children}
    </>
  );
}
