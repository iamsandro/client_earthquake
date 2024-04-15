// src/components/Card.js
import React, { FC } from "react";
import { IFeature } from "../../Types/featuresTypes";

const FeatureCard: FC<IFeature> = (props) => {
    return (
        <li className="earthquake-item">
            <h3>{props.attributes.title}</h3>
            <p>Place: {props.attributes.place}</p>
            <p>Magnitude Type: {props.attributes.mag_type}</p>
            <p>Longitude: {props.attributes.coordinates.longitude}</p>
            <p>Magnitude: {props.attributes.magnitude}</p>
            <p>Latitude: {props.attributes.coordinates.latitude}</p>
            {/* Add comment section here */}
        </li>
    );
};

export default FeatureCard;
