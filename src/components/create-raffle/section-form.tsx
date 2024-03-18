interface SectionFormProps {
  children: React.ReactNode;
  title: string;
  paragraph: string;
}

export const SectionForm: React.FC<SectionFormProps> = ({
  children,
  title,
  paragraph,
}) => {
  return (
    <section className="md:flex justify-end gap-40 mt-6">
      <div className="max-w-md">
        <h1 className="text-2xl text-primary font-bold">{title}</h1>
        <p className="text-sm mt-2 text-zinc-400">{paragraph}</p>
      </div>
      <div className=" w-full">{children}</div>
    </section>
  );
};
