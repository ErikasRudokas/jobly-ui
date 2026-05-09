import { Box, FormControl, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';
import type { Category } from '../../common/types/category.types';
import type { WorkType } from '../../common/types/jobOffer.types';
import SearchBar from '../SearchBar/SearchBar';
import {
  combinedSalaryInputStyle,
  filtersGridStyle,
  filtersWrapperStyle,
  filterTextFieldStyle,
  salaryControlsRowStyle,
  salarySectionStyle,
  salarySliderStyle,
  selectFieldStyle,
} from './styles';

interface JobFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  categoryId: number | null;
  onCategoryChange: (value: number | null) => void;
  workType: WorkType | '';
  onWorkTypeChange: (value: WorkType | '') => void;
  locationValue: string;
  onLocationChange: (value: string) => void;
  salaryFromValue: string;
  salaryToValue: string;
  onSalaryFromChange: (value: string) => void;
  onSalaryToChange: (value: string) => void;
  salaryRange: [number, number];
  onSalaryRangeChange: (range: [number, number]) => void;
  onSalaryRangeCommit: (range: [number, number]) => void;
  salaryMin: number;
  salaryMax: number;
  salaryStep: number;
  categories: Category[];
  categoriesDisabled?: boolean;
}

const WORK_TYPE_OPTIONS: Array<{ value: WorkType; label: string }> = [
  { value: 'ON_SITE', label: 'On-site' },
  { value: 'REMOTE', label: 'Remote' },
  { value: 'HYBRID', label: 'Hybrid' },
];

const JobFilters = ({
  searchValue,
  onSearchChange,
  categoryId,
  onCategoryChange,
  workType,
  onWorkTypeChange,
  locationValue,
  onLocationChange,
  salaryFromValue,
  salaryToValue,
  onSalaryFromChange,
  onSalaryToChange,
  salaryRange,
  onSalaryRangeChange,
  onSalaryRangeCommit,
  salaryMin,
  salaryMax,
  salaryStep,
  categories,
  categoriesDisabled = false,
}: JobFiltersProps) => {
  return (
    <Box sx={filtersWrapperStyle}>
      <Box>
        <SearchBar value={searchValue} onChange={onSearchChange} placeholder="Search by job title or company name..." />
      </Box>

      <Box sx={filtersGridStyle}>
        <FormControl fullWidth size="small" sx={selectFieldStyle} disabled={categoriesDisabled}>
          <InputLabel id="job-category-label">Category</InputLabel>
          <Select
            labelId="job-category-label"
            value={categoryId ? String(categoryId) : ''}
            label="Category"
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 48 * 5,
                },
              },
            }}
            onChange={(event) => {
              const value = event.target.value as string;
              onCategoryChange(value === '' ? null : Number(value));
            }}
          >
            <MenuItem value="">All categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={String(category.id)}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small" sx={selectFieldStyle}>
          <InputLabel id="job-work-type-label">Work type</InputLabel>
          <Select
            labelId="job-work-type-label"
            value={workType}
            label="Work type"
            onChange={(event) => onWorkTypeChange(event.target.value as WorkType | '')}
          >
            <MenuItem value="">All work types</MenuItem>
            {WORK_TYPE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          size="small"
          label="Location"
          placeholder="City or country"
          value={locationValue}
          onChange={(event) => onLocationChange(event.target.value)}
          sx={filterTextFieldStyle}
        />
      </Box>

      <Box sx={salarySectionStyle}>
        <Typography variant="subtitle2">Salary range</Typography>
        <Slider
          value={salaryRange}
          onChange={(_, value) => {
            if (Array.isArray(value)) {
              onSalaryRangeChange([value[0], value[1]]);
            }
          }}
          onChangeCommitted={(_, value) => {
            if (Array.isArray(value)) {
              onSalaryRangeCommit([value[0], value[1]]);
            }
          }}
          valueLabelDisplay="auto"
          min={salaryMin}
          max={salaryMax}
          step={salaryStep}
          color="success"
          sx={salarySliderStyle}
        />
        <Box sx={salaryControlsRowStyle}>
          <TextField
            size="small"
            label="From"
            type="number"
            value={salaryFromValue}
            onChange={(event) => onSalaryFromChange(event.target.value)}
            sx={combinedSalaryInputStyle}
            slotProps={{
              htmlInput: {
                min: salaryMin,
                step: salaryStep,
              },
            }}
          />
          <TextField
            size="small"
            label="To"
            type="number"
            value={salaryToValue}
            onChange={(event) => onSalaryToChange(event.target.value)}
            sx={combinedSalaryInputStyle}
            slotProps={{
              htmlInput: {
                min: salaryMin,
                step: salaryStep,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default JobFilters;
