/**
 * Engineering-style PCB render (illustrative, not a real product or a photo
 * of Board Edge's work). Drawn like a fabrication drawing: board outline,
 * dimension lines, fan-out routing, series resistors, silkscreen. One net is
 * highlighted in signal green and draws in once on load (CSS, so it is also
 * correct in pre-rendered HTML and disabled under reduced motion).
 */

const C = {
  board: "#123250",
  edge: "#2e5b87",
  trace: "#2c6497",
  power: "#356fa6",
  pad: "#c3cfda",
  body: "#0a1a2b",
  bodyEdge: "#23405e",
  silk: "#dce4eb",
  dim: "#8597aa",
  signal: "#45c47a",
};

// U1 (QFP-48) geometry
const CX = 330;
const CY = 240;
const PITCH = 7.5;
const pin = (i: number) => -41.25 + i * PITCH;

function fanRight() {
  // pins 2..9 on the right edge → J2 column at x=524, rows pitch 22
  return Array.from({ length: 8 }, (_, r) => {
    const y0 = CY + pin(r + 2);
    const y1 = 163 + r * 22;
    const dy = Math.abs(y1 - y0);
    const xb = 400;
    return { r, d: `M390 ${y0} H${xb} L${xb + dy} ${y1} H524`, y1 };
  });
}

function fanBottom() {
  // pins 2..9 on the bottom edge → J3 row at y=404, pitch 14
  return Array.from({ length: 8 }, (_, k) => {
    const x0 = CX + pin(k + 2);
    const x1 = 281 + k * 14;
    const dx = Math.abs(x1 - x0);
    return `M${x0} 300 V314 L${x1} ${314 + dx} V398`;
  });
}

function fanTop() {
  // pins 1..4 on the top edge → U2 (SOIC-8) right-side pads, rightmost pin highest
  return [1, 2, 3, 4].map((i, k) => {
    const x0 = CX + pin(i);
    const y1 = 124 - k * 9.33;
    const d = 10;
    return `M${x0} 180 V${y1 + d} L${x0 - d} ${y1} H196`;
  });
}

function Pins() {
  const els: React.ReactNode[] = [];
  for (let i = 0; i < 12; i++) {
    const p = pin(i);
    els.push(
      <rect key={`l${i}`} x={268} y={CY + p - 1.6} width={12} height={3.2} rx={0.6} fill={C.pad} />,
      <rect key={`r${i}`} x={380} y={CY + p - 1.6} width={12} height={3.2} rx={0.6} fill={C.pad} />,
      <rect key={`t${i}`} x={CX + p - 1.6} y={178} width={3.2} height={12} rx={0.6} fill={C.pad} />,
      <rect key={`b${i}`} x={CX + p - 1.6} y={290} width={3.2} height={12} rx={0.6} fill={C.pad} />,
    );
  }
  return <>{els}</>;
}

function Passive({ x, y, vertical = false, label }: { x: number; y: number; vertical?: boolean; label?: string }) {
  // 0603-style: two pads + body
  return vertical ? (
    <g>
      <rect x={x - 3} y={y - 7} width={6} height={4.5} rx={0.6} fill={C.pad} />
      <rect x={x - 3} y={y + 2.5} width={6} height={4.5} rx={0.6} fill={C.pad} />
      <rect x={x - 2.4} y={y - 2.5} width={4.8} height={5} fill="#3a2f22" />
      {label && (
        <text x={x + 6} y={y + 3} fontSize="6.5" fill={C.silk} opacity={0.6}>
          {label}
        </text>
      )}
    </g>
  ) : (
    <g>
      <rect x={x - 7} y={y - 3} width={4.5} height={6} rx={0.6} fill={C.pad} />
      <rect x={x + 2.5} y={y - 3} width={4.5} height={6} rx={0.6} fill={C.pad} />
      <rect x={x - 2.5} y={y - 2.4} width={5} height={4.8} fill="#3a2f22" />
      {label && (
        <text x={x - 6} y={y - 6} fontSize="6.5" fill={C.silk} opacity={0.6}>
          {label}
        </text>
      )}
    </g>
  );
}

function Via({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={3.4} fill={C.pad} />
      <circle cx={x} cy={y} r={1.5} fill={C.body} />
    </g>
  );
}

