import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useJobOffers } from '../../common/hooks/useJobOffers';
import type { JobOfferWithSkillMatchListObject } from '../../common/types/jobOffer.types';
import { ROUTES } from '../../common/constants/routes';
import JobOfferList from '../../components/JobOfferList/JobOfferList';
import PageNavigation from '../../components/PageNavigation/PageNavigation';
import SearchBar from '../../components/SearchBar/SearchBar';
import {
  containerStyle,
  controlsRowStyle,
  errorAlertStyle,
  headerSectionStyle,
  loadingBoxStyle,
  paginationRowStyle,
  resultsInfoStyle,
  subtitleStyle,
  titleStyle,
} from './styles';

const PAGE_SIZE = 10;
const QUERY_PAGE = 'page';
const QUERY_SEARCH = 'search';

const getPageFromParams = (params: URLSearchParams) => {
  const raw = Number(params.get(QUERY_PAGE));
  if (!Number.isFinite(raw) || raw < 1) return 1;
  return Math.floor(raw);
};

const getSearchFromParams = (params: URLSearchParams) => params.get(QUERY_SEARCH)?.trim() ?? '';

const Jobs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getAllJobOffers, loading, error } = useJobOffers();

  const initialPage = getPageFromParams(searchParams);
  const initialSearch = getSearchFromParams(searchParams);

  const [jobOffers, setJobOffers] = useState<JobOfferWithSkillMatchListObject[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [activeSearch, setActiveSearch] = useState(initialSearch);

  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldScrollRef = useRef(false);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const loadJobOffers = useCallback(
    async (page: number, search: string) => {
      const offset = (page - 1) * PAGE_SIZE;
      const params: { offset: number; limit: number; search?: string } = { offset, limit: PAGE_SIZE };
      if (search.length >= 2) params.search = search;

      const response = await getAllJobOffers(params);
      if (response) {
        setJobOffers(response.jobOffers);
        setTotal(response.total);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    loadJobOffers(currentPage, activeSearch);
  }, [currentPage, activeSearch, loadJobOffers]);

  useEffect(() => {
    const urlPage = getPageFromParams(searchParams);
    const urlSearch = getSearchFromParams(searchParams);

    setCurrentPage((prev) => (prev !== urlPage ? urlPage : prev));
    setSearchInput((prev) => (prev !== urlSearch ? urlSearch : prev));
    setActiveSearch((prev) => (prev !== urlSearch ? urlSearch : prev));
  }, [searchParams]);

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);
    const normalizedPage = Math.max(1, Math.floor(currentPage));

    if (normalizedPage === 1) {
      nextParams.delete(QUERY_PAGE);
    } else {
      nextParams.set(QUERY_PAGE, String(normalizedPage));
    }

    if (activeSearch.length >= 2) {
      nextParams.set(QUERY_SEARCH, activeSearch);
    } else {
      nextParams.delete(QUERY_SEARCH);
    }

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [activeSearch, currentPage, searchParams, setSearchParams]);

  useEffect(() => {
    if (shouldScrollRef.current) {
      /*window.scrollTo({ top: 0, behavior: 'instant' });
      shouldScrollRef.current = false;*/
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50); // small delay to ensure DOM is rendered
      return () => clearTimeout(timer);
    }
  }, [jobOffers]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);

    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);

    if (value.length === 0 || value.length >= 2) {
      searchTimerRef.current = setTimeout(() => {
        setActiveSearch(value);
        setCurrentPage(1);
      }, 400);
    }
  };

  const handlePageChange = (page: number) => {
    shouldScrollRef.current = true;
    setCurrentPage(page);
  };

  const handleJobOfferClick = (id: number) => {
    navigate(`${ROUTES.JOB_DETAILS(id)}${location.search}`);
  };

  const startItem = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, total);

  if (loading && jobOffers.length === 0) {
    return (
      <Box sx={loadingBoxStyle}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={containerStyle}>
      {error && (
        <Alert severity="error" sx={errorAlertStyle}>
          {error}
        </Alert>
      )}

      <Box sx={headerSectionStyle}>
        <Typography variant="h4" sx={titleStyle}>
          Available Jobs
        </Typography>
        <Typography variant="body1" sx={subtitleStyle}>
          Browse through our current job openings and find your next opportunity
        </Typography>
      </Box>

      <Box sx={controlsRowStyle}>
        <SearchBar
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search by job title or company name..."
        />
      </Box>

      <JobOfferList
        jobOffers={jobOffers}
        onJobOfferClick={handleJobOfferClick}
        emptyMessage="No job offers found"
        emptySubMessage={
          activeSearch.length >= 2 ? `No results for "${activeSearch}"` : 'Check back later for new opportunities'
        }
      />

      {total > 0 && (
        <Box sx={paginationRowStyle}>
          <PageNavigation currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          <Typography sx={resultsInfoStyle}>
            {startItem}–{endItem} of {total}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Jobs;
