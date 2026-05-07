import React, { useMemo, useState } from "react";

const VEHICLES = [
  { id: "one-ton", name: "1톤", desc: "포터 · 봉고", base: 0 },
  { id: "semi-medium", name: "준중형", desc: "마이티 · 더쎈", base: 0 },
  { id: "medium", name: "중형", desc: "파비스 · 구쎈", base: 0 },
  { id: "large", name: "대형", desc: "맥쎈 · 엑시언트 · 수입", base: 0 },
];

const SERVICES = [
  {
    id: "tint",
    name: "열차단썬팅",
    desc: "필름 종류에 따라 가격 선택",
    options: [
      { id: "ap50", name: "열차단 썬팅(56%) [애니가드 AP50]", price: 500000, desc: "56% 열차단 필름" },
      { id: "ap80", name: "열차단 썬팅(86%) [애니가드 AP80]", price: 600000, desc: "86% 열차단 필름" },
      { id: "solar-gt", name: "솔라가드 GT", price: 650000, desc: "프리미엄 열차단 썬팅" },
      { id: "solar-v", name: "솔라가드 V", price: 800000, desc: "고급 열차단 필름" },
      { id: "noblesse-z", name: "솔라가드 노블레스 Z", price: 1000000, desc: "최상급 프리미엄 썬팅" },
    ],
  },
  {
    id: "blackbox",
    name: "블랙박스",
    desc: "블랙박스·카메라·CCTV 옵션 선택",
    options: [
      { id: "blackbox-4ch", name: "4채널 블랙박스", price: 800000, desc: "4채널 기본 구성" },
      { id: "blackbox-5ch", name: "5채널 블랙박스", price: 950000, desc: "5채널 확장 구성" },
      { id: "corner-vision-1-blind", name: "코너비전1(사각지대카메라)", price: 850000, desc: "사각지대 확인용 카메라" },
      { id: "corner-vision-1-rear-right", name: "코너비전1(후방 or 우측꼬리)", price: 450000, desc: "후방 또는 우측꼬리 카메라" },
      { id: "corner-vision-2", name: "코너비전2 (전,후,좌,우)", price: 1800000, desc: "전·후·좌·우 카메라 구성" },
      { id: "cctv-4ch-1tb-12", name: "CCTV(4채널, 1TB, 12.3인치)", price: 1700000, desc: "4채널 CCTV 패키지" },
      { id: "monitor-14", name: "모니터 14인치 추가", price: 150000, desc: "14인치 모니터 추가 장착" },
      { id: "cctv-camera-add", name: "CCTV카메라 추가 (최대 4개)", price: 200000, desc: "CCTV 카메라 추가", quantity: true, min: 1, max: 4 },
      { id: "around-view", name: "어라운드 뷰", price: 2300000, desc: "360도 주변 확인 시스템" },
    ],
  },
  {
    id: "battery",
    name: "배터리",
    desc: "배터리 종류 및 히팅 옵션 선택",
    options: [
      { id: "lead-230a", name: "납배터리230A (배터리다이포함)", price: 1150000, desc: "배터리다이 포함 구성" },
      { id: "lithium-200a", name: "인산철배터리200A", price: 2500000, desc: "인기 용량 구성" },
      { id: "lithium-230a", name: "인산철배터리230A", price: 3200000, desc: "히팅 옵션 추가 가능", extraOption: { name: "히팅 추가", price: 200000 } },
      { id: "lithium-300a", name: "인산철배터리300A", price: 3800000, desc: "히팅 옵션 추가 가능", extraOption: { name: "히팅 추가", price: 200000 } },
    ],
  },
  {
    id: "inverter",
    name: "인버터",
    desc: "인버터 및 인산철 연동 할인 선택",
    options: [
      { id: "inverter-3kw", name: "3Kw", price: 800000, desc: "3Kw 인버터", extraOption: { name: "인산철배터리 장착시", price: -270000 } },
      { id: "inverter-4kw", name: "4Kw", price: 990000, desc: "4Kw 인버터", extraOption: { name: "인산철배터리 장착시", price: -270000 } },
      { id: "inverter-5kw", name: "5Kw", price: 1100000, desc: "5Kw 인버터", extraOption: { name: "인산철배터리 장착시", price: -270000 } },
    ],
  },
  {
    id: "ac",
    name: "무시동에어컨",
    desc: "제품 및 브라켓 옵션 선택",
    options: [
      {
        id: "linkcool-2300w",
        name: "2300W (Linkcool)",
        price: 1700000,
        desc: "Linkcool 2300W 무시동에어컨",
        extraOptions: [
          { id: "bracket-dexen-center", name: "더쎈 무시동 에어컨 중앙 브라켓", price: 300000 },
          { id: "bracket-mighty-center", name: "마이티 무시동 에어컨 중앙 브라켓", price: 150000 },
          { id: "bracket-scania-volvo", name: "스카니아, 볼보 에어컨 브라켓", price: 300000 },
        ],
      },
    ],
  },
  {
    id: "heater",
    name: "무시동히터",
    desc: "무시동히터 제품 선택",
    options: [
      { id: "jintech-heater", name: "진테크", price: 700000, desc: "진테크 무시동히터" },
      { id: "webasto-heater", name: "베바스토", price: 1000000, desc: "베바스토 무시동히터" },
    ],
  },
  {
    id: "sound",
    name: "방음시공",
    desc: "방음 시공 및 추가 옵션 선택",
    options: [
      { id: "ceiling-soundproof", name: "천장방음", price: 1200000, desc: "천장 방음 시공", extraOptions: [{ id: "hightop-add", name: "하이탑", price: 200000 }, { id: "ceiling-mat-add", name: "천장방음지", price: 300000 }] },
      { id: "floor-soundproof", name: "바닥방음", price: 500000, desc: "바닥 소음 저감 시공" },
      { id: "bed-cover", name: "침대커버", price: 400000, desc: "침대 커버 시공" },
    ],
  },
  {
    id: "microwave",
    name: "전자레인지장",
    desc: "전자레인지장 및 스피커 옵션 선택",
    options: [
      { id: "microwave-1", name: "1구전자레인지포함 (맥쎈, 파비스 공용)", price: 550000, desc: "1구 전자레인지 포함" },
      { id: "microwave-4", name: "4구전자레인지포함 (맥쎈 공용)", price: 1100000, desc: "4구 전자레인지 포함" },
      { id: "bluetooth-speaker-4", name: "4구장블루투스스피커 (맥쎈)", price: 450000, desc: "블루투스 스피커 장착" },
      { id: "microwave-2", name: "2구장 (파비스)", price: 800000, desc: "2구 전자레인지장" },
    ],
  },
  {
    id: "flat-seat",
    name: "평판시트",
    desc: "차종별 평판시트 선택",
    options: [
      { id: "flat-seat-dexen", name: "더쎈", price: 650000, desc: "더쎈 전용 평판시트" },
      { id: "flat-seat-maxen", name: "맥쎈(침대커버 포함)", price: 550000, desc: "침대커버 포함 구성" },
    ],
  },
  { id: "fridge", name: "냉장고", desc: "냉장고 옵션 선택", options: [{ id: "built-in-fridge", name: "매립형 냉장고", price: 1000000, desc: "매립형 냉장고 시공" }] },
  { id: "smart-tv", name: "24인치 스마트 TV", desc: "스마트 TV 옵션 선택", options: [{ id: "smart-tv-maxen", name: "맥쎈", price: 600000, desc: "24인치 스마트 TV 장착" }] },
  {
    id: "led",
    name: "LED",
    desc: "LED 라이트 및 바 옵션 선택",
    options: [
      { id: "led-light", name: "라이트", price: 150000, desc: "LED 라이트 시공", extraOption: { name: "마이트", price: 20000 } },
      { id: "led-bar-70", name: "바70cm", price: 200000, desc: "70cm LED 바 시공" },
    ],
  },
  { id: "etc", name: "기타", desc: "기타 시공 옵션 선택", options: [{ id: "wing-interlock", name: "윙인터락", price: 550000, desc: "윙인터락 시공" }] },
];

