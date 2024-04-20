import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IMultipleSelect } from "./types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, option: string[], theme: Theme) {
    return {
        fontWeight: theme.typography.fontWeightMedium,
        fontFamily: "victor mono",
        color: "red",
    };
}

export default function MultipleSelect(props: IMultipleSelect) {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        console.log("Ruben: handleChange -> value", value);
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value,
        );
        props.onChange(value);
    };

    return (
        <React.Fragment>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">
                    {props.label ?? "label"}
                </InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple={props.basic_select ? false : true}
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                    sx={[
                        {
                            "&:hover": {
                                color: "blue",
                                backgroundColor: "white",
                            },
                        },
                    ]}
                >
                    {props.options?.map((option) => (
                        <MenuItem
                            key={option}
                            value={option}
                            style={getStyles(option, personName, theme)}
                            selected={
                                props.default &&
                                !isNaN(option) &&
                                props.default == option
                                    ? true
                                    : false
                            }
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </React.Fragment>
    );
}
