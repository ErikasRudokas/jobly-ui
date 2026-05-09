import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { useSkills } from '../../common/hooks/useSkills';
import type { Skill, SkillType } from '../../common/types/skill.types';
import { ROUTES } from '../../common/constants/routes';
import PageNavigation from '../../components/PageNavigation/PageNavigation';
import SearchBar from '../../components/SearchBar/SearchBar';
import AppButton from '../../components/AppButton/AppButton';
import {
  containerStyle,
  controlsRowStyle,
  emptyStateStyle,
  errorAlertStyle,
  filterControlStyle,
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
const QUERY_TYPE = 'type';
const SKILL_TYPE_FILTERS = ['ALL', 'TECHNICAL', 'SOFT'] as const;

type SkillTypeFilter = (typeof SKILL_TYPE_FILTERS)[number];

const getPageFromParams = (params: URLSearchParams) => {
  const raw = Number(params.get(QUERY_PAGE));
  if (!Number.isFinite(raw) || raw < 1) return 1;
  return Math.floor(raw);
};

const getSearchFromParams = (params: URLSearchParams) => params.get(QUERY_SEARCH)?.trim() ?? '';

const getTypeFromParams = (params: URLSearchParams): SkillTypeFilter => {
  const raw = params.get(QUERY_TYPE);
  if (raw && SKILL_TYPE_FILTERS.includes(raw as SkillTypeFilter)) {
    return raw as SkillTypeFilter;
  }
  return 'ALL';
};

const formatSkillType = (type: SkillType) => (type === 'TECHNICAL' ? 'Technical' : 'Soft');

const Skills = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getAllSkills, loading, error } = useSkills();

  const initialPage = getPageFromParams(searchParams);
  const initialSearch = getSearchFromParams(searchParams);
  const initialType = getTypeFromParams(searchParams);

  const [skills, setSkills] = useState<Skill[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [activeSearch, setActiveSearch] = useState(initialSearch);
  const [typeFilter, setTypeFilter] = useState<SkillTypeFilter>(initialType);

  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldScrollRef = useRef(false);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const loadSkills = useCallback(
    async (page: number, search: string, type: SkillTypeFilter) => {
      const offset = (page - 1) * PAGE_SIZE;
      const params: { offset: number; limit: number; value?: string; skillType?: string } = {
        offset,
        limit: PAGE_SIZE,
      };

      if (search.length >= 2) {
        params.value = search;
      }
      if (type !== 'ALL') {
        params.skillType = type;
      }

      const response = await getAllSkills(params);
      if (response) {
        setSkills(response.skills);
        setTotal(response.total);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    loadSkills(currentPage, activeSearch, typeFilter);
  }, [currentPage, activeSearch, typeFilter, loadSkills]);

  useEffect(() => {
    const urlPage = getPageFromParams(searchParams);
    const urlSearch = getSearchFromParams(searchParams);
    const urlType = getTypeFromParams(searchParams);

    setCurrentPage((prev) => (prev !== urlPage ? urlPage : prev));
    setSearchInput((prev) => (prev !== urlSearch ? urlSearch : prev));
    setActiveSearch((prev) => (prev !== urlSearch ? urlSearch : prev));
    setTypeFilter((prev) => (prev !== urlType ? urlType : prev));
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

    if (typeFilter !== 'ALL') {
      nextParams.set(QUERY_TYPE, typeFilter);
    } else {
      nextParams.delete(QUERY_TYPE);
    }

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [activeSearch, currentPage, searchParams, setSearchParams, typeFilter]);

  useEffect(() => {
    if (shouldScrollRef.current) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [skills]);

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

  const handleTypeChange = (value: SkillTypeFilter) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    shouldScrollRef.current = true;
    setCurrentPage(page);
  };

  const handleViewDetails = (id: number) => {
    navigate(ROUTES.SKILL_DETAILS(id));
  };

  const handleCreateSkill = () => {
    navigate(ROUTES.SKILL_CREATE);
  };

  const startItem = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, total);

  if (loading && skills.length === 0) {
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
          Skills
        </Typography>
        <AppButton startIcon={<AddIcon />} onClick={handleCreateSkill}>
          Create Skill
        </AppButton>
      </Box>

      <Box sx={controlsRowStyle}>
        <SearchBar value={searchInput} onChange={handleSearchChange} placeholder="Search by skill name" />
        <FormControl sx={filterControlStyle} size="medium">
          <InputLabel id="skills-type-filter-label">Type</InputLabel>
          <Select
            labelId="skills-type-filter-label"
            label="Type"
            value={typeFilter}
            onChange={(event) => handleTypeChange(event.target.value as SkillTypeFilter)}
          >
            <MenuItem value="ALL">All types</MenuItem>
            <MenuItem value="TECHNICAL">Technical</MenuItem>
            <MenuItem value="SOFT">Soft</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {skills.length === 0 ? (
        <Box sx={emptyStateStyle}>
          <Typography variant="h6">No skills found</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {activeSearch.length >= 2 || typeFilter !== 'ALL'
              ? 'Try adjusting your filters'
              : 'Create your first skill to get started'}
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
                  <strong>Type</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {skills.map((skill) => (
                <TableRow key={skill.id} hover>
                  <TableCell>{skill.id}</TableCell>
                  <TableCell>{skill.name}</TableCell>
                  <TableCell>
                    <Chip label={formatSkillType(skill.type)} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleViewDetails(skill.id)} aria-label="View skill">
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

export default Skills;