const DEFAULT_VEHICLE_ID = "one-ton";
const DEFAULT_SELECTED_OPTIONS = {};
const DEFAULT_OPTION_QUANTITIES = { "cctv-camera-add": 1 };

function formatWon(value) {
  return value.toLocaleString("ko-KR") + "원";
}

function normalizeSelectedOptionIds(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function getVehicleById(vehicleId) {
  return VEHICLES.find((vehicle) => vehicle.id === vehicleId) || VEHICLES[0];
}

function getServiceById(serviceId) {
  return SERVICES.find((service) => service.id === serviceId);
}

function getOption(service, optionId) {
  return service.options.find((option) => option.id === optionId) || service.options[0];
}

function extraKey(option, extraName) {
  return `${option.id}__${extraName}`;
}

function getQuantity(option, optionQuantities = {}) {
  if (!option.quantity) return 1;
  const min = option.min || 1;
  const max = option.max || 99;
  const current = optionQuantities[option.id] || min;
  return Math.min(max, Math.max(min, current));
}

function getOptionPrice(option, optionQuantities = {}, extraSelections = {}) {
  const quantity = getQuantity(option, optionQuantities);
  const singleExtraPrice = option.extraOption && extraSelections[extraKey(option, option.extraOption.name)] ? option.extraOption.price : 0;
  const multipleExtraPrice = option.extraOptions
    ? option.extraOptions.reduce((sum, extra) => sum + (extraSelections[extra.id] ? extra.price : 0), 0)
    : 0;
  return {
    quantity,
    extraPrice: singleExtraPrice + multipleExtraPrice,
    total: option.price * quantity + singleExtraPrice + multipleExtraPrice,
  };
}

function getSelectedServices(selectedOptions, optionQuantities = {}, extraSelections = {}) {
  return Object.entries(selectedOptions)
    .map(([serviceId, optionIds]) => {
      const service = getServiceById(serviceId);
      if (!service) return null;
      const selectedOptionsForService = normalizeSelectedOptionIds(optionIds).map((optionId) => {
        const option = getOption(service, optionId);
        const price = getOptionPrice(option, optionQuantities, extraSelections);
        return { ...option, quantity: price.quantity, extraPrice: price.extraPrice, total: price.total };
      });
      const price = selectedOptionsForService.reduce((sum, option) => sum + option.total, 0);
      return { ...service, selectedOptions: selectedOptionsForService, price };
    })
    .filter(Boolean)
    .filter((service) => service.selectedOptions.length > 0);
}

function calculateQuote({ vehicleId, selectedOptions, optionQuantities = {}, extraSelections = {} }) {
  const vehicle = getVehicleById(vehicleId);
  const selectedServices = getSelectedServices(selectedOptions, optionQuantities, extraSelections);
  const serviceTotal = selectedServices.reduce((sum, service) => sum + service.price, 0);
  return { vehicle, selectedServices, serviceTotal, total: Math.max(serviceTotal, 0) };
}

function getTodayText() {
  return new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });
}

