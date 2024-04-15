import React, { FC, useEffect, useState } from "react";
import {
    IComment,
    IFeature,
    IFeaturesLayoutProps,
    IPagination,
} from "../../Types/featuresTypes";

import "./../featuresScreen.scss";
import RecipeReviewCard from "./card";
import { CircularProgress, Pagination, Stack } from "@mui/material";
import MultipleSelect from "../../components/select";

const OPTIONS: string[] = [
    "md",
    "ml",
    "ms",
    "mw",
    "me",
    "mi",
    "mb",
    "mlg",
    "mwr",
    "mb_lg",
    "mww",
];

const FeaturesLayout: FC<IFeaturesLayoutProps> = (props) => {
    const [features, setFeatures] = useState<IFeature[]>();
    const [pagination, setPagination] = useState<IPagination>();

    useEffect(() => {
        setFeatures(props.features);
        setPagination(props.pagination);
    }, [props.features]);

    return (
        <div className="card-list">
            <h1>Features list</h1>

            <MultipleSelect
                options={OPTIONS}
                label={"Mag"}
                onChange={(value: string | string[]) => {
                    props.getFeatures(undefined, value);
                }}
            />
            <br />
            <br />

            <div className="center">
                <Stack spacing={2}>
                    <Pagination
                        count={pagination?.pages || 0}
                        color="primary"
                        onChange={(e: any) =>
                            props.getFeatures(+e.target.textContent)
                        }
                    />
                </Stack>
            </div>

            {props.status === "loading" ? (
                <div style={{ justifyContent: "center" }}>
                    <h1>Estamos cargando datos, Espere un momento por favor</h1>
                    <CircularProgress color="secondary" />
                </div>
            ) : props.status === "error" ? (
                <h1>Algo falló</h1>
            ) : (
                <div className="">
                    <div className="center">
                        {features?.map((item: any) => (
                            <RecipeReviewCard key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeaturesLayout;
