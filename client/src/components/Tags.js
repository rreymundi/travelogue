import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Tags = ({ tags, handleSetTags }) => {
    // const [postTags, setPostTags] = useState([]);

    // const handleSetTags = (e, newValue) => {
    //     const selectedTags = JSON.stringify(newValue, null, '')
    //     setPostTags(selectedTags)
    // };

    // const tags = [
    //     { id: 0, name: "travel" },
    //     { id: 1, name: "food" },
    //     { id: 2, name: "museums" },
    //     { id: 3, name: "history" },
    //     { id: 4, name: "nature" }
    //   ];

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