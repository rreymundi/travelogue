import React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Tags = ({ tags, handleSetTags }) => {
    return (
    <Autocomplete
        multiple
        id="tags-filled"
        options={tags.map((option) => option.name)}
        // defaultValue={[tags[1].name]}
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