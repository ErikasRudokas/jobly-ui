import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useApplications } from '../../common/hooks/useApplications';
import type { ApplicationStatus, MyApplicationListObject } from '../../common/types/application.types';
import { ROUTES } from '../../common/constants/routes';
import MyApplicationList from '../../components/MyApplicationList/MyApplicationList';
import PageNavigation from '../../components/PageNavigation/PageNavigation';
import ApplicationStatusFilter from '../../components/ApplicationStatusFilter/ApplicationStatusFilter';
import {
  containerStyle,
  errorAlertStyle,
  loadingBoxStyle,
  paginationRowStyle,
  resultsInfoStyle,
  titleStyle,
} from './styles';

const PAGE_SIZE = 10;

function MyApplications() {
  const navigate = useNavigate();
  const { getMyApplications, loading, error } = useApplications();

  const [applications, setApplications] = useState<MyApplicationListObject[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'ALL'>('ALL');

  const shouldScrollRef = useRef(false);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const loadApplications = useCallback(
    async (page: number, status: ApplicationStatus | 'ALL') => {
      const offset = (page - 1) * PAGE_SIZE;
      const response = await getMyApplications({
        offset,
        limit: PAGE_SIZE,
        status: status === 'ALL' ? null : status,
      });
      if (response) {
        setApplications(response.applications);
        setTotal(response.total);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    loadApplications(currentPage, statusFilter);
  }, [currentPage, statusFilter, loadApplications]);

  useEffect(() => {
    if (shouldScrollRef.current) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [applications]);

  const handleStatusChange = (value: ApplicationStatus | 'ALL') => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    shouldScrollRef.current = true;
    setCurrentPage(page);
  };

  const handleApplicationClick = (id: number) => {
    navigate(ROUTES.MY_APPLICATION_DETAILS(id));
  };

  const startItem = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, total);

  if (loading && applications.length === 0) {
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

      <Typography variant="h4" sx={titleStyle}>
        My Applications
      </Typography>

      <ApplicationStatusFilter value={statusFilter} onChange={handleStatusChange} />

      <MyApplicationList
        applications={applications}
        onApplicationClick={handleApplicationClick}
        emptyMessage="No applications found"
        emptySubMessage={
          statusFilter !== 'ALL'
            ? `No ${statusFilter.toLowerCase()} applications`
            : 'Browse job offers and apply to start your journey'
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
}

export default MyApplications;
