import Image from "next/image";

interface HeaderProps {
  label?: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center ">
      <div className="flex flex-col items-center justify-center ">
        {/*  TODO: add logo*/}

        <Image src={"/snake-1.png"} alt={"logo"} width={80} height={80} />

        <h1 className="text-3xl font-semibold">Casemandu</h1>
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
