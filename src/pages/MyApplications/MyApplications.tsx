import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, CircularProgress, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useApplications } from '../../common/hooks/useApplications';
import type { ApplicationStatus, MyApplicationListObject } from '../../common/types/application.types';
import { ROUTES } from '../../common/constants/routes';
import MyApplicationList from '../../components/MyApplicationList/MyApplicationList';
import PageNavigation from '../../components/PageNavigation/PageNavigation';
import {
  containerStyle,
  errorAlertStyle,
  loadingBoxStyle,
  paginationRowStyle,
  resultsInfoStyle,
  titleStyle,
} from './styles';

const PAGE_SIZE = 10;

const STATUS_OPTIONS: { label: string; value: ApplicationStatus | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Accepted', value: 'ACCEPTED' },
  { label: 'Rejected', value: 'REJECTED' },
  { label: 'Withdrawn', value: 'WITHDRAWN' },
];

const STATUS_COLORS: Record<ApplicationStatus | 'ALL', { bg: string; color: string; borderColor: string }> = {
  ALL: { bg: 'rgba(12, 170, 65, 0.08)', color: '#0a8734', borderColor: 'rgba(12, 170, 65, 0.3)' },
  PENDING: { bg: 'rgba(2, 136, 209, 0.08)', color: '#0288d1', borderColor: 'rgba(2, 136, 209, 0.2)' },
  ACCEPTED: { bg: 'rgba(46, 125, 50, 0.08)', color: '#2e7d32', borderColor: 'rgba(46, 125, 50, 0.2)' },
  REJECTED: { bg: 'rgba(211, 47, 47, 0.08)', color: '#d32f2f', borderColor: 'rgba(211, 47, 47, 0.2)' },
  WITHDRAWN: { bg: 'rgba(0, 0, 0, 0.06)', color: '#6b7280', borderColor: 'rgba(0, 0, 0, 0.12)' },
};

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

  const handleStatusChange = (_: React.MouseEvent<HTMLElement>, value: ApplicationStatus | 'ALL') => {
    if (value === null) return; // prevent deselecting all
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

      <Box sx={{ marginBottom: '1.5rem' }}>
        <ToggleButtonGroup
          value={statusFilter}
          exclusive
          onChange={handleStatusChange}
          sx={{
            gap: '0.5rem',
            flexWrap: 'wrap',
            '& .MuiToggleButtonGroup-grouped': {
              border: '1px solid',
              borderRadius: '20px !important',
              px: 2,
              py: 0.6,
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'none',
              lineHeight: 1.4,
              transition: 'all 0.18s ease',
              '&:not(:first-of-type)': { marginLeft: 0 },
            },
          }}
        >
          {STATUS_OPTIONS.map((opt) => {
            const colors = STATUS_COLORS[opt.value];
            return (
              <ToggleButton
                key={opt.value}
                value={opt.value}
                sx={{
                  color: statusFilter === opt.value ? colors.color : 'text.secondary',
                  borderColor: statusFilter === opt.value ? colors.borderColor : 'divider',
                  backgroundColor: statusFilter === opt.value ? colors.bg : 'transparent',
                  '&:hover': {
                    backgroundColor: colors.bg,
                    borderColor: colors.borderColor,
                    color: colors.color,
                  },
                  '&.Mui-selected': {
                    color: colors.color,
                    backgroundColor: colors.bg,
                    borderColor: colors.borderColor,
                    '&:hover': { backgroundColor: colors.bg },
                  },
                }}
              >
                {opt.label}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Box>

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
