import Pagination from 'react-js-pagination';
const Page = ({ page, totalcnt, setPage, itemcount }) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={itemcount}
      totalItemsCount={totalcnt}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={setPage}
    />
  );
};
export default Page;
