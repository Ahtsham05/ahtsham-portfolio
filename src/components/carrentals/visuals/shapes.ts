/**
 * Original, brand-neutral vehicle silhouettes (side profile, facing right).
 * They read as "coupe", "sedan", "SUV" or "supercar" without copying any
 * manufacturer's design. Every shape shares one 1200×420 canvas whose
 * ground line sits at y = 352, so they can be swapped freely.
 */

export type VehicleShape = "coupe" | "sedan" | "suv" | "supercar";

export type ShapeDef = {
  body: string;
  /** Side glass (greenhouse). */
  glass: string;
  /** Thin pillar lines drawn over the glass. */
  pillars: string;
  /** Door cut + character line details. */
  details: string;
  headlight: string;
  taillight: string;
  /** Point the headlight beam projects from. */
  beam: [number, number];
  wheels: { rear: number; front: number; cy: number; r: number };
};

export const GROUND_Y = 352;
export const VIEWBOX = "0 0 1200 420";

/** Wheel-arch helper: arc around a wheel that meets the sill at `sillY`. */
function arch(cx: number, cy: number, r: number, sillY: number) {
  const dx = Math.sqrt(r * r - (sillY - cy) ** 2);
  return `L ${(cx - dx).toFixed(1)} ${sillY} A ${r} ${r} 0 1 1 ${(cx + dx).toFixed(1)} ${sillY}`;
}

export const SHAPES: Record<VehicleShape, ShapeDef> = {
  coupe: {
    body: [
      "M 1134 272",
      "C 1138 248 1130 232 1108 222",
      "C 1092 212 1072 204 1046 200",
      "C 1000 196 944 196 890 194",
      "C 846 192 806 186 772 176",
      "C 732 156 692 130 648 112",
      "C 606 98 548 92 500 94",
      "C 430 98 360 120 290 150",
      "C 228 176 162 196 116 208",
      "C 92 214 80 228 80 248",
      "C 80 272 84 292 96 300",
      "C 104 304 116 304 130 304",
      arch(332, 282, 88, 304),
      arch(902, 282, 88, 304),
      "L 1092 304",
      "C 1122 304 1132 292 1134 272 Z",
    ].join(" "),
    glass: [
      "M 758 178",
      "C 722 156 686 134 648 122",
      "C 610 112 556 106 508 108",
      "C 446 112 392 132 344 156",
      "C 334 162 338 168 348 168",
      "L 742 182",
      "C 758 182 764 180 758 178 Z",
    ].join(" "),
    pillars: "",
    details: "M 778 182 C 782 230 780 272 774 304 M 1106 238 C 900 230 600 228 150 236",
    headlight: "M 1106 226 C 1086 214 1054 210 1036 216 C 1048 230 1082 236 1108 234 Z",
    taillight: "M 84 236 C 100 228 132 218 166 210 L 167 214 C 134 222 104 232 86 240 Z",
    beam: [1106, 230],
    wheels: { rear: 332, front: 902, cy: 282, r: 70 },
  },

  sedan: {
    body: [
      "M 1142 276",
      "C 1146 252 1140 234 1118 226",
      "C 1060 214 970 206 870 200",
      "C 842 198 818 190 798 180",
      "C 756 150 712 116 664 96",
      "C 620 80 530 74 452 78",
      "C 400 82 356 98 322 120",
      "C 302 136 282 150 262 160",
      "C 220 166 160 170 112 178",
      "C 94 182 84 196 84 216",
      "L 86 288",
      "C 88 300 100 306 120 306",
      arch(311, 284, 86, 306),
      arch(946, 284, 86, 306),
      "L 1100 306",
      "C 1128 306 1140 298 1142 276 Z",
    ].join(" "),
    glass: [
      "M 782 182",
      "C 744 152 704 122 660 106",
      "C 620 92 534 86 462 90",
      "C 412 94 370 110 340 128",
      "C 328 136 330 144 342 146",
      "L 766 186",
      "C 782 188 790 186 782 182 Z",
    ].join(" "),
    pillars: "M 568 88 L 562 172 M 382 106 L 372 150",
    details: "M 802 186 C 804 236 802 276 798 306 M 562 174 C 564 226 562 270 558 306 M 1126 250 C 900 240 600 236 120 232",
    headlight: "M 1118 232 C 1090 226 1064 224 1042 226 L 1048 238 C 1070 240 1094 242 1122 240 Z",
    taillight: "M 88 190 L 152 182 L 154 194 L 88 202 Z",
    beam: [1120, 236],
    wheels: { rear: 311, front: 946, cy: 284, r: 68 },
  },

  suv: {
    body: [
      "M 1025 268",
      "C 1030 238 1030 206 1018 190",
      "C 1010 180 996 176 976 174",
      "C 920 168 860 164 800 160",
      "C 782 158 770 152 760 144",
      "C 736 116 712 84 684 64",
      "C 676 58 664 54 650 54",
      "L 260 60",
      "C 236 60 220 66 210 78",
      "C 196 100 184 130 180 160",
      "L 176 270",
      "C 176 292 186 300 204 300",
      arch(335, 278, 92, 300),
      arch(860, 278, 92, 300),
      "L 990 300",
      "C 1014 300 1024 290 1025 268 Z",
    ].join(" "),
    glass: [
      "M 748 150",
      "C 728 122 708 94 682 74",
      "C 674 68 664 66 652 66",
      "L 264 72",
      "C 244 72 232 78 224 88",
      "C 214 104 208 122 206 138",
      "C 206 144 210 148 218 148",
      "L 736 156",
      "C 748 156 754 154 748 150 Z",
    ].join(" "),
    pillars: "M 522 68 L 518 154 M 330 70 L 332 150",
    details: "M 762 156 C 764 210 762 260 758 300 M 518 156 C 520 214 518 262 516 300 M 1018 214 C 800 206 500 204 182 200",
    headlight: "M 1020 196 L 960 186 L 958 196 L 1020 206 Z",
    taillight: "M 182 150 L 214 146 L 214 156 L 180 160 Z",
    beam: [1020, 200],
    wheels: { rear: 335, front: 860, cy: 278, r: 74 },
  },

  supercar: {
    body: [
      "M 1144 294",
      "C 1146 280 1138 272 1122 268",
      "C 1050 252 960 232 870 212",
      "C 826 202 790 190 760 176",
      "C 712 150 660 128 600 118",
      "C 560 112 510 114 470 120",
      "C 410 130 340 150 270 172",
      "C 210 190 150 202 106 208",
      "C 92 210 86 218 86 232",
      "L 86 284",
      "C 86 296 96 302 114 302",
      arch(284, 282, 86, 302),
      arch(909, 282, 86, 302),
      "L 1104 302",
      "C 1130 302 1144 300 1144 294 Z",
    ].join(" "),
    glass: [
      "M 748 176",
      "C 704 152 656 134 602 128",
      "C 556 124 510 126 474 132",
      "C 444 138 420 146 400 154",
      "C 392 158 396 164 406 164",
      "L 734 184",
      "C 748 184 754 180 748 176 Z",
    ].join(" "),
    pillars: "M 520 128 L 508 168",
    details:
      "M 470 198 C 520 188 600 186 652 190 L 610 242 C 562 238 512 234 470 232 Z M 758 182 C 768 230 764 270 758 302 M 1112 270 C 980 250 840 222 700 204",
    headlight: "M 1116 266 L 1032 246 L 1036 256 L 1110 276 Z",
    taillight: "M 90 238 L 158 222 L 158 230 L 92 248 Z",
    beam: [1114, 270],
    wheels: { rear: 284, front: 909, cy: 282, r: 70 },
  },
};
