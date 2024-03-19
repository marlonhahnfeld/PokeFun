import React, { useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "../styles/LPCard.css";
import { motion } from "framer-motion";

const LPCard = ({ title, description, image }) => {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const ROTATION_RANGE = 32.5;
  const HALF_ROTATION_RANGE = 32.5 / 2;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rY = mouseX / width - HALF_ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      style={{ maxWidth: 345 }}
      animate={{ rotateX, rotateY }}
    >
      <Card sx={{ maxWidth: 300, transform: "scale(0.95)" }} className="lpcard">
        <CardActionArea className="lpcardactionarea">
          <CardMedia
            component="img"
            image={image}
            alt="gamemode card"
            className="lpcardmedia"
            style={{
              width: "100%",

              objectFit: "scale-down",
              objectPosition: "center",
            }}
          />
          <CardContent
            className="lpcardcontent"
            style={{ transform: "scale(1)" }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="white"
              className="lpcarddescription"
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="lpcardbottom">
          <Button size="small" color="primary">
            Play
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default LPCard;
