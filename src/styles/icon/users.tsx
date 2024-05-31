import Image from "next/image";
export const UsersIcon = (props: any) => {
    const iconUser = "/assets/icon/user.svg";

    return <Image src={iconUser} alt="User" width={14} height={14} />;
};
