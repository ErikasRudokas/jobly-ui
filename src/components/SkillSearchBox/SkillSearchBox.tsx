import { useEffect, useRef, useState } from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import type { Skill } from '../../common/types/skill.types';
import { useSkills } from '../../common/hooks/useSkills';
import AppButton from '../AppButton/AppButton';
import {
  noResultsStyle,
  searchDropdownStyle,
  searchFooterStyle,
  searchListItemStyle,
  searchListStyle,
  searchMetaStyle,
} from './styles.ts';

interface SkillSearchBoxProps {
  excludeSkillIds: number[];
  onAddSkill: (skill: Skill) => void;
  disabled?: boolean;
}

const SkillSearchBox = ({ excludeSkillIds, onAddSkill, disabled = false }: SkillSearchBoxProps) => {
  const { getAllSkills, loading } = useSkills();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const searchListRef = useRef<HTMLDivElement>(null);
  const searchTimerRef = useRef<number | null>(null);
  const LIMIT = 10;

  const searchSkills = async (value: string, currentOffset = 0) => {
    if (!value.trim()) {
      setSearchResults([]);
      setShowResults(false);
      setHasMore(false);
      setSearchPerformed(false);
      return;
    }

    if (currentOffset === 0) {
      setSearchResults([]);
      setSearchPerformed(false);
    } else {
      setLoadingMore(true);
    }

    const response = await getAllSkills({
      value: value.trim(),
      limit: LIMIT,
      offset: currentOffset,
    });

    if (response) {
      const addedSkillIds = new Set(excludeSkillIds);
      const filteredSkills = response.skills.filter((s) => !addedSkillIds.has(s.id));

      if (currentOffset === 0) {
        setSearchResults(filteredSkills);
        setSearchPerformed(true);
      } else {
        setSearchResults((prev) => {
          const existingIds = new Set(prev.map((s) => s.id));
          const newSkills = filteredSkills.filter((s) => !existingIds.has(s.id));
          return [...prev, ...newSkills];
        });
      }
      setHasMore(response.total > currentOffset + response.skills.length);
      setShowResults(true);
    }
    setLoadingMore(false);
  };

  useEffect(() => {
    if (searchTimerRef.current) {
      window.clearTimeout(searchTimerRef.current);
    }

    if (searchValue.trim()) {
      searchTimerRef.current = window.setTimeout(() => {
        setOffset(0);
        searchSkills(searchValue, 0);
      }, 300);
    } else {
      setSearchResults([]);
      setShowResults(false);
      setHasMore(false);
      setSearchPerformed(false);
    }

    return () => {
      if (searchTimerRef.current) {
        window.clearTimeout(searchTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, excludeSkillIds]);

  useEffect(() => {
    const listElement = searchListRef.current;
    if (!listElement) return;

    const handleScroll = () => {
      if (loadingMore || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = listElement;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        const newOffset = offset + LIMIT;
        setOffset(newOffset);
        searchSkills(searchValue, newOffset);
      }
    };

    listElement.addEventListener('scroll', handleScroll);
    return () => listElement.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingMore, hasMore, offset, searchValue]);

  const handleSelectSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setSearchValue(skill.name);
    setShowResults(false);
    setSearchResults([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && searchResults.length > 0 && !selectedSkill) {
      e.preventDefault();
      handleSelectSkill(searchResults[0]);
    }
  };

  const handleAddSkill = () => {
    if (!selectedSkill) return;

    if (excludeSkillIds.includes(selectedSkill.id)) {
      setSearchValue('');
      setSelectedSkill(null);
      setSearchResults([]);
      setShowResults(false);
      setSearchPerformed(false);
      return;
    }

    onAddSkill(selectedSkill);

    setSearchValue('');
    setSelectedSkill(null);
    setSearchResults([]);
    setShowResults(false);
    setSearchPerformed(false);
  };

  return (
    <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
      <Box sx={{ flex: 1, position: 'relative' }}>
        <TextField
          fullWidth
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            if (selectedSkill) {
              setSelectedSkill(null);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search for a skill..."
          disabled={disabled}
          variant="outlined"
        />

        {showResults && !selectedSkill && (
          <Box sx={searchDropdownStyle}>
            {searchResults.length > 0 ? (
              <>
                <Box ref={searchListRef} sx={searchListStyle}>
                  {searchResults.map((skill) => (
                    <Box key={skill.id} sx={searchListItemStyle} onClick={() => handleSelectSkill(skill)}>
                      <Typography sx={{ fontSize: '0.95rem', fontWeight: 500 }}>{skill.name}</Typography>
                      <Typography sx={searchMetaStyle}>{skill.type === 'TECHNICAL' ? 'Technical' : 'Soft'}</Typography>
                    </Box>
                  ))}
                </Box>
                {loadingMore && (
                  <Box sx={searchFooterStyle}>
                    <CircularProgress size={20} />
                    <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Loading more...</Typography>
                  </Box>
                )}
              </>
            ) : searchPerformed ? (
              <Box sx={noResultsStyle}>
                <Typography>No skills found matching "{searchValue}"</Typography>
              </Box>
            ) : null}
          </Box>
        )}
      </Box>

      <AppButton startIcon={<AddIcon />} onClick={handleAddSkill} disabled={disabled || !selectedSkill || loading}>
        Add Skill
      </AppButton>
    </Box>
  );
};

export default SkillSearchBox;
