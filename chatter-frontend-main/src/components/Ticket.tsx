import React from 'react'
import styled from 'styled-components';
import { TicketData, TicketStatus } from '../types/chat';

const TicketComponent = styled.div<{background_color: string}>`
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: ${p => p.background_color};
    padding: 40px;
    font-family: sans-serif;

`

const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
    padding: 0;

`

const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
    padding: 0;
`

const FilledSpan = styled.span<{fontColor: string}>`
    background-color: #fff;
    color: ${p => p.fontColor};
    text-align: center;
    padding: 5px;
    border-radius: 7px;
`

const Divider = styled.hr`
    margin-left: 20px;
    margin-right: 20px;
`


function Ticket(ticketData: TicketData ) {

    const { title, description, brand, tag, date, priority, id, status} = ticketData;

    let background_color = status === TicketStatus.OPEN ? "#33cc33" : "#800000"

  return (
    <TicketComponent background_color={background_color}>
        <LeftSide>
        <h4>{title}</h4>

        <p>{description}</p>

        <div>
            <FilledSpan fontColor={background_color}>{brand}</FilledSpan>
            
            <span> | </span>
            <span>{tag}</span>
        </div>
        </LeftSide>
        
        <Divider/>

        <RightSide>
            <h4>{date.toLocaleDateString()}</h4>
            <FilledSpan fontColor={background_color}>{priority == 0 ? "ALTA"
             : priority == 1 ? "MEDIA"
             : "BAJA"}</FilledSpan>

            <div>#{id}</div>
        </RightSide>

    </TicketComponent>
  )
}

export default Ticket