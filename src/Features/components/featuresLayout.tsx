import React, { FC, useEffect, useState } from "react";
import {
    IComment,
    IFeature,
    IFeaturesLayoutProps,
    IPagination,
} from "../../Types/featuresTypes";

import "./../featuresScreen.scss";
import EarthquakeFeatureCard from "./Featurecard";
import { CircularProgress, Pagination, Stack } from "@mui/material";
import MultipleSelect from "../../components/MultipleSelect";
import BasicSelect from "../../components/BasicSelect";

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

const PER_PAGE: number[] = [10, 20, 50, 100];

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

            <div className="center">
                <div className="">
                    <p className="mb-1">Features por página</p>
                    <BasicSelect
                        default={props.pagination.per_page}
                        options={PER_PAGE}
                        label="Per page"
                        onChange={(value: number | string) => {
                            props.getFeatures(undefined, undefined, value);
                        }}
                    />
                </div>
                <div className="">
                    <p>Filtrar por Tipo de Magnitud:</p>
                    <MultipleSelect
                        options={OPTIONS}
                        label={"Mag"}
                        onChange={(value: string | string[]) => {
                            props.getFeatures(undefined, value);
                        }}
                    />
                </div>
            </div>

            <br />
            <br />

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
                        {features?.length ? (
                            features?.map((item: IFeature) => (
                                <EarthquakeFeatureCard
                                    key={item.id}
                                    {...item}
                                />
                            ))
                        ) : (
                            <h1>
                                Lo sentimos, no tenemos features que mostrar
                            </h1>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeaturesLayout;