export function BoardRender({ className, title = "Illustrative PCB layout drawing" }: { className?: string; title?: string }) {
  const right = fanRight();
  const highlightRow = 3;
  const highlight = right[highlightRow]!;

  return (
    <svg viewBox="0 0 640 480" role="img" aria-label={title} className={className} fontFamily="Inter, ui-sans-serif, sans-serif">
      <defs>
        <pattern id="be-pour" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.7" fill="#ffffff" opacity="0.07" />
        </pattern>
      </defs>

      {/* ---- dimension lines (drawing annotations) ---- */}
      <g stroke={C.dim} strokeWidth="0.75" fill="none" opacity="0.8">
        <path d="M60 22 H580 M60 16 V30 M580 16 V30" />
        <path d="M28 50 V430 M22 50 H36 M22 430 H36" />
        <path d="M60 30 V44 M580 30 V44 M36 50 H52 M36 430 H52" strokeDasharray="2 3" />
      </g>
      <g fill={C.dim} fontSize="9.5" letterSpacing="1.2" className="nums-tabular">
        <rect x="290" y="15" width="60" height="14" fill="#0b1f33" />
        <text x="320" y="25.5" textAnchor="middle">
          100.00
        </text>
        <g transform="translate(31 240) rotate(-90)">
          <rect x="-26" y="-9" width="52" height="14" fill="#0b1f33" />
          <text x="0" y="1.5" textAnchor="middle">
            73.00
          </text>
        </g>
      </g>

      {/* ---- board ---- */}
      <rect x="60" y="50" width="520" height="380" rx="12" fill={C.board} stroke={C.edge} strokeWidth="1.5" />
      <rect x="60" y="50" width="520" height="380" rx="12" fill="url(#be-pour)" />
      <rect x="74" y="64" width="492" height="352" rx="6" fill="none" stroke={C.edge} strokeWidth="0.75" strokeDasharray="3 4" opacity="0.6" />

      {/* mounting holes */}
      {[
        [88, 78],
        [552, 78],
        [88, 402],
        [552, 402],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={10} fill={C.pad} />
          <circle cx={x} cy={y} r={6} fill="#0b1f33" />
        </g>
      ))}
      {/* fiducials */}
      <circle cx="122" cy="78" r="6" fill="none" stroke={C.pad} strokeWidth="0.75" opacity="0.6" />
      <circle cx="122" cy="78" r="2.4" fill={C.pad} />
      <circle cx="518" cy="402" r="6" fill="none" stroke={C.pad} strokeWidth="0.75" opacity="0.6" />
      <circle cx="518" cy="402" r="2.4" fill={C.pad} />

      {/* ---- routing ---- */}
      <g fill="none" stroke={C.trace} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {right.map((t) => t.r !== highlightRow && <path key={t.r} d={t.d} />)}
        {fanBottom().map((d) => (
          <path key={d} d={d} />
        ))}
        {fanTop().map((d) => (
          <path key={d} d={d} />
        ))}
        {/* left: USB-C → TVS array → U1 */}
        {[3, 4, 5, 6, 7, 8].map((i) => (
          <path key={`usb${i}`} d={`M94 ${CY + pin(i)} H268`} />
        ))}
        {/* crystal */}
        <path d={`M${CX + pin(8)} 180 V150 H420`} />
        <path d={`M${CX + pin(9)} 180 V158 H420`} />
        {/* decoupling stubs to vias */}
        {[0, 1, 10, 11].map((i) => (
          <path key={`ls${i}`} d={`M268 ${CY + pin(i)} H248`} />
        ))}
        {[0, 1, 10, 11].map((i) => (
          <path key={`bs${i}`} d={`M${CX + pin(i)} 302 V322`} />
        ))}
      </g>
      {/* power: USB → regulator → U1 */}
      <g fill="none" stroke={C.power} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M94 208 H120 V196" />
        <path d="M94 272 H112 L130 290 V328" />
        <path d="M168 342 H222 L242 322 H252" />
      </g>

      {/* vias */}
      {[0, 1, 10, 11].map((i) => (
        <Via key={`lv${i}`} x={244} y={CY + pin(i)} />
      ))}
      {[0, 1, 10, 11].map((i) => (
        <Via key={`bv${i}`} x={CX + pin(i)} y={326} />
      ))}
      <Via x={256} y={322} />
      <Via x={120} y={192} />
      <Via x={430} y={340} />
      <Via x={446} y={340} />
      <Via x={180} y={390} />

      {/* ---- highlighted net (signal green, draws in once) ---- */}
      <path
        d={highlight.d}
        pathLength={1}
        fill="none"
        stroke={C.signal}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="be-draw"
      />

      {/* ---- components ---- */}
      {/* U1 MCU */}
      <Pins />
      <rect x="280" y="190" width="100" height="100" rx="3" fill={C.body} stroke={C.bodyEdge} />
      <circle cx="291" cy="201" r="2.6" fill={C.bodyEdge} />
      <text x="330" y="244" textAnchor="middle" fontSize="9" letterSpacing="1.5" fill={C.silk} opacity="0.55">
        MCU
      </text>
      <text x="282" y="183" fontSize="7.5" fill={C.silk} opacity="0.65" transform="translate(-22 0)">
        U1
      </text>

      {/* U2 flash (SOIC-8) */}
      <rect x="150" y="90" width="40" height="40" rx="2" fill={C.body} stroke={C.bodyEdge} />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <rect x="190" y={94.5 + k * 9.33} width="8" height="3.2" rx="0.6" fill={C.pad} />
          <rect x="142" y={94.5 + k * 9.33} width="8" height="3.2" rx="0.6" fill={C.pad} />
        </g>
      ))}
      <text x="150" y="84" fontSize="7.5" fill={C.silk} opacity="0.65">
        U2
      </text>

      {/* Y1 crystal */}
      <rect x="420" y="143" width="34" height="22" rx="10" fill="none" stroke={C.pad} strokeWidth="1.2" />
      <rect x="418" y="147" width="6" height="4" fill={C.pad} />
      <rect x="418" y="156" width="6" height="4" fill={C.pad} />
      <text x="458" y="152" fontSize="7.5" fill={C.silk} opacity="0.65">
        Y1
      </text>

      {/* USB-C connector J1 (overhangs the edge) */}
      <rect x="46" y="196" width="48" height="88" rx="4" fill={C.pad} opacity="0.92" />
      <rect x="52" y="204" width="30" height="72" rx="10" fill="#8ea1b5" />
      <rect x="57" y="214" width="20" height="52" rx="6" fill="#0b1f33" />
      <text x="100" y="296" fontSize="7.5" fill={C.silk} opacity="0.65">
        J1
      </text>

      {/* U3 TVS array on the USB lines */}
      <rect x="150" y="214" width="28" height="52" rx="2" fill={C.body} stroke={C.bodyEdge} />
      <text x="150" y="208" fontSize="7.5" fill={C.silk} opacity="0.65">
        U3
      </text>

      {/* U4 regulator (SOT-223) */}
      <rect x="118" y="328" width="50" height="30" rx="2" fill={C.body} stroke={C.bodyEdge} />
      <rect x="126" y="358" width="7" height="9" fill={C.pad} />
      <rect x="139.5" y="358" width="7" height="9" fill={C.pad} />
      <rect x="153" y="358" width="7" height="9" fill={C.pad} />
      <rect x="128" y="318" width="30" height="10" fill={C.pad} />
      <text x="174" y="334" fontSize="7.5" fill={C.silk} opacity="0.65">
        U4
      </text>

      {/* decoupling + bulk capacitors */}
      <Passive x={262} y={174} label="C1" />
      <Passive x={398} y={174} label="C2" />
      <Passive x={262} y={312} />
      <Passive x={398} y={312} />
      <Passive x={210} y={330} vertical label="C5" />
      <Passive x={466} y={150} vertical />
      <Passive x={466} y={162} vertical />

      {/* series resistors on the J2 bus */}
      {right.map((t) => (
        <g key={`R${t.r}`}>
          <rect x={478} y={t.y1 - 3.2} width={5} height={6.4} rx={0.6} fill={C.pad} />
          <rect x={489} y={t.y1 - 3.2} width={5} height={6.4} rx={0.6} fill={C.pad} />
          <rect x={483} y={t.y1 - 2.4} width={6} height={4.8} fill="#3a2f22" />
        </g>
      ))}
      <text x="476" y="148" fontSize="7" fill={C.silk} opacity="0.55">
        R1–R8
      </text>

      {/* J2 2×8 header */}
      <rect x="514" y="150" width="44" height="180" rx="2" fill="none" stroke={C.silk} strokeWidth="0.8" opacity="0.5" />
      {right.map((t) => (
        <g key={`J2${t.r}`}>
          <rect x={518} y={t.y1 - 6} width={12} height={12} rx={1.5} fill={C.pad} />
          <circle cx={524} cy={t.y1} r={2.6} fill="#0b1f33" />
          <circle cx={546} cy={t.y1} r={6} fill={C.pad} />
          <circle cx={546} cy={t.y1} r={2.6} fill="#0b1f33" />
        </g>
      ))}
      <text x="514" y="144" fontSize="7.5" fill={C.silk} opacity="0.65">
        J2
      </text>

      {/* J3 1×8 edge connector */}
      <rect x="270" y="394" width="122" height="22" rx="2" fill="none" stroke={C.silk} strokeWidth="0.8" opacity="0.5" />
      {Array.from({ length: 8 }, (_, k) => (
        <rect key={`J3${k}`} x={281 + k * 14 - 3.5} y={398} width={7} height={14} rx={1} fill={C.pad} />
      ))}
      <text x="398" y="409" fontSize="7.5" fill={C.silk} opacity="0.65">
        J3
      </text>

      {/* silkscreen title block */}
      <text x="110" y="414" fontSize="8" letterSpacing="2" fill={C.silk} opacity="0.5">
        PROTOTYPE · REV A
      </text>
      {/* pin-1 markers */}
      <circle cx="140" cy="88" r="1.6" fill={C.silk} opacity="0.7" />
    </svg>
  );
}
