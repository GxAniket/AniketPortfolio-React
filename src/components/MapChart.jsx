"use client";
import React from "react";
import { ComposableMap, Geographies, Geography, Annotation } from "react-simple-maps";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const MapChart = () => {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 120, 
        center: [30, 0] 
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                default: { 
                  fill: "#1f2937", 
                  stroke: "#1f2937", 
                  strokeWidth: 1,  
                  outline: "none" 
                },
                hover: { 
                  fill: "#22d3ee", 
                  stroke: "#22d3ee", 
                  outline: "none", 
                  transition: "all 0.2s" 
                }, 
                pressed: { outline: "none" },
              }}
            />
          ))
        }
      </Geographies>
      
      {/* Updated Pointer */}
      <Annotation
        subject={[78.0322, 30.3165]} 
        dx={-30}
        dy={-40}
        connectorProps={{
          stroke: "#22d3ee", 
          strokeWidth: 2,
          strokeLinecap: "round"
        }}
      >
        <circle cx="0" cy="0" r="3" fill="#22d3ee" className="animate-pulse" />
        {/* Yahan text update kiya hai aur text-xs lagaya hai */}
        <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#ffffff" className="font-bold text-[10px] sm:text-xs tracking-wider">
          Dehradun, Uttarakhand, India
        </text>
      </Annotation>
    </ComposableMap>
  );
};

export default MapChart;