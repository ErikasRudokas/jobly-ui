import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useCategories } from '../../common/hooks/useCategories';
import { useJobOffers } from '../../common/hooks/useJobOffers';
import type { Category } from '../../common/types/category.types';
import type { JobOfferWithSkillMatchListObject, WorkType } from '../../common/types/jobOffer.types';
import { ROUTES } from '../../common/constants/routes';
import JobFilters from '../../components/JobFilters/JobFilters';
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
  subtitleStyle,
  titleStyle,
} from './styles';

const PAGE_SIZE = 10;
const QUERY_PAGE = 'page';
const QUERY_SEARCH = 'search';
const QUERY_CATEGORY = 'categoryId';
const QUERY_WORK_TYPE = 'workType';
const QUERY_LOCATION = 'location';
const QUERY_SALARY_FROM = 'salaryFrom';
const QUERY_SALARY_TO = 'salaryTo';

const SALARY_MIN = 0;
const SALARY_MAX = 20000;
const SALARY_STEP = 500;

const WORK_TYPE_VALUES: WorkType[] = ['ON_SITE', 'REMOTE', 'HYBRID'];

const getPageFromParams = (params: URLSearchParams) => {
  const raw = Number(params.get(QUERY_PAGE));
  if (!Number.isFinite(raw) || raw < 1) return 1;
  return Math.floor(raw);
};

const getSearchFromParams = (params: URLSearchParams) => params.get(QUERY_SEARCH)?.trim() ?? '';

const getTextFromParams = (params: URLSearchParams, key: string) => params.get(key)?.trim() ?? '';

const getNumberFromParams = (params: URLSearchParams, key: string) => {
  const raw = params.get(key);
  if (!raw) return null;
  const value = Number(raw);
  if (!Number.isFinite(value)) return null;
  return Math.max(0, Math.floor(value));
};

const getCategoryFromParams = (params: URLSearchParams) => {
  const value = getNumberFromParams(params, QUERY_CATEGORY);
  if (!value || value < 1) return null;
  return value;
};

const getWorkTypeFromParams = (params: URLSearchParams): WorkType | '' => {
  const raw = params.get(QUERY_WORK_TYPE);
  if (raw && WORK_TYPE_VALUES.includes(raw as WorkType)) {
    return raw as WorkType;
  }
  return '';
};

const parseSalaryInput = (value: string) => {
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  const numberValue = Number(trimmed);
  if (!Number.isFinite(numberValue)) return null;
  return Math.max(0, Math.floor(numberValue));
};

const normalizeSalaryRange = (from: number | null, to: number | null) => {
  if (from !== null && to !== null && from > to) {
    return { from: to, to: from, swapped: true };
  }
  return { from, to, swapped: false };
};

