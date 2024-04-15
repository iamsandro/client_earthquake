class CommentService {
    private base_url: string;

    constructor() {
        this.base_url = "http://127.0.0.1:3000";
    }

    createComment = async (feature_id: string, body: string): Promise<any> => {
        const response = await fetch(
            `${this.base_url}/api/v1/features/${feature_id}/comments`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ body }),
            },
        );

        if (response.ok) {
            const response_json = await response.json();
            return response_json;
        } else {
            const response_json = await response.json();
            console.error({ error: response_json.error });
            return null;
        }
    };
}
export default CommentService;
