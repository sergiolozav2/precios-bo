export function AuthorCard() {
  return (
    <div className="flex items-center">
      <img
        className="w-11 h-11 rounded-full"
        src="/assets/sergio-loza.jpeg"
        alt="Rounded avatar"
      />
      <div className="ml-4 flex flex-col text-left">
        <p className="font-medium">
          Sergio Loza ·<span> Linkedin </span>
        </p>
        <p className="text-sm text-stone-100"> Enero 30, 2024 </p>
      </div>
    </div>
  );
}
