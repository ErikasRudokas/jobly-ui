import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Visibility as ViewIcon } from '@mui/icons-material';
import { useAdminUsers } from '../../common/hooks/useAdminUsers';
import type { AdminUserListItem } from '../../common/types/adminUser.types';
import { ROUTES } from '../../common/constants/routes';
import PageNavigation from '../../components/PageNavigation/PageNavigation';
import SearchBar from '../../components/SearchBar/SearchBar';
import {
  containerStyle,
  controlsRowStyle,
  emptyStateStyle,
  errorAlertStyle,
  headerSectionStyle,
  loadingBoxStyle,
  paginationRowStyle,
  resultsInfoStyle,
  tableContainerStyle,
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

const formatRole = (role: string) => role.replace(/_/g, ' ').toLowerCase();

const AdminUsers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getAdminUsers, loading, error } = useAdminUsers();

  const initialPage = getPageFromParams(searchParams);
  const initialSearch = getSearchFromParams(searchParams);

  const [users, setUsers] = useState<AdminUserListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [activeSearch, setActiveSearch] = useState(initialSearch);

  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldScrollRef = useRef(false);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const loadUsers = useCallback(
    async (page: number, search: string) => {
      const offset = (page - 1) * PAGE_SIZE;
      const params: { offset: number; limit: number; search?: string } = { offset, limit: PAGE_SIZE };
      if (search.length >= 2) params.search = search;

      const response = await getAdminUsers(params);
      if (response) {
        setUsers(response.users);
        setTotal(response.total);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    loadUsers(currentPage, activeSearch);
  }, [currentPage, activeSearch, loadUsers]);

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
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [users]);

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

  const handleViewDetails = (id: number) => {
    navigate(`${ROUTES.ADMIN_USER_DETAILS(id)}${location.search}`);
  };

  const startItem = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, total);

  if (loading && users.length === 0) {
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
          User Management
        </Typography>
      </Box>

      <Box sx={controlsRowStyle}>
        <SearchBar value={searchInput} onChange={handleSearchChange} placeholder="Search by name, username, or email" />
      </Box>

      {users.length === 0 ? (
        <Box sx={emptyStateStyle}>
          <Typography variant="h6">No users found</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {activeSearch.length >= 2 ? `No results for "${activeSearch}"` : 'Try a different search query'}
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={tableContainerStyle}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Username</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Role</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{formatRole(user.role)}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.suspended ? 'Suspended' : 'Active'}
                      color={user.suspended ? 'error' : 'success'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleViewDetails(user.id)} color="primary">
                      <ViewIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

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

export default AdminUsers;
