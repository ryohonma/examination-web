'use client';



export const PageTopButton = ({ className }: { className: string }) => {

  return (
    <button className={className} onClick={() =>
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })}
    />
  );
}