import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, CircularProgress, InputAdornment, TextField, Typography } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useJobOffers } from '../../common/hooks/useJobOffers';
import type { JobOfferWithSkillMatchListObject } from '../../common/types/jobOffer.types';
import { ROUTES } from '../../common/constants/routes';
import JobOfferList from '../../components/JobOfferList/JobOfferList';
import PageNavigation from '../../components/PageNavigation/PageNavigation';
import {
  containerStyle,
  controlsRowStyle,
  errorAlertStyle,
  headerSectionStyle,
  loadingBoxStyle,
  paginationRowStyle,
  resultsInfoStyle,
  searchFieldStyle,
  subtitleStyle,
  titleStyle,
} from './styles';

const PAGE_SIZE = 10;

const Jobs = () => {
  const navigate = useNavigate();
  const { getAllJobOffers, loading, error } = useJobOffers();

  const [jobOffers, setJobOffers] = useState<JobOfferWithSkillMatchListObject[]>([]);
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
    navigate(ROUTES.JOB_DETAILS(id));
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
        <TextField
          sx={searchFieldStyle}
          size="medium"
          placeholder="Search by job title or company name..."
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
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
