import React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Tags = ({ travelogue, tags, handleSetTags }) => {
    
    const renderedTags = tags?.map((tag) => tag.name);
    const renderedTravelogueTags = travelogue?.tags.map((tag) => tag.name);

    return (
    <Autocomplete
        multiple
        id="tags-filled"
        options={tags?.map((option) => option.name)}
        defaultValue={travelogue !== null ? renderedTravelogueTags : renderedTags}
        limitTags={3}
        freeSolo
        renderTags={(value, getTagProps) =>
            value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
        }
        renderInput={(params) => (
            <TextField
                {...params}
                variant="filled"
                label="Tags"
                placeholder="Add tags"
            />
        )}
        onChange={handleSetTags}
    />
  )
}

export default Tags