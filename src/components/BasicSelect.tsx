import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IBasicSelect } from "./types";

export default function BasicSelect(props: IBasicSelect) {
    const [value, setValue] = React.useState(`${props.default}`);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
        props.onChange(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    {props.label}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={props.label}
                    onChange={handleChange}
                >
                    {props.options?.map((option: string | number) => (
                        <MenuItem
                            key={option}
                            value={option}
                            selected={option == props.default}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
