import { FC, useEffect, useState } from "react";
import FeatureService from "../../services/featuresService";
import FeaturesLayout from "../components/featuresLayout";
import { IFeaturesScreenState } from "../../Types/featuresTypes";
import { useNavigate } from "react-router-dom";

function FeaturesScreen() {
    const navigate = useNavigate();
    const featuresService = new FeatureService();
    const [state, setState] = useState<IFeaturesScreenState>({
        status: null,
        features: [],
        pages: 0,
        page: 1,
        per_page: 10,
        total: 0,
        mag_type: "",
    });

    useEffect(() => {
        getFeatures(state.page, state.per_page);
    }, [navigate]);

    const getFeatures = async (
        page: number,
        per_page: number,
        mag_type?: string,
    ) => {
        setState({ ...state, status: "loading" });
        const response = await featuresService.getFeatures(
            page,
            per_page,
            mag_type || state.mag_type,
        );
        if (response)
            setState({
                status: null,
                features: response.data,
                pages: response?.pagination?.total
                    ? Math.ceil(
                          response?.pagination?.total /
                              response?.pagination?.per_page,
                      )
                    : 0,
                ...response?.pagination,
            });
        else setState({ ...state, status: "error" });
    };

    return (
        <FeaturesLayout
            status={state.status}
            features={state.features}
            pagination={{
                pages: state.pages,
                page: state.page,
                total: state.total,
                per_page: state.per_page,
            }}
            getFeatures={(
                page?: number,
                mag_type?: string | string[],
                per_page?: number | string,
            ) => {
                let mag_type_string: string = "";

                if (page) getFeatures(page, state.per_page);
                if (mag_type) {
                    mag_type_string =
                        typeof mag_type === "string"
                            ? mag_type
                            : mag_type.join(",");
                    setState({ ...state, mag_type: mag_type_string });
                    getFeatures(1, state.per_page, mag_type_string);
                }
                if (per_page) {
                    setState({ ...state, per_page: +per_page });
                    getFeatures(1, +per_page);
                }
            }}
        />
    );
}

export default FeaturesScreen;
