import React from 'react';

const RaffleDetail = ({ params }) => {
    return (
        <section className="h-dvh">
            <h1>Titulo Sorteo {params.raffleId}</h1>
            <div>Detalle sorteo</div>
        </section>
    );
};

export default RaffleDetail;