const TEST_CASES = [
  { name: "초기 상태는 선택 항목 없음", input: { vehicleId: "one-ton", selectedOptions: DEFAULT_SELECTED_OPTIONS }, expectedTotal: 0 },
  { name: "열차단썬팅 + 블랙박스 선택 시 계산", input: { vehicleId: "one-ton", selectedOptions: { tint: ["ap50"], blackbox: ["blackbox-4ch"] } }, expectedTotal: 1300000 },
  { name: "CCTV 카메라 추가 수량은 최대 4개까지만 반영", input: { vehicleId: "one-ton", selectedOptions: { blackbox: ["cctv-camera-add"] }, optionQuantities: { "cctv-camera-add": 8 } }, expectedTotal: 800000 },
  { name: "인버터 인산철 할인 적용", input: { vehicleId: "one-ton", selectedOptions: { inverter: ["inverter-5kw"] }, extraSelections: { "inverter-5kw__인산철배터리 장착시": true } }, expectedTotal: 830000 },
  { name: "방음시공 복수 선택 반영", input: { vehicleId: "one-ton", selectedOptions: { sound: ["ceiling-soundproof", "floor-soundproof", "bed-cover"] } }, expectedTotal: 2100000 },
  { name: "사진 저장용 빈 견적 계산", input: { vehicleId: "large", selectedOptions: {} }, expectedTotal: 0 },
];

