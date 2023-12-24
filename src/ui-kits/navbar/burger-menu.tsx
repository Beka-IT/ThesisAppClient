interface BurgerMenuProps {
  onClick: () => void;
}
const className = 'w-8 h-[2.3px] bg-gray-900 dark:bg-gray-200';
export const BurgerMenu = ({ onClick }: BurgerMenuProps) => {
  return (
    <button onClick={onClick} className="flex flex-col gap-2">
      <div className={className}></div>
      <div className={className}></div>
      <div className={className}></div>
    </button>
  );
};
