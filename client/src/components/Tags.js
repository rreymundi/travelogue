import React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Tags = ({ travelogue, allTags, postTags, handleSetTags }) => {
    
    return (
    <Autocomplete
        multiple
        id="tags-filled"
        options={allTags?.map((option) => option.name)}
        defaultValue={travelogue ? travelogue.tags?.map((tag) => tag.name) : [] }        
        // limitTags={3}
        freeSolo
        renderTags={(value, getTagProps) =>
            value.map((option, index) => (
                <Chip variant="filled" label={option} color="primary" {...getTagProps({ index })} />
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