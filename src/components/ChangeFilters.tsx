import React from "react";

const ChangeFilters: React.FC<{ changeTransport: (transport: string) => void; changePeriod: (period: string) => void }> = ({
  changeTransport,
  changePeriod,
}) => {
  return (
    <div>
      <div className="arrivals-filters">
        {/* <select className="arrivals-filters__transport" onChange={(event) => changeTransport(event.target.value)}>
          <option value="all">All types of transport</option>
          <option value="S-Bahn">S-bahn</option>
          <option value="U-Bahn">U-bahn</option>
          <option value="Bus">Bus</option>
          <option value="Tram">Tram</option>
          <option value="Regional">Regional</option>
        </select> */}
        {/* <div>in nearest</div> */}
      </div>
    </div>
  );
};

export default ChangeFilters;
