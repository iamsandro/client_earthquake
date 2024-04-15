import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IComment, IFeature } from "../../Types/featuresTypes";
import formatDateTime from "../../utils/converTime";
import { AddComment, Link } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import {
    Box,
    Button,
    FormControl,
    Input,
    InputLabel,
    Modal,
    Tooltip,
} from "@mui/material";
import CommentService from "../../services/commentsService";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));
const action = (
    <Button color="secondary" size="small">
        lorem ipsum dolorem
    </Button>
);
export default function RecipeReviewCard(props: IFeature) {
    const [expanded, setExpanded] = React.useState({ id: "", state: false });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [bodyValue, setBodyValue] = React.useState("");
    const [comments, setComments] = React.useState<IComment[]>([]);
    const { enqueueSnackbar } = useSnackbar();

    const comentService = new CommentService();

    React.useEffect(() => {
        setComments(props.comments);
    }, []);

    const handleSubmit = async (feature_id: string) => {
        const response = await comentService.createComment(
            feature_id,
            bodyValue,
        );

        if (response) {
            enqueueSnackbar("Tú comentario fue publicado", {
                variant: "success",
            });
            setComments([...comments, response]);
        } else {
            enqueueSnackbar("Lo sentimos, no pudimos guardar tu mensaje", {
                variant: "error",
            });
        }
        setOpen(false);
    };

    const handleExpandClick = (id: string) => {
        setExpanded({ id, state: expanded.id === id ? !expanded.state : true });
    };

    return (
        <Card sx={{ maxWidth: "80vw", minWidth: "50vw", marginBottom: "32px" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {props.id}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.attributes.title}
                subheader={formatDateTime(+props.attributes.time)}
            />
            {/* <CardMedia
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Paella dish"
            /> */}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Type: {props.attributes.mag_type} Mag:{" "}
                    {props.attributes.magnitude}
                    Long.: {props.attributes.coordinates.longitude} Lat.:{" "}
                    {props.attributes.coordinates.latitude}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Tooltip title="Añadir comentario" arrow onClick={handleOpen}>
                    <IconButton aria-label="add to favorites">
                        <AddComment />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Ir a la URL" arrow>
                    <IconButton
                        aria-label="share"
                        onClick={() =>
                            window.open(props.links.external_url, "_blank")
                        }
                    >
                        <Link />
                    </IconButton>
                </Tooltip>
                <ExpandMore
                    expand={props.id === expanded.id && expanded.state}
                    onClick={() => handleExpandClick(props.id)}
                    aria-expanded={props.id === expanded.id && expanded.state}
                    aria-label="show more"
                >
                    <Tooltip title="Ver los comentarios" arrow>
                        <ExpandMoreIcon />
                    </Tooltip>
                </ExpandMore>
            </CardActions>
            <Collapse
                in={props.id === expanded.id && expanded.state}
                timeout="auto"
                unmountOnExit
            >
                <CardContent>
                    <Typography paragraph>Comments:</Typography>
                    {comments?.map((comment: IComment) => (
                        <Typography paragraph key={comment.id}>
                            {comment.body}
                            <br />
                            {formatDateTime(comment.created_at)}
                        </Typography>
                    ))}
                </CardContent>
            </Collapse>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h5>{props.attributes.title}</h5>
                    <br />
                    <FormControl fullWidth>
                        <InputLabel htmlFor="body">Cuerpo</InputLabel>
                        <Input
                            id="body"
                            aria-describedby="my-helper-text"
                            value={bodyValue}
                            onChange={(e) => setBodyValue(e.target.value)}
                            placeholder="Escribe tu comentario"
                        />
                    </FormControl>
                    <br />

                    <div
                        className=""
                        style={{
                            display: "flex",
                            alignContent: "center",
                            alignItems: "center",
                            gap: 14,
                            paddingTop: 64,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSubmit(props.id)}
                        >
                            Aceptar
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setOpen(false)}
                        >
                            Cancelar
                        </Button>
                    </div>
                </Box>
            </Modal>
        </Card>
    );
}