function runQuoteTests() {
  TEST_CASES.forEach((test) => {
    const result = calculateQuote(test.input);
    if (result.total !== test.expectedTotal) {
      throw new Error(`${test.name} 실패: 예상 ${test.expectedTotal}, 실제 ${result.total}`);
    }
  });
}

runQuoteTests();

function MiniIcon({ children }) {
  return <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-white/20 text-base leading-none">{children}</span>;
}

function Header() {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-500 via-orange-600 to-neutral-950 shadow-2xl">
      <div className="p-5">
        <div className="mb-5 flex justify-center">
          <div className="flex w-full max-w-[320px] items-center justify-center rounded-3xl bg-white p-4 shadow-2xl">
            <img
              src="/logo.png"
              alt="인코스모 로고"
              className="h-auto w-full max-w-[260px] object-contain"
              onError={(event) => {
                event.currentTarget.style.display = "none";
                const fallback = event.currentTarget.nextElementSibling;
                if (fallback) fallback.style.display = "block";
              }}
            />
            <div className="hidden text-center">
              <p className="text-3xl font-black tracking-tight text-neutral-900">incosmo</p>
              <p className="mt-1 text-sm font-black tracking-[0.35em] text-orange-600">인코스모</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-orange-100">화물차의 모든 것</p>
            <h1 className="mt-1 text-2xl font-black leading-tight text-white">시공 견적 계산기</h1>
          </div>
          <div className="rounded-2xl bg-white/20 p-3 text-3xl" aria-hidden="true">🚚</div>
        </div>
        <p className="mt-4 text-sm leading-6 text-orange-50">차량 종류와 시공 항목을 선택하면 예상 견적을 바로 확인할 수 있습니다.</p>
      </div>
    </div>
  );
}

