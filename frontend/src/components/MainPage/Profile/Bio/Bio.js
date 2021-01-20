import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextareaAutosize, FormControl, FormHelperText } from '@material-ui/core';


const Bio = () => {
 
    return (
        <FormControl>
            <>
                <TextareaAutosize
                    name="bio"
                    rowsMin={15}
                    placeholder="For example, how would your best friend discribe you"
                />
            </>
        </FormControl>
    );
};

export default Bio;