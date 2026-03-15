import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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
const QUERY_PAGE = 'page';
const QUERY_STATUS = 'status';
const STATUS_VALUES = ['ALL', 'PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN'] as const;

const getPageFromParams = (params: URLSearchParams) => {
  const raw = Number(params.get(QUERY_PAGE));
  if (!Number.isFinite(raw) || raw < 1) return 1;
  return Math.floor(raw);
};

const getStatusFromParams = (params: URLSearchParams): ApplicationStatus | 'ALL' => {
  const raw = params.get(QUERY_STATUS);
  if (raw && STATUS_VALUES.includes(raw as (typeof STATUS_VALUES)[number])) {
    return raw as ApplicationStatus | 'ALL';
  }
  return 'ALL';
};

function MyApplications() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getMyApplications, loading, error } = useApplications();

  const initialPage = getPageFromParams(searchParams);
  const initialStatus = getStatusFromParams(searchParams);

  const [applications, setApplications] = useState<MyApplicationListObject[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'ALL'>(initialStatus);

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
    const urlPage = getPageFromParams(searchParams);
    const urlStatus = getStatusFromParams(searchParams);

    setCurrentPage((prev) => (prev !== urlPage ? urlPage : prev));
    setStatusFilter((prev) => (prev !== urlStatus ? urlStatus : prev));
  }, [searchParams]);

  const updateUrlParams = (nextPage: number, nextStatus: ApplicationStatus | 'ALL') => {
    const nextParams = new URLSearchParams(searchParams);
    const normalizedPage = Math.max(1, Math.floor(nextPage));

    if (normalizedPage === 1) {
      nextParams.delete(QUERY_PAGE);
    } else {
      nextParams.set(QUERY_PAGE, String(normalizedPage));
    }

    if (nextStatus === 'ALL') {
      nextParams.delete(QUERY_STATUS);
    } else {
      nextParams.set(QUERY_STATUS, nextStatus);
    }

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  };

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
    updateUrlParams(1, value);
  };

  const handlePageChange = (page: number) => {
    shouldScrollRef.current = true;
    setCurrentPage(page);
    updateUrlParams(page, statusFilter);
  };

  const handleApplicationClick = (id: number) => {
    navigate(`${ROUTES.MY_APPLICATION_DETAILS(id)}${location.search}`, {
      state: { returnTo: `${location.pathname}${location.search}` },
    });
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
