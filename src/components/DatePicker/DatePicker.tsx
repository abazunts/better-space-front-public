import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {FC} from "react";
import {Dayjs} from "dayjs";

type PropsType = {
    handleOnChange: (value: Dayjs | null) => void
    label: string
    value: Dayjs | null
}
export const BasicDatePicker:FC<PropsType> = ({handleOnChange, label, value}) => {

    const onChange = (value: Dayjs | null) => {
        handleOnChange(value)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={label}
                value={value}
                onChange={(newValue) => {
                    onChange(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
