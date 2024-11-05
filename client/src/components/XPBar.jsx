import { useState, useEffect } from "react";

const XPBar = (props) => {
  const {xp, xpLevel} = props;
 
  const barWidth = (xp / xpLevel) * 100;
  // setHitWidth((damage / hp) * 100);
  // setBarWidth((hpLeft / maxHp) * 100);
  return (
    <div>
      <div class="bar">
        <div class="xpbar" style={{ width: `${barWidth}%` }}></div>
        <div class="xpgain" style={{ width: `${100}%` }}></div>

        <div
          style={{
            position: "absolute",
            top: "5px",
            left: 0,
            right: 0,
            textAlign: "center"
          }}
        >
          {xp < 0 ? 0 : xp} / {xpLevel}
        </div>
      </div>

      <br />
    </div>
  );
};

export default XPBar;