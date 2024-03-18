import Image from "next/image";

interface Props {
  imageUrl?: string;
  email: string;
}

export const Avatar = ({ imageUrl, email }: Props) => {
  if (!imageUrl)
    return (
      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-primary dark:text-gray-300">
          {email.split("").slice(0, 2).join("").toUpperCase()}
        </span>
      </div>
    );

  return (
    <Image
      className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
      src={imageUrl}
      alt="Avatar"
      width={50}
      height={50}
    ></Image>
  );
};
