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
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.25 }}
      style={{
        maxWidth: 345,
      }}
      animate={{
        rotateX,
        rotateY,
      }}
    >
      <Card sx={{ maxWidth: 345 }} className="lpcard">
        <CardActionArea className="lpcardactionarea">
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt="game mode card"
          />
          <CardContent className="lpcardcontent">
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="lpcarddescription"
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="lpcardbottom">
          <Button size="small" color="primary">
            Placeholder
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default LPCard;
