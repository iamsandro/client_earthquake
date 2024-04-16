class FeatureService {
    private base_url: string;

    constructor() {
        this.base_url = "http://127.0.0.1:3000";
    }

    getFeatures = async (
        page: number,
        per_page: number,
        mag_type: string,
    ): Promise<any> => {
        const response = await fetch(
            `${
                this.base_url
            }/api/v1/features?page=${page}&per_page=${per_page}${
                mag_type ? `&mag_type=${mag_type}` : ""
            }`,
        );

        if (response.ok) {
            const response_json = await response.json();
            return response_json;
        } else {
            const response_json = await response.json();
            console.error("Error al obtener datos 1:", response_json.error);
            return { message: response_json.error };
        }
    };
}
export default FeatureService;
