import React, { Component } from "react";
import FeatureService from "../../services/featuresService";
import FeaturesLayout from "../components/featuresLayout";
import { IFeaturesScreenState } from "../../Types/featuresTypes";

class FeaturesScreen extends Component<{}, IFeaturesScreenState> {
    private featuresService = new FeatureService();

    constructor(props: any) {
        super(props);

        this.state = {
            status: null,
            features: [],
            pages: 0,
            page: 1,
            per_page: 10,
            total: 0,
            mag_type: "",
        };
    }

    // INFO: Solicitar datos
    componentDidMount() {
        this.getFeatures(this.state.page, this.state.per_page);
    }

    // INFO: Eliminar suscripciones
    componentWillUnmount() {
        // Implementa la lógica para limpiar suscripciones si es necesario
    }

    // INFO: Actualización currentHierarchy
    async getFeatures(page: number, per_page: number, mag_type?: string) {
        this.setState({ status: "loading" });
        const response = await this.featuresService.getFeatures(
            page,
            per_page,
            mag_type || this.state.mag_type,
        );
        if (response)
            this.setState({
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
        else this.setState({ status: "error" });
    }

    render() {
        return (
            <FeaturesLayout
                status={this.state.status}
                features={this.state.features}
                pagination={{
                    pages: this.state.pages,
                    page: this.state.page,
                    total: this.state.total,
                    per_page: this.state.per_page,
                }}
                getFeatures={(
                    page?: number,
                    mag_type?: string | string[],
                    per_page?: number | string,
                ) => {
                    if (page) this.getFeatures(page, this.state.per_page);
                    if (mag_type) {
                        const mag_type_string =
                            typeof mag_type === "string"
                                ? mag_type
                                : mag_type.join(",");
                        this.setState({ mag_type: mag_type_string });
                        this.getFeatures(
                            1,
                            this.state.per_page,
                            mag_type_string,
                        );
                    }
                    if (per_page) {
                        this.setState({ per_page: +per_page });
                        this.getFeatures(1, +per_page);
                    }
                }}
            />
        );
    }
}

export default FeaturesScreen;