const Jobs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getAllJobOffers, loading, error } = useJobOffers();
  const { getAllCategories, loading: categoriesLoading, error: categoriesError } = useCategories();

  const initialPage = getPageFromParams(searchParams);
  const initialSearch = getSearchFromParams(searchParams);
  const initialCategoryId = getCategoryFromParams(searchParams);
  const initialWorkType = getWorkTypeFromParams(searchParams);
  const initialLocation = getTextFromParams(searchParams, QUERY_LOCATION);
  const initialSalaryFrom = getNumberFromParams(searchParams, QUERY_SALARY_FROM);
  const initialSalaryTo = getNumberFromParams(searchParams, QUERY_SALARY_TO);
  const normalizedInitialSalary = normalizeSalaryRange(initialSalaryFrom, initialSalaryTo);

  const [jobOffers, setJobOffers] = useState<JobOfferWithSkillMatchListObject[]>([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [activeSearch, setActiveSearch] = useState(initialSearch);
  const [categoryId, setCategoryId] = useState<number | null>(initialCategoryId);
  const [workType, setWorkType] = useState<WorkType | ''>(initialWorkType);
  const [locationInput, setLocationInput] = useState(initialLocation);
  const [activeLocation, setActiveLocation] = useState(initialLocation);
  const [salaryInput, setSalaryInput] = useState({
    from: normalizedInitialSalary.from?.toString() ?? '',
    to: normalizedInitialSalary.to?.toString() ?? '',
  });
  const [salaryRange, setSalaryRange] = useState<[number, number]>([
    normalizedInitialSalary.from ?? SALARY_MIN,
    normalizedInitialSalary.to ?? SALARY_MAX,
  ]);
  const [activeSalary, setActiveSalary] = useState<{ from: number | null; to: number | null }>({
    from: normalizedInitialSalary.from,
    to: normalizedInitialSalary.to,
  });

  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const locationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const salaryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldScrollRef = useRef(false);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const loadCategories = useCallback(
    async () => {
      const response = await getAllCategories();
      if (response) {
        setCategories(response.categories);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const loadJobOffers = useCallback(
    async (
      page: number,
      filters: {
        search: string;
        categoryId: number | null;
        workType: WorkType | '';
        location: string;
        salaryFrom: number | null;
        salaryTo: number | null;
      }
    ) => {
      const offset = (page - 1) * PAGE_SIZE;
      const params: {
        offset: number;
        limit: number;
        search?: string;
        categoryId?: number;
        workType?: WorkType;
        location?: string;
        salaryFrom?: number;
        salaryTo?: number;
      } = { offset, limit: PAGE_SIZE };

      if (filters.search.length >= 2) params.search = filters.search;
      if (filters.categoryId) params.categoryId = filters.categoryId;
      if (filters.workType) params.workType = filters.workType;
      if (filters.location.trim().length > 0) params.location = filters.location.trim();
      if (filters.salaryFrom !== null) params.salaryFrom = filters.salaryFrom;
      if (filters.salaryTo !== null) params.salaryTo = filters.salaryTo;

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
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    loadJobOffers(currentPage, {
      search: activeSearch,
      categoryId,
      workType,
      location: activeLocation,
      salaryFrom: activeSalary.from,
      salaryTo: activeSalary.to,
    });
  }, [
    currentPage,
    activeSearch,
    categoryId,
    workType,
    activeLocation,
    activeSalary.from,
    activeSalary.to,
    loadJobOffers,
  ]);

  useEffect(() => {
    const urlPage = getPageFromParams(searchParams);
    const urlSearch = getSearchFromParams(searchParams);
    const urlCategoryId = getCategoryFromParams(searchParams);
    const urlWorkType = getWorkTypeFromParams(searchParams);
    const urlLocation = getTextFromParams(searchParams, QUERY_LOCATION);
    const urlSalaryFrom = getNumberFromParams(searchParams, QUERY_SALARY_FROM);
    const urlSalaryTo = getNumberFromParams(searchParams, QUERY_SALARY_TO);
    const normalizedSalary = normalizeSalaryRange(urlSalaryFrom, urlSalaryTo);

    setCurrentPage((prev) => (prev !== urlPage ? urlPage : prev));
    setSearchInput((prev) => (prev !== urlSearch ? urlSearch : prev));
    setActiveSearch((prev) => (prev !== urlSearch ? urlSearch : prev));
    setCategoryId((prev) => (prev !== urlCategoryId ? urlCategoryId : prev));
    setWorkType((prev) => (prev !== urlWorkType ? urlWorkType : prev));
    setLocationInput((prev) => (prev !== urlLocation ? urlLocation : prev));
    setActiveLocation((prev) => (prev !== urlLocation ? urlLocation : prev));

    const nextSalaryInput = {
      from: normalizedSalary.from?.toString() ?? '',
      to: normalizedSalary.to?.toString() ?? '',
    };

    setSalaryInput((prev) =>
      prev.from !== nextSalaryInput.from || prev.to !== nextSalaryInput.to ? nextSalaryInput : prev
    );

    setActiveSalary((prev) =>
      prev.from !== normalizedSalary.from || prev.to !== normalizedSalary.to
        ? { from: normalizedSalary.from, to: normalizedSalary.to }
        : prev
    );

    const nextRange: [number, number] = [normalizedSalary.from ?? SALARY_MIN, normalizedSalary.to ?? SALARY_MAX];

    setSalaryRange((prev) => (prev[0] !== nextRange[0] || prev[1] !== nextRange[1] ? nextRange : prev));
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

    if (categoryId) {
      nextParams.set(QUERY_CATEGORY, String(categoryId));
    } else {
      nextParams.delete(QUERY_CATEGORY);
    }

    if (workType) {
      nextParams.set(QUERY_WORK_TYPE, workType);
    } else {
      nextParams.delete(QUERY_WORK_TYPE);
    }

    if (activeLocation.trim().length > 0) {
      nextParams.set(QUERY_LOCATION, activeLocation.trim());
    } else {
      nextParams.delete(QUERY_LOCATION);
    }

    if (activeSalary.from !== null) {
      nextParams.set(QUERY_SALARY_FROM, String(activeSalary.from));
    } else {
      nextParams.delete(QUERY_SALARY_FROM);
    }

    if (activeSalary.to !== null) {
      nextParams.set(QUERY_SALARY_TO, String(activeSalary.to));
    } else {
      nextParams.delete(QUERY_SALARY_TO);
    }

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [
    activeSearch,
    activeLocation,
    activeSalary.from,
    activeSalary.to,
    categoryId,
    currentPage,
    searchParams,
    setSearchParams,
    workType,
  ]);

  useEffect(() => {
    if (shouldScrollRef.current) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [jobOffers]);

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
      if (locationTimerRef.current) clearTimeout(locationTimerRef.current);
      if (salaryTimerRef.current) clearTimeout(salaryTimerRef.current);
    };
  }, []);

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

  const handleLocationChange = (value: string) => {
    setLocationInput(value);

    if (locationTimerRef.current) clearTimeout(locationTimerRef.current);

    if (value.length === 0 || value.length >= 2) {
      locationTimerRef.current = setTimeout(() => {
        shouldScrollRef.current = true;
        setActiveLocation(value.trim());
        setCurrentPage(1);
      }, 400);
    }
  };

  const handleSalaryInputChange = (nextInput: { from: string; to: string }) => {
    setSalaryInput(nextInput);

    const parsedFrom = parseSalaryInput(nextInput.from);
    const parsedTo = parseSalaryInput(nextInput.to);
    const normalized = normalizeSalaryRange(parsedFrom, parsedTo);

    setSalaryRange([normalized.from ?? SALARY_MIN, normalized.to ?? SALARY_MAX]);

    if (salaryTimerRef.current) clearTimeout(salaryTimerRef.current);

    salaryTimerRef.current = setTimeout(() => {
      shouldScrollRef.current = true;
      setActiveSalary({ from: normalized.from, to: normalized.to });
      setCurrentPage(1);
      if (normalized.swapped) {
        setSalaryInput({
          from: normalized.from?.toString() ?? '',
          to: normalized.to?.toString() ?? '',
        });
      }
    }, 500);
  };

  const handleSalaryRangeChange = (range: [number, number]) => {
    setSalaryRange(range);
    setSalaryInput({ from: String(range[0]), to: String(range[1]) });
  };

  const handleSalaryRangeCommit = (range: [number, number]) => {
    if (salaryTimerRef.current) clearTimeout(salaryTimerRef.current);
    shouldScrollRef.current = true;
    setSalaryRange(range);
    setSalaryInput({ from: String(range[0]), to: String(range[1]) });
    setActiveSalary({ from: range[0], to: range[1] });
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: number | null) => {
    shouldScrollRef.current = true;
    setCategoryId(value);
    setCurrentPage(1);
  };

  const handleWorkTypeChange = (value: WorkType | '') => {
    shouldScrollRef.current = true;
    setWorkType(value);
    setCurrentPage(1);
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

  const hasFilters =
    activeSearch.length >= 2 ||
    categoryId !== null ||
    workType.length > 0 ||
    activeLocation.trim().length > 0 ||
    activeSalary.from !== null ||
    activeSalary.to !== null;

  return (
    <Box sx={containerStyle}>
      {error && (
        <Alert severity="error" sx={errorAlertStyle}>
          {error}
        </Alert>
      )}
      {categoriesError && (
        <Alert severity="error" sx={errorAlertStyle}>
          {categoriesError}
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
        <JobFilters
          searchValue={searchInput}
          onSearchChange={handleSearchChange}
          categoryId={categoryId}
          onCategoryChange={handleCategoryChange}
          workType={workType}
          onWorkTypeChange={handleWorkTypeChange}
          locationValue={locationInput}
          onLocationChange={handleLocationChange}
          salaryFromValue={salaryInput.from}
          salaryToValue={salaryInput.to}
          onSalaryFromChange={(value) => handleSalaryInputChange({ ...salaryInput, from: value })}
          onSalaryToChange={(value) => handleSalaryInputChange({ ...salaryInput, to: value })}
          salaryRange={salaryRange}
          onSalaryRangeChange={handleSalaryRangeChange}
          onSalaryRangeCommit={handleSalaryRangeCommit}
          salaryMin={SALARY_MIN}
          salaryMax={SALARY_MAX}
          salaryStep={SALARY_STEP}
          categories={categories}
          categoriesDisabled={categoriesLoading}
        />
      </Box>

      <JobOfferList
        jobOffers={jobOffers}
        onJobOfferClick={handleJobOfferClick}
        emptyMessage="No job offers found"
        emptySubMessage={
          hasFilters ? 'No results match the selected filters' : 'Check back later for new opportunities'
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
