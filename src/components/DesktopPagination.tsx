interface DesktopPaginationProps {
  page: number;
  totalPages: number;
  goToPrevPage: () => void;
  goToNextPage: () => void;
}

const DesktopPagination: React.FC<DesktopPaginationProps> = ({
  page,
  totalPages,
  goToPrevPage,
  goToNextPage,
}) => (
  <div className="fixed left-0 right-0 bottom-0 flex w-full justify-center items-center gap-4 py-6 bg-[#F9F9F9] z-30 md:static md:bg-transparent">
    <button
      className="px-4 py-2 rounded bg-[#8642E5] text-white font-semibold disabled:opacity-50"
      onClick={goToPrevPage}
      disabled={page === 1}
    >
      Atrás
    </button>
    <span className="text-[#6E7191] font-semibold">
      Página {page} de {totalPages}
    </span>
    <button
      className="px-4 py-2 rounded bg-[#8642E5] text-white font-semibold disabled:opacity-50"
      onClick={goToNextPage}
      disabled={page === totalPages}
    >
      Adelante
    </button>
  </div>
);
export default DesktopPagination;
