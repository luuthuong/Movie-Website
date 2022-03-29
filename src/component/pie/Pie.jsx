import React from 'react'

const Pie = (props) => {
    const clearPercents=(percent) => {
        const low=!Number.isFinite(percent)||percent<0;
        const high=percent>100;
        return low?0:high?100:+percent;
    }

    const Circle= (props) => {
        const r=30
        const circ=2 * Math.PI * r;
        const strokePct=(((100 - props.pct) * circ) / 100);
        return (
            <circle
                    r={r}
                    cx={170}
                    cy={30}
                    fill="#0f0f0f"
                    stroke={strokePct !== circ ? "#ff0000" : "#fff"}
                    strokeWidth={"5px"}
                    strokeDasharray={circ}
                    strokeDashoffset={props.pct ? strokePct : 0}
                    strokeLinecap="round"
            ></circle>
        );
    }

    const Text=(props)=>{
        return(
            <text
                fill="#fff"
                fontSize={16}
                x="50%"
                y="50%"
                fontWeight={700}
                textAnchor='middle'
                dominantBaseline={'central'}                
            >
                {props.pct.toFixed(0)}%
            </text>
        )
    }

    const percent=clearPercents(props.percent);
    return (
        <svg className={props.className}  >
            <g transform={`rotate(-90 ${"100 100"})`}>
                <Circle pct={percent}/>
            </g>
            <Text pct={percent}/>
        </svg>
    )
}

export default Pie