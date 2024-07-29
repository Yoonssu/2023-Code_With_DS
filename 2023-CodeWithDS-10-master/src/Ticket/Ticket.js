import React from "react";
import "./Ticket.css";
import myTicketImage from "../img/myticket.jpg";

const Ticket = () => {
  return (
    <div className="TicketContainer">
      <img src={myTicketImage} alt="마이티켓" className="myTicketImage" />
    </div>
  );
};

export default Ticket;
