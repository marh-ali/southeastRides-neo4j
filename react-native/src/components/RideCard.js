import React from "react";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import haversineDistance from "../utils/haversineDistance";
import Map from "./Map";

const RideCard = ({ ride }) => {
  return (
    <Card style={{ margin: 8 }}>
      <Card.Content>
        <Title>{ride.name}</Title>
        <Paragraph>{ride.description}</Paragraph>
        <Paragraph>Seats: {ride.seats}</Paragraph>
        <Paragraph>Status: {ride.status}</Paragraph>
        <Paragraph>
          Start Time: {new Date(ride.startTime).toLocaleString()}
        </Paragraph>
        <Paragraph>
          End Time: {new Date(ride.endTime).toLocaleString()}
        </Paragraph>
        <Map
          startLocation={ride.startLocation}
          endLocation={ride.endLocation}
        />
        <Paragraph>
          Total Participants: {ride.participantsConnection.totalCount}
        </Paragraph>
        <Paragraph>
          Distance: {haversineDistance(ride.startLocation, ride.endLocation)} km
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

export default RideCard;
