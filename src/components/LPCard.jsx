import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "../styles/LPCard.css";
import { motion } from "framer-motion";

const LPCard = ({ title, description, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      whileHover={{ scale: 1.2 }}
      style={{ maxWidth: 345 }}
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
