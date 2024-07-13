import { useState, useEffect } from "react";

const HealthBar = (props) => {
  const {hp, maxHp} = props;
 
  const barWidth = (hp / maxHp) * 100;
  // setHitWidth((damage / hp) * 100);
  // setBarWidth((hpLeft / maxHp) * 100);
  return (
    <div>
      <div class="health-bar">
        <div class="bar" style={{ width: `${barWidth}%` }}></div>
        <div class="hit" style={{ width: `${0}%` }}></div>

        <div
          style={{
            position: "absolute",
            top: "5px",
            left: 0,
            right: 0,
            textAlign: "center"
          }}
        >
          {hp} / {maxHp}
        </div>
      </div>

      <br />
    </div>
  );
};

export default HealthBar;