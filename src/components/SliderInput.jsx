function SliderInput({ 
  label, 
  value, 
  min, 
  max, 
  step = 1, 
  prefix = "", 
  formatNumber = false, 
  onChange 
}) {
  const percentage = ((value - min) / (max - min)) * 100;
  const displayValue = formatNumber 
    ? value.toLocaleString() 
    : value.toString();

  return (
    <div className="space-y-4">
      <h3 className="text-[14px] font-[500] text-[#231F20]">
        {label}
      </h3>
      <div className="space-y-2">
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-2 rounded-[50px] appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #EE9129 0%, #EE9129 ${percentage}%, #F2F2F2 ${percentage}%, #F2F2F2 100%)`,
            }}
          />

          {/* Moving Text Box */}
          <div
            className="absolute -bottom-6.5 transform -translate-x-1/2"
            style={{
              left: `calc(${percentage<0?0:percentage}%)`,
            }}
          >
            <div className="relative bg-white text-black rounded-[4px] px-4 h-[20px] text-xl font-medium shadow-[0_0_4px_rgba(0,0,0,0.25)] flex items-center justify-center">
              <span className="text-[14px] font-[500] text-[#231F20] z-10">
                {prefix && <span className="mr-0.5">{prefix}</span>}
                {displayValue}
              </span>
              <div className="absolute -top-[3.5px] left-1/2 transform -translate-x-1/2 w-2 aspect-square bg-white rotate-45 shadow-[-2px_-2px_4px_rgba(0,0,0,0.10)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SliderInput; 