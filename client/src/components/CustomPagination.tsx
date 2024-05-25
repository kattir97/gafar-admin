import ReactPaginate from "react-paginate";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";

interface PaginationProps {
  pageCount: number;
  handlePageClick: (selectedItem: { selected: number }) => void;
  currentPage?: number;
}

export const CustomPagination: React.FC<PaginationProps> = ({
  pageCount,
  handlePageClick,
  currentPage,
}) => {
  return (
    <ReactPaginate
      previousLabel={<IoArrowBackCircle />}
      nextLabel={<IoArrowForwardCircle />}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination-container"}
      pageClassName={"pagination-page"}
      previousClassName={"pagination-previous"}
      nextClassName={"pagination-next"}
      activeClassName={"pagination-active"}
      disabledClassName={"pagination-disabled"}
      breakClassName={"pagination-ellipsis"}
      forcePage={currentPage}
    />
  );
};