function VehicleSelector({ vehicleId, setVehicleId }) {
  return (
    <section className="mt-5 rounded-[1.5rem] bg-white p-4 text-neutral-900 shadow-xl">
      <div className="flex items-center gap-2">
        <span className="text-xl" aria-hidden="true">🧮</span>
        <h2 className="text-lg font-black">차량 선택</h2>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {VEHICLES.map((vehicle) => (
          <button key={vehicle.id} type="button" onClick={() => setVehicleId(vehicle.id)} className={`rounded-2xl border p-3 text-left text-sm font-bold transition ${vehicleId === vehicle.id ? "border-orange-500 bg-orange-50 text-orange-700" : "border-neutral-200 bg-neutral-50 text-neutral-700"}`}>
            {vehicle.name}
            <p className="mt-1 text-xs font-medium text-neutral-500">{vehicle.desc}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function QuoteModal({ quote, selectedOptionCount, onClose, onSave, quoteImage }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 p-4">
      <div className="mx-auto max-h-[92vh] max-w-md overflow-auto rounded-2xl bg-white p-5 text-neutral-900 shadow-2xl">
        <div>
          <div className="flex items-start justify-between border-b border-neutral-200 pb-4">
            <div>
              <p className="text-sm font-bold text-orange-600">인코스모</p>
              <h2 className="mt-1 text-2xl font-black">시공 견적서</h2>
              <p className="mt-1 text-xs text-neutral-500">작성일: {getTodayText()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-500">문의전화</p>
              <p className="text-lg font-black text-orange-600">1800-4879</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-neutral-50 p-3">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-neutral-500">선택 차량</span>
              <span className="font-black">{quote.vehicle.name} ({quote.vehicle.desc})</span>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {quote.selectedServices.length === 0 ? (
              <p className="rounded-xl bg-neutral-50 p-4 text-center text-sm text-neutral-500">선택된 시공 항목이 없습니다.</p>
            ) : (
              quote.selectedServices.map((service) => (
                <div key={service.id} className="rounded-xl border border-neutral-200 p-3">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                    <h3 className="font-black">{service.name}</h3>
                    <p className="font-black text-orange-600">{formatWon(service.price)}</p>
                  </div>
                  <div className="mt-2 space-y-2">
                    {service.selectedOptions.map((option) => (
                      <div key={option.id} className="text-sm">
                        <div className="flex justify-between gap-3">
                          <span className="font-bold text-neutral-800">{option.name}{option.quantity > 1 ? ` × ${option.quantity}` : ""}</span>
                          <span className="shrink-0 font-bold">{formatWon(option.total)}</span>
                        </div>
                        {option.extraPrice !== 0 && <p className="mt-1 text-xs text-neutral-500">추가/할인 옵션 포함: {formatWon(option.extraPrice)}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-5 rounded-2xl bg-neutral-900 p-4 text-white">
            <div className="flex justify-between text-sm text-neutral-300"><span>선택 옵션 수</span><span>{selectedOptionCount}개</span></div>
            <div className="mt-2 flex justify-between text-sm text-neutral-300"><span>시공 합계</span><span>{formatWon(quote.serviceTotal)}</span></div>
            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="text-xs text-neutral-400">총 예상 견적</p>
              <p className="mt-1 text-3xl font-black">{formatWon(quote.total)}</p>
            </div>
          </div>
          <p className="mt-4 text-[11px] leading-4 text-neutral-500">본 견적은 예상 견적이며, 실제 금액은 차량 상태, 제품 사양, 현장 작업 조건에 따라 달라질 수 있습니다.</p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button type="button" onClick={onClose} className="rounded-xl bg-neutral-200 px-3 py-3 text-sm font-black text-neutral-800">닫기</button>
          <a href="tel:18004879" className="rounded-xl bg-orange-100 px-3 py-3 text-center text-sm font-black text-orange-700">전화문의</a>
          <button type="button" onClick={(event) => { event.preventDefault(); event.stopPropagation(); onSave(); }} className="rounded-xl bg-orange-600 px-3 py-3 text-sm font-black text-white">사진 만들기</button>
        </div>
        {quoteImage ? (
          <div className="mt-4 rounded-2xl border border-orange-200 bg-orange-50 p-3">
            <p className="mb-2 text-center text-xs font-bold text-orange-700">
              아래 이미지를 길게 누르거나 우클릭해서 저장하세요.
            </p>
            <img src={quoteImage} alt="견적서 이미지" className="w-full rounded-xl border border-neutral-200 bg-white" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function TruckQuoteCalculatorApp() {
  const [vehicleId, setVehicleId] = useState(DEFAULT_VEHICLE_ID);
  const [selectedOptions, setSelectedOptions] = useState(DEFAULT_SELECTED_OPTIONS);
  const [optionQuantities, setOptionQuantities] = useState(DEFAULT_OPTION_QUANTITIES);
  const [extraSelections, setExtraSelections] = useState({});
  const [openServices, setOpenServices] = useState({});
  const [showQuoteSheet, setShowQuoteSheet] = useState(false);
  const [quoteImage, setQuoteImage] = useState("");

  const quote = useMemo(() => calculateQuote({ vehicleId, selectedOptions, optionQuantities, extraSelections }), [vehicleId, selectedOptions, optionQuantities, extraSelections]);
  const selectedOptionCount = quote.selectedServices.reduce((sum, service) => sum + service.selectedOptions.length, 0);

  const toggleOption = (serviceId, optionId) => {
    setSelectedOptions((prev) => {
      const current = normalizeSelectedOptionIds(prev[serviceId]);
      const nextOptions = current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId];
      if (nextOptions.length === 0) {
        const next = { ...prev };
        delete next[serviceId];
        return next;
      }
      return { ...prev, [serviceId]: nextOptions };
    });
  };

  const changeQuantity = (option, amount) => {
    setOptionQuantities((prev) => {
      const current = prev[option.id] || option.min || 1;
      const min = option.min || 1;
      const max = option.max || 99;
      return { ...prev, [option.id]: Math.min(max, Math.max(min, current + amount)) };
    });
  };

  const toggleExtraOption = (key) => {
    setExtraSelections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const reset = () => {
    setVehicleId(DEFAULT_VEHICLE_ID);
    setSelectedOptions(DEFAULT_SELECTED_OPTIONS);
    setOptionQuantities(DEFAULT_OPTION_QUANTITIES);
    setExtraSelections({});
    setOpenServices({});
    setShowQuoteSheet(false);
    setQuoteImage("");
  };

  const saveQuoteImage = () => {
    try {
      const scale = 2;
      const width = 420;
      const padding = 24;
      const optionRows = quote.selectedServices.flatMap((service) => [service, ...service.selectedOptions]);
      const height = Math.max(620, 280 + optionRows.length * 42);
      const canvas = document.createElement("canvas");
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        alert("이미지 생성 기능을 실행할 수 없습니다.");
        return;
      }

      ctx.scale(scale, scale);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      const text = (value, x, y, size = 14, weight = "400", color = "#111827", align = "left") => {
        ctx.fillStyle = color;
        ctx.font = `${weight} ${size}px Arial, sans-serif`;
        ctx.textAlign = align;
        ctx.textBaseline = "top";
        ctx.fillText(value, x, y);
      };

      text("인코스모", padding, 24, 14, "700", "#ea580c");
      text("시공 견적서", padding, 48, 28, "900");
      text(`작성일: ${getTodayText()}`, padding, 86, 12, "400", "#6b7280");
      text("1800-4879", width - padding, 48, 20, "900", "#ea580c", "right");
      text(`차량: ${quote.vehicle.name} (${quote.vehicle.desc})`, padding, 130, 14, "700");

      let y = 170;
      if (quote.selectedServices.length === 0) {
        text("선택된 시공 항목이 없습니다.", padding, y, 14, "700", "#6b7280");
        y += 40;
      } else {
        quote.selectedServices.forEach((service) => {
          text(service.name, padding, y, 16, "900");
          text(formatWon(service.price), width - padding, y, 15, "900", "#ea580c", "right");
          y += 28;
          service.selectedOptions.forEach((option) => {
            const name = `${option.name}${option.quantity > 1 ? ` × ${option.quantity}` : ""}`;
            text(name.slice(0, 28), padding + 10, y, 12, "700", "#374151");
            text(formatWon(option.total), width - padding, y, 12, "700", "#111827", "right");
            y += 24;
          });
          y += 10;
        });
      }

      text("총 예상 견적", padding, y + 20, 14, "700", "#6b7280");
      text(formatWon(quote.total), padding, y + 44, 28, "900", "#111827");
      text("본 견적은 예상 견적이며 실제 금액은 차량 상태와 작업 조건에 따라 달라질 수 있습니다.", padding, height - 34, 10, "400", "#6b7280");

      const imageUrl = canvas.toDataURL("image/png");
      setQuoteImage(imageUrl);
    } catch (error) {
      console.error("견적서 이미지 생성 실패", error);
      alert("견적서 이미지 생성 기능을 실행할 수 없습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-md px-4 py-5">
        <Header />
        <VehicleSelector vehicleId={vehicleId} setVehicleId={setVehicleId} />

        <section className="mt-4 rounded-[1.5rem] bg-white p-4 text-neutral-900 shadow-xl">
          <h2 className="text-lg font-black">시공 항목 선택</h2>
          <p className="mt-1 text-xs text-neutral-500">품목을 펼친 뒤 필요한 옵션을 여러 개 선택할 수 있습니다.</p>
          <div className="mt-3 space-y-3">
            {SERVICES.map((service) => {
              const selectedIds = normalizeSelectedOptionIds(selectedOptions[service.id]);
              const active = selectedIds.length > 0;
              const isOpen = Boolean(openServices[service.id]);
              const serviceTotal = service.options.reduce((sum, option) => selectedIds.includes(option.id) ? sum + getOptionPrice(option, optionQuantities, extraSelections).total : sum, 0);
              return (
                <div key={service.id} className={`rounded-2xl border ${active ? "border-orange-500 bg-orange-50" : "border-neutral-200 bg-neutral-50"}`}>
                  <button type="button" onClick={() => setOpenServices((prev) => ({ ...prev, [service.id]: !prev[service.id] }))} className="flex w-full items-center gap-3 p-3 text-left">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-black ${active ? "bg-orange-600 text-white" : "bg-neutral-200 text-neutral-500"}`}>{active ? selectedIds.length : "+"}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-black">{service.name}</p>
                        <p className="text-sm font-black text-orange-600">{active ? formatWon(serviceTotal) : "선택 안 함"}</p>
                      </div>
                      <p className="mt-1 text-xs text-neutral-500">{service.desc}</p>
                    </div>
                    <span className="text-xs font-black text-neutral-500">{isOpen ? "접기" : "펼치기"}</span>
                  </button>

                  {isOpen ? (
                    <div className="border-t border-orange-100 px-3 pb-3 pt-2">
                      <div className="grid gap-2">
                        {service.options.map((option) => {
                          const optionActive = selectedIds.includes(option.id);
                          const quantity = getQuantity(option, optionQuantities);
                          const optionTotal = getOptionPrice(option, optionQuantities, extraSelections).total;
                          const singleExtraKey = option.extraOption ? extraKey(option, option.extraOption.name) : "";
                          const singleExtraActive = Boolean(singleExtraKey && extraSelections[singleExtraKey]);
                          return (
                            <div key={option.id} className={`rounded-2xl border p-3 ${optionActive ? "border-orange-500 bg-white shadow-sm" : "border-neutral-200 bg-white/70"}`}>
                              <button type="button" onClick={() => toggleOption(service.id, option.id)} className="flex w-full items-start justify-between gap-2 text-left">
                                <div className="flex gap-2">
                                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-xs font-black ${optionActive ? "bg-orange-600 text-white" : "bg-neutral-200 text-neutral-500"}`}>{optionActive ? "✓" : "+"}</span>
                                  <div>
                                    <p className="text-sm font-black">{option.name}</p>
                                    <p className="mt-1 text-xs text-neutral-500">{option.desc}</p>
                                  </div>
                                </div>
                                <p className="shrink-0 text-sm font-black text-orange-600">{option.quantity ? `${formatWon(option.price)} × ${quantity}` : formatWon(optionTotal)}</p>
                              </button>

                              {option.quantity && optionActive ? (
                                <div className="mt-3 flex items-center justify-between rounded-xl bg-orange-50 p-2">
                                  <span className="text-xs font-bold text-neutral-600">수량</span>
                                  <div className="flex items-center gap-2">
                                    <button type="button" onClick={() => changeQuantity(option, -1)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-lg font-black text-orange-600 shadow-sm">-</button>
                                    <span className="w-8 text-center text-sm font-black">{quantity}</span>
                                    <button type="button" onClick={() => changeQuantity(option, 1)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-lg font-black text-orange-600 shadow-sm">+</button>
                                  </div>
                                </div>
                              ) : null}

                              {option.extraOption && optionActive ? (
                                <button type="button" onClick={() => toggleExtraOption(singleExtraKey)} className={`mt-3 flex w-full items-center justify-between rounded-xl border p-3 ${singleExtraActive ? "border-orange-500 bg-orange-100" : "border-neutral-200 bg-white"}`}>
                                  <div>
                                    <p className="text-sm font-black text-neutral-800">{option.extraOption.name}</p>
                                    <p className="mt-1 text-xs text-neutral-500">{option.extraOption.price >= 0 ? `추가 ${formatWon(option.extraOption.price)}` : `할인 ${formatWon(Math.abs(option.extraOption.price))}`}</p>
                                  </div>
                                  <div className={`rounded-full px-3 py-1 text-xs font-black ${singleExtraActive ? "bg-orange-600 text-white" : "bg-neutral-200 text-neutral-600"}`}>{singleExtraActive ? "적용됨" : "적용"}</div>
                                </button>
                              ) : null}

                              {option.extraOptions && optionActive ? (
                                <div className="mt-3 space-y-2">
                                  {option.extraOptions.map((extra) => {
                                    const extraActive = Boolean(extraSelections[extra.id]);
                                    return (
                                      <button key={extra.id} type="button" onClick={() => toggleExtraOption(extra.id)} className={`flex w-full items-center justify-between rounded-xl border p-3 ${extraActive ? "border-orange-500 bg-orange-100" : "border-neutral-200 bg-white"}`}>
                                        <div>
                                          <p className="text-sm font-black text-neutral-800">{extra.name}</p>
                                          <p className="mt-1 text-xs text-neutral-500">추가 {formatWon(extra.price)}</p>
                                        </div>
                                        <div className={`rounded-full px-3 py-1 text-xs font-black ${extraActive ? "bg-orange-600 text-white" : "bg-neutral-200 text-neutral-600"}`}>{extraActive ? "추가됨" : "추가"}</div>
                                      </button>
                                    );
                                  })}
                                </div>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        <section className="sticky bottom-2 mt-4 rounded-[1.5rem] border border-white/10 bg-neutral-900 p-3 shadow-2xl">
          <div className="space-y-1 text-xs text-neutral-300">
            <div className="flex justify-between"><span>선택 차량</span><span>{quote.vehicle.name}</span></div>
            <div className="flex justify-between"><span>선택 항목</span><span>{selectedOptionCount}개</span></div>
            <div className="flex justify-between"><span>시공 합계</span><span>{formatWon(quote.serviceTotal)}</span></div>
          </div>
          <div className="mt-3 border-t border-white/10 pt-3">
            <p className="text-xs text-neutral-400">예상 견적</p>
            <p className="mt-1 text-2xl font-black text-white">{formatWon(quote.total)}</p>
            <p className="mt-1 text-[11px] leading-4 text-neutral-400">실제 견적은 차량 상태, 제품 사양, 현장 작업 조건에 따라 달라질 수 있습니다.</p>
          </div>
          <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
            <button type="button" onClick={() => setShowQuoteSheet(true)} className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-3 py-3 text-sm font-black text-white shadow-lg"><MiniIcon>📄</MiniIcon>견적서 보기</button>
            <button type="button" onClick={reset} className="rounded-xl bg-white/10 px-3 text-base text-white" aria-label="초기화" title="초기화">↻</button>
          </div>
        </section>

        {showQuoteSheet ? (
          <QuoteModal quote={quote} selectedOptionCount={selectedOptionCount} onClose={() => setShowQuoteSheet(false)} onSave={saveQuoteImage} quoteImage={quoteImage} />
        ) : null}
      </div>
    </div>
  );
}
