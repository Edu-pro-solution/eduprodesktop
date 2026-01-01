import React from "react";
import { Typography } from "@mui/material";

const CustomLabel = ({ label, required }) => (
  <Typography component="span" variant="body1">
    {label}
    {required && <span style={{ color: "red" }}> *</span>}
  </Typography>
);

export default CustomLabel;
