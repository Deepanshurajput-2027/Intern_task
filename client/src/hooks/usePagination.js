import { useSearchParams } from 'react-router-dom';

export const usePagination = (initialLimit = 10) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || initialLimit;

  const setPage = (newPage) => {
    setSearchParams((prev) => {
      prev.set('page', newPage.toString());
      return prev;
    });
  };

  const setLimit = (newLimit) => {
    setSearchParams((prev) => {
      prev.set('limit', newLimit.toString());
      prev.set('page', '1'); // reset to page 1 on limit change
      return prev;
    });
  };

  return {
    page,
    limit,
    setPage,
    setLimit
  };
};
