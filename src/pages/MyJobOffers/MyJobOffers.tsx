import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useJobOffers } from '../../common/hooks/useJobOffers';
import type { JobOfferListObject } from '../../common/types/jobOffer.types';
import { ROUTES } from '../../common/constants/routes';
import JobOfferList from '../../components/JobOfferList/JobOfferList';
import AppButton from '../../components/AppButton/AppButton';
import PageNavigation from '../../components/PageNavigation/PageNavigation';
import {
  containerStyle,
  controlsRowStyle,
  errorAlertStyle,
  headerSectionStyle,
  loadingBoxStyle,
  paginationRowStyle,
  resultsInfoStyle,
  titleStyle,
} from './styles';
import SearchBar from '../../components/SearchBar/SearchBar.tsx';

const PAGE_SIZE = 10;

const MyJobOffers = () => {
  const navigate = useNavigate();
  const { getMineJobOffers, loading, error } = useJobOffers();

  const [jobOffers, setJobOffers] = useState<JobOfferListObject[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldScrollRef = useRef(false);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const loadJobOffers = useCallback(
    async (page: number, search: string) => {
      const offset = (page - 1) * PAGE_SIZE;
      const response = await getMineJobOffers({ offset, limit: PAGE_SIZE, search: search || undefined });
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
    if (shouldScrollRef.current) {
      shouldScrollRef.current = false;
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [jobOffers]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);

    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);

    if (value.length === 0 || value.length >= 2) {
      searchTimerRef.current = setTimeout(() => {
        shouldScrollRef.current = true;
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
    navigate(ROUTES.MY_JOB_OFFER_DETAILS(id));
  };

  const handleCreateJobOffer = () => {
    navigate(ROUTES.JOB_OFFER_CREATE);
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
          My Job Offers
        </Typography>
        <AppButton startIcon={<AddIcon />} onClick={handleCreateJobOffer}>
          Create Job Offer
        </AppButton>
      </Box>

      <Box sx={controlsRowStyle}>
        <SearchBar value={searchInput} onChange={handleSearchChange} placeholder="Search by job title..." />
      </Box>

      <JobOfferList
        jobOffers={jobOffers}
        onJobOfferClick={handleJobOfferClick}
        emptyMessage="No job offers found"
        emptySubMessage={
          activeSearch.length >= 2
            ? `No results for "${activeSearch}"`
            : 'Create your first job offer to start receiving applications'
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

export default MyJobOffers;
